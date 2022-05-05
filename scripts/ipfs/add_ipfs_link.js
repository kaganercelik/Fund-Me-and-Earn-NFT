const fs = require("fs");

const filePath = "./scripts/ipfs/ipfs.json";

const jsonReader = (_filePath, cb) => {
  fs.readFile(_filePath, "utf-8", (err, _fileData) => {
    if (err) {
      return cb && cb(err);
    }
    try {
      const object = JSON.parse(_fileData);
      return cb && cb(null, object);
    } catch (err) {
      return cb && cb(err);
    }
  });
};

module.exports = (_name, _url) => {
  jsonReader(filePath, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      data.ipfs.push({
        name: _name,
        url: _url,
      });
      fs.writeFile(filePath, JSON.stringify(data), (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Adding ipfs info is succesful!");
        }
      });
    }
  });
};
