var db=require("../db")
module.exports=function(req,res,next){
    var sessionId=req.signedCookies.sessionId;
    if(sessionId){
        var numberproduct=0;
        var sanpham=db.get("sessions").find({
            id:sessionId
        }).value().cart
        if(sanpham!=undefined){
    var cartarray=Object.entries(db.get("sessions").find({
        id:sessionId
    }).value().cart);
    for(var i=0;i<=cartarray.length-1;i++){
        numberproduct+=cartarray[i][1];
    }
    }
    }
    else{
        numberproduct=0;
    }
    res.render("layouts/common",{
        numberproduct:numberproduct,    
    })
  
}