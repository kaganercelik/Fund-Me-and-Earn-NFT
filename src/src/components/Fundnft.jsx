import { useContext, useState } from "react";
import FundingContext from "./context/FundingContext";
import { utils } from "ethers";
import { useContractFunction } from "@usedapp/core";
import { ipfs } from "../metadata/metadata";

function Fundnft() {
  const [id, setId] = useState(0);
  const [amount, setAmount] = useState(0);
  const [metadata, setMetadata] = useState();

  const { funding } = useContext(FundingContext);

  const { state, send: fund } = useContractFunction(funding, "fund", {
    transactionName: "Fund project",
    gassLimit: 6721975,
  });

  const { status } = state;

  const onclick = async () => {
    await fund(id, {
      value: `${utils.parseEther(amount)}`,
    });

    setMetadata(ipfs[Math.floor(Math.random() * ipfs.length)]);
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
      <div>{metadata && <h3>{metadata.name}</h3>}</div>
    </div>
  );
}

export default Fundnft;
