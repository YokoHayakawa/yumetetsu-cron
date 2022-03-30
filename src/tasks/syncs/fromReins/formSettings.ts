import {FormValues} from '../../common/reins/pages/searchProperty';

export const location = {
  '愛知県': [
    '豊田市',
    '豊川市', '豊橋市',
    '蒲郡市', '新城市',
    '安城市', '刈谷市',
    '西尾市', 'みよし市',
    '高浜市', '碧南市',
    '名古屋市港区', '名古屋市昭和区',
    '名古屋市千種区', '名古屋市中川区',
    '名古屋市中村区', '名古屋市熱田区',
  ],
  '岐阜県': [
    '大垣市',
  ],
};


export const formSettings : FormValues[] = [
  {
    propertyType: '売マンション',
    oldOrNew: '中古',
  },
  {
    propertyType: '売一戸建',
    oldOrNew: '中古',
  },
  {
    propertyType: '売土地',
  },
];
