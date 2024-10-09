import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Header } from "../Header";
import { UserAccountContext } from "../_layout";

const EditClothesItem = () => {
  const [userAccount] = useContext(UserAccountContext);
  const [clotheItem, setClotheItem] = useState(null);
  const [topCategory, setTopCategory] = useState("");
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState("");

  const { item_id } = useLocalSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (item_id) {
      axios
        .get(
          `https://swagswapp-api.onrender.com/api/clothes/${userAccount.user_id}/${item_id}`
        )
        .then((response) => {
          const item = response.data[0];
          setClotheItem(item);
          setTopCategory(item.top_category);
          setCategory(item.category);
          setColor(item.color);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsError(`Failed to load item. Error: ${err}`);
          setIsLoading(false);
        });
    }
  }, [userAccount, item_id]);

  const handleSubmitEdit = () => {
    let newDetails = {
      top_category: topCategory,
      category: category,
      color: color,
    };

    axios
      .patch(
        `https://swagswapp-api.onrender.com/api/clothes/${userAccount.user_id}/${item_id}`,
        newDetails
      )
      .then(() => {
        Alert.alert("Success!", "Clothes updated successfully.");
        router.push({
          pathname: "/clothes/clothes_item",
          params: { item_id: clotheItem.item_id },
        });
      })
      .catch((err) => {
        Alert.alert("Error", `Failed to update clothes. Error: ${err}`);
      });
  };

  const handleDelete = () => {
    axios
      .delete(
        `https://swagswapp-api.onrender.com/api/clothes/${userAccount.user_id}/${item_id}`
      )
      .then(() => {
        Alert.alert("Success!", "Item deleted successfully.");
        router.push("/Dashboard");
      })
      .catch((err) => {
        Alert.alert("Error", `Failed to delete item. Error: ${err}`);
      });
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
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
    <ScrollView style={styles.container}>
      <Header onSearch={undefined} />
      <Text style={styles.name}>Editing Details</Text>
      <Image
        style={styles.image}
        source={{
          uri: clotheItem.img_url,
        }}
      />
      <Text style={styles.descriptionLabel}>Description:</Text>
      <Text style={styles.descriptionText}>
        {clotheItem.description || "This is a short description of the item."}
      </Text>

      <View style={styles.inputRow}>
        <Text style={styles.label}>Top Category:</Text>
        <TextInput
          style={styles.textInput}
          placeholder={`Top Category: ${clotheItem.top_category}`}
          value={topCategory}
          onChangeText={setTopCategory}
        />
      </View>

      <View style={styles.inputRow}>
        <Text style={styles.label}>Category:</Text>
        <TextInput
          style={styles.textInput}
          placeholder={clotheItem.category}
          value={category}
          onChangeText={setCategory}
        />
      </View>

      <View style={styles.inputRow}>
        <Text style={styles.label}>Color:</Text>
        <TextInput
          style={styles.textInput}
          placeholder={clotheItem.color}
          value={color}
          onChangeText={setColor}
        />
      </View>

      <Text style={styles.descriptionText}>
        Wear Frequency: {clotheItem.tags.wear_frequency}
      </Text>
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmitEdit}>
        <Text style={styles.buttonText}>Submit Changes</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.buttonText}>Delete Item</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f4f0",
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
    alignSelf: "center",
    borderColor: "#ddd",
    borderWidth: 1,
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#2f3640",
    marginBottom: 10,
    textAlign: "center",
  },
  descriptionLabel: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#2f3640",
  },
  descriptionText: {
    fontSize: 16,
    color: "#7f8c8d",
    marginBottom: 8,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    justifyContent: "space-between",
  },
  label: {
    fontSize: 16,
    color: "#2f3640",
    width: "30%",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    width: "65%",
  },
  submitButton: {
    backgroundColor: "#2f3640",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 20,
    color: "#2f3640",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 20,
    color: "#e74c3c",
  },

  deleteButton: {
    backgroundColor: "#FF0000",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
});

export default EditClothesItem;
