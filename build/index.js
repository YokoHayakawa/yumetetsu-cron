"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const customers_1 = __importDefault(require("./tasks/syncDoKintone/customers"));
node_cron_1.default.schedule('* * * * * *', () => {
    console.log('running a task every second');
});
node_cron_1.default.schedule('* * * * * *', customers_1.default);
