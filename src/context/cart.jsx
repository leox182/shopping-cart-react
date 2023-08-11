import { createContext, useReducer } from "react";

export const CartContext = createContext();

const actionTypes = {
  ADD_TO_CART: "ADD_TO_CART",
  DECREMENT_FROM_CART: "DECREMENT_FROM_CART",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  CLEAR_CART: "CLEAR_CART",
};

const initialState = [];

const reducer = (state, action) => {
  const { type: actionType, payload: actionPayload } = action;
  switch (actionType) {
    case actionTypes.ADD_TO_CART: {
      const { id } = actionPayload;
      const productInCartIndex = state.findIndex((item) => item.id === id);

      if (productInCartIndex >= 0) {
        const newState = structuredClone(state);
        newState[productInCartIndex].quantity += 1;
        return newState;
      }

      return [
        ...state,
        {
          ...actionPayload,
          quantity: 1,
        },
      ];
    }

    case actionTypes.DECREMENT_FROM_CART: {
      const { id } = actionPayload;
      const productInCartIndex = state.findIndex((item) => item.id === id);

      if (productInCartIndex >= 0) {
        const newState = structuredClone(state);
        if (newState[productInCartIndex].quantity > 1) {
          newState[productInCartIndex].quantity -= 1;
          return newState;
        }
      }
      
      return state.filter((item) => item.id !== id);
    }

    case actionTypes.REMOVE_FROM_CART: {
      const { id } = actionPayload;
      return state.filter((item) => item.id !== id);
    }

    case actionTypes.CLEAR_CART: {
      return initialState;
    }
  }
};

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (product) =>
    dispatch({
      type: actionTypes.ADD_TO_CART,
      payload: product,
    });

  const decrementFromCart = (product) =>
    dispatch({
      type: actionTypes.DECREMENT_FROM_CART,
      payload: product,
    });

  const removeFromCart = (product) =>
    dispatch({
      type: actionTypes.REMOVE_FROM_CART,
      payload: product,
    });

  const clearCart = () =>
    dispatch({
      type: actionTypes.CLEAR_CART,
    });

  return (
    <CartContext.Provider
      value={{
        cart: state,
        addToCart,
        decrementFromCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
