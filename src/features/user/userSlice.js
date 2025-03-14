import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAddress } from "../../services/apiGeocoding";

const initialState = {
  username: "",
  address: "",
  error: "",
  isloading: false,
  position: {},
};

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

//thunk function

export const fetchAddress = createAsyncThunk("user/fetchGeoloactaion", async () => {
  // 1) We get the user's geolocation position
  const positionObj = await getPosition();
  const position = {
    latitude: positionObj.coords.latitude,
    longitude: positionObj.coords.longitude,
  };

  // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
  const addressObj = await getAddress(position);
  const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

  // 3) Then we return an object with the data that we are interested in
  return { position, address };
});

/*
users/fetchUser/pending: Dispatched immediately.

users/fetchUser/fulfilled: Dispatched if the API call succeeds.

users/fetchUser/rejected: Dispatched if the API call fails.
*/

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser(state, action) {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.isloading = true;
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.isloading = false;
        state.address = action.payload.address;
        state.position = action.payload.position;
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.isloading = false;
        state.error = action.error.message;
      });
  },
});

export const { updateUser  } = userSlice.actions;

export default userSlice.reducer;
