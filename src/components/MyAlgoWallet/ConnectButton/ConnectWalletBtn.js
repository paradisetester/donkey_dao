import React from 'react'
import { loadStdlib } from '@reach-sh/stdlib';
import { ALGO_MyAlgoConnect as MyAlgoConnect } from '@reach-sh/stdlib';
import ConnectButton from '.';

const reach = loadStdlib("ALGO")
reach.setWalletFallback(reach.walletFallback({
    providerEnv: 'MainNet', MyAlgoConnect })); 

const ConnectWalletButton = ({connectWallet, accountAddress, className = "" }) => {
    return(
        <div>
            <ConnectButton className={className} connectWallet = {connectWallet} accountAddress = {accountAddress}/>
        </div>
    )
}

export default ConnectWalletButton