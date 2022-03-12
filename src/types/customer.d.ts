declare namespace Yume.customer {
  interface Fields {
    反響手段: kintone.fieldTypes.SingleLineText;
    市: kintone.fieldTypes.SingleLineText;
    登録日時: kintone.fieldTypes.DateTime;
    顧客番号: kintone.fieldTypes.SingleLineText;
    電話番号２: kintone.fieldTypes.SingleLineText;
    電話番号１: kintone.fieldTypes.SingleLineText;
    県: kintone.fieldTypes.SingleLineText;
    メールアドレス: kintone.fieldTypes.SingleLineText;
    反響媒体: kintone.fieldTypes.SingleLineText;
    氏名: kintone.fieldTypes.SingleLineText;
    店舗名: kintone.fieldTypes.SingleLineText;
    担当名: kintone.fieldTypes.SingleLineText;
    更新日_doNetwork: kintone.fieldTypes.DateTime;
    町名＿番地: kintone.fieldTypes.SingleLineText;
    郵便番号: kintone.fieldTypes.SingleLineText;
    ドロップダウン_1: kintone.fieldTypes.DropDown;
    ドロップダウン_0: kintone.fieldTypes.DropDown;
    SNS登録日: kintone.fieldTypes.Date;
    顧客種別: kintone.fieldTypes.DropDown;
    生年月日: kintone.fieldTypes.Date;
    氏名_フリガナ: kintone.fieldTypes.SingleLineText;
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
