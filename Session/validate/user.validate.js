module.exports.postCreate=function(req,res,next){
var users=db.get("users").find({name:req.body.name}).value();
var Phonenumber=db.get("users").find({phone:req.body.phone}).value();
var namerequire="";
var phonerequire="",nameerror="",phoneerror=""; 
if(!req.body.name){
   namerequire="Name is require"
}
if(!req.body.phone){
  phonerequire="Phone is require"
}
if(users){
   nameerror="Trùng Name"
}
if(Phonenumber){
   phoneerror="Trùng Phone"
}
if(namerequire!=""||phonerequire!=""||nameerror!=""||phoneerror!=""){
res.render("users/create",{
    namerequire:namerequire,
    phoneerror:phoneerror,
    values:req.body,
    nameerror:nameerror,
    phonerequire:phonerequire
})
return;
}
next(); 
}
