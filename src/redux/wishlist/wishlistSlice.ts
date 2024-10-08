import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { addTowishlist, getWishlist, removeFromWishlist } from './wishlistApi';
import { responseType, WishlistType } from '../../utils/types';
import { RootState } from '../store';

const initialState = {
    status: 'idle' as 'idle' | 'loading',
    wishlist: null as WishlistType | null,
}

export const addTowishlistAsync = createAsyncThunk(
    '/wishlist/add',
    async (productId: string) => {
        const response = await addTowishlist(productId)
        return response
    }
)

export const getWishlistAsync = createAsyncThunk(
    'wishlist/all',
    async () => {
        const response = await getWishlist()
        return response.data
    }
)

export const removeFromWishlistAsync = createAsyncThunk(
    'wishlist/remove',
    async (data:string) => {
        const response = await removeFromWishlist(data)
        return response
    }
)

const wishlistSlice = createSlice({
    name: "Wishlist",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(addTowishlistAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(addTowishlistAsync.fulfilled, (state, action: PayloadAction) => {
                state.status = 'idle'
            })
            .addCase(getWishlistAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getWishlistAsync.fulfilled, (state, action: PayloadAction<WishlistType>) => {
                state.status = 'idle'
                state.wishlist = action.payload
            })
            .addCase(removeFromWishlistAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(removeFromWishlistAsync.fulfilled, (state, action: PayloadAction<responseType>) => {
                state.status = 'idle'
                state.wishlist = action.payload.data
            })
    },
});


export const selectWishlist = (state: RootState) => state.wishlist.wishlist



export default wishlistSlice.reducer