import { createContext, useContext } from "react";
import io from "socket.io-client";
import feathers from "@feathersjs/feathers";
import feathersSocket from "@feathersjs/socketio-client";
import feathersAuth from "@feathersjs/authentication-client";

class Client {
  constructor() {
    let url = new URL(process.env.REACT_APP_SERVER_ORIGIN);
    const socket = io(url.toString());
    this.client = feathers();
    this.client.configure(feathersSocket(socket));
    this.client.configure(feathersAuth({
      storageKey: "accessToken"
    }))
    this.account = null;
  }


  doAuthenticate(authentication, params) {
    return this.client.authenticate(authentication, params);
  }
  doLogout() {
    return this.client.logout();
  }
  async doReAuthenticate(force) {
    const account = this.client.reAuthenticate(force);
    this.account = account.user;
    return account;
  }
  doGet(name) {
    return this.client.get(name);
  }

  get devices() { return this.client.service('devices'); }
  get dataLake() { return this.client.service('data-lake'); }
  get users() { return this.client.service('users'); }
}

export const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
  return (
    <ClientContext.Provider value={new Client()}>
      {children}
    </ClientContext.Provider>
  )
}

export const useClient = () => {
  const client = useContext(ClientContext);
  return client;
}