import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import adminAuthServices from "./AdminAuthServices";

const initialState = {
  info: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

//Login
export const adminLogin = createAsyncThunk(
  "auth/admin/login",
  async (userData, thunkAPI) => {
    try {
      return await adminAuthServices.adminLogin(userData);
    } catch (error) {
      const message = error.response.data;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Register
export const adminRegister = createAsyncThunk(
  "auth/admin/register",
  async (adminData, thunkAPI) => {
    try {
      return await adminAuthServices.adminRegister(adminData);
    } catch (error) {
      const message = error.response.data;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Get Admin
export const getAdmin = createAsyncThunk(
  "auth/admin/getAdmin",
  async (adminData, thunkAPI) => {
    try {
      return await adminAuthServices.getAdmin(adminData);
    } catch (error) {
      const message = error.response.data;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Logout
export const adminLogout = createAsyncThunk("auth/admin/logout", async () => {
  adminAuthServices.adminLogout();
});

export const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    resetAdminAuthStatus: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "";
        state.info = action.payload;
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
        state.info = null;
      })
      .addCase(adminRegister.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(adminRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "";
        state.info = action.payload;
      })
      .addCase(adminRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
        state.info = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.info = null;
      })
      .addCase(getAdmin.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(getAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "";
        state.info = {
          ...state.info,
          email: action.payload.email,
          role: action.payload.role,
        };
      })
      .addCase(getAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
        state.info = null;
      });
  },
});

export const { resetAdminAuthStatus } = authSlice.actions;

export default adminAuthSlice.reducer;