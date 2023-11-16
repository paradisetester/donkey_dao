import { wallet } from '../_constants';

type Wallet = {
    address: string;
    balance: number;
    hoc_update_version: number;
  };

const defaultWallet: Wallet = {
    address: "",
    balance: 0,
    hoc_update_version: 0
};  

const setWalletAddress = (payload: string) => {
    return { type: wallet.SET_WALLET_ADDRESS, payload: payload };
}

const setWalletBalance = (payload: string) => {
    return { type: wallet.SET_WALLET_BALANCE, payload: payload };
}

const setHocUpdate = (payload: string) => {
  return { type: wallet.SET_HOC_UPDATE_VERSION, payload: payload };
}

type Actions = ReturnType<typeof setWalletAddress | typeof setWalletBalance | typeof setHocUpdate>;

export function walletReducer(state = defaultWallet, action: Actions) {
  switch (action.type) {
    case wallet.SET_WALLET_ADDRESS:
      return {
        ...state,
        address: action.payload
      };
    case wallet.SET_WALLET_BALANCE:
        return {
          ...state,
          balance: action.payload        
        };
    case wallet.SET_HOC_UPDATE_VERSION:
        return {
          ...state,
          hoc_update_version: action.payload        
        };    
    default:
      return state
  }
}