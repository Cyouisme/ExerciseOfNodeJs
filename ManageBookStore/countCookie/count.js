
module.exports.count = function (req, res, next) {
    var countUserId = req.cookies.countUserId;
    var consoleCountUserId = {
        'countUserId': countUserId
    }
    if (req.signedCookies.userId) {
        countUserId = parseInt(countUserId);
        countUserId++
        res.cookie('countUserId', countUserId.toString())
    }
    console.log(consoleCountUserId);
    next();
}