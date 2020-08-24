var db=require("../db")
// var user=db.get("users").find({id:req.cookies.UserID}).value();
module.exports.requireAuth=function(req,res,next){
    if(!req.signedCookies.UserID){
        res.redirect("/auth/login");
        return;
    }
    var user=db.get("users").find({id:req.signedCookies.UserID}).value();
    if(!user){
        res.redirect("/auth/login");
        return;
    }
    res.locals.user=user;
next();
}
module.exports.countCookie=function(req,res,next){
    if(req.signedCookies.UserID){
        var count=parseInt(req.cookies.count)+1;
    }
    else{
    var count=0;
    }
    res.cookie("count",count);
next();
}