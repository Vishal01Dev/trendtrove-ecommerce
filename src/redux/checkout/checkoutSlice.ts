import { createSlice } from '@reduxjs/toolkit'
import { CheckoutDetailsType } from '../../utils/types';
import { RootState } from '../store';


const initialState = {
    checkOutDetails: null as CheckoutDetailsType | null,
    status: 'idle' as 'idle' | 'loading'
}


const checkoutSlice = createSlice({
    name: "checkout",
    initialState,
    reducers: {
        setCheckoutDetails: (state, action) => {
            state.checkOutDetails = action.payload
        }
    }
});



export const { setCheckoutDetails } = checkoutSlice.actions

export const selectCheckoutDetails = (state: RootState) => state.checkout.checkOutDetails

export default checkoutSlice.reducer

