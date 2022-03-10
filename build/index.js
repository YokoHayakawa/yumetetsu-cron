"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
const node_cron_1 = __importDefault(require("node-cron"));
const reminders_1 = require("./tasks/reminders");
/**
 * Reminds about longterm customer every day at 9 am
 */
node_cron_1.default.schedule('* * * * * * ', reminders_1.longtermCustomer, {
    scheduled: true,
    timezone: 'Asia/Tokyo',
});
