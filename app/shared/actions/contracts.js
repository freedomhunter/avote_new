import * as types from './types';
import RIXContract from '../utils/RIX/Contract';
import rix from './helpers/rix';

export function getAbi(account) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_GETABI_REQUEST
    });
    const { connection } = getState();
    return rix(connection, true).getAbi(account).then((contract) => {
      if (!contract.abi) {
        return dispatch({
          type: types.SYSTEM_GETABI_FAILURE
        });
      }
      return dispatch({
        payload: {
          contract
        },
        type: types.SYSTEM_GETABI_SUCCESS
      });
    }).catch((err) => dispatch({
      type: types.SYSTEM_GETABI_FAILURE,
      payload: { err },
    }));
  };
}

export default {
  getAbi
};
