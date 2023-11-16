import { useState, useRef } from 'react';
import { loadStdlib } from '@reach-sh/stdlib';
import { ALGO_MyAlgoConnect as MyAlgoConnect } from '@reach-sh/stdlib';
import ConnectWalletButton from './ConnectButton/ConnectWalletBtn';
import { useDispatch } from 'react-redux';
import { wallet } from '../../_constants';

const reach = loadStdlib('ALGO');

reach.setWalletFallback(
  reach.walletFallback({
    providerEnv: 'MainNet',
    MyAlgoConnect,
  })
);

const MyAlgoWallet = (props) => {
  const account = useRef();
  const balance = useRef();

  const dispatch = useDispatch();

  const [accountBal, setAccountBal] = useState(0);
  const [accountAddress, setAccountAddress] = useState('');

  const connectWallet = async () => {
    try {
      await getAccount();
      await getBalance();
    } catch (err) {
      console.log(err);
    }
  };

  const getAccount = async () => {
    try {
      account.current = await reach.getDefaultAccount();
      setAccountAddress(account.current.networkAccount.addr);
      dispatch({ type: wallet.SET_WALLET_ADDRESS, payload: account.current.networkAccount.addr });
    } catch (err) {
      console.log(err);
    }
  };

  const getBalance = async () => {
    try {
      let rawBalance = await reach.balanceOf(account.current);
      balance.current = reach.formatCurrency(rawBalance, 4);
      setAccountBal(balance.current);
      dispatch({ type: wallet.SET_WALLET_BALANCE, payload: balance.current });
    } catch (err) {
      console.log(err);
    }
  };

  return <ConnectWalletButton {...props} accountAddress={accountAddress} connectWallet={connectWallet} accountBal={accountBal} />;
};

export default MyAlgoWallet;
