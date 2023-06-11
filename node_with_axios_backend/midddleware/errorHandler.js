const { constants } = require("../constants")
const errorHandler = (err, req, res, next) => {
    // console.log(err);
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case constants.NOT_FOUND:
            res.json({
                title: "Not Found",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case constants.VALIDATION_ERR:
            res.json({
                title: "Validation Failed",
                message: err.message,
                stackTrace: err.stack
            });
            break;

        default:
            console.log("No Error happy");
            break;
    }
}
module.exports = errorHandler