import React, { useState, useEffect } from "react";
import Wenb3Modal from "web3modal";
import { ethers } from "ethers";

// internal imports
import { CrowdFundingABI, CrowdFundingAddress } from "./contants";

// -----Fetching the smart contract
const fetchContract = (signerOrProvider) => new ethers.Contract(CrowdFundingAddress, CrowdFundingABI, signerOrProvider);

export const CrowdFundingContext = React.createContext();

export const CrowdFundingProvider = ({ children }) => {
    const titleData = "Crowd Funding Contract";
    const [ currentAccount, setCurrentAccount ] = useState("");

    const createCampaign = async (campaign) => {
        const { title, description, amount, deadline } = campaign;
        const web3Modal = new Wenb3Modal();
        const connection = await web3Modal.connect();
    }
}