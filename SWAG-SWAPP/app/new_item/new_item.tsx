import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  TextInput,
  ScrollView,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { ClothesContext } from "../_layout";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "expo-router";

const api = axios.create({
  baseURL: "https://swagswapp-api.onrender.com/api",
});

export default function newItem() {
  const [clothesItems, setClothesItems] = useContext(ClothesContext);
  const { Category, Color } = clothesItems[0]._tags_map;
  const TopCategory = clothesItems[0]._tags_map["Top Category"];
  const [posting, setPosting] = useState(true);
  const [postImage, setPostImage] = useState(clothesItems.url);
  const [cat, setCat] = useState(Category);
  const [topCat, setTopCat] = useState(TopCategory);
  const [colorTag, setColorTag] = useState(Color);
  const tags = clothesItems[0]._tags_map;
  const [tag, setTag] = useState(tags);
  const user_id = 3;
  const [clothesData, setClothesData] = useState({});
  const [clothesName, setClothesName] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (colorTag === undefined) setColorTag("None");
    
    tag.name = clothesName;
    tag.wear_frequency = 0;
    tag.date_last_worn = "New Item";
    tag.description = description;

    setClothesData({
      user_id: user_id,
      img_url: postImage,
      top_category: topCat,
      category: cat,
      tags: tag,
      color: colorTag,
    });
    setPosting(false);
  }, [clothesName, description]);

  const postClothes = (user_id, clothesData) => {
    return api.post(`/clothes/${user_id}`, clothesData);
  };

  const handlePress = () => {
    postClothes(user_id, clothesData).then((response) => {
      console.log(response.data.postedClothes);
    });
    router.push("/Dashboard");
  };

  const handleRetake = () => {
    setClothesItems([{ _tags_map: [] }]);
    router.push("/camera/camera");
  };

  const tagKeys = Object.keys({ ...tag });
  let tagValues = [Object.values(tag)];

  return (
    <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.container}>
            <Image style={styles.image} source={{ uri: postImage }} />

            <TextInput
              style={styles.input}
              placeholder="Enter name of item..."
              value={clothesName}
              onChangeText={setClothesName}
            />

            <View style={styles.tagContainer}>
              {tagKeys.map((tag, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>
                    {tag === "date_last_worn" || tag === "wear_frequency"
                      ? ""
                      : tag}{" "}
                    {tag === "wear_frequency"
                      ? "Never Worn"
                      : tagValues[0][index] === "New Item"
                      ? tagValues[0][index]
                      : ": " + tagValues[0][index]}
                  </Text>
                </View>
              ))}
            </View>

            <Text style={styles.descriptionLabel}>Description:</Text>
            <TextInput
              style={styles.descriptionInput}
              placeholder="This is a short description of the item."
              value={description}
              onChangeText={setDescription}
              multiline={true}
              numberOfLines={4}
            />
          </View>

          <View style={styles.addButtonContainer}>
            <Pressable
              onPress={handlePress}
              style={styles.addItemButton}
              disabled={posting}
            >
              <Text style={styles.addButtonText}>Add to Wardrobe</Text>
            </Pressable>

            <Pressable onPress={handleRetake} disabled={posting}>
              <Icon name="reload-circle" size={55} color="#C79B71" />
            </Pressable>
          </View>
        </ScrollView>
    </SafeAreaView>
  );
}

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
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: "#FFFFFF",
    color: "#2f3640",
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    marginVertical: 10,
  },
  tag: {
    backgroundColor: "#C79B71",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  tagText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  descriptionLabel: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#2f3640",
  },
  descriptionInput: {
    fontSize: 16,
    color: "#7F8C8D",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    backgroundColor: "#FFFFFF",
    marginBottom: 20,
    height: 100,
    textAlignVertical: "top",
  },
  addButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 20,
  },
  addItemButton: {
    backgroundColor: "#C79B71",
    padding: 15,
    borderRadius: 50,
    width: "60%",
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  scrollView: {
    paddingBottom: 100,
  },
});