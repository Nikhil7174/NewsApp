// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// export type State = {
//   countryCode: string;
// };

// export type Action =
//   | {
//       type: "COUNTRY_CODE";
//       payload: string;
//     }

//     // function increment(countryCode: string) {
//     //     return {
//     //         type: "COUNTRY_CODE",
//     //         payload: string;
//     //     }
//     //   }
      

// const initialState: State = {
//   countryCode: "in",
// };

// // export const login = async (dispatch: Dispatch, user: any) => {
// //     dispatch(loginStart());
// //     try {
// //       console.log(user)
// //       const res = await publicRequest.post('/auth/login', user);
// //       dispatch(loginSuccess(res.data));
// //     } catch (err) {
// //       dispatch(loginFailure());
// //     }
// //   };

// const reducer = (state: State = initialState, action: Action) => {
//   switch (action.type) {
//     // case "FETCH_REQUEST":
//     //   return { ...state, loading: true };
//     case "COUNTRY_CODE":
//       return { countryCode: action.payload};
//     // case "FETCH_FAIL":
//     //   return { ...state, loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };

// const cartSlice = createSlice({
//     name: "cart",
//     initialState:"in",
//     reducers: {
//       changeCC: (state, action) => {
//         state.countryCode = action.payload;
//       },
//     }
// })

// export const {changeCC} = cartSlice.actions;

// export default reducer;

import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: "cart",
  initialState: { countryCode: "us" }, // Set the initial country code
  reducers: {
    setCCode: (state, action) => {
      // Assuming action.payload is a string representing a country code
      state.countryCode = action.payload;
    },
  },
});

export const { setCCode } = cartSlice.actions;
export default cartSlice.reducer;