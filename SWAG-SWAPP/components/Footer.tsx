import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Link } from "expo-router";

export const Footer = () => {
  return (
    <View style={styles.footerContainer}>
      <Pressable style={styles.addButton}>
        <Link href="/camera/camera">
          <Icon name="add" size={40} color="white" />
        </Link>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#FFFFFF",
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  addButton: {
    backgroundColor: "#C79B71",
    padding: 20,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
});