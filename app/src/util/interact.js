import BigNumber from "bignumber.js";
import Web3 from "web3";

import contractABI from "../contract-abi.json";
// const contractAddress = "0x5101c1245f501D5F2967939ba64CE3e440154b57"; // TESTNET Stardust Address
const contractAddress = "0x6586d86726B55Cbc7808b50410333Da8b5949447"; // Mainnet Andromeda Address

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const obj = {
        status: "",
        address: addressArray[0],
      };
      return obj;
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://metamask.io/download.html`}
            >
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "",
        };
      } else {
        return {
          address: "",
          status: "🦊 Connect to Metamask using the top right button.",
        };
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://metamask.io/download.html`}
            >
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

export const fetchMintedTokens = async () => {
  const web3 = new Web3("https://andromeda.metis.io/?owner=1088");
  const ToadzContract = new web3.eth.Contract(contractABI, contractAddress);
  const info = await ToadzContract.methods.getInfo().call();

  return info.totalSupply;
};

const oneMintPrice = (count) => {
  if (count < 5) return 0.69;
  if (count >= 5 && count < 10) return 0.55;
  return 0.42;

  //
  // Lower logic is for Testnet contract
  //

  // if (count < 5) return 0.01;
  // if (count >= 5 && count < 10) return 0.005;
  // return 0.003;
};

export const mintNFT = async (count) => {
  if (!window.ethereum)
    return {
      success: false,
      status: "Add Metamask",
      tx: null,
    };

  if (window.ethereum.networkVersion !== "1088")
    return {
      success: false,
      status: "Connect to Andromeda Metis",
      tx: null,
    };

  const web3 = new Web3(window.ethereum);
  const ToadzContract = new web3.eth.Contract(contractABI, contractAddress);

  const value = BigNumber(oneMintPrice(count))
    .shiftedBy(18)
    .times(count)
    .toString();

  try {
    // According to previous transactions - 750000 would be base and for every NFT additional 100000 gas
    const estimateGas = BigNumber(750000)
      .plus(100000 * count)
      .times(1.3)
      .toFixed(0);

    const tx = await ToadzContract.methods.purchase(count).send({
      from: window.ethereum.selectedAddress,
      gas: +estimateGas,
      value,
    });
    return {
      success: true,
      status:
        "✅ Check out your transaction on Andromeda Explorer: https://andromeda-explorer.metis.io/tx/" +
        tx.transactionHash,
      tx: tx,
    };
  } catch (error) {
    return {
      success: false,
      status: "😥 Something went wrong: " + error.message,
      tx: null,
    };
  }
};
