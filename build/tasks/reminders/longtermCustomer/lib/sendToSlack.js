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
const slack_1 = require("../../../../api/slack");
const config_1 = require("../../../../config");
const updateLongTermCust_1 = require("./updateLongTermCust");
const messageBlock = (record) => {
    const { 氏名: name, 電話番号: phone, メールアドレス: email, 都道府県: pref, 市: city, '町名・番地': houseNo, 担当者名: aGName, 店舗名: storeName, 長期理由詳細: reasonDetails, 長期追客理由: reasonForFFLongterm, 追客可能時期: dueDate, } = record;
    return [
        {
            'type': 'header',
            'text': {
                'type': 'plain_text',
                'text': ':newspaper: 長期追客顧客',
            },
        },
        {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: '追客可能時期となりました！\nお客様へのご連絡・ご対応をお願いします！',
            },
        },
        { type: 'divider' },
        {
            'type': 'section',
            'fields': [
                ['お客様名', name.value],
                ['店舗', storeName.value],
                ['担当者', aGName.value],
                ['連絡先', `${phone.value} ${email.value}`],
                ['住所', `${pref.value} ${city.value} ${houseNo.value}`],
            ].map(([label, value]) => ({ type: 'mrkdwn', text: `*${label}：*\n${value}` })),
        },
        { type: 'divider' },
        {
            type: 'section',
            text: {
                type: 'mrkdwn',
                // eslint-disable-next-line max-len
                text: `*長期追客理由*\n ${reasonForFFLongterm.value}\n${reasonDetails.value}`,
            },
        },
        {
            'type': 'context',
            'elements': [
                {
                    'type': 'plain_text',
                    'text': dueDate.value,
                },
            ],
        },
    ];
};
/**
 * Send formatted record to Slack, then mark the record that
 * it is already sent.
 *
 * This is failsafe when the record is scheduled
 * to be sent but, an error or server fault occured.
 *
 * @param {LongTermCustomerType} rec kintone record
 */
const sendRecToSlack = (rec) => __awaiter(void 0, void 0, void 0, function* () {
    const resp = yield slack_1.slackApp.client.chat.postMessage({
        channel: process.env.SLACK_CHANNEL_ID_TEST,
        // resolveChannel(rec.店舗名.value),
        text: '追客可能時期となりました！',
        blocks: messageBlock(rec),
    });
    if (resp.ok)
        (0, updateLongTermCust_1.markSuccess)(rec.$id.value);
});
exports.default = (records) => __awaiter(void 0, void 0, void 0, function* () {
    // Slack is generous in API calls even though it is generally free.
    // However, rate limiters might kick in so I'm using a timed promise here.
    const tasks = records.map((rec, idx) => {
        return new Promise((resolve) => setTimeout(() => resolve(sendRecToSlack(rec)), idx * config_1.globalInterval));
    });
    return Promise.all(tasks);
});
