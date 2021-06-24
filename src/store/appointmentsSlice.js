import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  searchParams: {
    type: '',
    key: '',
    date: null,
  },
  loading: false,
  error: null,
  appointments: [],
}

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    fetchingStart: state => {
      state.loading = true
    },
    fetchingStop: state => {
      state.loading = false
    },
    setAppointments: (state, action) => {
      state.appointments = action.payload.appointments
    },
    setSearchParams: (state, action) => {
      const { type, key, date } = action.payload
      state.searchParams.type = type
      state.searchParams.date = date
      state.searchParams.key = key
    },
  },
})

export const { actions, reducer } = appointmentsSlice
