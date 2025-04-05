'use client'
import React, { Fragment, ReactNode, useCallback, useEffect, useMemo } from 'react'
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  MathWalletAdapter,
  TrustWalletAdapter,
  CoinbaseWalletAdapter,
} from '@solana/wallet-adapter-wallets'
import { WalletAdapterNetwork, WalletError } from '@solana/wallet-adapter-base'
import { clusterApiUrl } from '@solana/web3.js'
import {
  ConnectionProvider,
  WalletProvider as WalletAdapterProvider,
} from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'

type Props = {
  children: ReactNode
}

const Web3Provider = ({ children }: Props) => {
  const network = WalletAdapterNetwork.Devnet
  const endpoint = useMemo(() => clusterApiUrl(network), [network])
  const onError = useCallback((error: WalletError) => {
    console.error(error)
  }, [])
  const wallets = useMemo(() => {
    return [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new MathWalletAdapter(),
      new TrustWalletAdapter(),
      new CoinbaseWalletAdapter(),
    ]
  }, [network])

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletAdapterProvider wallets={wallets} onError={onError} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletAdapterProvider>
    </ConnectionProvider>
  )
}

const WalletProivder = ({ children }: Props) => {
  useEffect(() => {}, [])
  return <Fragment>{children}</Fragment>
}

export default Web3Provider
