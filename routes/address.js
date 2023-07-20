const express = require('express');
const router = express.Router();

const AddressController = require('../controllers/address_controller');
const addressController = new AddressController();
const { authorizated } = require('../middleware/userState_middleware');

router.get('/addresses', authorizated, addressController.findUserAddress);
router.get('/addressOne', authorizated, addressController.findUserAddressOne);
router.post('/addresses', authorizated, addressController.createAddress);
router.put(
  '/currentAddresses/:address_id',
  authorizated,
  addressController.updateIsCurren
);
router.put(
  '/addresses/:address_id',
  authorizated,
  addressController.updateAddress
);
router.delete(
  '/addresses/:address_id',
  authorizated,
  addressController.deleteAddress
);

module.exports = router;
