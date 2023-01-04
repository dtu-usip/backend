"use strict";
class ExpressError extends Error {
    constructor(message, statusCode, error = null) {
        super();
        this.message = message;
        this.statusCode = statusCode;
        this.error = error;
    }
}
module.exports = ExpressError;
//# sourceMappingURL=ExpressError.js.map