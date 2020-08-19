module.exports.postCreate = function(req,res,next){
    var errors = [];
    if(!req.body.title){
        errors.push('Title is required')
    }
    if(!req.body.description){
        errors.push('Description is required')
    }
    if(errors.length){
        res.render('store/create',{
            errors: errors,
            valued: req.body
        });
        return;
    }
    next();
}
module.exports.postUpdate = function(req,res,next){
    var errors = [];
    if(!req.body.title){
        errors.push('Title is required')
    }
    if(errors.length){
        res.render('store/update',{
            errors: errors,
            valued: req.body
        });
        return;
    }
    next();
}