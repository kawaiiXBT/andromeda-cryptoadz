import { useEffect, useState } from "react";
import { MinterWrapper } from "./Minter.styles.js";
import {
  connectWallet,
  fetchMintedTokens,
  getCurrentWalletConnected,
  mintNFT,
} from "./util/interact.js";
import BigNumber from "bignumber.js";

const Minter = (props) => {
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [success, setSuccess] = useState(false);
  const [count, setCount] = useState("");
  const [mintedTokens, setMintedTokens] = useState([]);
  const [info, setInfo] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const { address, status } = await getCurrentWalletConnected();

      setWallet(address);
      setStatus(status);

      addWalletListener();
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchMintedTokens();
      setInfo(data);
    };
    fetchData();
  });

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("");
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

  const onMintPressed = async (e) => {
    e.preventDefault();
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
    <MinterWrapper className="Minter">
      <header>
        <div className="minter_header_info">
          Minted:
          <b>{info} / 6969</b>
        </div>

        <button className="minter_wallet_button" onClick={connectWalletPressed}>
          {walletAddress.length > 0
            ? "Connected: " +
              String(walletAddress).substring(0, 6) +
              "..." +
              String(walletAddress).substring(38)
            : "Connect Wallet"}
        </button>
      </header>

      <div className="minter_body">
        <h1 id="title">AndromedaToadz Minter</h1>
        <p>
          Small amphibious creatures that leapt across the universe and now call
          Metis Andromeda their home.
        </p>
        {BigNumber(info).eq(6969) ? (
          <div>
            <h2>All AndromedaToadz have been minted</h2>
          </div>
        ) : (
          <form onSubmit={onMintPressed}>
            <h2>How Many?</h2>
            <div className="minter_form_input">
              <input
                type="text"
                value={count}
                onChange={(event) => setCount(event.target.value)}
              />
              <button
                id="mintButton"
                disabled={count.length === 0}
                onClick={onMintPressed}
              >
                Mint NFT
              </button>
            </div>
          </form>
        )}

        <p className="minter_message">{status}</p>
        <div className="prices">
          <h2>Mint price</h2>
          <div className="prices_list">
            <div>1-4 mint</div>
            <div>0.69 METIS</div>
            <div>5-9 mint</div>
            <div>0.55 METIS</div>
            <div>10+ mint</div>
            <div>0.42 METIS</div>
          </div>
        </div>
        {success && mintedTokens.length !== 0 && (
          <div className="nft_images">
            <h2>You have minted</h2>
            <div className="nft_images_grid">
              {mintedTokens.map((item) => (
                <img
                  src={`https://ipfs.io/ipfs/bafybeihel2lrxe2mtbo6ruleaeqcbckxqv24aydgez2m75gc5amu6nbyey/files/${item}.jpg`}
                  alt="Toadz"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </MinterWrapper>
  );
};

export default Minter;
