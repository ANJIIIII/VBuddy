import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {logout} from "./authSlice"

const initialState = {
  addVisitLoading: false,
};

export const addVisit = createAsyncThunk(
  "/visit/addvisit",
  async (formData,{dispatch}) => {
    const token = localStorage.getItem("authtoken");
    const response = await fetch(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/v1/visit/addvisit`,
      {
        method: "POST",
        headers: {
          "Authorization": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (response.status === 401) {
      dispatch(logout());
    }

    const data = await response.json();
    return data;
  }
);

const visitSlice = createSlice({
  name: "visit",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(addVisit.pending, (state) => {
        state.addVisitLoading = true;
      })
      .addCase(addVisit.fulfilled, (state) => {
        state.addVisitLoading = false;
      })
      .addCase(addVisit.rejected, (state) => {
        state.addVisitLoading = false;
      });
  },
});

export default visitSlice.reducer;
