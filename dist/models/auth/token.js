"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const models_1 = require("../../utils/models");
const constants_1 = require("../../utils/constants");
const TokenSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: models_1.USER,
        required: true,
    },
    session: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: models_1.SESSION,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        default: constants_1.ACCESS_TOKEN,
        enum: [constants_1.ACCESS_TOKEN, constants_1.REFRESH_TOKEN],
    },
    expiresAt: {
        type: Date,
        required: true,
    },
}, { timestamps: true });
const Token = (0, mongoose_1.model)(models_1.TOKEN, TokenSchema);
exports.default = Token;
//# sourceMappingURL=token.js.map