const fs = require('fs')
const FILE_PATH = 'countRequest.json'

// read json object from file
const readStats = () => {
    let result = {}
    try {
        result = JSON.parse(fs.readFileSync(FILE_PATH))
    } catch (err) {
        console.error(err)
    }
    return result
}

// dump json object to file
const dumpStats = (stats) => {
    try {
        fs.writeFileSync(FILE_PATH, JSON.stringify(stats), { flag: 'w+' })
    } catch (err) {
        console.error(err)
    }
}

function getRoute(req) {
    const route = req.route ? req.route.path : '' // check if the handler exist
    const baseUrl = req.baseUrl ? req.baseUrl : '' // adding the base url if the handler is a child of another handler

    return route ? `${baseUrl === '/' ? '' : baseUrl}${route}` : 'unknown route'
}

module.exports.infoRequest = function (req, res, next) {
    res.on('finish', () => {
        const stats = readStats()
        const event = `${req.method} ${getRoute(req)} ${res.statusCode}`
        stats[event] = stats[event] ? stats[event] + 1 : 1
        dumpStats(stats)
    })
    next()
}

module.exports.countRequestCookieHello = function (req, res, next) {
    var reqCookieHello = req.cookies.userId
    var countCookieHello = req.cookies.countCookieHello
    var consoleCountCookieHello = {
        'countCookieHello': countCookieHello
    }
    if (reqCookieHello) {
        countCookieHello = parseInt(countCookieHello)
        countCookieHello ++
        res.cookie('countCookieHello', countCookieHello.toString())
    }
    console.log(consoleCountCookieHello)
    next()
}