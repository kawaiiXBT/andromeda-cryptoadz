import BigNumber from "bignumber.js";
import Web3 from "web3";

import contractABI from "../contract-abi.json";
const contractAddress = "0xE1f73A7146d23E7dD666CCd5C8D27d976024DeE4";

// const web3 = new Web3("https://andromeda.metis.io/?owner=1088");

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const obj = {
        status: "👆🏽 Write a message in the text-field above.",
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
          status: "👆🏽 Write a message in the text-field above.",
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

// async function loadContract() {
//   return new web3.eth.Contract(contractABI, contractAddress);
// }

const oneMintPrice = (count) => {
  if (count < 5) return 0.69;
  if (count >= 5 && count < 10) return 0.55;
  return 0.42;
};

export const mintNFT = async (count) => {
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);
    const ToadzContract = new web3.eth.Contract(contractABI, contractAddress);

    const value = BigNumber(oneMintPrice(count))
      .shiftedBy(18)
      .times(count)
      .toString();

    try {
      const txHash = await ToadzContract.methods.purchase(count).send({
        from: window.ethereum.selectedAddress,
        value,
      });
      return {
        success: true,
        status:
          "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" +
          txHash,
      };
    } catch (error) {
      return {
        success: false,
        status: "😥 Something went wrong: " + error.message,
      };
    }
  }
};
