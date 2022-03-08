import {Block, KnownBlock} from '@slack/bolt';
import {slackApp} from '../../../../api/slack';

type LongtermCustFields = Yume.longtermCust.SavedFields

/*
お客様名:
連絡先:
住所:
店舗:
担当者:
<長期追客理由>

####:###:::::: */

const messageBlock = (record: LongtermCustFields ): (Block | KnownBlock)[] => {
  const {$id} = record;

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
        ['お客様名', '徳永英明'],
        ['連絡先', 'n011111111'],
        ['住所', '愛知県豊川市'],
        ['店舗', '豊川中央店'],
        ['担当者', 'n隆隆介'],
      ].map(
        ([label, value])=> ({type: 'mrkdwn', text: `*${label}：*\n${value}`}),
      ),
    },

    {type: 'divider'},

    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: '*長期追客理由*\n てすとてすとてすと',
      },
    },

    {
      'type': 'context',
      'elements': [
        {
          'type': 'plain_text',
          'text': '2022年3月8日',
        },
      ],
    },

  ];
};

/*
{
        type: 'mrkdwn',
        text: `お客様名: 徳永英明
*連絡先:*\n011111111
*住所:*\n愛知県豊川市
*店舗:*\n豊川中央店
*担当者:*\n隆隆介
*<長期追客理由>*
テスト
`,
      } */

export default (records: LongtermCustFields[]) => {
  console.log(records.length, 'length');

  slackApp.client.chat.postMessage({
    channel: process.env.SLACK_CHANNGEL_ID_TEST,
    text: '追客可能時期となりました！',
    blocks: messageBlock(records[0]),
  });
};
