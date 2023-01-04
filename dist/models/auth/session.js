"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const models_1 = require("../../utils/models");
const SessionSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: models_1.USER,
        required: true,
    },
    device: {
        type: String,
        required: true,
        enum: ["phone", "desktop", "tv", "tablet", "car", "bot"],
    },
    ip: {
        type: String,
        required: true,
    },
    city: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: true,
        required: true,
    },
}, { timestamps: true });
const Session = (0, mongoose_1.model)(models_1.SESSION, SessionSchema);
exports.default = Session;
//# sourceMappingURL=session.js.map