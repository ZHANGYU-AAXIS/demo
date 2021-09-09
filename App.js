import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NativeBaseProvider } from "native-base";

import Navigation from "./navigation";

import { AddressContext, Context, ListContext } from "./Context";

const Provider = (props) => {
  const [state, setState] = useState({});
  const [list, setList] = useState([]);
  const [address, setAddress] = useState([]);
  return (
    <Context.Provider value={{ state, setState }}>
      <ListContext.Provider value={{ list, setList }}>
        <AddressContext.Provider value={{ address, setAddress }}>
          {props.children}
        </AddressContext.Provider>
      </ListContext.Provider>
    </Context.Provider>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <NativeBaseProvider>
        <Provider>
          <Navigation />
        </Provider>
      </NativeBaseProvider>
      <StatusBar />
    </SafeAreaProvider>
  );
}
