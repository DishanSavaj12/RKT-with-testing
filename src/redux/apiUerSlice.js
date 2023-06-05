import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isError: false,
  users: null,
  createUser: null,
  updateUser: null,
  deleteUser: null,
  getUser: null,
}

export const fetchUserData = createAsyncThunk('fetchUserData',
  async () => {
    const response = await fetch('http://localhost:4000/v1/api/list');
    const jsonData = response.json();
    return jsonData;
  }
)

export const createUserData = createAsyncThunk('createUserData',
  async (user) => {
    const response = await fetch('http://localhost:4000/v1/api/add',
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          user
        )
      }
    );
    const jsonData = response.json();
    return jsonData;
  }
)

export const updetUserData = createAsyncThunk('updetUserData',
  async (user) => {
    const response = await fetch(`http://localhost:4000/v1/api/edit/${user._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          user
        )
      }
    );
    const jsonData = response.json();
    return jsonData;
  }
)

export const getUserData = createAsyncThunk('getUserData',
  async (user) => {
    const response = await fetch(`http://localhost:4000/v1/api/get/${user._id}`);
    const jsonData = response.json();
    return jsonData;
  }
)

export const deleteUserData = createAsyncThunk('deleteUserData',
  async (id) => {
    const response = await fetch(`http://localhost:4000/v1/api/delete/${id}`,
      {
        method: "DELETE",
      }
    );
    const jsonData = response.json();
    return jsonData;
  }
)

const UsersSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: {
    [fetchUserData.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchUserData.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.users = action.payload;
    },
    [fetchUserData.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
    },

    [createUserData.pending]: (state) => {
      state.isLoading = true;
    },
    [createUserData.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.createUser = action.payload;
    },
    [createUserData.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
    },

    [updetUserData.pending]: (state) => {
      state.isLoading = true;
    },
    [updetUserData.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.updateUser = action.payload;
    },
    [updetUserData.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
    },

    [getUserData.pending]: (state) => {
      state.isLoading = true;
    },
    [getUserData.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.getUser = action.payload;
    },
    [getUserData.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
    },

    [deleteUserData.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteUserData.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.deleteUser = action.payload;
    },
    [deleteUserData.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
  }
});

export default UsersSlice.reducer;