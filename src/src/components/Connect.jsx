import { useEthers } from "@usedapp/core";

function Connect() {
  const { account, deactivate, activateBrowserWallet } = useEthers();

  const isConnected = account !== undefined;

  return (
    <div className="shadow shadow-white rounded p-5 flex justify-center mr-10">
      {isConnected ? (
        <button className="btn btn-secondary" onClick={deactivate}>
          Disconnect
        </button>
      ) : (
        <button className="btn btn-primary" onClick={activateBrowserWallet}>
          Connect
        </button>
      )}
    </div>
  );
}

export default Connect;
