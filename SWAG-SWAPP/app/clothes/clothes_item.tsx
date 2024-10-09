import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Alert,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Header } from "../Header";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import { UserAccountContext } from "../_layout";
import { DescriptionContext } from "../_layout";

const clothes_item = () => {
  const [userAccount] = useContext(UserAccountContext);
  const [clotheItem, setClotheItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);
  const [description, setDescription] = useContext(DescriptionContext);

  const { item_id } = useLocalSearchParams();

  const router = useRouter();

  useEffect(() => {
    if (item_id) {
      axios
        .get(
          `https://swagswapp-api.onrender.com/api/clothes/${userAccount.user_id}/${item_id}`
        )
        .then((response) => {
          setClotheItem(response.data[0]);

          setIsLoading(false);
        })
        .catch((err) => {
          setIsError(`Fail to load item. Error: ${err}`);
          setIsLoading(false);
        });
    }
  }, [userAccount, item_id]);

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

  if (!clotheItem) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No such clothing item!</Text>
      </View>
    );
  }

  let tags = clotheItem.tags;
  for (let item in tags) {
    if (item === "") {
      delete tags[item];
    }
  }

  tags = [Object.values(tags)];


  const handleWearToday = () => {
    let newWearUpdate = {
      last_date_worn: new Date().toISOString().split("T")[0],
      wear_frequency: clotheItem.tags.wear_frequency + 1,
    };
    axios
      .patch(
        `https://swagswapp-api.onrender.com/api/clothes/${userAccount.user_id}/${item_id}`,
        newWearUpdate
      )
      .then(() => {
        setClotheItem((prevState) => ({
          ...prevState,
          tags: {
            ...prevState.tags,
            last_date_worn: new Date().toISOString().split("T")[0],
            wear_frequency: prevState.tags.wear_frequency + 1,
          },
        }));
        Alert.alert("Success", "You are wearing this item today!");
      })
      .catch((err) => {
        Alert.alert("Error", `You can't wear this today. Error: ${err}`);
      });
  };

  const handleEdit = () => {
    setDescription(
      clotheItem.tags.description || "this is a short description"
    );
    router.push({
      pathname: "/clothes/editClothesItem",
      params: {
        item_id: clotheItem.item_id,
      },
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <ScrollView>
          <Header onSearch={undefined} />
          <Text style={styles.name}>
            {clotheItem.tags.name ? clotheItem.tags.name : clotheItem.category}
          </Text>
          <Image
            style={styles.image}
            source={{
              uri: clotheItem.img_url,
            }}
          />
          <View style={styles.tagContainer}>
            {tags[0].map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.descriptionLabel}>Description:</Text>
          <Text style={styles.descriptionText}>
            {description
              ? description
              : clotheItem.tags.description || "this is a short description"}
          </Text>
          <Text style={styles.descriptionText}>
            Top Category: {clotheItem.top_category}
          </Text>
          <Text style={styles.descriptionText}>
            Category: {clotheItem.category}
          </Text>
          <Text style={styles.descriptionText}>
            Last Worn: {clotheItem.tags.last_date_worn}
          </Text>
          <Text style={styles.descriptionText}>
            Wear Frequency: {clotheItem.tags.wear_frequency}
          </Text>
          <Pressable style={styles.wearTodayButton} onPress={handleWearToday}>
            <Text style={styles.buttonText}>Wear Today</Text>
          </Pressable>
          <Pressable style={styles.editButton} onPress={handleEdit}>
            <Text style={styles.buttonText}>Edit Details</Text>
          </Pressable>
        </ScrollView>
      </View>
    </SafeAreaView>
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
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: 15,
  },
  tag: {
    backgroundColor: "#ececec",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 15,
    marginHorizontal: 5,
    marginBottom: 10,
  },
  tagText: {
    color: "#2f3640",
    fontSize: 14,
    fontWeight: "bold",
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
  wearTodayButton: {
    backgroundColor: "#C79B71",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  editButton: {
    backgroundColor: "#C79B71",
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
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
});

export default clothes_item;
