import { createContext, useState, useEffect } from "react";
import { ethers, utils } from "ethers";
import { Contract } from "@ethersproject/contracts";
import Funding from "./../../truffle_abis/Funding.json";

const FundingContext = createContext();

export const FundingProvider = ({ children }) => {
  const [funding, setFunding] = useState("");
  const [address, setAddress] = useState("");
  const [donatedInfo, setDonatedInfo] = useState([]);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const { abi } = Funding;
    const fundingAddress = Funding.networks[1337].address;

    const fundingInterface = new utils.Interface(abi);
    const fundingContract = new Contract(
      fundingAddress,
      fundingInterface,
      signer
    );

    setFunding(fundingContract);
  }, []);

  return (
    <FundingContext.Provider
      value={{
        funding,
        address,
        donatedInfo,
        setDonatedInfo,
      }}
    >
      {children}
    </FundingContext.Provider>
  );
};

export default FundingContext;
