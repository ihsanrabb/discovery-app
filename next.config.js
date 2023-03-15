/** @type {import('next').NextConfig} */
const { NextFederationPlugin } = require('@module-federation/nextjs-mf');
const deps = require("./package.json").dependencies;

const nextConfig = {
  reactStrictMode: false,
  webpack: (config, options) => {
    const { isServer } = options;
    config.plugins.push(
      new NextFederationPlugin({
        name: 'discoveryApp',
        remotes: {
          investmentApp: `investmentApp@http://localhost:3001/_next/static/${
            isServer ? 'ssr' : 'chunks'
          }/remoteEntry.js`,
          stockbitApp: `stockbitApp@http://localhost:3000/_next/static/${
            isServer ? 'ssr' : 'chunks'
          }/remoteEntry.js`,
        },
        filename: 'static/chunks/remoteEntry.js',
        exposes: {
          './nav': './src/components/Nav.tsx',
          './actorList': './src/components/ActorList.tsx',
          './clan-list': './src/components/ClanList.tsx'
        }
      })
    )

    config.output.publicPath = 'auto';

    return config;
  }
}

module.exports = nextConfig
