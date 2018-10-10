import sortBy from 'lodash/sortBy';

import * as types from './types';
import rsn from './helpers/rsn';

export function getBlockExplorers() {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_BLOCKEXPLORERS_PENDING
    });
    // const { connection } = getState();
    // // Don't retrieve if we're not on mainnet
    // if (connection.chain !== 'rsn-mainnet') {
    //   return dispatch({
    //     type: types.SYSTEM_BLOCKEXPLORERS_FAILURE
    //   });
    // }
    // const query = {
    //   json: true,
    //   code: 'blockexplorers',
    //   scope: 'blockexplorers',
    //   table: 'blockexplorers',
    //   limit: 100,
    // };

    const rows = [
      {
        name: 'bloks.io',
        patterns: {
          account: 'https://www.bloks.io/account/{account}',
          txid: 'https://www.bloks.io/transaction/{txid}'
        }
      },
      {
        name: 'rsnflare.io',
        patterns: {
          account: 'https://rsnflare.io/account/{account}',
          txid: 'https://rsnflare.io/tx/{txid}'
        }
      },
      {
        name: 'rsnmonitor.io',
        patterns: {
          account: 'https://rsnmonitor.io/account/{account}',
          txid: 'https://rsnmonitor.io/txn/{txid}'
        }
      },
      {
        name: 'rsnpark.com',
        patterns: {
          account: 'https://rsnpark.com/MainNet/account/{account}',
          txid: 'https://rsnpark.com/MainNet/tx/{txid}'
        }
      },
      {
        name: 'rsnweb.net',
        patterns: {
          account: 'https://rsnweb.net/account/{account}',
          txid: 'https://rsnweb.net/transaction/{txid}'
        }
      }
    ];

    // rsn(connection).getTableRows(query).then((results) => {
    //   const { rows } = results;

    const sortedList = sortBy(rows, 'name');

    const blockExplorers = {};

    sortedList.forEach((bE) => {
      blockExplorers[bE.name] = bE.patterns;
    });

    return dispatch({
      type: types.SYSTEM_BLOCKEXPLORERS_SUCCESS,
      payload: {
        blockExplorers
      }
    });
    // }).catch((err) => dispatch({
    //   type: types.SYSTEM_BLOCKEXPLORERS_FAILURE,
    //   payload: { err },
    // }));
  };
}

export default {
  getBlockExplorers
};
