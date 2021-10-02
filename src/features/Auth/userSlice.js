import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import userApi from 'api/userApi';
import StorageKeys from 'constants/storage-keys';

export const register = createAsyncThunk(
    'user/register',
    async (payload, thunkAPI) => {
        // call API to register
        const data = await userApi.register(payload)

        // save data to local storage
        localStorage.setItem(StorageKeys.TOKEN, data.jwt);
        localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user))

        return data.user;
    }
)

export const login = createAsyncThunk(
    'user/login',
    async (payload, thunkAPI) => {
        // call API to register
        const data = await userApi.login(payload)

        // save data to local storage
        localStorage.setItem(StorageKeys.TOKEN, data.jwt);
        localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user))

        return data.user;
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState: {
        current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},
        settings: {},
    },
    // reducers này để tạp synchronous action
    reducers: {
        logout(state, action) {
            localStorage.removeItem(StorageKeys.TOKEN);
            localStorage.removeItem(StorageKeys.USER);
            state.current = {};
        }
    },
    // reducers for async
    extraReducers: {
        [register.fulfilled]: (state, action) => {
            state.current = action.payload
        },
        [login.fulfilled]: (state, action) => {
            state.current = action.payload
        }
    }
})

const { reducer, actions } = userSlice;
export const { logout } = actions;
export default reducer;