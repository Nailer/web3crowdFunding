import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { JsonRpcProvider } from "ethers"

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
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.BrowserProvider(connection);
        const signer = await provider.getSigner();
        const contract = fetchContract(signer);

        console.log(currentAccount);
        try {
            const transaction = await contract.createCampaign(
                currentAccount, // owner
                title, 
                description, // description
                ethers.parseUnits(amount, 18),
                new Date(deadline).getTime()
            ); 

            await transaction.wait();

            console.log("Contract call success", transaction);
            
        } catch (error) {
            console.log("contract call failure", error);
            
        }
        
    }

    const getCampaigns = async () => {
        const provider = new JsonRpcProvider("http://127.0.0.1:8545/");
        const contract = fetchContract(provider);

        const campaigns = await contract.getCampaign();
        const parsedCampaigns = campaigns.map((campaign, i) => ({
            owner: campaign.owner, 
            title: campaign.title,
            description: campaign.description,
            target: ethers.utils.formatEther(campaign.target.toString()),
            deadline: campaign.deadline.toNumber(),
            amountCollected: ethers.utils.formatEther(
                campaign.amountCollected.toString()
            ),
            pId: i,
        }));

        return parsedCampaigns;
    };

    const getUserCampaigns = async () => {
        const provider = new JsonRpcProvider("http://127.0.0.1:8545/");
        const contract = fetchContract(provider);

        const allCampaigns = await contract.getCampaign();

        const accounts = await window.ethereum.request({
            method: "eth_accounts",
        })
        const currentUser = accounts[0];

        const filteredCampaigns = allCampaigns.filter(
            (campaign) => 
                campaign.owner === "0xf39Fd6e51aad88F6F4ce6a88827279cffFb92266"
        );

        const userData = filteredCampaigns.map((campaign, i) => ({
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            target: ethers.utils.formatEther(campaign.target.toString()),
            deadline: campaign.deadline.toNumber(),
            amountCollected: ethers.utils.formatEther(
                campaign.amountCollected.toString()
            ),
            pId: i
        }));

        return userData;
    }

    const donate = async () => {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);

        const campaignData = await contract.donateToCampaign(pId, {
            value: ethers.utils.parseEther(amount),
        });

        await campaignData.wait();
        location.reload;

        return campaignData;
    };

    const getDonations = async (pId) => {
        const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/");
        const contract = fetchContract(provider);

        const donations = await contract.getDonators(pId);
        const numberOfDonations = donations[0].length;
        const parsedDonations = [];

        for (let i = 0; i < numberOfDonations; i++) {
            parsedDonations.push({
                donator: donations[0][i],
                donation: ethers.utils.formatEther(donations[1][i].toString()),

            });
        }

        return parsedDonations
    }

    // to check if the wallet is connected
    const checkIfWalletConnected = async () => {
        try {
            if (!window.ethereum) 
                return setOpenError(true), setError("Install Metamask");
            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            }); 

            if (accounts.length) {
                setCurrentAccount(accounts[0]);
            } else {
                console.log("No Account Found");
                
            }
        } catch (e) {
            console.log("something went wrong while connecing to wallet", e);
        }
    };

    // wallet connect function
    const connectWallet = async () => {
        try {
            if (!window.ethereum) return console.log("Install Metamask");

            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log("Error while connecting to wallet");
        };
    };

    return (
        <CrowdFundingContext.Provider
            value={{
                titleData,
                currentAccount,
                createCampaign,
                getCampaigns,
                getUserCampaigns,
                donate,
                getDonations,
                connectWallet,

            }}
        >
            {children}
        </CrowdFundingContext.Provider>
    );
};