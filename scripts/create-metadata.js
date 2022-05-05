const Funding = artifacts.require("Funding");
const fs = require("fs");

const metadataTemplate = {
  name: "",
  description: "",
  image: "",
  attributes: [
    {
      trait_type: "Charisma",
      value: 0,
    },
    {
      trait_type: "Wisdom",
      value: 0,
    },
    {
      trait_type: "Bravery",
      value: 0,
    },
  ],
};

module.exports = async (callback) => {
  const funding = await Funding.deployed();
  const jsonString = fs.readFileSync("./scripts/ipfs/ipfs.json", {
    encoding: "utf-8",
    flag: "r",
  });
  data = JSON.parse(jsonString).ipfs;
  let randomIndex = Math.floor(Math.random() * data.length);
  let obj = data[randomIndex];

  let nftMetaData = metadataTemplate;

  nftMetaData["name"] = obj.name;
  if (
    fs.existsSync(
      "metadata/" +
        nftMetaData["name"].toLowerCase().replace(/\s/g, "-") +
        ".json"
    )
  ) {
    console.log("Metadata already exists!");
  } else {
    console.log(nftMetaData["name"]);

    nftMetaData["image"] = obj.url;
    nftMetaData["attributes"][0]["value"] = Math.floor(Math.random() * 101);
    nftMetaData["attributes"][1]["value"] = Math.floor(Math.random() * 101);
    nftMetaData["attributes"][2]["value"] = Math.floor(Math.random() * 101);
    nftMetaData[
      "description"
    ] = `${obj.name} is a %${nftMetaData["attributes"][2]["value"]} brave %${nftMetaData["attributes"][1]["value"]} wise %${nftMetaData["attributes"][0]["value"]} charismatic but %100 cute puppy`;
    filename =
      "metadata/" + nftMetaData["name"].toLowerCase().replace(/\s/g, "-");
    let data = JSON.stringify(nftMetaData);
    fs.writeFileSync(filename + ".json", data);
  }
  callback(funding);
};
