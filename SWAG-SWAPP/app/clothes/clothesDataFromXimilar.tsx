import React from "react";
import {
  Button,
  Image,
  Text,
  TextInput,
  View,
  StyleSheet,
  Alert,
} from "react-native";
import { useState, createContext, useContext } from "react";
import { Link } from "expo-router";
import { UserAccountContext } from "../_layout";
import { Header } from "../Header";

export default function clothes() {
  const userAccount = useContext(UserAccountContext);
  const [userNameText, setUserNameText] = useState("");
  const [passwordText, setPasswordText] = useState("");

  return (
    <View style={styles.container}>
      <Header />
      <Text>{"name"}</Text>
      <img src="" alt="" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
});
