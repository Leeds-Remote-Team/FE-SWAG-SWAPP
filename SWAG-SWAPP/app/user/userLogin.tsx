import React, { useState, useContext } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { Link } from "expo-router";
import { useRouter } from "expo-router";
import { UserAccountContext } from "../_layout";
import CustomButton from "../../components/CustomButton";

export default function UserLogin() {
  const [userNameText, setUserNameText] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const [userAccount, setUserAccount] = useContext(UserAccountContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  const router = useRouter();

  const handleLogin = () => {
    if (!userNameText || !passwordText) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
    setIsLoading(true);
    axios
      .get(`https://swagswapp-api.onrender.com/api/users/3`)
      .then((response) => {
        setUserAccount(response.data);
        setIsLoading(false);
        Alert.alert("Success", "Login Successful!");
        router.push("/Dashboard");
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError("Invalid username or password.");
        Alert.alert("Error", "Invalid username or password.");
      });
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#34495E" />
        <Text style={styles.loadingText}>Retrieving User Details...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{isError}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={userNameText}
        onChangeText={setUserNameText}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={passwordText}
        onChangeText={setPasswordText}
        secureTextEntry
      />
      <CustomButton title="Login" onPress={handleLogin} style={undefined} textStyle={undefined} />

      <Link style={styles.link} href="/user/userSignup">
        Don't Have an Account? Signup!
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#34495E",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: "#FFFFFF",
  },
  link: {
    marginTop: 15,
    textAlign: "center",
    color: "#34495E",
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#34495E",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "#D32F2F",
    textAlign: "center",
  },
});