import React, { useContext, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Alert,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Header } from "./Header";
import { Link } from "expo-router";
import { ClothesContainer } from "./ClothesContainer";
import { fetchAllAccessories } from "../Helpers/fetchAllAccessories";
import {
  fetchMostPopularClothes,
  fetchNewestClothes,
  fetchNeedsSomeLovingClothes,
} from "../Helpers/fetchSortedClothes";
import { ClothesContext } from "./_layout";
import { useRouter } from "expo-router";

const Dashboard = () => {
  const user_id = 3;
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [accessories, setAccessories] = useState([]);
  const [mostPopular, setMostPopular] = useState([]);
  const [newest, setNewest] = useState([]);
  const [needsSomeLoving, setNeedsSomeLoving] = useState([]);
  const [clothesItems, setClothesItems] = useContext(ClothesContext);
  const router = useRouter();

  const fetchData = (searchText = "") => {
    setClothesItems([{ _tags_map: [] }]);
    setIsLoading(true);
    setIsError("");

    fetchMostPopularClothes(user_id, searchText)
      .then((popular) => {
        setMostPopular(popular);
      })
      .catch(() => {
        setIsError("Failed to load popular clothes.");
      });

    fetchNewestClothes(user_id, searchText)
      .then((newClothes) => {
        setNewest(newClothes);
      })
      .catch(() => {
        setIsError("Failed to load newest clothes.");
      });

    fetchNeedsSomeLovingClothes(user_id, searchText)
      .then((lovingClothes) => {
        setNeedsSomeLoving(lovingClothes);
      })
      .catch(() => {
        setIsError("Failed to load clothes that need some love.");
      });

    fetchAllAccessories(user_id, searchText)
      .then((data) => {
        setAccessories(data);
      })
      .catch(() => {
        setIsError("Failed to load accessories.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [user_id]);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#FF69B4" />;
  }

  if (isError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{isError}</Text>
      </View>
    );
  }

  const handleItemClick = () => {
    Alert.alert("Success!", "Welcome To Single Page.");
    router.push("/clothes/clothes_item");
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <ClothesContainer
          title="Favourite Clothes"
          items={mostPopular}
          onItemClick={handleItemClick}
        />
        <ClothesContainer
          title="Most Recent Clothes"
          items={newest}
          onItemClick={handleItemClick}
        />
        <ClothesContainer
          title="Accessories"
          items={accessories}
          onItemClick={handleItemClick}
        />
        <ClothesContainer
          title="These need some love"
          items={needsSomeLoving}
          onItemClick={handleItemClick}
        />
      </ScrollView>
      <View style={styles.addButtonContainer}>
        <TouchableOpacity style={styles.addButton}>
          <Link href="/camera/camera">
            <Icon name="add" size={30} color="white" />
          </Link>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  scrollView: {
    paddingBottom: 100,
  },
  addButtonContainer: {
    position: "absolute",
    bottom: 30,
    right: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  addButton: {
    backgroundColor: "#2f3640",
    padding: 15,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
  },
  errorText: {
    fontSize: 18,
    color: "#e74c3c",
    textAlign: "center",
  },
  card: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  title: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#34495e",
  },
});

export default Dashboard;
