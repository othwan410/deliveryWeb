const { User, Address } = require('../models/');

exports.renderJoin = (req, res) => {
  res.render('join', { title: '회원 가입' });
};

exports.renderMain = async (req, res) => {
  // const user_id = res.locals.user_id;
  // try {
  //   if (!user_id) {
  //     const address = '';
  //     res.render('main', { address });
  //   }
  //   const recentAddress = await Address.findOne({
  //     attributes: ['addressId'],
  //     where: { user_id },
  //     order: [['address_id', 'DESC']],
  //   });

  //   const mainInfo = { recentAddress, user_id };
  res.render('main');
  //   } catch (error) {
  //     console.error(error);
  //     return res.status(400).json({ error: error });
  //   }
  //   res.render('main', { title: '메인페이지' });
  // };
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

exports.renderRegistor = (req, res) => {
  res.render('store_create');
};

exports.renderSignIn = (req, res) => {
  res.render('signin', { title: '로그인' });
};

exports.renderProfile = (req, res) => {
  res.render('profile', { title: '프로필' });
};
