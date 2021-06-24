import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  states: [],
  districts: [],
  selectedState: '',
}

const metaSlice = createSlice({
  name: 'meta',
  initialState,
  reducers: {
    setStates: (state, action) => {
      state.states = action.payload.states
    },
    setDistricts: (state, action) => {
      state.districts = action.payload.districts
    },
  },
})

export const { reducer, actions } = metaSlice
