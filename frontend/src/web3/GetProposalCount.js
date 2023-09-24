import { ethers } from "ethers";
import { useState } from "react";

import contractAddress from "../chain-info/deployments/map.json";
import contractABI from "../chain-info/contracts/MoralisGovernor.json"

export function useGetProposals() {
    const [proposalCount, setProposalCount] = useState();

    async function getProposalCount() {
        try {
            //console.log("getProposalCount() called")

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            //console.log({provider});
            const contract = contractAddress["5"]["MoralisGovernor"][0];
            //console.log({contract});
            const abi = contractABI.abi;
            //console.log({abi});
            const GovernanceToken = new ethers.Contract(contract, abi, provider);
            //console.log({GovernanceToken});
            const value = await GovernanceToken.getNumberOfProposals();
            //console.log({value});
            setProposalCount(value.toString());
        } catch {
            console.log("error")
        }

    }


    return { proposalCount, getProposalCount }
}