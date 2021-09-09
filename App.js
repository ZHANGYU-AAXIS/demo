import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NativeBaseProvider } from "native-base";

import Navigation from "./navigation";

import { Context, ListContext } from "./Context";

const Provider = (props) => {
  const [state, setState] = useState({});
  const [list, setList] = useState([]);
  return (
    <Context.Provider value={{ state, setState }}>
      <ListContext.Provider value={{ list, setList }}>
        {props.children}
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
