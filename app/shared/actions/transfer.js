import * as types from './types';

import rix from './helpers/rix';
import { getCurrencyBalance } from './accounts';

export function transfer(from, to, quantity, memo, symbol = 'RIX') {
  return (dispatch: () => void, getState) => {
    const {
      balances,
      connection
    } = getState();
    dispatch({
      type: types.SYSTEM_TRANSFER_PENDING
    });
    try {
      const contracts = balances.__contracts;
      const account = contracts[symbol].contract;
      return rix(connection, true).transaction(account, contract => {
        contract.transfer(
          from,
          to,
          quantity,
          memo
        );
      }, {
        broadcast: connection.broadcast,
        expireInSeconds: connection.expireInSeconds,
        sign: connection.sign
      }).then((tx) => {
        // If this is an offline transaction, also store the ABI
        if (!connection.sign && account !== 'arisen.token') {
          return rix(connection, true).getAbi(account).then((contract) =>
            dispatch({
              payload: {
                contract,
                tx
              },
              type: types.SYSTEM_TRANSFER_SUCCESS
            }));
        }
        dispatch(getCurrencyBalance(from));
        return dispatch({
          payload: { tx },
          type: types.SYSTEM_TRANSFER_SUCCESS
        });
      }).catch((err) => dispatch({
        payload: { err },
        type: types.SYSTEM_TRANSFER_FAILURE
      }));
    } catch (err) {
      return dispatch({
        payload: { err },
        type: types.SYSTEM_TRANSFER_FAILURE
      });
    }
  };
}

export default {
  transfer
};
