import React, { useState } from "react";
import { View, TextInput, Pressable, StyleSheet, Alert } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useRouter } from "expo-router";

export const Header = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    router.push("/user/userLogin");
  };

  const handleHome = () => {
    router.push("/Dashboard");
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchText);
    }
  };

  return (
    <View style={styles.header}>
      <Pressable style={styles.iconButton} onPress={handleHome}>
        <Icon name="home" size={30} color="#4B4B4B" />
      </Pressable>

      <TextInput
        placeholder="Search a keyword here"
        style={styles.searchBar}
        value={searchText}
        onChangeText={setSearchText}
        placeholderTextColor="#A0A0A0"
      />
      <Pressable onPress={handleSearch} style={styles.iconButton}>
        <Icon name="search" size={30} color="#4B4B4B" />
      </Pressable>

      <Pressable style={styles.iconButton} onPress={handleLogin}>
        <Icon name="person" size={30} color="#4B4B4B" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  searchBar: {
    flex: 1,
    marginHorizontal: 15,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: "#F9F9F9",
  },
  iconButton: {
    padding: 8,
    borderRadius: 50,
    backgroundColor: "#EFEFEF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2, // Elevation for shadow on Android
  },
});
