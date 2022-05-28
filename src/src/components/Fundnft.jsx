import { useContext, useState } from "react";
import FundingContext from "./context/FundingContext";
import { utils } from "ethers";
import { useContractFunction, useEthers } from "@usedapp/core";
import { ipfs } from "../metadata/metadata";

function Fundnft() {
  const [id, setId] = useState(0);
  const [amount, setAmount] = useState(0);
  const [metadata, setMetadata] = useState();

  const { account } = useEthers();

  const { funding } = useContext(FundingContext);

  const { state, send: fundNFT } = useContractFunction(funding, "fundEarnNft", {
    transactionName: "Fund and Earn nft",
  });

  const { status } = state;

  const onclick = async () => {
    let randomMetadata = ipfs[Math.floor(Math.random() * ipfs.length)];
    setMetadata(randomMetadata);
    let tokenURI = JSON.stringify(randomMetadata, null, 4);
    await fundNFT(id, tokenURI, {
      value: `${utils.parseEther(amount)}`,
    });
  };
  return (
    <div className="shadow shadow-white rounded p-5  mr-10 mt-5">
      <div className=" flex justify-center">
        <input
          type="text"
          placeholder="Enter Project id"
          className="form-control mb-3 text-zinc-400 rounded shadow shadow-white input-md mr-5"
          onChange={(e) => setId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter amount as ETH"
          className="form-control mb-3 text-zinc-400 rounded shadow shadow-white input-md mr-5"
          onChange={(e) => setAmount(e.target.value)}
        />

        <button className="btn btn-primary" onClick={() => onclick()}>
          Fund
        </button>
        <h3 className="my-3 ml-5">Status: {status}</h3>
      </div>
      <div className="flex justify-center">
        {metadata && (
          <div className="">
            <h2 className="text-white mb-2">
              <span className="text-lime-500">NFT Name :</span> {metadata.name}
            </h2>
            <h3 className="text-white mb-4">
              <span className="text-lime-500">NFT Description :</span>{" "}
              {metadata.description}
            </h3>
            <h3 className="text-white mb-4">
              <span className="text-lime-500">NFT Owner :</span> {account}
            </h3>
            <a
              href={metadata.image}
              alt="link doesnt exist"
              className="badge badge-lg badge-outline text-sky-500 visited:text-purple-600 shadow shadow-white p-5 hover:text-white hover:bg-sky-500"
            >
              NFT image
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default Fundnft;
