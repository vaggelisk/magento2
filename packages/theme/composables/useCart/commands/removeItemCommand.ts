import { Context, Logger } from '@vue-storefront/core';
import { Cart, RemoveItemFromCartInput } from '@vue-storefront/magento-api';

// TODO refactoring point
export const removeItemCommand = {
  execute: async (
    context: Context,
    { currentCart, product },
  ) => {
    Logger.debug('[Magento]: Remove item from cart', {
      product,
      currentCart,
    });

    const item = currentCart.items.find((cartItem) => cartItem.uid === product.uid);

    if (!item) {
      return;
    }

    const removeItemParams: RemoveItemFromCartInput = {
      cart_id: currentCart.id,
      cart_item_uid: item.uid,
    };

    const { data } = await context.$magento.api.removeItemFromCart(removeItemParams);

    Logger.debug('[Result]:', { data });

    // eslint-disable-next-line consistent-return
    return data
      .removeItemFromCart
      .cart as unknown as Cart;
  },
};
