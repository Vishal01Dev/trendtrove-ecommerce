import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createOrder, getOrderDetails, getUserOrders } from './orderApi';
import { OrderObjType, OrderType, UserOrdersType } from '../../utils/types';
import { RootState } from '../store';

const initialState = {
    status: 'idle' as 'loading' | 'idle',
    order: null as OrderType | null,
    userOrders: null as UserOrdersType[] | null,
    orderDetails: null as OrderObjType | null
}

export const createOrderAsync = createAsyncThunk(
    'order/create',
    async (data: any) => {
        const response = await createOrder(data)
        return response.data
    }
)

export const getUserOrdersAsync = createAsyncThunk(
    'order/user-orders',
    async () => {
        const response = await getUserOrders()
        return response.data
    }
)

export const getOrderDetailsAsync = createAsyncThunk(
    'order/order-details',
    async (id:string) => {
        const response = await getOrderDetails(id)
        return response.data
    }
)

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(createOrderAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(createOrderAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                state.order = action.payload
            })
            .addCase(getUserOrdersAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getUserOrdersAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                state.userOrders = action.payload
            })
            .addCase(getOrderDetailsAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getOrderDetailsAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                state.orderDetails = action.payload
            })
    },
});


export const selectOrder = (state: RootState) => state.order.order
export const selectUserOrders = (state: RootState) => state.order.userOrders
export const selectOrderDetails = (state: RootState) => state.order.orderDetails


export default orderSlice.reducer