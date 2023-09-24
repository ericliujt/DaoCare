import { useState } from 'react';
import { ethers } from 'ethers';

export function useMetamaskState() {
    const [isConnected, setIsConnected] = useState(false);
    const [account, setAccount] = useState();
    const [signer, setSigner] = useState();

    ///ADDED:\
    const [address, setAddress] = useState("");

    async function connectToMetamask() {
        try {

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const acc = await provider.send('eth_requestAccounts', []);
            const sign = provider.getSigner(acc[0]);
            console.log({provider, acc, sign});
            setIsConnected(true);
            setAccount(acc[0]);
            setSigner(sign);

            setAddress(acc[0]);

        } catch (err) {
            console.log(err)
        }
    }

    return { isConnected, account, signer, connectToMetamask, address }
}