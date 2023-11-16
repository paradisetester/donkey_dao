import algosdk from 'algosdk';

export async function transferAsset(algodClient: any, address: any): Promise<string> {

    const sender = algosdk.mnemonicToSecretKey(process.env.REACT_APP_MNEMONIC  as string);
  
    const params = await algodClient.getTransactionParams().do();
   
    console.log(params)
    
    return "test";

  }