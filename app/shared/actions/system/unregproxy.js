import * as types from '../types';

import { getAccount } from '../accounts';
import rix from '../helpers/rix';

export function unregproxy() {
  return (dispatch: () => void, getState) => {
    const {
      connection,
      settings
    } = getState();
    const { account } = settings;

    dispatch({
      type: types.SYSTEM_UNREGPROXY_PENDING
    });
    return rix(connection, true).regproxy({
      proxy: account,
      isproxy: 0
    }).then((tx) => {
      // Refresh the bank account
      setTimeout(dispatch(getAccount(account)), 500);
      return dispatch({
        payload: { tx },
        type: types.SYSTEM_UNREGPROXY_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.SYSTEM_UNREGPROXY_FAILURE
    }));
  };
}

export default {
  unregproxy
};
