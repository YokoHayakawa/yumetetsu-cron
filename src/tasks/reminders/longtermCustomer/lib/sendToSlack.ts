import {Block, KnownBlock} from '@slack/bolt';
import {slackApp} from '../../../../api/slack';
import {globalInterval} from '../../../../config';
import {LongTermCustomerType} from '../../../../types/kintone';
import {resolveChannel} from '../helpers';
import {markSuccess} from './updateLongTermCust';


type FnMessageBlock = (record: LongTermCustomerType) => (Block | KnownBlock)[]

const messageBlock: FnMessageBlock = (record) => {
  const {
    氏名: name,
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
        text: '追客可能時期となりました！\nお客様へのご連絡・ご対応をお願いします！',
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
const sendRecToSlack = async (rec: LongTermCustomerType) => {
  const resp = await slackApp.client.chat.postMessage({
    channel: resolveChannel(rec.店舗名.value),
    text: '追客可能時期となりました！',
    blocks: messageBlock(rec),
  });

  if (resp.ok) markSuccess(rec.$id.value);
};


export default async (records: LongTermCustomerType[]) => {
  // Slack is generous in API calls even though it is generally free.
  // However, rate limiters might kick in so I'm using a timed promise here.
  const tasks = records.map((rec, idx) => {
    return new Promise(
      (resolve) => setTimeout(
        ()=> resolve(sendRecToSlack(rec)), idx * globalInterval,
      ),
    );
  });

  return Promise.all(tasks);
};

