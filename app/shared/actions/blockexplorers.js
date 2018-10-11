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
        name: 'dBankX',
        patterns: {
          account: 'https://www.dbankx.io/account/{account}',
          txid: 'https://www.dbankx.io/transaction/{txid}'
        }
      },
      {
        name: 'Arisen Explorer',
        patterns: {
          account: 'https://arisenexplorer.com/accounts/{account}',
          txid: 'https://arisenexplorer.com/transaction/{txid}'
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
