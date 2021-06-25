import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  type: '',
  date: '',
  pincode: '',
  district: {
    state_id: '',
    district_id: '',
  },
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    saveDistrictInputs: (state, action) => {
      const { date, state_id, district_id } = action.payload
      state.type = 'District'
      state.date = date
      state.district = {
        state_id,
        district_id,
      }
    },
    savePincodeInputs: (state, action) => {
      const { date, pincode } = action.payload
      state.type = 'Pin'
      state.date = date
      state.pincode = pincode
    },
  },
})

export const { actions, reducer } = searchSlice
