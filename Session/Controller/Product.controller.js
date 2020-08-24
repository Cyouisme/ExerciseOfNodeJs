var db=require("../db")
module.exports={
    index:function(req,res){
var sessionId=req.signedCookies.sessionId;
var limit=8;
var arrayproduct=db.get("product");
var page=parseInt(req.query.page)||1//n
var number=Math.floor(arrayproduct.size().value()/limit);
var begin=(page-1)*limit;
var end=page*limit;
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
     res.render("product/index",{
         numberproduct:numberproduct,
         product:db.get("product").value().slice(begin,end),
         e:page,
         number1:number
     })
    }
}