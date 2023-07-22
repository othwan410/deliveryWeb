const OrderService = require('../services/order_service');

class OrderController {
  orderService = new OrderService();

  findAllUserOrder = async (req, res, next) => {
    try {
      const user_id = res.locals.user_id;
      const orders = await this.orderService.findAllUserOrder(user_id);
      console.log(orders);
      res.render('orderList', { orders });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        success: false,
        errorMessage: '주문 목록 조회에 실패하였습니다.',
      });
    }
  };

  findAllAdminOrder = async (req, res, next) => {
    try {
      if (!req.params) {
        return res.status(400).json({
          success: false,
          errorMessage: "'데이터 형식이 올바르지 않습니다.'",
        });
      }

      const { store_id } = req.params;
      const order = await this.orderService.findAllAdminOrder(store_id);

      return res.status(200).json({ data: order });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        success: false,
        errorMessage: '게시글 조회에 실패하였습니다.',
      });
    }
  };

  findOneOrder = async (req, res, next) => {
    try {
      if (!req.params) {
        return res.status(400).json({
          success: false,
          errorMessage: "'데이터 형식이 올바르지 않습니다.'",
        });
      }

      const { order_id } = req.params;

      if (!order_id) {
        return res.status(412).json({
          success: false,
          errorMessage: '주문내역의 형식이 일치하지 않습니다.',
        });
      }

      const order = await this.orderService.findOneOrder(order_id);
      console.log(order);
      res.render('orderDetail', { order });
      return { order };
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        success: false,
        errorMessage: '주문내역의 조회에 실패하였습니다.',
      });
    }
  };

  updateOrderStatus = async (req, res, next) => {
    try {
      if (!req.params) {
        return res.status(412).json({
          success: false,
          errorMessage: '데이터 형식이 올바르지 않습니다.',
        });
      }

      const user_id = res.locals.user_id;
      const { order_id } = req.params;
      const { status } = req.query;

      if (!order_id) {
        return res.status(412).json({
          success: false,
          errorMessage: '주문내역의 형식이 올바르지 않습니다.',
        });
      }

      if (!status) {
        return res.status(412).json({
          success: false,
          errorMessage: '주문상태의 형식이 올바르지 않습니다.',
        });
      }

      const updateOrderStatus = await this.orderService.updateOrderStatus(
        order_id,
        status,
        user_id
      );

      if (!updateOrderStatus) {
        return res
          .status(400)
          .json({ message: '주문상태 수정에 실패했습니다.' });
      }
      return res.status(201).json({ message: '주문상태 수정에 성공했습니다.' });
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json({ errorMessage: '주문상태 수정에 실패했습니다.' });
    }
  };

  createOrder = async (req, res, next) => {
    try {
      if (!req.query || !req.body) {
        return res.status(412).json({
          success: false,
          errorMessage: '데이터 형식이 올바르지 않습니다.',
        });
      }

      const store_id = parseInt(req.query.store_id);
      const user_id = res.locals.user_id;
      const { address_id, price, request, menu } = req.body;

      if (!address_id) {
        return res.status(412).json({
          success: false,
          errorMessage: '주소의 형식이 일치하지 않습니다.',
        });
      }

      if (!price) {
        return res.status(412).json({
          success: false,
          errorMessage: '가격의 형식이 일치하지 않습니다.',
        });
      }

      if (!request) {
        return res.status(412).json({
          success: false,
          errorMessage: '요청사항의 형식이 일치하지 않습니다.',
        });
      }

      if (!menu) {
        return res.status(412).json({
          success: false,
          errorMessage: '메뉴의 형식이 일치하지 않습니다.',
        });
      }

      const createOrder = await this.orderService.createOrder(
        user_id,
        address_id,
        store_id,
        price,
        request,
        menu
      );

      return res.status(201).json(createOrder);
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        success: false,
        errorMessage: "'주문에 실패하였습니다.'",
      });
    }
  };

  deleteOrder = async (req, res, next) => {
    try {
      if (!req.params) {
        return res.status(400).json({
          success: false,
          errorMessage: "'데이터 형식이 올바르지 않습니다.'",
        });
      }

      const { order_id } = req.params;
      const deleteOrder = await this.orderService.deleteOrder(order_id);

      if (!deleteOrder) {
        return res
          .status(400)
          .json({ message: '주문내역 삭제에 실패했습니다.' });
      }
      return res.status(201).json({ message: '주문내역 삭제에 성공했습니다.' });
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json({ errorMessage: '주문내역 삭제에 실패했습니다.' });
    }
  };
}

module.exports = OrderController;
