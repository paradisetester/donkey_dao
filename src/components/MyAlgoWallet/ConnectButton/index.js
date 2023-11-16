import { Button } from "../../Button.styles.js";

const ConnectButton = ({ connectWallet, accountAddress, className = "" }) => {
    return (<>
        {
            accountAddress ?
                <Button type="button" className={` ${className}`} >Wallet Connected</Button> :
                <Button type="button" className={` ${className}`} onClick={connectWallet}>Connect Wallet</Button>
        }
    </>);
}

export default ConnectButton