import logo from "./logo.svg";
import "./App.css";
import Fund from "./components/Fund.jsx";

import { ChainId, Config, DAppProvider } from "@usedapp/core";
import Connect from "./components/Connect";
import { FundingProvider } from "./components/context/FundingContext";
import SetDonated from "./components/SetDonated";
import DonatedInfo from "./components/DonatedInfo";
import Fundnft from "./components/Fundnft";

const config = {
  readOnlyUrls: {
    1337: "http://localhost:7545",
  },
  multicallAddresses: {
    1337: "http://localhost:7545",
  },
  networks: [1337],
};

function App() {
  return (
    <DAppProvider config={config}>
      <FundingProvider>
        <div className="container m-10">
          <Connect />
          <SetDonated />
          <DonatedInfo />
          <Fund />
          <Fundnft />
        </div>
      </FundingProvider>
    </DAppProvider>
  );
}

export default App;
