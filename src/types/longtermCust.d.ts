declare namespace Yume.longtermCust {
  interface Fields {
    反響手段: kintone.fieldTypes.SingleLineText;
    市: kintone.fieldTypes.SingleLineText;
    長期理由詳細: kintone.fieldTypes.MultiLineText;
    biko: kintone.fieldTypes.SingleLineText;
    reasonCancel: kintone.fieldTypes.SingleLineText;
    追客可能時期: kintone.fieldTypes.Date;
    phoneNum: kintone.fieldTypes.SingleLineText;
    担当者名: kintone.fieldTypes.SingleLineText;
    メールアドレス: kintone.fieldTypes.SingleLineText;
    反響媒体: kintone.fieldTypes.SingleLineText;
    長期追客理由: kintone.fieldTypes.SingleLineText;
    顧客名: kintone.fieldTypes.SingleLineText;
    custId: kintone.fieldTypes.SingleLineText;
    店舗名: kintone.fieldTypes.SingleLineText;
    連絡事項: kintone.fieldTypes.MultiLineText;
    '町名・番地': kintone.fieldTypes.SingleLineText;
    slackChannel: kintone.fieldTypes.SingleLineText;
    郵便番号: kintone.fieldTypes.SingleLineText;
    日時: kintone.fieldTypes.DateTime;
    slackTS: kintone.fieldTypes.SingleLineText;
    mobileNum: kintone.fieldTypes.SingleLineText;
    都道府県: kintone.fieldTypes.SingleLineText;
    顧客名フリガナ: kintone.fieldTypes.SingleLineText;
    顧客種別: kintone.fieldTypes.SingleLineText;
    slackSentStatus: kintone.fieldTypes.Number;
    テーブル: {
      type: 'SUBTABLE';
      value: {
        id: string;
        value: {
          文字列__複数行__1: kintone.fieldTypes.MultiLineText;
          対応者: kintone.fieldTypes.SingleLineText;
          日付_0: kintone.fieldTypes.Date;
        };
      }[];
    };
  }
  interface SavedFields extends Fields {
    $id: kintone.fieldTypes.Id;
    $revision: kintone.fieldTypes.Revision;
    更新者: kintone.fieldTypes.Modifier;
    作成者: kintone.fieldTypes.Creator;
    レコード番号: kintone.fieldTypes.RecordNumber;
    更新日時: kintone.fieldTypes.UpdatedTime;
    作成日時: kintone.fieldTypes.CreatedTime;
  }
}
