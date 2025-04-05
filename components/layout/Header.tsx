'use client'
import { useConnect } from '@/hooks/useConnect'
import { PublicKey } from '@solana/web3.js'
import { usePathname } from 'next/navigation'
import nacl from 'tweetnacl'

// 동기식 SHA-512 함수 설정
const Header = () => {
  const pathname = usePathname()
  const isCreateAgent = pathname === '/create-agent'
  const {
    connection,
    wallets,
    wallet,
    publicKey,
    select,
    connect,
    connected,
    signMessage,
    createSignMessage,
  } = useConnect()

  // TODO: connect wallet & create an agent 함수 구현
  const handleButtonClick = async () => {
    if (isCreateAgent) {
      // create an agent 함수 구현
    } else {
      // connect wallet 함수 구현
      wallet && connect()
      const message = createSignMessage()
      const encodedMessage = new TextEncoder().encode(message)
      const res = signMessage && (await signMessage(encodedMessage))

      if (publicKey && res) {
        try {
          const isValid = nacl.sign.detached.verify(encodedMessage, res, publicKey.toBytes())
          console.log('isValid', isValid)
        } catch (error) {
          console.log('error', error)
        }
      }
    }
  }

  return (
    <header className="flex items-center bg-black">
      <div className="flex w-full items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-bold text-white">HOMO MEMETUS</h1>
        <button
          className="rounded-full bg-white px-8 py-3 font-bold text-black"
          onClick={handleButtonClick}>
          {isCreateAgent ? 'CREATE AN AGENT' : 'CONNECT WALLET'}
        </button>
      </div>
    </header>
  )
}

export default Header
