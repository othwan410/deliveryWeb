const express = require('express');
const Store = require('../models/store');
const router = express.Router();

const StoresController = require('../controllers/store_controller');
const storesController = new StoresController();
const { authorizated } = require('../middleware/userState_middleware');

router.post('/store', authorizated, storesController.createStore);
router.put('/:store_id', authorizated, storesController.updateStore);
router.delete('/:store_id', authorizated, storesController.deleteStore);

router.get('/stores?category=categoryId', async (req, res) => {
  const category_id = req.query.category;
  try {
    const stores = await Store.findAll(                               
      {
        attributes: ['name', 'img_url', 'rating'],
        order: [['createdAt', 'DESC']],
      },
      {
        where: { category_id },
      }
    );
    res.status(200).json({ data: stores });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ errorMessage: error });
  }
});

router.get('/stores?storeId=storeId', async (req, res) => {
  const store_id = req.query;
  try {
    const store = await Store.findOne({
      where: { store_id },
      attributes: ['name', 'img_url', 'call', 'content', 'rating'],
      include: [
        {
          model: Menu,
          attributes: ['name', 'price', 'img_url'],
        },
        {
          model: Dibs,
          attributes: ['user_id'],
        },
      ],
    });

    const data = {
      store: {
        name: store.name,
        img_url: store.img_url,
        call: store.call,
        content: store.content,
        rating: store.rating,
        menu: store.menus.map((menu) => ({
          name: menu.name,
          price: menu.price,
          img_url: menu.img_url,
        })),
        isDibs: store.dibs.user_id ? true : false,
      },
    };
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ errorMessage: error });
  }
});

module.exports = router;
