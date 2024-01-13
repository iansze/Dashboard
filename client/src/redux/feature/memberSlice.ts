import { createSlice } from "@reduxjs/toolkit";
import { MemberState } from "../../types/type";

const initialState: MemberState = {
  currentMember: null,
};

const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    setCurrentMember: (state, action) => {
      state.currentMember = action.payload;
    },
  },
});

export const { setCurrentMember } = memberSlice.actions;

export default memberSlice.reducer;
