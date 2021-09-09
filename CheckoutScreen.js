import * as React from "react";
import { StyleSheet, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { VStack, Button, Text, Input } from "native-base";
import axios from "axios";
import { useContext, useEffect } from "react";
import { Context } from "./App";

export default function CheckoutScreen({ navigation, route }) {
  const handleAddCard = () => {
    navigation.navigate("AddCard");
  };

  const { state, setState } = useContext(Context);

  useEffect(() => {
    axios
      .post("https://cert-xiecomm.paymetric.com/DIeComm/AccessToken", {
        MerchantGuid: "a94c7413-d1f1-45e3-9427-00408707bf69",
        SessionRequestType: 1,
        Signature: "0m6KhkLLNElTB7jjFXDemGnwqm1tsTa1QMHXjh/G41A=",
        MerchantDevelopmentEnvironment: "javascrpit",
        Packet: `<?xml version="1.0" encoding="utf-8"?><merchantHtmlPacketModel xmlns="Paymetric:XiIntercept:MerchantHtmlPacketModel"><iFramePacket><hostUri>http://localhost:8080/store</hostUri><cssUri>https://www.ferguson.com/css</cssUri></iFramePacket><templateHtml name="creditcard"><paymentTypes><paymentType type="american express" /><paymentType type="mastercard" /><paymentType type="visa" /></paymentTypes></templateHtml></merchantHtmlPacketModel>`,
      })
      .then((result) => {
        const [, merchantGuid] = result.data.match(
          /<MerchantGuid>(.*)<\/MerchantGuid>/
        );
        const [, accessToken] = result.data.match(
          /<AccessToken>(.*)<\/AccessToken>/
        );
        const [, signature] = result.data.match(/<Signature>(.*)<\/Signature>/);

        setState((p) => ({ ...p, merchantGuid, accessToken, signature }));
      });
  }, []);

  console.table(state);

  return (
    <SafeAreaView>
      <ScrollView>
        <VStack style={styles.container} space={2}>
          <Text style={[styles.title]}>Select Card for Payment</Text>
          <Button variant="ghost" onPress={handleAddCard}>
            Add New Card
          </Button>
          <Text>Billing</Text>
          <Input />
          <Input />
          <Input />
        </VStack>
      </ScrollView>
    </SafeAreaView>
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
