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
import { Logo } from "@/components/Logo";

export default function UserSignup() {
  const [userNameText, setUserNameText] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const [firstNameText, setFirstNameText] = useState("");
  const [lastNameText, setLastNameText] = useState("");
  const [userAccount, setUserAccount] = useContext(UserAccountContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  const router = useRouter();

  const handleSignup = () => {
    if (!firstNameText || !lastNameText || !userNameText || !passwordText) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
    const newUser = {
      username: userNameText,
      first_name: firstNameText,
      last_name: lastNameText,
      password: passwordText,
    };
    setIsLoading(true);
    axios
      .post(`https://swagswapp-api.onrender.com/api/users`, newUser)
      .then((response) => {
        setUserAccount(newUser);
        setIsLoading(false);
        Alert.alert("Success", "Account created successfully!");
        router.push("/camera/camera");
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError("Failed to create account.");
        Alert.alert("Error", "Account creation failed.");
      });
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#34495E" />
        <Text style={styles.loadingText}>Creating Account...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Logo size={350} useImage={true} />

      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstNameText}
        onChangeText={setFirstNameText}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastNameText}
        onChangeText={setLastNameText}
      />
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
      <CustomButton
        title="Signup"
        onPress={handleSignup}
        style={undefined}
        textStyle={undefined}
      />

      <Link style={styles.link} href="/user/userLogin">
        Already Have An Account? Log In!
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#f8f4f0",
    marginTop: -100,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#34495E",
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
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
    color: "#C79B71",
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
});
