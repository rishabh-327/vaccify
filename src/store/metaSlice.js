import axios from 'axios'
import { createSlice } from '@reduxjs/toolkit'

const axiosClient = axios.create({
  baseURL: process.env['REACT_APP_API_BASE_URL'],
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

const initialState = {
  states: [],
  districts: [],
  selectedState: '',
}

const metaSlice = createSlice({
  name: 'meta',
  initialState,
  reducers: {
    setSelectedState: (state, action) => {
      state.selectedState = action.payload.selectedState
    },
    setStates: (state, action) => {
      state.states = action.payload.states
    },
    setDistricts: (state, action) => {
      state.districts = action.payload.districts
    },
  },
})

let metaActions = metaSlice.actions

const getDistrictList = stateId => async (dispatch, getState) => {
  const { selectedState } = getState().meta
  if (selectedState === stateId) return

  dispatch(metaActions.setSelectedState({ selectedState: stateId }))

  try {
    const { data } = await axiosClient.get(
      `/v2/admin/location/districts/${stateId}`
    )
    dispatch(metaActions.setDistricts({ districts: data.districts }))
  } catch (error) {
    console.log(error)
  }
}

metaActions = {
  ...metaSlice.actions,
  getDistrictList,
}

export const reducer = metaSlice.reducer
export const actions = { ...metaActions, getDistrictList }
