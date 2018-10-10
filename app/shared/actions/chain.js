import * as types from './types';

import rsn from './helpers/rsn';

export function getInfo() {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.GET_CHAIN_INFO_REQUEST
    });
    const { connection } = getState();
    rsn(connection).getInfo(true).then((chain) => dispatch({
      type: types.GET_CHAIN_INFO_SUCCESS,
      payload: { chain }
    })).catch((err) => dispatch({
      type: types.GET_CHAIN_INFO_FAILURE,
      payload: { err },
    }));
  };
}

export default {
  getInfo
};
