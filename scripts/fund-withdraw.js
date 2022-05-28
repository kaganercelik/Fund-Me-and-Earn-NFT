const Funding = artifacts.require("Funding");

const Fund = async (id, amount, account) => {
  const funding = await Funding.deployed();
  const tx = funding.fund(id, {
    from: account,
    value: web3.utils.toWei(amount, "ether"),
  });
  return tx;
};

const Withdraw = async (id, account) => {
  const funding = await Funding.deployed();
  const tx = funding.withdraw(id, { from: account });
  return tx;
};

const FundNft = async (id, tokenURI, account, amount) => {
  const funding = await Funding.deployed();
  const tx = funding.FundNft(id, tokenURI, {
    from: account,
    value: web3.util.woWei(amount, "ether"),
  });
  return tx;
};

module.exports = {
  Fund,
  Withdraw,
  FundNft,
};
