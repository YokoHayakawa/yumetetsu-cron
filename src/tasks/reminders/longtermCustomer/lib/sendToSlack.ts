import {Block, KnownBlock} from '@slack/bolt';
import {slackApp} from '../../../../api/slack';
import {resolveChannel} from '../../../../api/slack/helpers';
import {globalInterval} from '../../../../config';

import {markSuccess} from './updateLongTermCust';


type FnMessageBlock = (
  record: LongTermCustomerType,
  textHeader: string
) => (Block | KnownBlock)[]

const messageBlock: FnMessageBlock = (record, textHeader) => {
  const {
    顧客名: name,
    電話番号: phone,
    メールアドレス: email,
    都道府県: pref,
    市: city,
    '町名・番地': houseNo,
    担当者名: aGName,
    店舗名: storeName,
    長期理由詳細: reasonDetails,
    長期追客理由: reasonForFFLongterm,
    追客可能時期: dueDate,
  } = record;

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
        text: `${textHeader}\nお客様へのご連絡・ご対応をお願いします！`,
      },
    },

    {type: 'divider'},

    {
      'type': 'section',
      'fields': [
        ['お客様名', name.value],
        ['店舗', storeName.value],
        ['担当者', aGName.value],
        ['連絡先', `${phone.value} ${email.value}`],
        ['住所', `${pref.value} ${city.value} ${houseNo.value}`],
      ].map(
        ([label, value])=> ({type: 'mrkdwn', text: `*${label}：*\n${value}`}),
      ),
    },

    {type: 'divider'},

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
const sendRecToSlack = async (
  rec: LongTermCustomerType,
) => {
  const {
    店舗名: storeName,
    slackSentStatus,
  } = rec;

  const isActualHankyoDate = slackSentStatus.value === '1';
  const textHeader = `追客可能時期${isActualHankyoDate ? 'となりました' : '３か月前くらいです'}!`;

  const resp = await slackApp.client.chat.postMessage({
    channel: resolveChannel(storeName.value),
    text: textHeader,
    blocks: messageBlock(rec, textHeader),
  });

  if (resp.ok) await markSuccess(rec, resp);
};


export default async (records: LongTermCustomerType[]) => {
  // Slack is generous in API calls even though it is generally free.
  // However, rate limiters might kick in so I'm using a timed promise here.
  const tasks = records.map((rec, idx) => {
    return new Promise(
      (resolve) => setTimeout(
        ()=> resolve(sendRecToSlack(rec)),
        idx * globalInterval,
      ),
    );
  });

  return Promise.all(tasks);
};

