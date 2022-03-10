"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slackApp = void 0;
const bolt_1 = require("@slack/bolt");
exports.slackApp = new bolt_1.App({
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    token: process.env.SLACK_BOT_TOKEN,
});
