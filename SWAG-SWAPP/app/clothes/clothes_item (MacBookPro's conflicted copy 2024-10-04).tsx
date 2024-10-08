import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Header } from "../Header";
import axios from "axios";
import { useState, createContext, useContext } from "react";
import { Link } from "expo-router";
import { UserAccountContext } from "../_layout";

const clothes_item = () => {
  //   const userAccount = useContext(UserAccountContext);
  const id = 1;
  const [clotheItem, setClotheItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    axios
      .get(`https://swagswapp-api.onrender.com/api/clothes/${id}/1`)
      .then((response) => {
        setClotheItem(response.data[0]);
      });
  }, []);

  console.log(clotheItem);

  const tags = ["Top Category", "Category", "Color"];
  const handleWearToday = () => {
    Alert.alert("Marked as Worn", "You are wearing this item today!");
  };
  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.name}>Clothes Item Name</Text>
      <Image
        style={styles.image}
        source={{ uri: "https://img.icons8.com/ios/5000/eeeeee/jumper.png" }}
      />
      <View style={styles.tagContainer}>
        {tags.map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.descriptionLabel}>Description:</Text>
      <Text style={styles.descriptionText}>
        This is a short description of the item.
      </Text>
      <Text style={styles.descriptionText}>Last Worn: 10/08/2024</Text>
      <Text style={styles.descriptionText}>Wear Frequency: 5</Text>
      <TouchableOpacity
        style={styles.wearTodayButton}
        onPress={handleWearToday}
      >
        <Text style={styles.buttonText}>Wear Today</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.wearTodayButton}
        onPress={handleWearToday}
      >
        <Text style={styles.buttonText}>Edit Details</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
    alignSelf: "center",
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
    backgroundColor: "#3498DB",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginHorizontal: 5,
    marginBottom: 10,
  },
  tagText: {
    color: "#fff",
    fontSize: 14,
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
  },
  wearTodayButton: {
    backgroundColor: "#1E8449",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default clothes_item;

// import React from "react";
// import {
//   Button,
//   Image,
//   Text,
//   TextInput,
//   View,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
// } from "react-native";
// import { useState, createContext, useContext } from "react";
// import { Link } from "expo-router";
// import { UserAccountContext } from "../_layout";
// import { Header } from "../Header";

// export default function clothes() {
//   const userAccount = useContext(UserAccountContext);

//   return (
//     <View style={styles.itemImageContainer}>
//       <Header />
//       <Text style={styles.descriptionLabel}>Clothes Item</Text>
//       <Image
//         source={{ uri: "https://img.icons8.com/ios/100/000000/jumper.png" }}
//         style={styles.itemImage}
//       />

//       <View style={styles.tagContainer}>
//         {["Top Category", "Category", "Color"].map((tag, index) => (
//           <View key={index} style={styles.tag}>
//             <Button title={tag} />
//           </View>
//         ))}
//       </View>

//       <Text style={styles.descriptionLabel}>Description</Text>
//       <Text style={styles.descriptionText}> random text description </Text>

//       <Text style={styles.descriptionText}>Last Worn: 04/10/2024</Text>
//       <Text style={styles.descriptionText}>Wear Frequency: 5</Text>

//       <TouchableOpacity style={styles.wearTodayButton}>
//         <Text style={styles.buttonText}>Wearing Today</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     color: "grey",
//   },
//   itemImageContainer: {
//     alignItems: "center",
//     marginVertical: 20,
//     padding: 20,
//     backgroundColor: "#fff",
//     borderRadius: 20,
//   },
//   itemImage: {
//     width: 200,
//     height: 200,
//     resizeMode: "contain",
//     borderRadius: 10,
//     marginBottom: 20,
//   },
//   wearTodayButton: {
//     alignSelf: "center",
//     backgroundColor: "#4CAF50",
//     padding: 10,
//   },
//   buttonText: {
//     fontWeight: "bold",
//     color: "#fff",
//   },
//   tagContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginBottom: 20,
//     flexWrap: "wrap",
//     marginVertical: 10,
//   },
//   tag: {
//     backgroundColor: "#ddd",
//     paddingHorizontal: 15,
//     paddingVertical: 5,
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     marginBottom: 10
//   },
//   descriptionLabel: {
//     fontWeight: "bold",
//     fontSize: 16,
//     marginBottom: 10,
//     color: "#333",
//   },
//   descriptionText: {
//     fontSize: 16,
//     color: "#555",
//     marginBottom: 10,
//     justifyContent: "space-between",
//   },
// });

// // Get hold of the single clothe id which is item_id.
// //useEffect to fetch the item through query database
// //Extract the datas from our database and Ximilar Api to be able to design our page
// //Design the page with the data.

// //This page will get hold of the data from API and dispaly properly.
// //2 Pages
// //1 from the Ximilar API and
// //2 from the main main page ---> when a user clicks an item in the page.
