import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../../network/request";

//TODO: 디테일 페이지 상품 정보 get.
export const getdetail = createAsyncThunk(
    "GET_DETAIL_PRODUCT",
    async (product_id, thunkAPI) => {
        console.log("ddd");
        try {
            const res = await instance.get(`api/main/products/${product_id}`);
            // const res = await instance.get(`/detail`);
            // console.log("slice", res.data);
            return thunkAPI.fulfillWithValue(res.data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

//TODO: 상품정보 post.
export const postdetail = createAsyncThunk(
    "POST_DETAIL_PRODUCT",
    async (payload, thunkAPI) => {
        try {
            const res = await instance.get(`/api/auth/main/products/cart`);
            // const res = await instance.post(`/cart`, payload);
            // console.log("slice", res.data);
            return thunkAPI.fulfillWithValue(res.data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

const detailSlice = createSlice({
    name: "detail",
    initialState: { detail: [] },
    reducers: {},
    extraReducers: {
        //TODO: 디테일 페이지 상품 정보 get.
        [getdetail.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.detail = action.payload.data;
            // console.log(action.payload.data);
        },

        //TODO: addTravelCard Thunk
        [postdetail.fulfilled]: (state, action) => {
            state.success = false;
            state.cart.push(action.payload);
            console.log(action);
        },
    },
});

export default detailSlice.reducer;