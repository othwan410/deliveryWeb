const OrderService = require('../services/posts.service');

class PostsController {
  postsService = new OrderService();
}

module.exports = PostsController;
