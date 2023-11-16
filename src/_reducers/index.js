import { combineReducers } from 'redux';
import { wallet } from './wallet.reducer'
import { auth } from './auth.reducer'
import { votes } from './votes.reducers'

const rootReducer = combineReducers({wallet, auth, votes});

export default rootReducer;