var express=require("express");
var app=express();
require('dotenv').config();
var bodyParser = require('body-parser');
var userRoutes=require("./Router/user.router");
var authLogin=require("./Router/auth.route");
var productRoutes=require("./Router/product.route")
var numberproductMiddle=require("./MiddleWare/Numberproduct.middle");
var cookieParser=require("cookie-parser")
var authRequire=require("./MiddleWare/auth.middle")
var sessionMiddle=require("./MiddleWare/session.middleware");
var cartRouth=require("./Router/cart.route");
var coutCookie=require("./MiddleWare/cookie.count");
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());
app.use(cookieParser(process.env.SessionSecret));
app.use(sessionMiddle);
app.use(express.static("public"));
var post=3000;
app.set('view engine', 'pug');
app.set('views', './views');//THư mục chứa views     
app.get("/",function(req,res){
   res.render("index",{
       name:"PPP",
   })
})
app.use("/auth",authRequire.countCookie,authLogin)
app.use("/users",authRequire.countCookie,authRequire.requireAuth,userRoutes);
app.use("/product",productRoutes);
app.use("/cart",cartRouth);
app.listen(post,function(){
    console.log("Example app listening "+post)
});
