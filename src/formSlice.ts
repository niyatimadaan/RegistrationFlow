import { AnyAction } from "@reduxjs/toolkit";

export const SUBMIT_FIRST_FORM = 'SUBMIT_FIRST_FORM';
export const SUBMIT_SECOND_FORM = 'SUBMIT_SECOND_FORM';

// Action Creators
export const submitFirstForm = (data: any) => ({
  type: SUBMIT_FIRST_FORM,
  payload: data,
});

export const submitSecondForm = (data: any) => ({
  type: SUBMIT_SECOND_FORM,
  payload: data,
});

interface State {
  firstFormData: any;
  secondFormData: any;
}

const initialState: State = {
  firstFormData: {},
  secondFormData: {},
};

// Reducer
export default function(state: State | undefined, action: AnyAction): State {
  if (!state) {
    return initialState;
  }
  switch (action.type) {
    case SUBMIT_FIRST_FORM:
      return {
        ...state,
        firstFormData: action.payload,
      };
    case SUBMIT_SECOND_FORM:
      return {
        ...state,
        secondFormData: action.payload,
      };
    default:
      return state;
  }
}
