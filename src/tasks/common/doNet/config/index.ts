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
  shopDD: '#m_customer_filters_fc_shop_id',
  btnSearch: '#btn_search',
  resultCount: '#kensakukekka',
  resultNothing: '.sf_admin_list > .big',
  resultClear: '.btn_excel.search',
};

export const downloadLimit = 3000;
