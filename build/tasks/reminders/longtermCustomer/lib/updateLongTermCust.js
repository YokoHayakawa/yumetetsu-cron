"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.markSuccess = void 0;
const kintone_1 = require("../../../../api/kintone");
const markSuccess = (recId) => {
    kintone_1.kintoneClient.record.updateRecord({
        app: kintone_1.APP_IDS['longTermCustomers'],
        id: recId,
        record: {
            isSentToSlack: { value: '1' },
        },
    });
};
exports.markSuccess = markSuccess;
