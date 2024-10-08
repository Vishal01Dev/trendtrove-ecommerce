import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FiltersType, ProductType, ResponsefiltersType, ResponseProductType } from '../../utils/types';
import { filterOptions, filterProducts } from './shopApi';
import { RootState } from '../store';

type Filters = {
    [key: string]: string[] | number | string;
};

const initialState = {
    filters: null as FiltersType | null,
    filteredProducts: null as ProductType[] | null,
    status: 'idle' as 'idle' | 'loading',
    totalProducts: 0 as number
}

export const filterOptionsAsync = createAsyncThunk(
    'shop/filters',
    async () => {
        const response = await filterOptions()
        return response.data
    }
)

export const filteredProductsAsync = createAsyncThunk(
    'shop/filterProducts',
    async (data: Filters) => {
        const response = await filterProducts(data)
        return response.data
    }
)

const shopSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(filterOptionsAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(filterOptionsAsync.fulfilled, (state, action: PayloadAction<ResponsefiltersType>) => {
                state.status = 'idle'
                const filters = action.payload

                const categoryOptions = filters.categories.map((category => {
                    return {
                        id: category.name,
                        name: category.name,
                        options: category.subcategories.map((subcategory => {
                            return {
                                value: subcategory._id,
                                label: subcategory.name,
                                checked: false
                            }
                        }))
                    }
                }))


                const sizeOptions = [{
                    id: "size",
                    name: "Size",
                    options: filters.sizes.map((size) => {
                        return { value: size, label: size, checked: false }
                    })
                }]

                const colorOptions = [{
                    id: "color",
                    name: "Color",
                    options: filters.colors.map((color) => {
                        return { value: color, label: color, checked: false }
                    })
                }]


                const mainFilters = {
                    categoryOptions, sizeOptions, colorOptions
                }

                state.filters = mainFilters
            })
            .addCase(filteredProductsAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(filteredProductsAsync.fulfilled, (state, action: PayloadAction<ResponseProductType>) => {
                state.status = 'idle'
                state.filteredProducts = action.payload.products
                state.totalProducts = action.payload.totalProducts
            })
    }
});

export const selectFilters = (state: RootState) => state.shop.filters
export const selectFilteredProducts = (state: RootState) => state.shop.filteredProducts
export const selectTotalProductsCount = (state: RootState) => state.shop.totalProducts
export const selectShopStatus = (state: RootState) => state.shop.status

export default shopSlice.reducer