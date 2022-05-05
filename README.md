# Chainlink Truffle Box

<br/>
<p align="center">
<a href="https://chain.link" target="_blank">
<img src="https://raw.githubusercontent.com/smartcontractkit/box/master/box-img-lg.png" width="225" alt="Chainlink Truffle logo">
</a>
</p>
<br/>

## Requirements

- NPM

## Installation

1. Install truffle

```bash
npm install truffle -g
```

2. Setup repo

```bash
mkdir MyChainlinkProject
cd MyChainlinkProject/
```

3. Unbox

```bash
truffle unbox smartcontractkit/box
```

4. Install dependencies by running:

```bash
npm install

# OR...

yarn install
```

## Test

```bash
npm test
```

## Deploy

> :warning: When pushing your code to Github, make sure that your **MNEMONIC** and **RPC_URL** are stored in a **.env** file and it is also in your **.gitignore**

For deploying to the rinkeby network, Truffle will use `truffle-hdwallet-provider` for your mnemonic and an RPC URL. Set your environment variables `$RPC_URL` and `$MNEMONIC` before running:

```bash
npm run migrate:rinkeby
```

You can also run:

```bash
truffle migrate --network rinkeby --reset
```

If you want to use truffle commands.

### Local Blockchain

> :warning: Without a Chainlink node deployed locally, requests from smart contracts will not be responded to. We recommend you deploy to the rinkeby network

If needed, edit the `truffle-config.js` config file to set the desired network to a different port. It assumes any network is running the RPC port on 8545.

```bash
npm run migrate:dev
```

## Helper Scripts

There are 3 helper scripts provided with this box in the scripts directory:

- `create-metadata.js` ---> the name tells its story and so does the others
- `add_ipfs_link.js`
- `delete_ipfs_link.js`

In addition, for working with Chainlink Price Feeds and ChainlinkVRF there are folders respectively.

They can be used by calling them from `npx truffle exec`, for example:

```bash
npx truffle exec scripts/create-metadata --network rinkeby
```

The CLI will output something similar to the following:

```
Using network 'rinkeby'.

Funding contract: 0x972DB80842Fdaf6015d80954949dBE0A1700705E
0xd81fcf7bfaf8660149041c823e843f0b2409137a1809a0319d26db9ceaeef650
Truffle v5.0.25 (core: 5.0.25)
Node v10.16.3
"""








## TODO

- Add tests
- Create a function in smart contract to be able to check if the due date is met to end to lottery (
    - if due date is met but the required amount is not raised revert all money
    - if due date is not met but the required amount is met give a withdraw option
    - if neither of them is met do nothing
    'Consider a checking system that does this'
)
```
