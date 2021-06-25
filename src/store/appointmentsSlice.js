import axios from 'axios'
import { createSlice } from '@reduxjs/toolkit'

import { getDatewiseAppointments } from '../helpers/dataTransfomer'

const axiosClient = axios.create({
  baseURL: process.env['REACT_APP_API_BASE_URL'],
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

const initialState = {
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
  },
})

const appointmentActions = appointmentsSlice.actions

const getAppointments = () => async (dispatch, getState) => {
  const searchParams = getState().search

  let endpoint = `/v2/appointment/sessions/public/calendarBy${searchParams.type}`

  if (searchParams.type === 'District') {
    endpoint += `?district_id=${searchParams.district.district_id}`
  }
  if (searchParams.type === 'Pin') {
    endpoint += `?pincode=${searchParams.pincode}`
  }

  endpoint += `&date=${searchParams.date.split('-').reverse().join('-')}`

  dispatch(appointmentActions.fetchingStart())
  let centers
  try {
    const { data } = await axiosClient.get(endpoint)
    centers = data.centers
  } catch (error) {
    console.log(error)
  }

  const datewiseAppointments = getDatewiseAppointments(centers)
  dispatch(
    appointmentActions.setAppointments({ appointments: datewiseAppointments })
  )
  dispatch(appointmentActions.fetchingStop())
}

export const reducer = appointmentsSlice.reducer
export const actions = { ...appointmentActions, getAppointments }
