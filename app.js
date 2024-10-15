require('dotenv').config();
require('./config/db').connect(); //call Method connect

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./model/user');
const auth = require('./middleware/auth');
const app = express();

app.use(express.json());

// Register
app.post("/register", async (req,res) => {
    // register logic in here.   
    try {
        // Get user input
        const {firstName, lastName, email, password} = req.body;
        // Validate
        if (!(firstName && lastName && email && password)) {
            res.status(400).send("All input are required!!!.");
        }

        // Check exisiting user
        const oldUser = await User.findOne({ email });
        if (oldUser){
            return res.status(409).send("already exist user");
        }

        //encrypt pwd
        encryptedPwd = await bcrypt.hash(password, 10);

        //create user into the db.
        const user = await User.create({
            firstName, lastName,
            email: email.toLowerCase(),
            password: encryptedPwd
        });

        // creat token
        const token = jwt.sign(
            {
                user_id: user._id,
                email
            },
            process.env.TOKEN_KEY,{
                expiresIn: "2h"}
        );

        // save user's token
        user.token = token;

        //return new user
        res.status(201).json(user);

    } catch (error) {
        console.error(error);
    } 
});

// Login
app.post("/login", async (req,res) => {
    // login logic in here.    

    try {
        // Get user input
        const { email, password} = req.body;
        // Validate
        if (!(email && password)) {
            res.status(400).send("no email and pwd are required!!!.");
        }

        // user exist
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))){
            // create token
            const token = jwt.sign(
                {
                    user_id: user._id,
                    email
                },
                process.env.TOKEN_KEY,{
                    expiresIn: "2h"}
            );
        
            // save user's token
            user.token = token;
    
            // return exist user
            res.status(202).json(user);
    
        }
        res.status(403).send("invalid token");

    } catch (error) {
        console.log(error);
    }
});

// Welcome page when user login successfully.
app.post("/welcome", auth,  (req,res) => {
    res.status(200).send('weelcome !! ') ;
});

module.exports = app;

/** 
app.get('/', (req, res) => {
    res.send('<h1>hello world kkkk</h1>');
});
app.post('/student', (req, res) => {

} );


app.listen(3000, () => {
    console.log("server started at port 3000");
});

**/