"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notifyDev = void 0;
const slack_1 = require("../api/slack");
const notifyDev = (message) => {
    slack_1.slackApp.client.chat.postMessage({
        channel: process.env.SLACK_CHANNEL_ID_TEST,
        text: message,
    });
};
exports.notifyDev = notifyDev;
