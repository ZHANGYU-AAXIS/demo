import * as React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { VStack, Button, Text, Alert, Input } from "native-base";
import axios from "axios";
import { useContext, useEffect, useRef } from "react";
import { Context, ListContext } from "./Context";

export default function CheckoutScreen({ navigation, route }) {
  const handleAddCard = () => {
    navigation.navigate("AddCard");
  };

  const { state, setState } = useContext(Context);

  const { list } = useContext(ListContext);

  const prevList = useRef(list);

  useEffect(() => {
    prevList.current = list;
  }, [list]);

  useEffect(() => {
    axios
      .post("https://cert-xiecomm.paymetric.com/DIeComm/AccessToken", {
        MerchantGuid: "a94c7413-d1f1-45e3-9427-00408707bf69",
        SessionRequestType: 1,
        Signature: "LVnPPR9oaSx/kSeGq5VzswQ/JnFvMrAvl/n2bW4STdQ=",
        MerchantDevelopmentEnvironment: "javascrpit",
        Packet: `<?xml version="1.0" encoding="utf-8"?><merchantHtmlPacketModel xmlns="Paymetric:XiIntercept:MerchantHtmlPacketModel"><iFramePacket><hostUri>http://localhost:8080/store</hostUri><cssUri>http://localhost:5000/iframe.css</cssUri></iFramePacket><templateHtml name="creditcard"><paymentTypes><paymentType type="american express" /><paymentType type="mastercard" /><paymentType type="visa" /></paymentTypes></templateHtml></merchantHtmlPacketModel>`,
      })
      .then((result) => {
        const [, MerchantGuid] = result.data.match(
          /<MerchantGuid>(.*)<\/MerchantGuid>/
        );
        const [, AccessToken] = result.data.match(
          /<AccessToken>(.*)<\/AccessToken>/
        );
        const [, Signature] = result.data.match(/<Signature>(.*)<\/Signature>/);

        setState({ MerchantGuid, AccessToken, Signature });
      });
    return () => {
      setState({});
    };
  }, []);

  console.log(state.AccessToken);

  const newItem =
    prevList.current.length !== list.length ? list[list.length - 1] : null;

  return (
    <ScrollView>
      <VStack style={styles.container} space={2}>
        <Text style={[styles.title]}>Credit Card Details</Text>
        {newItem ? (
          <Alert flex={1} status="success">
            <Alert.Icon />
            <Alert.Description>
              <Text>Your Visa ending in has been added.</Text>
            </Alert.Description>
          </Alert>
        ) : (
          <Button
            variant="ghost"
            isDisabled={!state.AccessToken}
            onPress={handleAddCard}
          >
            Add New Card
          </Button>
        )}
        <Text style={[styles.title]}>Billing Address</Text>
        <Text>Name</Text>
        <Input />
        <Text>Company</Text>
        <Input />
        <Text>Address</Text>
        <Input />
        <Text>City</Text>
        <Input />
      </VStack>
      <Button m="16px" onPress={() => navigation.goBack()}>
        Save and Continue
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  content: {
    backgroundColor: "#d8d8d8",
    width: "100%",
    height: 80,
    borderRadius: 16,
  },
});
