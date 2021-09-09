import * as React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { VStack, Button, Text, Alert, Input } from "native-base";
import { useContext, useEffect, useRef, useState } from "react";
import { AddressContext, Context, ListContext } from "./Context";
import { addNew } from "./List";

export default function CheckoutScreen({ navigation }) {
  const handleAddCard = () => {
    navigation.navigate("Add Card");
  };

  const { state } = useContext(Context);

  const { list } = useContext(ListContext);

  const { setAddress } = useContext(AddressContext);

  const [form, setForm] = useState({});

  const prevList = useRef(list);

  useEffect(() => {
    prevList.current = list;
  }, [list]);

  console.log(state.AccessToken);

  return (
    <ScrollView>
      <VStack style={styles.container} space={2}>
        <Text style={[styles.title]}>Credit Card Details</Text>
        {addNew.current ? (
          <Alert flex={1} status="success">
            <Alert.Icon />
            <Alert.Description>
              <Text>Your Visa card has been added.</Text>
            </Alert.Description>
          </Alert>
        ) : (
          <Button variant="ghost" onPress={handleAddCard}>
            Add New Card
          </Button>
        )}
        <Text style={[styles.title]}>Billing Address</Text>
        <Text>Name</Text>
        <Input
          value={form.name}
          onChangeText={(text) => setForm((p) => ({ ...p, name: text }))}
        />
        <Text>Company</Text>
        <Input
          value={form.company}
          onChangeText={(text) => setForm((p) => ({ ...p, company: text }))}
        />
        <Text>Address</Text>
        <Input
          value={form.address}
          onChangeText={(text) => setForm((p) => ({ ...p, address: text }))}
        />
        <Text>City</Text>
        <Input
          value={form.city}
          onChangeText={(text) => setForm((p) => ({ ...p, city: text }))}
        />
      </VStack>
      <Button
        m="16px"
        onPress={() => {
          setAddress((p) => [...p, form]);
          navigation.goBack();
        }}
      >
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
