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
Object.defineProperty(exports, "__esModule", { value: true });
const kintone_1 = require("../../../../api/kintone");
exports.default = () => __awaiter(void 0, void 0, void 0, function* () {
    return kintone_1.kintoneClient.record.getRecords({
        app: kintone_1.APP_IDS['longTermCustomers'],
        totalCount: true,
        query: [
            `${'isSentToSlack'} = "0"`,
            `${'追客可能時期'} <= TODAY()`,
        ].join(' and '),
    })
        .then((res) => (Object.assign(Object.assign({}, res), { ok: true })))
        .catch((reason) => {
        console.log('エラーが発生しました: ', reason);
        return {
            ok: false,
            records: [],
            totalCount: '0',
        };
    });
});
