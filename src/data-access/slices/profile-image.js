import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  photo: null,
};

const profileImageSlice = createSlice({
  name: "profile-photo",
  initialState,
  reducers: {
    setProfileImage(state, action) {
      state.photo = action.payload;
    },
    resetProfileImage(state) {
      state.photo = null;
    },
  },
});

export const { setProfileImage, resetProfileImage } = profileImageSlice.actions;

export const profileImage = profileImageSlice.reducer;

export const selectImage = (state) => state.profileImage.photo;
