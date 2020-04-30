import { createMigrate } from 'redux-persist';
import createElectronStorage from 'redux-persist-electron-storage';

const migrations = {
  /*
    2 - Wallet Migration

      - Creating a new `wallets` parameter that contains all wallets you can swap between.
      - Migrating the `walletMode` from the settings/current wallet into each individual wallet.

  */
  2: (state) => {
    const {
      settings,
      wallet
    } = state;
    // Create a copy of the existing wallet
    const existingWallet = Object.assign({}, wallet);
    // Replicate the bank account account and mode from settings onto the bank account
    existingWallet.account = settings.account;
    existingWallet.mode = settings.walletMode;
    // Update this individual wallets version
    existingWallet.version = 2;
    return {
      // Update the existing settings + Bank Account State
      settings: state.settings,
      wallet: existingWallet,
      // Create the new wallets state and inject the first wallet
      wallets: [existingWallet]
    };
  },
  /*
    3 - Wallet Migration

      - Ensure the customTokens field is set with the base token

  */
  3: (state) => {
    const {
      settings
    } = state;
    const newSettings = Object.assign({}, settings);
    if (
      !newSettings.customTokens
      || !newSettings.customTokens.length
    ) {
      newSettings.customTokens = ['arisen.token:RIX'];
    }
    if (
      newSettings.customTokens
      && newSettings.customTokens.indexOf('arisen.token:RIX') === -1
    ) {
      newSettings.customTokens.push('arisen.token:RIX');
    }
    return Object.assign({}, state, {
      settings: newSettings
    });
  },
  /*
  4 - Wallet Migration

    - Correct format of all customTokens

  */
  4: (state) => {
    const {
      settings
    } = state;
    const newSettings = Object.assign({}, settings);
    if (
      newSettings.customTokens
      && newSettings.customTokens.length > 0
    ) {
      newSettings.customTokens.forEach((token, idx) => {
        const [contract, symbol] = token.split(':');
        newSettings.customTokens[idx] = [contract.toLowerCase(), symbol.toUpperCase()].join(':');
      });
    }
    return Object.assign({}, state, {
      settings: newSettings
    });
  },
  /*
  5 - Settings Migration

    - Add recentContracts array to existing settings

  */
  5: (state) => {
    const {
      settings
    } = state;
    const newSettings = Object.assign({}, settings);
    if (
      !newSettings.recentContracts
    ) {
      newSettings.recentContracts = [];
    }
    return Object.assign({}, state, {
      settings: newSettings
    });
  },
  /*
  6 - Settings Migration

    - Add Banking Contacts array to existing settings
    - Add recentProposalsScopes array to existing settings

  */
  6: (state) => {
    const {
      settings
    } = state;
    const newSettings = Object.assign({}, settings);
    if (
      !newSettings.recentProposalsScopes
    ) {
      newSettings.recentProposalsScopes = [];
    }
    if (
      !newSettings.contacts
    ) {
      newSettings.contacts = [];
    }
    return Object.assign({}, state, {
      settings: newSettings
    });
  },
};

const persistConfig = {
  key: 'avote-config',
  version: 6,
  migrate: createMigrate(migrations, { debug: true }),
  storage: createElectronStorage(),
  whitelist: [
    'settings',
    'wallet',
    'wallets'
  ]
};

export default persistConfig;
