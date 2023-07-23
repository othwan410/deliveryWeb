const CartRepository = require('../repositories/cart_repository');

class CartService {
  cartRepository = new CartRepository();

  findAllUserCart = async (user_id) => {
    return await this.cartRepository.findAllUserCart(user_id);
  };

  createCart = async (user_id, menu_id, store_id, ea) => {
    const [store] = await this.cartRepository.findOneCart(user_id);
    if (store.store_id && store.store_id !== parseInt(store_id)) return false;

    const [menu] = await this.cartRepository.findCartMenu(user_id, menu_id);

    if (menu)
      return await this.cartRepository.updateCartEa(
        menu.cart_id,
        parseInt(ea) + menu.ea
      );

    return this.cartRepository.createCart(user_id, menu_id, store_id, ea);
  };

  updateCartEa = async (cart_id, ea) => {
    return await this.cartRepository.updateCartEa(cart_id, ea);
  };

  deleteCart = async (cart_id) => {
    return await this.cartRepository.deleteCart(cart_id);
  };
}

module.exports = CartService;
