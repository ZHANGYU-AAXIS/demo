import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NativeBaseProvider } from "native-base";

import Navigation from "./navigation";

export const Context = React.createContext(null);

export default function App() {
  const [state, setState] = useState({});
  return (
    <SafeAreaProvider>
      <NativeBaseProvider>
        <Context.Provider value={{ state, setState }}>
          <Navigation />
        </Context.Provider>
      </NativeBaseProvider>
      <StatusBar />
    </SafeAreaProvider>
  );
}
