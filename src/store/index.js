import { configureStore } from '@reduxjs/toolkit'

import { reducer as metaReducer } from './metaSlice'
import { reducer as appointmentsReducer } from './appointmentsSlice'

const store = configureStore({
  reducer: {
    meta: metaReducer,
    appointments: appointmentsReducer,
  },
})

export default store
