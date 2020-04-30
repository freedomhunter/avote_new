[![version](https://img.shields.io/github/release/arisenio/avote/all.svg)](https://github.com/arisenio/avote/releases)
[![issues](https://img.shields.io/github/issues/arisenio/avote.svg)](https://github.com/arisenio/avote/issues)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/arisenio/avote/master/LICENSE)
![downloads](https://img.shields.io/github/downloads/arisenio/avote/total.svg)

[English](https://github.com/arisenio/avote/blob/master/README.md) - [한글](https://github.com/arisenio/avote/blob/master/README.kr.md) - [中文](https://github.com/arisenio/avote/blob/master/README.zh.md) - [日本語](https://github.com/arisenio/avote/blob/master/README.ja.md) - [Русский](https://github.com/arisenio/avote/blob/master/README.ru.md)

# avote - RIX Block Governance Voting & Wallet

`avote` is a limited-functionality release of a light wallet being designed for the Arisen decentralized banking network. This application can be used to connect to a remote RIX API endpoint to perform Governance Voting actions and a few basic wallet commands.

[![avote screenshot](https://raw.githubusercontent.com/arisenio/avote/master/avote.png)](https://raw.githubusercontent.com/arisenio/avote/master/avote.png)

### Features

- **Block Governance Voting**: Select which Governance Members to support and cast your vote. Please note that the block Governance Voting UI is not a research tool; it is a simple interface that provides a secure way to vote.
- **Token Transfers**: Transfer RIX or any other token you may have a balance for to another user or exchanges.
- **CPU/Bandwidth Staking**: Stake your RIX as either Bandwidth or CPU. This grants rights to resource usage on the network, in addition to conveying weight while voting for Governance Members.
- **local bank account**: Set a password while importing your Bank Account's Private Key to create a local bank account. Your key will be encrypted locally using this password. This password will be required each time you need to unlock the bank account.
- **Temporary Usage**: If you prefer not to store your keys within the application, simply choose not to set a password. When the application quits, your key will be forgotten.

## Get avote

### Releases

Current 1.0.0 release downloads:

- [Windows Installer](https://github.com/arisenio/avote/releases/download/v1.1.0/win-avote-1.0.0.exe)
- [macOS Package](https://github.com/arisenio/avote/releases/download/v1.1.0/mac-avote-1.0.0.dmg)
- [Linux (deb)](https://github.com/arisenio/avote/releases/download/v1.1.0/linux-avote-1.0.0-amd64.deb)
- [Linux (snap)](https://github.com/arisenio/avote/releases/download/v1.1.0/linux-avote-1.0.0-amd64.snap)

The latest release will always be available on the releases page of this repository:

[https://github.com/arisenio/avote/releases](https://github.com/arisenio/avote/releases)

To determine which file you need, if you are a...

- **MacOS User**: Download either the DMG (`avote-***.dmg`) or ZIP (`avote-***-mac.zip`) file.
- **Windows User**: Download the EXE (`avote-***.exe`) file.
- **Linux User**: Download either the SNAP (`avote-***-_amd64.snap`) or DEB (`avote-***-_amd64.deb`) file

### Security: Bank Account's Private Keys

When using `avote`, all transactions are signed within the application and your key is never transmitted. If a local bank account password is specified, the application will also save and encrypt your key for future use, using AES-256 encryption. The current password/key encryption scheme can [currently be found here](https://github.com/aaroncox/avote/blob/master/app/shared/actions/wallet.js#L71-L86).

### Endpoints

We offer a public list of nodes within this repository for use with this application:

[https://github.com/arisenio/avote/blob/master/nodes.md](https://github.com/arisenio/avote/blob/master/nodes.md)

This list will be updated over time and can be referenced from within the initial connection screen in the app.

### Build it yourself

If you'd rather build the application yourself, please ensure you have nodejs/npm/yarn already installed locally.

**Note**: If you are configuring this Electron application within a Windows development environment, it will involve additional steps.

```
git clone https://github.com/arisenio/avote.git avote
cd avote
yarn install
```

Then either:

- MacOS: `yarn package`
- Linux: `yarn package-linux`
- Windows: `yarn package-win`
- All: `yarn package-all`

The files built will be located in the `releases` folder within the root project folder.

### Running development mode

```
git clone https://github.com/arisenio/avote.git avote
cd avote
yarn install
yarn dev
```

### Credits

The development of this application is being led by members of the [BenchX](https://benchx.io) team in an effort to let stakeholders participate in RIX’ governance.

### Release Signatures

To verify the integrity of the releases you download from GitHub, below are the shasum results for each of the binaries:

Signed by [jesta on keybase](https://keybase.io/jesta)

```
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA512

shasum -b -a 512 linux-avote-1.0.0-amd64.deb
e55fc9fb53d0e8bd25f4e972a5fd8563086af50b6d6386b6597e9fbf39bfa7704d43f1778f236fe5e56b548eb7ce8a01ebd16884e787d68661475057636ec55e *linux-avote-1.0.0-amd64.deb
shasum -b -a 512 linux-avote-1.0.0-amd64.snap
02ba35cd83b00d13f3417c2ec7e4de1beae4f12f86cf156131683a067faa44b54c859e76f8aa6d57c245fc1d21437e347c1e1be077d2a319329967a67db23b30 *linux-avote-1.0.0-amd64.snap
shasum -b -a 512 linux-avote-1.0.0-arm64.deb
bfe806be8914feee01c319d107249f02f755e93b5ae270ed32ef25ae69d48bfb04379d65329ac5209baf2ff082c98c17de668d7f735826fdd6177550d50b4431 *linux-avote-1.0.0-arm64.deb
shasum -b -a 512 linux-avote-1.0.0-armv7l.deb
fe3ee24882e1ceb68e44536785d6d2cf1b2290a20bf1d721ffa3e36de46e7bae89de43e3bc29b2762b81abc1d1a0b68d0f494d6532305aa9433aebbadfaddba9 *linux-avote-1.0.0-armv7l.deb
shasum -b -a 512 linux-avote-1.0.0-i386.deb
7feffaeb0b6c1439b6be3a3ca6589eecf318cde40d1ac6bf16dbaefa52ef3b45b3a46ed1f5e0274922c119e32915855b533f85a71ca03474a826030269a44108 *linux-avote-1.0.0-i386.deb
shasum -b -a 512 linux-avote-1.0.0-x86_64.AppImage
8a73895f0709880de8b9b61693a28ed9813978001b6be7a63e599f52c091003f5bda7c7c69191270e4f25c2ec4b3d2cc22d49b777d206353bd4095b505b32bb6 *linux-avote-1.0.0-x86_64.AppImage
shasum -b -a 512 mac-avote-1.0.0.dmg
272104b0bd785137c399426dae6d3a555501f7fdcd2625114522d1230346639467e6ca803207f7af976a32a4d66277d202528eb1329a31a877b1dc79dac45eda *mac-avote-1.0.0.dmg
shasum -b -a 512 mac-avote-1.0.0.zip
1f8a6d4c294b29a291427a71939e6d31ee5474927f644776a008af806e1a2221c98ca97fba924a6b6c6d1bdc9290a56011a6cc00ea23d9c8ff5557319bd67584 *mac-avote-1.0.0.zip
shasum -b -a 512 win-avote-1.0.0.exe
83cbbd44bd5bc54f41b12b2ac2948fdbf21d0932cb4e845e6d3ff5adc02fb1e039763b3a3a08e9cdf556c8e234af492bc9178897699b6012017200c798fc2e98 *win-avote-1.0.0.exe
-----BEGIN PGP SIGNATURE-----
Version: Keybase OpenPGP v2.0.77
Comment: https://keybase.io/crypto

wsFcBAABCgAGBQJbovsMAAoJECyLxnO05hN9BVwP/AxPWZjzf6cMz+ryLAf7G98A
9kTnXYmI0I41+hrFaS+icPQokrAPadVLixq4vlzVV9/I4NDYM5AJr1rpx6ERGg2E
eBUMhXu49WXdSjjocfWSqCBO86ZABUai++J4Lv/AKe58xTvyoId5MxyI7azmKY7A
RT7myUCSGRqIX50bpkMa+1DbfZ8TpnymUnOqqpRjVi15RJ8DQUpDGQEK/Et2MIse
8VlqYJ3A3cbZvyaZEQBMa8EhA09AzFopFSCu2CBuTLx3/eGUtkW8/r9eenWWiZUb
/H+ktu1A95ejBENVFwTIHoOCEdgyh7Ipy0PqZqJegAfbPAO0wLda+0F4eePUqm6/
5PE72dy92zh5DPzVpTgEvfcbJIG+V0SLtlWnchaob2nA4TSaJMWMKuA55aM5OVAy
YBEePBzZzn8MDQ7G2aig7lUweE48aJk/h+y90yW0eA58XEhwrhXzsE1+QHY6pnSz
Da2Zt2eD1paB87Sj0o86vmVFdT1FJHMdsIP62S2TEkNT0QyIMOVPR3AO/51dUi2h
nohLutKJqIHWo1klLRWQ7ywfU5uA4OZT27iuTvXNs5s9fh1aN2nZ8/pwI7kTxFt0
8d9YMayUcjspE5BXdLKBu1eMmOHqiyF76yRtvoezXwv8EuSN15S0tMEv78LDR4N8
Nje+JUP0wUL0+9Vnm27v
=HGmk
-----END PGP SIGNATURE-----
```
