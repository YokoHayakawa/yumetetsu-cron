"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APP_IDS = exports.kintoneClient = void 0;
const rest_api_client_1 = require("@kintone/rest-api-client");
exports.kintoneClient = new rest_api_client_1.KintoneRestAPIClient({
    baseUrl: process.env.KINTONE_BASE_URL,
    auth: { apiToken: [
            process.env.KINTONE_CUSTOMERS_TOKEN,
            process.env.KINTONE_LONGTERM_CUSTOMERS_TOKEN,
        ] },
});
exports.APP_IDS = {
    'customers': '84',
    'longTermCustomers': '189',
};
