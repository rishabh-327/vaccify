import { configureStore } from '@reduxjs/toolkit'

import { reducer as metaReducer } from './metaSlice'
import { reducer as searchReducer } from './searchSlice'
import { reducer as appointmentsReducer } from './appointmentsSlice'

const store = configureStore({
  reducer: {
    meta: metaReducer,
    search: searchReducer,
    appointments: appointmentsReducer,
  },
})

export default store
