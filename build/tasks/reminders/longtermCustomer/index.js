"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.longtermCustomer = void 0;
const utils_1 = require("../../../utils");
const getLongTermCust_1 = __importDefault(require("./lib/getLongTermCust"));
const sendToSlack_1 = __importDefault(require("./lib/sendToSlack"));
/**
 * Send slack message when a long term customer is due.
 */
const longtermCustomer = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, getLongTermCust_1.default)();
    (0, utils_1.notifyDev)(`Cron job: longtermCustomer ${new Date()}`);
    // console.log(process.env.NODE_ENV, result.records.length, 'node');
    if (result.ok) {
        yield (0, sendToSlack_1.default)(result.records);
        return { ok: 'true' };
    }
    return { ok: 'false' };
});
exports.longtermCustomer = longtermCustomer;
