import { AnyAction, PayloadAction, createSlice } from "@reduxjs/toolkit";

export const SUBMIT_FIRST_FORM = 'SUBMIT_FIRST_FORM';
export const SUBMIT_SECOND_FORM = 'SUBMIT_SECOND_FORM';

interface State {
  firstFormData: any;
  secondFormData: any;
}

const initialState: State = {
  firstFormData: {},
  secondFormData: {},
};

// Reducer
// export default function(state: State | undefined, action: AnyAction): State {
//   if (!state) {
//     return initialState;
//   }
//   switch (action.type) {
//     case SUBMIT_FIRST_FORM:
//       return {
//         ...state,
//         firstFormData: action.payload,
//       };
//     case SUBMIT_SECOND_FORM:
//       return {
//         ...state,
//         secondFormData: action.payload,
//       };
//     default:
//       return state;
//   }
// }

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
     submitFirstForm: (state, action: PayloadAction<any>) => {
       state.firstFormData = action.payload;
     },
     submitSecondForm: (state, action: PayloadAction<any>) => {
       state.secondFormData = action.payload;
     },
  },
 });
 export const { submitFirstForm, submitSecondForm } = formSlice.actions;

 export default formSlice.reducer;