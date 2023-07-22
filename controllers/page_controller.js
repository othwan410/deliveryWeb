exports.renderJoin = (req, res) => {
  res.render('join', { title: '회원 가입' });
};

exports.renderMain = (req, res) => {
  res.render('main', { title: '메인페이지' });
};

exports.renderCategoryStore = (req, res) => {
  res.render('category_store', { title: '식당들' });
};

exports.renderLoading = (req, res) => {
  res.render('loading', { title: '로딩페이지' });
};

exports.renderOrderComplete = (req, res) => {
  res.render('orderComplete', { title: '주문완료' });
};

exports.renderOrderpage = (req, res) => {
  res.render('order', { title: '주문확인' });
};

exports.renderRegistor = (req,res)=>{
  res.render('store_create');
}

exports.renderAdminpage = (req,res)=>{
  res.render('adminpage')
}

exports.renderCreateMenuPage = (req,res)=>{
  res.render('menu_create')
}