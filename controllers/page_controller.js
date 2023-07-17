exports.renderJoin = (req, res) => {
  res.render('join', { title: '회원 가입' });
};

exports.renderMain = (req, res) => {
  const buttonText = res.locals.isLoggedIn ? '로그아웃' : '로그인';
  res.render('main', { isLoggedIn, buttonText, title: '웹페이지 메인제목' });
};

exports.renderCategory = (req, res) => {
  res.render('category', { title: '카테고리' });
};

exports.renderDetail = (req, res) => {
  res.render('store', { title: '선택식당' });
};

exports.renderOrder = (req, res) => {
  res.render('order', { title: '주문페이지' });
};

exports.renderOrderDetail = (req, res) => {
  res.render('orderDetail', { title: '주문내역 확인페이지' });
};

exports.renderPayment = (req, res) => {
  res.render('payment', { title: '결제페이지' });
};
