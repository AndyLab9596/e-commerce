import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import userApi from 'api/userApi';

export const register = createAsyncThunk(
    'user/register',
    async (payload, thunkAPI) => {
        // call API to register
        const data = await userApi.register(payload)

        // save data to local storage
        localStorage.setItem('accessToken', data.jwt);
        localStorage.setItem('user', JSON.stringify(data.user))

        return data.user;
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState: {
        current: {},
        settings: {},
    },
    // reducers này để tạp synchronous action
    reducers: {},
    // reducers for async
    extraReducers: {
        [register.fulfilled]: (state, action) => {
            state.current = action.payload
        }
    }
})

const { reducer } = userSlice;
export default reducer;