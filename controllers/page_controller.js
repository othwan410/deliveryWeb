exports.renderJoin = (req, res) => {
  res.render('join', { title: '회원 가입' });
};

exports.renderMain = (req, res) => {
  res.render('main', { title: '메인페이지' });
};

exports.renderCategoryStore = (req, res) => {
  res.render('category_store', { title: '식당들' });
};
