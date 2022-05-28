import { useContext, useState } from "react";
import { useEthers, useContractFunction } from "@usedapp/core";
import FundingContext from "./context/FundingContext";
import { getAddress } from "ethers/lib/utils";

function DonatedInfo() {
  const [info, setInfo] = useState();
  const [id, setId] = useState(0);
  const { funding, donatedInfo } = useContext(FundingContext);
  const { account } = useEthers();
  const [display, setDisplay] = useState(false);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requiredAmount, setRequiredAmount] = useState(0);
  const [requiredDate, setRequiredDate] = useState();

  const displayclick = async () => {
    setDisplay(true);
  };

  const hideclick = () => {
    setDisplay(false);
  };

  const changeHandle = async () => {
    const {
      name,
      title,
      description,
      requiredAmount,
      requiredDate,
    } = donatedInfo[id];
    setName(name);
    setTitle(title);
    setDescription(description);
    setRequiredAmount(requiredAmount);
    var date = new Date(requiredDate);
    var dateStr =
      date.getDate() +
      "/" +
      (date.getMonth() + 1) +
      "/" +
      date.getFullYear() +
      " ";
    setRequiredDate(dateStr);
  };

  const { state, send: getDonatedInfo } = useContractFunction(
    funding,
    "donatedInfo",
    { transactionName: "Get Donated Info" }
  );

  return (
    <div className="shadow shadow-white rounded p-5  mr-10 mt-5">
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Enter id of Project"
          className="form-control mb-3 text-zinc-400 rounded shadow shadow-white input-md mr-5 my-3"
          onChange={(e) => setId(e.target.value)}
        />
        <button
          className="btn btn-secondary mr-4 my-auto "
          onClick={changeHandle}
        >
          Change Info
        </button>
        {display ? (
          <button className="btn btn-secondary my-auto " onClick={hideclick}>
            Hide Info
          </button>
        ) : (
          <button className="btn btn-secondary my-auto " onClick={displayclick}>
            Display Info
          </button>
        )}
      </div>

      <div className="">
        {display && (
          <div>
            <h3 className="">Name: {name}</h3>
            <h3 className="">Title: {title}</h3>
            <h3 className="">Description: {description}</h3>
            <h3 className="">Required Amount: {requiredAmount}</h3>
            <h3 className="">Required Date: {requiredDate}</h3>
          </div>
        )}
      </div>

      <div></div>
    </div>
  );
}

export default DonatedInfo;
