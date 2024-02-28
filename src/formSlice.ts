import { AnyAction, PayloadAction, createSlice } from "@reduxjs/toolkit";

export const SUBMIT_FIRST_FORM = 'SUBMIT_FIRST_FORM';
export const SUBMIT_SECOND_FORM = 'SUBMIT_SECOND_FORM';

type userEssentials = {
  name : string,
  age: string,
  sex: string,
  mobile: string,
  idType: string,
  idNumber: string,
}

export type User = userEssentials &{
  address: string,
  state: string,
  city: string,
  country: string,
  pincode: string,
}

interface State {
  users:User[],
  firstFormData: userEssentials;
}

const initialState: State = {
  users:[],
  firstFormData: {
    name: "",
    age: "",
    sex: "",
    mobile: "",
    idType: "",
    idNumber: ""
  },
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
     submitFirstForm: (state: { firstFormData: userEssentials; }, action: PayloadAction<any>) => {
       state.firstFormData = action.payload;
     },
     submitSecondForm: (state: { firstFormData: userEssentials; users: any; }, action: PayloadAction<any>) => {
      const newUser: User = {
        ...state.firstFormData,
        ...action.payload,
      };
      state.users.push(newUser);
     },
  },
 });
 export const { submitFirstForm, submitSecondForm } = formSlice.actions;

 export default formSlice.reducer;