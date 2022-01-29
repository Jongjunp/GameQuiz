const Game = require("../model/game.js"); 
require("dotenv").config();
const SteamAPI = require('steamapi');
const steam = new SteamAPI(process.env.STEAM_API_KEY);

const numProb = 20;

const errorGenerator = (message, statusCode = 500) => { // error 를 핸들링 하는 함수
    const error = new Error(message); // error 객체를 생성
    error.statusCode = statusCode;
    throw error; // error 를 핸들링 하는 하는 미들웨어로 에러를 던진다.
};

//generate random game list by using the games in db.
const genRandomGameList = async (req,res,next) => {
    try {
        console.log("Generate random game list for game");
        let probSet = Game.aggregate([{ $sample: { size: numProb}}]);
        res.status(201).json({ message: "Load complete", probset: probSet });
    } catch(err) {
        next(err);
    }
}

//update the game db
const updateGames = async (req,res,next) => {
    try {
        Game.deleteMany({}).then(function(){
            console.log("All Game Collections are deleted!");
        }).catch(function(e){
            errorGenerator("Error occurred while delete the data");
        })
        steam.getAppList().then( appArray => {
            appArray.forEach(async function(element){
                const gameDetail = await steam.getGameDetails(element.appid);
                _createGame(
                    gameDetail.type, 
                    gameDetail.steam_appid,
                    gameDetail.about_the_game.split('"',2)[1],
                    gameDetail.screenshots[0].path_thumbnail,
                    gameDetail.screenshots[1].path_thumbnail,
                    gameDetail.screenshots[2].path_thumbnail,
                    gameDetail.header_image,
                    gameDetail.name,
                    gameDetail.short_description
                    )
            })
        }).catch( error => {
            errorGenerator("Failed to generate the document!");
        })
    } catch(err) {
        next(err);
    }
}

//create a game schema
const _createGame = async ({gametype,gameid,gameprob,gamehint1,gamehint2,gamehint3,gameanswer,gamename,gameshortdescription}) => {
    const game = new Game({
        'gametype': gametype,
        'gameid': gameid,
        'gameprob': gameprob,
        'gamehint1': gamehint1,
        'gamehint2': gamehint2,
        'gamehint3': gamehint3,
        'gameanswer': gameanswer,
        'gamename': gamename,
        'gameshortdescription': gameshortdescription
    });
    return game.save();
};


//export
module.exports = {genRandomGameList, updateGames};
