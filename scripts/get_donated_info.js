const Funding = artifacts.require("Funding");

module.exports = async (_id) => {
  const funding = await Funding.deployed();
  let donatedInfo = await funding.donatedInfo(_id);
  console.log(
    `name: ${donatedInfo.name} --> title: ${
      donatedInfo.title
    } --> definition: ${donatedInfo.definiton} donated address: ${
      donatedInfo.donatedAddress
    } required amount: ${donatedInfo.requiredAmount.toString()} --> required date: ${donatedInfo.requiredDate.toString()} `
  );

  return {
    name: `${donatedInfo.name}`,
    title: `${donatedInfo.title}`,
    definiton: `${donatedInfo.definiton}`,
    donatedAddress: `${donatedInfo.donatedAddress}`,
    requiredAmount: `${donatedInfo.requiredAmount}`,
    requiredDate: `${donatedInfo.requiredDate}`,
  };
};
