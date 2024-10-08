import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItemsProps, GuestCartType, ResponseCartType } from '../../utils/types';
import { RootState } from '../store';
import { addToCart, getCart, removeFromCart, removeWholeCart, updateCart } from './cartApi';

const initialState = {
    status: 'idle' as 'loading' | 'idle',
    cart: null as CartItemsProps | null,
    cartTotal: 0 as number,
    guestCart: [] as GuestCartType[],
    guestCartTotal: 0 as number
}

export const addToCartAsync = createAsyncThunk(
    'cart/add',
    async (data: object, { rejectWithValue }) => {

        try {
            const response = await addToCart(data)
            return response
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }

)

export const getCartAsync = createAsyncThunk(
    'cart/get',
    async () => {
        const response = await getCart()
        return response.data
    }
)

export const updateCartAsync = createAsyncThunk(
    'cart/update',
    async (data: any) => {
        const response = await updateCart(data)
        return response.data
    }
)

export const removeFromCartAsync = createAsyncThunk(
    'cart/remove',
    async (id: string) => {
        const response = await removeFromCart(id)
        return response
    }
)

export const removeWholeCartAsync = createAsyncThunk(
    'cart/delete',
    async () => {
        const response = await removeWholeCart()
        return response
    }
)


const cartSlice = createSlice({
    name: "Cart",
    initialState,
    reducers: {

        guestAddToCart: (state, action) => {

            const { product, quantity } = action.payload;

            const isProductExist = state.guestCart.find((i) => i.product._id === product._id);

            if (isProductExist) {
                state.guestCart = state.guestCart.map((item) =>
                    item.product._id === product._id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                state.guestCart = [...state.guestCart, { product, quantity }];
            }

            const total = state.guestCart.reduce((t, i) => {
                return t = t + (i.product.price * i.quantity)
            }, 0)


            state.guestCartTotal = total

        },
        guestRemoveFromCart: (state, action) => {
            const productId = action.payload;

            const productIndex = state.guestCart.findIndex((item) => item.product._id === productId);

            if (productIndex !== -1) {
                state.guestCart.splice(productIndex, 1);
            }

            const total = state.guestCart.reduce((t, i) => {
                return t = t + (i.product.price * i.quantity)
            }, 0)

            state.guestCartTotal = total

        },
        guestUpdateCart: (state, action) => {
            const { productId, quantity } = action.payload; 


            const productIndex = state.guestCart.findIndex((item) => item.product._id === productId);

            if (productIndex !== -1) {
                state.guestCart[productIndex].quantity = quantity; 
            }

            const total = state.guestCart.reduce((t, i) => {
                return t = t + (i.product.price * i.quantity)
            }, 0)

            state.guestCartTotal = total
        },

        removeWholeGuestCart: (state) => {
            state.guestCart = [] 
            state.guestCartTotal = 0
        }


    },
    extraReducers(builder) {
        builder
            .addCase(addToCartAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(addToCartAsync.fulfilled, (state, action) => {
                state.status = 'idle'
            })
            .addCase(getCartAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getCartAsync.fulfilled, (state, action: PayloadAction<ResponseCartType>) => {
                state.status = 'idle'
                state.cartTotal = action.payload.cartTotal
                state.cart = action.payload.cartItems
            })
            .addCase(removeFromCartAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(removeFromCartAsync.fulfilled, (state, action) => {
                state.status = 'idle'
            })
            .addCase(updateCartAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(updateCartAsync.fulfilled, (state, action) => {
                state.status = 'idle'
            })
            .addCase(removeWholeCartAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(removeWholeCartAsync.fulfilled, (state, action) => {
                state.status = 'idle'
            })
    },
});


export const { guestAddToCart, guestRemoveFromCart,guestUpdateCart,removeWholeGuestCart } = cartSlice.actions

export const selectGuestCart = (state: RootState) => state.cart.guestCart
export const selectGuestCartTotal = (state: RootState) => state.cart.guestCartTotal
export const selectCart = (state: RootState) => state.cart.cart
export const selectCartTotal = (state: RootState) => state.cart.cartTotal
export const selectCartStatus = (state: RootState) => state.cart.status

export default cartSlice.reducer