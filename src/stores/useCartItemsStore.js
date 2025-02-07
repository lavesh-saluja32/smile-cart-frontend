import { isNotEmpty } from "neetocist";
import { assoc, dissoc, evolve } from "ramda";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartItemsStore = create(
  persist(
    set => ({
      cartItems: {},
      setSelectedQuantity: (slug, quantity) =>
        set(({ cartItems }) => {
          if (quantity <= 0 && isNotEmpty(quantity)) {
            return { cartItems: dissoc(slug, cartItems) };
          }
          console.log(assoc(slug, quantity, cartItems));

          return { cartItems: assoc(slug, quantity, cartItems) };
        }),
      removeCartItem: slug => set(evolve({ cartItems: dissoc(slug) })),
      clearCart: () => set({ cartItems: {} }),
    }),
    { name: "cart-items-store" }
  )
);

export default useCartItemsStore;
