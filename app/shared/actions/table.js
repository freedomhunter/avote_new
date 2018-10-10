import concat from 'lodash/concat';

import * as types from './types';
import rsn from './helpers/rsn';

export function getTable(code, scope, table, limit = 1000, index = false, previous = false) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_GETTABLE_REQUEST
    });
    const { connection } = getState();
    const query = {
      json: true,
      code,
      scope,
      table,
      limit,
    };
    if (index && previous) {
      // Adding a space in front of every lower bounds
      //   related: https://github.com/ARISENIO/arisen/issues/4442
      query.lower_bound = ` ${previous[previous.length - 1][index]}`;
      query.table_key = index;
    }
    rsn(connection).getTableRows(query).then((results) => {
      const { more } = results;
      let { rows } = results;
      // If previous rows were returned
      if (previous) {
        // slice last element to avoid dupes
        previous.pop();
        // merge arrays
        rows = concat(previous, rows);
      }
      return dispatch({
        type: types.SYSTEM_GETTABLE_SUCCESS,
        payload: {
          code,
          more,
          rows,
          scope,
          table
        }
      });
    }).catch((err) => dispatch({
      type: types.SYSTEM_GETTABLE_FAILURE,
      payload: { err },
    }));
  };
}

export default {
  getTable
};
