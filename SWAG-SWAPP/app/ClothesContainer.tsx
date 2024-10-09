import React from "react";
import { View, Text, ScrollView, Pressable, StyleSheet, Image } from "react-native";
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
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
        {items.map((item) => (
          <Pressable
            key={item.item_id}
            style={styles.card}
            onPress={() => onItemClick(item)}
          >
            <Image source={{ uri: item.img_url }} style={styles.image} />
            <Text style={styles.itemText}>
              {item.tags.name ? item.tags.name : item.category}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginVertical: 15,
    paddingLeft: 10,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#4B4B4B",
  },
  scrollView: {
    paddingVertical: 5, 
  },
  card: {
    width: 120,
    height: 170,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginRight: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 8,
    backgroundColor: "#F0F0F0",
  },
  itemText: {
    fontSize: 14,
    color: "#34495E",
    fontWeight: "500",
    textAlign: "center",
    paddingHorizontal: 5,
  },
});