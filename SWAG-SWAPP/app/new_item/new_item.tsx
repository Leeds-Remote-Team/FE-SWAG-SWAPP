import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  Pressable,
  TextInput,
  ScrollView,
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
  const [postImage, setPostImage] = useState(clothesItems.url); // image url
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

  console.log(clothesItems);

  useEffect(() => {
    tag.name = clothesName;
    tag.wear_frequency = 0;
    tag.date_last_worn = "00/00/0000";
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
    console.log("In handler");
    setClothesItems([{ _tags_map: [] }]);
    router.push("/camera/camera");
  };
  const tagKeys = Object.keys({ ...tag });
  let tagValues = [];
  tagValues = [Object.values(tag)];

  return (
    <View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <Image style={styles.image} source={postImage} src={postImage} />
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
                  {tag}: {tagValues[0][index]}
                </Text>
              </View>
            ))}
          </View>

          <Text style={styles.descriptionLabel}>Description:</Text>
          <TextInput
            style={styles.descriptionText}
            placeholder="This is a short description of the item."
            value={description}
            onChangeText={setDescription}
          />
        </View>
        <View style={styles.addButtonContainer}>
          <Pressable
            onPress={handlePress}
            style={styles.addItemButton}
            disabled={posting}
          >
            <Text style={styles.addButtonText}> Add to Wardrobe </Text>
          </Pressable>
          <Pressable onPress={handleRetake} disabled={posting}>
            <Icon name="reload-circle" size={55} />
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  clothesImage: {
    width: 50,
    height: 50,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
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
    fontSize: 24,
    fontWeight: "bold",
    color: "#34495E",
    marginBottom: 10,
    textAlign: "center",
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: 10,
  },
  tag: {
    display: "flex",
    backgroundColor: "#3498db",
    paddingVertical: 5,
    height: 35,
    width: "auto",

    justifyContent: "center",
    paddingHorizontal: 10,
    borderRadius: 20,
    marginHorizontal: 5,
    marginBottom: 10,
  },
  tagText: {
    display: "flex",
    color: "#fff",
    fontSize: 14,
    justifyContent: "center",
  },
  descriptionLabel: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#2C3E50",
  },
  descriptionText: {
    fontSize: 16,
    color: "#7F8C8D",
    marginBottom: 5,
    height: 60,
    paddingLeft: 10,
  },

  buttonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: "#FFFFFF",
    color: "black",
  },
  scrollView: {
    paddingBottom: 100,
  },
  addButton: {
    display: "flex",
    backgroundColor: "#3498db",
    paddingVertical: 5,
    height: 35,
    width: "auto",

    justifyContent: "center",
    paddingHorizontal: 10,
    borderRadius: 20,
    marginHorizontal: 5,
    marginBottom: 10,
  },
  addButtonText: {
    display: "flex",
    color: "white",
    fontSize: 14,
    justifyContent: "center",
  },
  addButtonContainer: {
    position: "absolute",
    bottom: 0,
    right: 5,
    left: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  addItemButton: {
    backgroundColor: "#2f3640",
    padding: 15,
    borderRadius: 50,
  },
});
