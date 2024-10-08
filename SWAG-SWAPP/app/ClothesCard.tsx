import React from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";

export const ClothesCard = ({ title, image }) => {
  const router = useRouter();

  const handleClothes = () => {
    Alert.alert("Success!", "Welcome To Single Clothe Page.");
    router.push("/clothes/clothes_item");
  };

  return (
    <View style={styles.section}>
      <TouchableOpacity onPress={handleClothes}>
        <Image source={image} style={styles.cardPlaceholder} />
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  cardPlaceholder: {
    width: 120,
    height: 120,
    backgroundColor: "#ccc",
    borderRadius: 10,
    marginHorizontal: 5,
  },
});
