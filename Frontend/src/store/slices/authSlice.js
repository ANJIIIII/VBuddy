import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
  isAuthenticated: localStorage.getItem("authtoken") !== null,
};

export const login = createAsyncThunk("/auth/login", async (formData) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );

  const data = await response.json();
  if (data.success) {
    localStorage.setItem("authtoken", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
  }
  return data;
});

export const signup = createAsyncThunk("/auth/signup", async (formData) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/signup`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );

  const data = await response.json();
  // if (data.success) {
  //   localStorage.setItem("authtoken", data.token);
  // }
  return data;
});

export const logout = createAsyncThunk("/auth/logout", async () => {
  localStorage.removeItem("authtoken");
  localStorage.removeItem("user");
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = action?.payload?.success || false;
        state.user = action?.payload?.success ? action?.payload?.user : null;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;

      })
      .addCase(signup.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.isLoading = false;
      });
  },
});

export default authSlice.reducer;