import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth/authSlice'
import productReducer from './product/productSlice'
import shopReducer from './shop/shopSlice'
import wishlistReducer from './wishlist/wishlistSlice'
import cartReducer from './cart/cartSlice'
import checkoutReducer from './checkout/checkoutSlice'
import orderReducer from './order/orderSlice'
import contactReducer from './contact/contactSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productReducer,
        shop: shopReducer,
        wishlist: wishlistReducer,
        cart: cartReducer,
        checkout: checkoutReducer,
        order: orderReducer,
        contact: contactReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch