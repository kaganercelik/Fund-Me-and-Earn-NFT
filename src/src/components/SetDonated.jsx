import { useContext, useState, useEffect } from "react";
import FundingContext from "./context/FundingContext";
import { useContractFunction } from "@usedapp/core";
import { ethers } from "ethers";

function SetDonated() {
  const { funding, setDonatedInfo, donatedInfo } = useContext(FundingContext);

  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requiredAmount, setRequiredAmount] = useState(0);
  const [requiredDate, setRequiredDate] = useState(0);
  const [status, setStatus] = useState("");

  const { state, send } = useContractFunction(funding, "setDonated", {
    transactionName: "Set Donated",
  });

  useEffect(() => {
    setStatus(state.status);
  }, [state.status]);

  const handleDate = (_date) => {
    const date = new Date(_date);

    setRequiredDate(date.getTime());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setDonatedInfo([
      ...donatedInfo,
      {
        name,
        title,
        description,
        requiredAmount,
        requiredDate,
      },
    ]);

    await send(
      name,
      title,
      description,
      ethers.utils.parseEther(requiredAmount),
      requiredDate
    );
  };
  return (
    <div className="shadow shadow-white rounded p-5 flex justify-center mr-10 mt-5">
      <div className="container">
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Project name"
          className="form-control mb-3 text-zinc-400 rounded shadow shadow-white input-md mr-5"
        />
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter Project title"
          className="form-control mb-3 text-zinc-400 rounded shadow shadow-white input-md mr-5"
        />
        <input
          type="text"
          onChange={(e) => setRequiredAmount(e.target.value)}
          placeholder="Enter Project Required Amount"
          className="form-control mb-3 text-zinc-400 rounded shadow shadow-white input-md mr-5"
        />
        <input
          type="date"
          onChange={(e) => handleDate(e.target.value)}
          placeholder="Enter Project Required Date"
          className="form-control mb-3 text-zinc-400 rounded shadow shadow-white input-md mr-5"
        />
        <textarea
          type="text"
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter Project Description"
          className="form-control mb-3 text-zinc-400 rounded shadow shadow-white textarea textare-secondary mr-5"
        />
      </div>
      <div className="container">
        <button className="btn btn-outline" onClick={handleSubmit}>
          Submit
        </button>
        <h3>Status: {status}</h3>
      </div>
    </div>
  );
}

export default SetDonated;
