import * as React from "react";
import { WebView } from "react-native-webview";
import { Alert, Text, Toast } from "native-base";
import { useContext } from "react";
import { Context, ListContext } from "./Context";
import axios from "axios";
const parseString = require("react-native-xml2js").parseString;

const CheckoutAddCardScreen = ({ navigation }) => {
  const { state } = useContext(Context);
  const { setList } = useContext(ListContext);

  const { AccessToken } = state;

  return (
    <WebView
      onMessage={(event) => {
        const { data } = JSON.parse(event.nativeEvent.data);
        if (data.HasPassed) {
          axios
            .get("https://cert-xiecomm.paymetric.com/DIeComm/ResponsePacket", {
              params: state,
            })
            .then((result) => {
              parseString(result.data, (err, result) => {
                const {
                  PaymetricResponse: {
                    Fields: [{ FormField }],
                  },
                } = result;
                const values = {};
                FormField.forEach((item) => {
                  const {
                    Name: [name],
                    Value: [value],
                  } = item;
                  values[name] = value;
                });
                setList((p) => [...p, values]);

                navigation.goBack();
              });
            });
        }
      }}
      style={{ flex: 1 }}
      originWhitelist={["*"]}
      source={{
        uri: `http://localhost:5000?token=${AccessToken}`,
      }}
    />
  );
};

export default CheckoutAddCardScreen;
