import rootPath from 'app-root-path';

export const URLs = {
  login: 'https://manage.do-network.com/login/134',
};

export const selectors = {
  user: `[name='user_id']`,
  pass: `[name='password']`,
  store: '#fc_shop_id',
  login: '.btn_login',
  loggedInEl: '.sidebar-customer',

  // Customer Page
  custNav: '.sidebar-customer',
  ddStores: '#m_customer_filters_fc_shop_id',
  ddAgents: '.clone_user_id',
  btnSearch: '#btn_search',
  resultCount: '#kensakukekka',
  resultNothing: '.sf_admin_list > .big',
  resultClear: '.btn_excel.search',
  btnSave: '#btn_csv',
};

export const downloadLimit = 3000;

export const custDlDir = rootPath.resolve('/dump/customers');
