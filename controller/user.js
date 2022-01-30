const User = require("../model/user.js"); 

const errorGenerator = (message, statusCode = 500) => { // error 를 핸들링 하는 함수
    const error = new Error(message); // error 객체를 생성
    error.statusCode = statusCode;
    throw error; // error 를 핸들링 하는 하는 미들웨어로 에러를 던진다.
  };

//add new user in db
const addNewUser = async (req,res,next) => {
    try {
        console.log("Generate the new user");
        const { email } = req.query;
        const users = await Bookmark.find({ 'email':email });
        res.status(201).json({ message: "Load complete", bookmarks });
    } catch(err) {
        next(err);
    }
}

//update the userinfo
const addNewUser = async (req,res,next) => {
    try {
        const { email,link  } = req.query;
        const bookmark = await Bookmark.findOne({ 'email':email,'link':link });
        if(!bookmark) errorGenerator("There isn't corresponding bookmark!", 404);
        res.status(201).json({ message: "Find Bookmark", bookmark });
    } catch(err) {
        next(err);
    }
}

//create a bookmark
const _createUser = async ({username,userscore}) => {
    const game = new Game({
        'username': username,
        'userscore': userscore
    });
    return game.save();
};


//export
module.exports = {genRandomGameList, updateGames};
