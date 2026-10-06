import { configureStore, createSlice } from "@reduxjs/toolkit";

const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
const savedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
const savedUser = JSON.parse(localStorage.getItem("user") || "null");

const cartSlice = createSlice({
  name: "cart",
  initialState: savedCart,
  reducers: {
    addToCart(state, action) {
      const item = state.find(x => x.id === action.payload.id);
      if (item) item.quantity += 1;
      else state.push({ ...action.payload, quantity: 1 });
      localStorage.setItem("cart", JSON.stringify(state));
    },
    increment(state, action) {
      const item = state.find(x => x.id === action.payload);
      if (item) item.quantity += 1;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    decrement(state, action) {
      const item = state.find(x => x.id === action.payload);
      if (!item) return;
      item.quantity -= 1;
      if (item.quantity <= 0) {
        const index = state.findIndex(x => x.id === action.payload);
        state.splice(index, 1);
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeFromCart(state, action) {
      const index = state.findIndex(x => x.id === action.payload);
      if (index !== -1) state.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(state));
    },
    clearCart(state) {
      state.splice(0, state.length);
      localStorage.setItem("cart", "[]");
    }
  }
});

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: savedWishlist,
  reducers: {
    toggleWishlist(state, action) {
      const index = state.findIndex(x => x.id === action.payload.id);
      if (index === -1) state.push(action.payload);
      else state.splice(index, 1);
      localStorage.setItem("wishlist", JSON.stringify(state));
    }
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: savedUser,
    isLoggedIn: !!savedUser
  },
  reducers: {
    login(state, action) {
      state.user = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout(state) {
      state.user = null;
      state.isLoggedIn = false;
      localStorage.removeItem("user");
    }
  }
});

export const { addToCart, increment, decrement, removeFromCart, clearCart } = cartSlice.actions;
export const { toggleWishlist } = wishlistSlice.actions;
export const { login, logout } = authSlice.actions;

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    wishlist: wishlistSlice.reducer,
    auth: authSlice.reducer
  }
});
