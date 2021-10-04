var exprss = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { OAuth2Client } = require('google-auth-library');
const { json } = require('body-parser');
var dotenv = require('dotenv');
const client = new OAuth2Client("925292644350-8uh2sdgfqmoqvn07lvff76a3k6jbcskk.apps.googleusercontent.com");
const jwt = require('jsonwebtoken');

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = exprss();

app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors());


mongoose.connect(process.env.CONNECTION_URL,{
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
}).then(() => {
    console.log('DataBase successfull');
}).catch((error) => {
    console.log(process.env.CONNECTION_URL);
    console.log(error);
})

const authSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    location: {},
    cartItem: [],
    order: []
})

const user = mongoose.model('user', authSchema);

app.get('/', (req, res) => {
    res.send('Home of the backend server.')
})

app.post("/auth", async (req, res) => {
    // console.log(req.body);
    const logStat = await user.findOne({email: req.body.email});
    if(logStat){
        const ans = await bcrypt.compare(req.body.password, logStat.password);
        if(ans){
            const token = jwt.sign({email: logStat.email, id: logStat.id}, process.env.SECREAT_KEY, {expiresIn: "1h"});
            const result = {
                name: logStat.name,
                email: logStat.email
            }
            res.json({token, result, status: "Success"});
        }
        else{
            res.json({result: null, status: "Password or username is wrong."});
        }
    }
    else{
        res.json({status: "User not found!! Try to signup first."});
    }
})

app.post("/check", async (req, res) => {
    const token = req.body.token;
    if(!token){
        res.json({status: "Need a token"})
    }
    else{
        jwt.verify(token, process.env.SECREAT_KEY, (error, decoded) => {
            if(error){
                res.json({status: "Fail to verify"})
            }
            else{
                res.json({status: "Token verified"})
            }
        })
    }
})

app.post("/signup", async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const userdetails = req.body;
    const hashedPassword = await bcrypt.hash(userdetails.password, salt);
    const existUser = await user.findOne({email: userdetails.email});
    if(!existUser){
        const newUser = new user({name: userdetails.name, email: userdetails.email, password: hashedPassword});
        await newUser.save();
        res.json({status: 'success'});
    }
    else{
        res.json({status: 'Already found an user try to login'});
    }
})

const author = (req, res, next) => {
    const token = req.body.token;
    if(!token){
        res.send("Need a token");
    }
    else{                

        jwt.verify(token, process.env.SECREAT_KEY, (error, decoded) => {
            if(error){
                res.json({status: "Fail to verify"})
            }
            else{
                req.userId = decoded.id;
                next();
            }
        })
    }
}

const getAuth = (req, res, next) => {
    const token = req.query.token;
    if(!token){
        res.send("Need a token");
    }
    else{                

        jwt.verify(token, process.env.SECREAT_KEY, (error, decoded) => {
            if(error){
                res.json({status: "Fail to verify"})
            }
            else{
                req.userId = decoded.id;
                next();
            }
        })
    }
}

app.post("/location", async (req, res) => {
    const email = req.body.address;
    const updatedUserData = await user.findOneAndUpdate({email}, {location: req.body.address})
    res.json({location: req.body.address})
})

app.get("/cart", getAuth, async (req, res) => {
    var email = req;
    const cartItems = await user.findOne({email: email.query.query});
    res.json(cartItems);
})

app.post("/cart",author, async (req, res) => {
    const email = req.body.user.prof.email;
    const cartItem = req.body.cartItem;
    const token = req.body.token;
    const updateCart = await user.findOneAndUpdate({email}, {cartItem: cartItem});
    res.json({cartItem});
})

app.post("/singleupdate", author, async (req, res) => {
    const id = req.body;
    const email = req.body.email;
    const token = req.body;
    console.log(token);
    const newUser = await user.findOneAndUpdate(
        { email: email },
        { $pull: { cartItem: { id: id.itemId } } },
        { new: true }
    )
    res.json({update: "success"});
})

app.post("/address", async (req, res) => {
    try {
        const fullAddress = req.body.address;
        const updatedUserData = await user.findOneAndUpdate({email: req.body.user.prof.email}, {location: fullAddress});
        res.json({address: updatedUserData.location})
    } catch (error) {
        console.log(error);
        res.json({status: "error"});
    }
})

app.get("/address", async (req, res) => {
    try {
        const prof = JSON.parse(req.query.users);
        const ret = await user.findOne({email: prof.email});
                 
        if(ret.location === undefined){
            res.json({Address: null});
        }
        else{
            res.json({Address: ret.location});
        }
    } catch (error) {
        console.log(error);
    }
})

app.post("/order", author, async (req, res) => {
        const prof = req.body.user.prof.email;
        const items = req.body.items;
        const a = await user.findOneAndUpdate(
            { email: prof }, 
            { $push: { order: items.order  } }
         )
        res.json({status: "Success"});
})

app.get("/order", async (req, res) => {
    const prof = JSON.parse(req.query.user);
    const orderedItems = await user.findOne({email: prof.prof.email});
    if(orderedItems.order.length >= 1){
        res.json({orderedItems: orderedItems.order})
    }
    else{
        res.json({orderedItems: null})
    }
})

app.listen(PORT, () => {
    console.log('Server is running on port 5000');
})