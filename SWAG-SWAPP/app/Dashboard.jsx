import React, { useContext, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  Text,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Header } from "./Header";
import { Link } from "expo-router";
import { ClothesContainer } from "./ClothesContainer";
import { fetchAllAccessories } from "../Helpers/fetchAllAccessories";
import {
  fetchMostPopularClothes,
  fetchRecentlyWornClothes,
  fetchNeedsSomeLovingClothes,
  fetchNewlyAddedClothes,
} from "../Helpers/fetchSortedClothes";
import { ClothesContext } from "./_layout";
import { useRouter } from "expo-router";

const Dashboard = () => {
  const user_id = 3;
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [accessories, setAccessories] = useState([]);
  const [mostPopular, setMostPopular] = useState([]);
  const [newest, setNewest] = useState([]);
  const [needsSomeLoving, setNeedsSomeLoving] = useState([]);
  const [newlyAdded, setNewlyAdded] = useState([]);
  const [clothesItems, setClothesItems] = useContext(ClothesContext);
  const router = useRouter();

  const fetchData = (searchText = "") => {
    setClothesItems([{ _tags_map: [] }]);
    setIsLoading(true);
    setIsError(false);

    fetchMostPopularClothes(user_id, searchText)
      .then((popular) => {
        setMostPopular(popular);
      })
      .catch(() => {
        setIsError("Failed to load your popular clothes.");
      });

    fetchRecentlyWornClothes(user_id, searchText)
      .then((newClothes) => {
        setNewest(newClothes);
      })
      .catch(() => {
        setIsError("Failed to load your recently worn clothes.");
      });

    fetchNeedsSomeLovingClothes(user_id, searchText)
      .then((lovingClothes) => {
        setNeedsSomeLoving(lovingClothes);
      })
      .catch(() => {
        setIsError("Failed to load clothes that need some love.");
      });

    fetchAllAccessories(user_id, searchText)
      .then((accessories) => {
        setAccessories(accessories);
      })
      .catch(() => {
        setIsError("Failed to load your accessories.");
      })
      .finally(() => {
        setIsLoading(false);
      });

    fetchNewlyAddedClothes(user_id, searchText)
      .then((newlyAdded) => {
        setNewlyAdded(newlyAdded);
      })
      .catch(() => {
        setIsError("Failed to load your newly added clothes.");
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

  const handleItemClick = (item) => {
    router.push("/clothes/clothes_item");
  };

  return (
    <View style={styles.container}>
      <Header onSearch={fetchData} />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <ClothesContainer
          title="Favourite Clothes"
          items={mostPopular}
          onItemClick={handleItemClick}
        />
        <ClothesContainer
          title="Recently worn Clothes..."
          items={newest}
          onItemClick={handleItemClick}
        />
        <ClothesContainer
          title="Accessories..."
          items={accessories}
          onItemClick={handleItemClick}
        />
        <ClothesContainer
          title="Newly added..."
          items={needsSomeLoving}
          onItemClick={handleItemClick}
        />
        <ClothesContainer
          title="These need some love..."
          items={newlyAdded}
          onItemClick={handleItemClick}
        />
      </ScrollView>
      <View style={styles.addButtonContainer}>
        <Pressable style={styles.addButton}>
          <Link href="/camera/camera">
            <Icon name="add" size={30} color="white" />
          </Link>
        </Pressable>
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
});

export default Dashboard;
