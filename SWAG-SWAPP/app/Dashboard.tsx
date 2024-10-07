import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
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
import { useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { ClothesContext } from "./_layout";
// import { fetchAllClothes } from "@/Helpers/fetchAllClothes";

const Dashboard = () => {
  const user_id = 3;
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [accessories, setAccessories] = useState([]);
  const [mostPopular, setMostPopular] = useState([]);
  const [newest, setNewest] = useState([]);
  const [needsSomeLoving, setNeedsSomeLoving] = useState([]);
  const [clothesItems, setClothesItems] = useContext(ClothesContext);

  useEffect(() => {
    setClothesItems([{ _tags_map: [] }]);
    setIsLoading(true);
    setIsError(false);

    fetchMostPopularClothes(user_id)
      .then((popular) => {
        setMostPopular(popular);
      })
      .catch(() => {
        setIsError(true);
      });

    fetchNewestClothes(user_id)
      .then((newClothes) => {
        setNewest(newClothes);
      })
      .catch(() => {
        setIsError(true);
      });

    fetchNeedsSomeLovingClothes(user_id)
      .then((lovingClothes) => {
        setNeedsSomeLoving(lovingClothes);
      })
      .catch(() => {
        setIsError(true);
      });

    fetchAllAccessories(user_id)
      .then((data) => {
        setAccessories(data);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [user_id]);

  if (isLoading) {
    return <ActivityIndicator size="large" color="blue" />;
  }

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView>
        <ClothesContainer title="Favourite Clothes" items={mostPopular} />
        <ClothesContainer title="Most Recent Clothes" items={newest} />
        <ClothesContainer title="Accessories" items={accessories} />
        <ClothesContainer
          title="These need some love"
          items={needsSomeLoving}
        />
      </ScrollView>
      <View style={styles.add}>
        <TouchableOpacity>
          <Link href="/camera/camera">
            <Icon name="add" size={50} />
          </Link>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  add: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
  },
  title: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default Dashboard;
