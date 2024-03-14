const logEvent =  require('../utililties/logEvents');


const errorHandler = (err, req, res, next) => {
    logEvent(`${err.name}: ${err.message}`)
    next();
}

module.exports = errorHandler;