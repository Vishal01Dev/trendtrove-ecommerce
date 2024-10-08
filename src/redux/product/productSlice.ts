import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProductType, ResponseProductType } from '../../utils/types';
import { getAllProducts } from './productApi';
import { RootState } from '../store';

const initialState = {
    status: 'idle' as 'idle' | 'loading',
    products: null as ProductType[] | null
}

export const getAllProductsAsync = createAsyncThunk(
    'products/all',
    async () => {
        const response = await getAllProducts()
        return response.data
    }
)

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getAllProductsAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getAllProductsAsync.fulfilled, (state, action: PayloadAction<ResponseProductType>) => {
                state.status = 'idle'
                state.products = action.payload.products
            })
    },
});

export const selectAllProducts = (state: RootState) => state.products.products
export const selectProductStatus = (state: RootState) => state.products.status

export default productSlice.reducer