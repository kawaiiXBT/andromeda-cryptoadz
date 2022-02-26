import { useEffect, useState } from "react";
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
} from "./util/interact.js";

const Minter = (props) => {
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [success, setSuccess] = useState(false);
  const [count, setCount] = useState("");
  const [mintedTokens, setMintedTokens] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { address, status } = await getCurrentWalletConnected();

      setWallet(address);
      setStatus(status);

      addWalletListener();
    };
    fetchData();
  }, []);

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("");
          // setStatus("👆🏽 Write a message in the text-field above.");
        } else {
          setWallet("");
          setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    } else {
      setStatus(
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
      );
    }
  }

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };

  const onMintPressed = async () => {
    const { success, status, tx } = await mintNFT(count);
    setStatus(status);
    if (success) {
      setCount("");
      setSuccess(true);
      let mintedTokensFromTX;

      // If user mints >1 NFT, it returns an array. If 1 NFT => Object
      if (Array.isArray(tx.events.Transfer)) {
        mintedTokensFromTX = tx.events.Transfer.map(
          (item) => item.returnValues.tokenId
        );
      } else {
        mintedTokensFromTX = [tx.events.Transfer.returnValues.tokenId];
      }

      setMintedTokens(mintedTokensFromTX);
      return;
    }
    setSuccess(false);
  };

  return (
    <div className="Minter">
      <button id="walletButton" onClick={connectWalletPressed}>
        {walletAddress.length > 0 ? (
          "Connected: " +
          String(walletAddress).substring(0, 6) +
          "..." +
          String(walletAddress).substring(38)
        ) : (
          <span>Connect Wallet</span>
        )}
      </button>
      <br></br>
      <h1 id="title">AndromedaToadz Minter</h1>
      <p>
        Small amphibious creatures that leapt across the universe and now call
        Metis Andromeda their home.
      </p>
      <form>
        <h2>How Many? </h2>
        <input
          type="text"
          placeholder="1"
          value={count}
          onChange={(event) => setCount(event.target.value)}
        />
      </form>
      <button
        id="mintButton"
        disabled={count.length === 0}
        onClick={onMintPressed}
      >
        Mint NFT
      </button>
      <p id="status" style={{ color: "red" }}>
        {status}
      </p>
      {success && mintedTokens.length !== 0 && (
        <div className="nft_images">
          <h2>Your minted Toadz</h2>
          {mintedTokens.map((item) => (
            <img
              src={`https://ipfs.io/ipfs/bafybeihel2lrxe2mtbo6ruleaeqcbckxqv24aydgez2m75gc5amu6nbyey/files/${item}.jpg`}
              alt="Toadz"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Minter;
