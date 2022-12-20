import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  confirmModal: {
    isVisible: false,
    title: "",
    message: ""
  }
}

const modalSlice = createSlice({
  name: 'loginPage',
  initialState,
  reducers: {
      openConfirmModal: (state, {payload}) => {
        state.confirmModal =  {
          ...payload,
          isVisible: true
        };
      },
      closeConfirmModal: (state) => {
        state.confirmModal =  {
          ...state.confirmModal,
          isVisible: false
        }
      }
  }
});

export const { openConfirmModal, closeConfirmModal } = modalSlice.actions;

export default modalSlice.reducer;

