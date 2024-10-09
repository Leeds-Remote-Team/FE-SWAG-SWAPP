import React, { useState } from "react";
import { View, TextInput, Pressable, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { Logo } from "@/components/Logo";

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
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Pressable style={styles.iconButton} onPress={handleHome}>
          <Icon name="home" size={30} color="#C79B71" />
        </Pressable>

        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search a keyword here"
            style={styles.searchBar}
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor="#A0A0A0"
          />
          <Pressable onPress={handleSearch} style={styles.searchButton}>
            <Icon name="search" size={24} color="#C79B71" />
          </Pressable>
        </View>

        <Pressable style={styles.iconButton} onPress={handleLogin}>
          <Icon name="person" size={30} color="#C79B71" />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: "#F9F9F9",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  searchBar: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  searchButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  iconButton: {
    padding: 8,
    borderRadius: 50,
    backgroundColor: "#EFEFEF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2, 
    justifyContent: "center",
    alignItems: "center",
  },
});