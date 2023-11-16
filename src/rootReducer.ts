import { combineReducers } from 'redux'

import { walletReducer } from './_reducers/wallet.reducer'
import { authReducer } from './_reducers/auth.reducer'
import { votesReducer } from './_reducers/votes.reducers'

export const rootReducer = combineReducers({
  // Define a top-level state field named `todos`, handled by `todosReducer`
  walletReducer,
  authReducer,
  votesReducer, 
})

export type RootState = ReturnType<typeof rootReducer>