import React, { useContext, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  ActivityIndicator,
  SafeAreaView,
  Pressable,
} from "react-native";
import { Header } from "./Header";
import { ClothesContainer } from "./ClothesContainer";
import {
  fetchMostPopularClothes,
  fetchRecentlyWornClothes,
  fetchNeedsSomeLovingClothes,
  fetchNewlyAddedClothes,
  fetchAccessories,
} from "../Helpers/fetchSortedClothes";
import { ClothesContext } from "./_layout";
import { useRouter } from "expo-router";
import { Footer } from "../components/Footer";

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
        const wornClothes = newClothes.filter(
          (item) =>
            item.tags.last_date_worn && item.tags.last_date_worn !== "New Item"
        );
        setNewest(wornClothes);
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

    fetchAccessories(user_id, searchText)
      .then((data) => {
        const filteredData = data.filter(
          (item) => item.top_category === "accessories"
        );
        setAccessories(filteredData);
      })
      .catch(() => {
        setIsError("Failed to load your accessories.");
      });

    fetchNewlyAddedClothes(user_id, searchText)
      .then((newlyAdded) => {
        setNewlyAdded(newlyAdded);
      })
      .catch(() => {
        setIsError("Failed to load your newly added clothes.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [user_id]);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#7B3F00" />;
  }

  const handleErrorClick = () => {
    router.push({
      pathname: "/Dashboard",
    });
  };

  if (isError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorMessage}>
          Sorry! You do not have any clothes that match this search
        </Text>
        <Pressable onPress={handleErrorClick}>
          <Text style={styles.errorTextOkay}>Okay</Text>
        </Pressable>
      </View>
    );
  }

  const handleItemClick = (item_id) => {
    router.push({
      pathname: "/clothes/clothes_item",
      params: item_id,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Header onSearch={fetchData} />
        <ScrollView contentContainerStyle={styles.scrollView}>
          <ClothesContainer
            title="Your favourite clothes"
            items={mostPopular}
            onItemClick={handleItemClick}
          />
          <ClothesContainer
            title="Your newly added"
            items={newlyAdded}
            onItemClick={handleItemClick}
          />
          <ClothesContainer
            title="Your recently worn clothes"
            items={newest}
            onItemClick={handleItemClick}
          />
          <ClothesContainer
            title="Your accessories"
            items={accessories}
            onItemClick={handleItemClick}
          />
          <ClothesContainer
            title="Still need these / SELL.."
            items={needsSomeLoving}
            onItemClick={handleItemClick}
          />
          <View style={{ height: 100 }} />
        </ScrollView>
      </View>
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f4f0",
  },
  scrollView: {
    paddingBottom: 10,
  },
  errorContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
  errorText: {
    fontSize: 18,
    color: "#e74c3c",
    textAlign: "center",
    height: 50,
  },
  errorTextOkay: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
  },
});

export default Dashboard;
