import { createSlice } from '@reduxjs/toolkit';

interface User {
  data: {
    createdAt: string;
    email: string;
    gender: string;
    fcmToken: string | null;
    name: string;
    is_verified: boolean;
    formatted_number: string;
    national_number: string;
    country_code: string;
    id: string;
    token: string;
    profile_image: string;
  } | null;
}

const initialState: User = {
  data: null,
};

export const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setUserData: (state, { payload }) => {
      state.data = payload;
    },
  },
});
export const { setUserData } = generalSlice.actions;
export default generalSlice.reducer;
