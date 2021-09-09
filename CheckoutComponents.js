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
    <Box style={styles.card}>
      <Box style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.ccText}>{name}</Text>
        <Text style={styles.ccNumberText}>xxx-xxx-xxxxx-{last4}</Text>
        <Text style={styles.ccNumberText}>{exp}</Text>
      </Box>
    </Box>
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
