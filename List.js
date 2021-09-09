import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  ScrollView,
  VStack,
  Icon,
  Text,
  Switch,
  HStack,
  Radio,
} from "native-base";
import { AddressContext, Context, ListContext } from "./Context";
import { useNavigation } from "@react-navigation/native";
import { CreditCard } from "./CheckoutComponents";
import axios from "axios";
import { SafeAreaView } from "react-native";

export const addNew = { current: false };

const List = () => {
  const [toggle, setToggle] = useState(false);
  const { state, setState } = useContext(Context);
  const { list } = useContext(ListContext);
  const { address } = useContext(AddressContext);

  const { navigate } = useNavigation();

  useEffect(() => {
    axios
      .post("https://cert-xiecomm.paymetric.com/DIeComm/AccessToken", {
        MerchantGuid: "a94c7413-d1f1-45e3-9427-00408707bf69",
        SessionRequestType: 1,
        Signature: "hJfj2y5N2j0EU1g5hgsGJmf4S+17q9uxNt7bwYr3XX0=",
        MerchantDevelopmentEnvironment: "javascrpit",
        Packet: `<?xml version="1.0" encoding="utf-8"?><merchantHtmlPacketModel xmlns="Paymetric:XiIntercept:MerchantHtmlPacketModel"><iFramePacket><hostUri>https://zhangyu-aaxis.github.io/demo</hostUri><cssUri>https://zhangyu-aaxis.github.io/demo/iframe.css</cssUri></iFramePacket><templateHtml name="creditcard"><paymentTypes><paymentType type="american express" /><paymentType type="mastercard" /><paymentType type="visa" /></paymentTypes></templateHtml></merchantHtmlPacketModel>`,
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
  }, [list]);

  return (
    <VStack bg="white" flex={1}>
      <SafeAreaView style={{ flex: 1 }}>
        <HStack p="12px" justifyContent="flex-end" alignItems="center">
          <Radio.Group onChange={setToggle} defaultValue={false}>
            <Radio value={true}>Workflow 1</Radio>
            <Radio value={false}>Workflow 2</Radio>
          </Radio.Group>
        </HStack>
        <ScrollView flex={1}>
          {list.length !== 0 && (
            <Text fontSize="lg" my={3} fontWeight="bold">
              Credit Cards
            </Text>
          )}
          {list.map((item) => (
            <CreditCard
              name={item["Card Holder Name"]}
              last4={item["Card Number"].split("-")[2]}
              exp={`${item["Expiration Month"]}/${item["Expiration Year"]}`}
            />
          ))}
          {address.length !== 0 && (
            <Text fontSize="lg" my={3} fontWeight="bold">
              Addresses
            </Text>
          )}
          {address.map((item) =>
            !item.name ? null : (
              <CreditCard
                name={`${item.name} (${item.company})`}
                exp={item.address}
              />
            )
          )}
        </ScrollView>
        <Button
          isDisabled={!state.AccessToken}
          variant="ghost"
          onPress={() => {
            addNew.current = false;

            if (toggle) {
              navigate("Add Card", { page: true });
            } else {
              navigate("Add Credit Card");
            }
          }}
        >
          Add New Payment
        </Button>
      </SafeAreaView>
    </VStack>
  );
};

export default List;
