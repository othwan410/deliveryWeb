const express = require('express');

const { authorizated } = require('../middleware/userState_middleware');
const DibsController = require('../controllers/dibs_controller');

const { sequelize } = require('../models');

const router = express.Router();

// router.get('/dibs', isLoggedIn, DibsController);

router.get('/dibs', authorizated, async (req, res) => {
  const userId = res.locals.user_id;

  const query = `select s.name, s.img_url, s.rating from users u
  inner join dibs d on u.user_id = d.user_id
  inner join stores s on d.store_id = s.id
  where u.user_id = ${userId};`;

  const likedStores = await sequelize.query(query, {
    type: sequelize.QueryTypes.SELECT,
  });

  // console.log(user_id);

  return res.status(200).json({ likedStores });
});

module.exports = router;
