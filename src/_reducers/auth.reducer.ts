import { auth } from '../_constants';

type Auth = {
    user_id: string;
    is_authenticated: boolean
  };

const defaultAuth: Auth = {
    user_id: " ",
    is_authenticated: false
};


const setAuthUserId = (payload: string) => {
    return { type: auth.SET_USER_ID, payload: payload };
}

const setAuthIsAutheticated = (payload: string) => {
    return { type: auth.SET_IS_AUTHENTICATED, payload: payload };
}

type Actions = ReturnType<typeof setAuthUserId | typeof setAuthIsAutheticated>;

export function authReducer(state = defaultAuth, action: Actions) {
  switch (action.type) {
    case auth.SET_USER_ID:
      return {
        ...state,
        user_id: action.payload
      };
    case auth.SET_IS_AUTHENTICATED:
      return {
        ...state,
        is_authenticated: action.payload
      };      
    default:
      return state
  }
}