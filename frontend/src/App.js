import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { useMetamaskState } from './web3/ConnectWallet';
import { useGetValue } from './web3/GetCurrentValue';
import { useGetBalance } from './web3/GetTokenBalance';
import { useRequestFunds } from './web3/GetFunds';
import { useCreateProposal } from './web3/NewProposal';
import "./App.css"

function App() {
  const [locked, setLocked] = useState("pending");  // Initial locked state

  useEffect(() => {
    const unlockHandler = (e) => {
      console.log("unlockHanldera start")
      setLocked(e.detail);
      console.log({e})
    };


    window.addEventListener("unlockProtocol", unlockHandler);

    console.log({locked})

    return () => {
      window.removeEventListener("unlockProtocol", unlockHandler);
    };
  }, []);


  const checkout = () => {
    window.unlockProtocol && window.unlockProtocol.loadCheckoutModal();
  };

  const { boxValue, getValue } = useGetValue();
  const { isConnected, account, signer, connectToMetamask } = useMetamaskState();
  const { userBalance, getBalance } = useGetBalance();
  const { requestFunds } = useRequestFunds();
  const { createProposal, proposal, newValue, proposalDescription } = useCreateProposal();

  return (
    <>
      <Header connectToMetamask={connectToMetamask} isConnected={isConnected} account={account} signer={signer} />
      {locked !== "locked" ? (
        <Navbar
          boxValue={boxValue}
          getValue={getValue}
          userBalance={userBalance}
          getBalance={getBalance}
          signer={signer}
          requestFunds={requestFunds}
          createProposal={createProposal}
          proposal={proposal}
          newValue={newValue}
          proposalDescription={proposalDescription}
        />
      ) : (
        <div onClick={checkout} style={{ cursor: "pointer" }}>
          Unlock Navbar!{" "}
          <span aria-label="locked" role="img">
            🔒
          </span>
        </div>
      )}
      {/* <Footer /> */}
    </>
  );
}

export default App;