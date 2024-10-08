import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { responseType, userType } from '../../utils/types';
import { FieldValues } from 'react-hook-form';
import { changePassword, checkAuthentication, checkEmail, checkOtp, forgotPassword, getCurrentUser, registerUser, updateUser, userLogin, userLogout } from './authAPi';
import { RootState } from '../store';

const initialState = {
    isAuthenticated: false as boolean,
    status: 'idle' as 'idle' | 'loading',
    user: null as userType | null,
}


export const registerUserAsync = createAsyncThunk(
    'auth/register',
    async (data: FieldValues, { rejectWithValue }) => {
        try {
            const response = await registerUser(data)
            return response
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const userLogoutAsync = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            const response = await userLogout()
            return response
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)


export const userLoginAsync = createAsyncThunk(
    'auth/login',
    async (data: FieldValues, { rejectWithValue }) => {
        try {
            const response = await userLogin(data)
            return response
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const checkAuthenticationAsync = createAsyncThunk(
    'auth/status',
    async () => {
        const response = await checkAuthentication()
        return response
    }
)

export const getCurrentUserAsync = createAsyncThunk(
    'auth/current-user',
    async () => {
        const response = await getCurrentUser()
        return response.data
    }
)

export const updateUserAsync = createAsyncThunk(
    'auth/update',
    async (data: FieldValues, { rejectWithValue }) => {
        try {
            const response = await updateUser(data)
            return response
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const checkEmailAsync = createAsyncThunk(
    'auth/checkmail',
    async (data: FieldValues, { rejectWithValue }) => {
        try {
            const response = await checkEmail(data)
            return response
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const checkOtpAsync = createAsyncThunk(
    'auth/validateotp',
    async (data: any, { rejectWithValue }) => {
        try {
            const response = await checkOtp(data)
            return response
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const forgotPasswordAsync = createAsyncThunk(
    'auth/updatepassword',
    async (data: FieldValues, { rejectWithValue }) => {
        try {
            const response = await forgotPassword(data)
            return response
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const changePasswordAsync = createAsyncThunk(
    'auth/changepassword',
    async (data: FieldValues, { rejectWithValue }) => {
        try {
            const response = await changePassword(data)
            return response
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)



const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUserAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(registerUserAsync.fulfilled, (state, action: PayloadAction) => {
                state.status = 'idle'
            })
            .addCase(userLoginAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(userLoginAsync.fulfilled, (state, action: PayloadAction<responseType>) => {
                state.status = 'idle'
                state.isAuthenticated = true
                state.user = action.payload.data.user
            })
            .addCase(checkAuthenticationAsync.pending, ((state) => {
                state.status = 'loading'
            }))
            .addCase(checkAuthenticationAsync.fulfilled, (state, action: PayloadAction<boolean>) => {
                state.status = "idle"
                state.isAuthenticated = action.payload
            })
            .addCase(userLogoutAsync.pending, ((state) => {
                state.status = 'loading'
            }))
            .addCase(userLogoutAsync.fulfilled, ((state) => {
                state.status = 'idle'
                state.isAuthenticated = false
                state.user = null
            }))
            .addCase(getCurrentUserAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getCurrentUserAsync.fulfilled, (state, action: PayloadAction<userType>) => {
                state.status = 'idle'
                state.user = action.payload
            })
            .addCase(updateUserAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(updateUserAsync.fulfilled, (state, action: PayloadAction<responseType>) => {
                state.status = 'idle'
                state.user = action.payload.data
            })
            .addCase(checkEmailAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(checkEmailAsync.fulfilled, (state) => {
                state.status = 'idle'
            })
            .addCase(checkOtpAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(checkOtpAsync.fulfilled, (state) => {
                state.status = 'idle'
            })
            .addCase(forgotPasswordAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(forgotPasswordAsync.fulfilled, (state) => {
                state.status = 'idle'
            })
            .addCase(changePasswordAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(changePasswordAsync.fulfilled, (state) => {
                state.status = 'idle'
            })
    }
});

export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated
export const selectUser = (state: RootState) => state.auth.user


export default authSlice.reducer