import * as React from "react";
import { WebView } from "react-native-webview";
import { Alert, Text, Toast } from "native-base";
import { useContext } from "react";
import { AddressContext, Context, ListContext } from "./Context";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import { addNew } from "./List";
const parseString = require("react-native-xml2js").parseString;

const CheckoutAddCardScreen = ({ navigation }) => {
  const { state } = useContext(Context);
  const { setList } = useContext(ListContext);
  const { setAddress } = useContext(AddressContext);

  const { params } = useRoute();

  const { page } = params ?? {};

  const { AccessToken } = state;

  return (
    <WebView
      onMessage={(event) => {
        const { data, name, company, address, city } = JSON.parse(
          event.nativeEvent.data
        );
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
                setAddress((p) => [...p, { name, company, address, city }]);
                addNew.current = true;
                navigation.goBack();
              });
            });
        }
      }}
      style={{ flex: 1 }}
      originWhitelist={["*"]}
      source={{
        uri: `https://zhangyu-aaxis.github.io/demo?token=${AccessToken}&billing=${!!page}`,
      }}
    />
  );
};

export default CheckoutAddCardScreen;
