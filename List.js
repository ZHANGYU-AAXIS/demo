import React, { useContext } from "react";
import { Button, ScrollView, VStack, Icon } from "native-base";
import { ListContext } from "./Context";
import { useNavigation } from "@react-navigation/native";
import { CreditCard } from "./CheckoutComponents";

const List = () => {
  const { list } = useContext(ListContext);

  const { navigate } = useNavigation();

  return (
    <VStack bg="white" flex={1}>
      <ScrollView flex={1}>
        {list.map((item) => (
          <CreditCard
            name={item["Card Holder Name"]}
            last4={item["Card Number"].split("-")[2]}
            exp={`${item["Expiration Month"]}/${item["Expiration Year"]}`}
          />
        ))}
      </ScrollView>
      <Button
        variant="ghost"
        onPress={() => {
          navigate("Add Credit Card");
        }}
      >
        Add New Payment
      </Button>
    </VStack>
  );
};

export default List;
