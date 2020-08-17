module.exports.count = function(req,res,next){
    res.cookie('user-Id',111)
    res.locals = 0;
    if(req.cookies){
        res.locals++;
    }
    console.log("user-Id: "+res.locals);
    next();
}