import React from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Image,
} from "react-native";
import { useRouter } from "expo-router";

export const ClothesContainer = ({ title, items, onItemClick }) => {
  const router = useRouter();

  const handleClothes = (item_id) => {
    router.push({
      pathname: "/clothes/clothes_item",
      params: { item_id },
    });
  };

  return (
    <View style={styles.section}>
      <Text style={styles.title}>{title}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {items.map((item) => (
          <Pressable
            key={item.item_id}
            style={styles.card}
            onPress={() => onItemClick(item)}
          >
            <Image source={{ uri: item.img_url }} style={styles.image} />
            <Text style={styles.itemText}>{item.category}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginVertical: 20,
    paddingLeft: 10,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#4B4B4B",
  },
  card: {
    width: 130,
    height: 160,
    backgroundColor: "#F5F5F5",
    borderRadius: 15,
    marginRight: 15,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#E0E0E0",
  },
  itemText: {
    fontSize: 14,
    color: "#34495E",
    fontWeight: "500",
    textAlign: "center",
  },
});
