
module.exports.postLogin=function(req,res,next){
    var emailrequire="",passwordrequire="";
    var users=db.get("users").find({email:req.body.email}).value();
    if(!req.body.email){
        emailrequire="Email is require";
    }
    if(!req.body.password){
        passwordrequire="Password is require";
    }
    if(emailrequire!=="" && passwordrequire!==""){
        res.render("auth/login",{
            emailrequire:emailrequire,
            passwordrequire:passwordrequire,
            CanLogin:""
        })
    }
    //
   
    //
    if(parseInt(users.Wronglogin)==4){
        res.render("auth/login",{
            Loginerror:"You can login!!,Định mò mật khẩu à",
            CanLogin:"true",
            values:req.body,
        })
    }
    if(users && users.password!=req.body.password && parseInt(users.Wronglogin)<4){
        var count=parseInt(users.Wronglogin);
        count=count+1;
        db.get("users").find({email:req.body.email}).assign({Wronglogin:String(count)}).write();
    }
    if(!users){
        res.render("auth/login",{
            emailerror:"User does not exit",
            emailrequire:emailrequire,
            values:req.body,
            CanLogin:""
        })
        return;
    }
    if(users.password!==req.body.password||req.body.password===""){
        res.render("auth/login",{
            passworderror:"Wrong Password",
            passwordrequire:passwordrequire,
            values:req.body,
            CanLogin:""
        })
        return;
    } 
    res.cookie("UserID",users.id,{
        signed:true
    });
    next();
}