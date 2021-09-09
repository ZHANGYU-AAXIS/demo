import * as React from "react";
import { StyleSheet } from "react-native";
import { Box, Radio, Text, VStack, HStack } from "native-base";

const TextRow = () => <Box style={styles.textRow} />;

export const Filler = () => (
  <Box style={styles.content}>
    <VStack space={2}>
      <TextRow />
      <TextRow />
    </VStack>
  </Box>
);

export const Address = () => {
  return (
    <Box style={styles.content}>
      <HStack space={1}>
        <Radio.Group
          name="myRadioGroup"
          accessibilityLabel="favorite number"
          value={0}
          onChange={() => {}}
        >
          <Radio value="one" my={1}>
            <Box />
          </Radio>
        </Radio.Group>
        <VStack style={{ flex: 1 }} space={2}>
          <TextRow />
          <TextRow />
        </VStack>
      </HStack>
    </Box>
  );
};

export const CreditCard = ({ name, last4, exp }) => {
  return (
    <VStack bg="#E6F2FE" p="8px" mb='8px'>
      <Text color="#1379C8" fontWeight="600">
        {name}
      </Text>
      <HStack justifyContent="space-between">
        <Text color="#1379C8">xxx-xxx-xxxxx-{last4}</Text>
        <Text color="#1379C8">{exp}</Text>
      </HStack>
    </VStack>
  );
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: "#e3e3e3",
    width: "100%",
    height: 80,
    borderRadius: 16,
    padding: 16,
  },
  textRow: {
    width: "100%",
    height: 20,
    backgroundColor: "#d8d8d8",
  },
  card: {
    borderRadius: 16,
    padding: 16,
    width: "100%",
    backgroundColor: "#e3f4ff",
  },
  ccText: {
    fontSize: 13,
  },
  ccNumberText: {
    fontSize: 11,
  },
});
