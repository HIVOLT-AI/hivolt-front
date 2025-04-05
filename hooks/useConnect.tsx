'use client'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { useState } from 'react'

export const useConnect = () => {
  const [network, setNetwork] = useState<WalletAdapterNetwork>(WalletAdapterNetwork.Mainnet)
  const { connection } = useConnection()
  const { wallets, wallet, publicKey, select, connect, connected, signMessage } = useWallet()

  const createSignMessage = () => {
    return `This signature request was initiated by **HOMO Memetus**.  
Please sign this message to prove wallet ownership.  
This signature will not trigger any blockchain transaction or grant permissions.  

Requested at: ${new Date().toUTCString()}`
  }

  return {
    network,
    setNetwork,
    connection,
    wallets,
    wallet,
    publicKey,
    select,
    connect,
    connected,
    signMessage,
    createSignMessage,
  }
}
