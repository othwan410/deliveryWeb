express = require('express');
const router = express.Router();

const DibsController = require('../controllers/dibs_controller');
const dibsController = new DibsController();
const { authorizated } = require('../middleware/userState_middleware');

router.post('/dibs', authorizated, dibsController.createDibs);

router.delete('/dibs', authorizated, dibsController.deleteDibs);

router.get('/dibs', authorizated, dibsController.findMyDibs);

module.exports = router;
