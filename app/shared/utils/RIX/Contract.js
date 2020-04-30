import { forOwn, find, map, pick } from 'lodash';

// const Rsn = require('@arisencore/js');
import { Api, JsonRpc, RpcError } from '@arisencore/js';
import { JsSignatureProvider } from '@arisencore/js/dist/rixjs-jssig';
const fetch = require('node-fetch');  

const rpc = new JsonRpc('https://greatchains.arisennodes.io', { fetch });
const api = new Api({ rpc })

export const typeMap = {
  bool: 'bool',
  int8: 'int',
  int16: 'int',
  int32: 'int',
  int64: 'int',
  int128: 'int',
  int256: 'int',
  uint8: 'int',
  uint16: 'int',
  uint32: 'int',
  uint64: 'int',
  uint128: 'int',
  uint256: 'int',
};

export default class RIXContract {
  constructor(abi, account = undefined) {
    this.account = account;
    this.abi = abi;
    this.typeMap = typeMap;

    forOwn(abi.types, (type) => {
      if (type.type in this.typeMap) {
        this.typeMap[type.new_type_name] = this.typeMap[type.type];
      }
    });
  }

  async tx(actionName, account, data) {
    //   const rix = Api({
    //     broadcast: false,
    //     expireInSeconds: 3600,
    //     forceActionDataHex: false,
    //     httpEndpoint: null,
    //     sign: false
    //   });
    //   return rix.transaction({
    //     actions: [
    //       {
    //         account: this.account,
    //         name: actionName,
    //         authorization: [{
    //           actor: account,
    //           permission: 'active'
    //         }],
    //         data
    //       }
    //     ]
    //   }, {
    //     broadcast: false,
    //     sign: false
    //   });
    // }
    return await api.transact({
      actions: [
        {
          account: this.account,
          name: actionName,
          authorization: [{
            actor: account,
            permission: 'active'
          }],
          data
        }
      ]
    }, {
      blocksBehind: 3,
      expireSeconds: 30,
    });
}

getAction(name) {
  return find(this.abi.actions, { name });
}

getActions() {
  return this.abi.actions;
}

getField(struct, name) {
  return find(this.getStruct(struct).fields, { name });
}

getFields(name) {
  const struct = this.getStruct(name);
  if (struct && struct.fields) return struct.fields;
  return [];
}

getFieldType(struct, name) {
  const field = this.getField(struct, name);
  if (field && field.type in this.typeMap) {
    return this.typeMap[field.type];
  }
  return 'string';
}

getStruct(name) {
  return find(this.abi.structs, { name });
}

getTable(name) {
  return find(this.abi.tables, { name });
}

getTables() {
  return this.abi.tables;
}

json() {
  const fields = ['abi', 'account'];
  const data = map(this, (o) => pick(o, fields));
  return JSON.stringify(data, null, 2);
}
}
