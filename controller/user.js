const User = require("../model/user.js"); 

const errorGenerator = (message, statusCode = 500) => { // error 를 핸들링 하는 함수
    const error = new Error(message); // error 객체를 생성
    error.statusCode = statusCode;
    throw error; // error 를 핸들링 하는 하는 미들웨어로 에러를 던진다.
  };

//read all users
const readAllUser = async (req,res,next) => {
    try {
        console.log("Read all users");
        const users = await User.find();
        res.status(201).json({ message: "All users", users });
    } catch(err) {
        next(err);
    }
}

//update the userinfo
const addNewUser = async (req,res,next) => {
    try {
        const { username } = req.body;
        const user = await User.findOne({ 'username':username });
        if(user) errorGenerator("The user already exist!", 404);
        await _createUser(username,0);
        res.status(201).json({ message: "Addition success"});
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

//modifying score
const modifScore = async (req,res,next) => {
    try{
        const { username,userscore } = req.body;
        const user = await User.findOneAndUpdate({ 'username':username },{ 'userscore':userscore });
        if(!user) errorGenerator("There is no such user in db", 404);
        res.status(201).json({ message: "Modification success"});      
    } catch(err) {
        next(err);
    }
};


//export
module.exports = {readAllUser, addNewUser, modifScore};
