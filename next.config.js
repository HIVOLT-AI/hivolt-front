/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "s3-alpha-sig.figma.com",
      "www.meteora.ag",
      "app.lulo.fi",
      "framerusercontent.com",
      "raydium.io",
      "solana.com",
      "wormhole.com",
      "hibolt-server.memetus.store",
    ],
  },
};

module.exports = nextConfig;
