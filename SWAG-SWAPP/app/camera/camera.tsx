import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useContext, useEffect, useRef, useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { createClient } from "@supabase/supabase-js";
import axios from "axios";
import { Redirect } from "expo-router";

const supabase = createClient(
  "https://xbahoxnpicnirgdxbngw.supabase.co", // Updated URL
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhiYWhveG5waWNuaXJnZHhibmd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg1MjEzMDcsImV4cCI6MjA0NDA5NzMwN30.nuXrfK9gzTUbjZRZKPa2ZvJsVFMosaOUUm4CAXWod1Y" // Updated API key
);
import { ClothesContext } from "../_layout";

export default function cameraFunc() {
  const cameraRef = useRef(null);
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [clothesImage, setClothesImage] = useState({
    uri: undefined,
    base64: undefined,
  });
  const [clothesItems, setClothesItems] = useContext(ClothesContext);

  useEffect(() => {
    if (clothesImage.uri !== undefined) {
      sendImage(clothesImage.uri);
      axios
        .post(
          "https://api.ximilar.com/tagging/fashion/v2/detect_tags", // Ximilar API for tagging
          {
            records: [
              {
                _base64: clothesImage.base64, // Sending image in base64 format
              },
            ],
          },
          {
            headers: {
              Authorization: "Token fa62910f8e5841247fb5e78d409d38d0cc1fef46",
              "Content-Type": "application/json", 
            },
          }
        )
        .then((response) => {
          let responseObject = response.data.records[0]._objects;
          responseObject.url =
            "https://xbahoxnpicnirgdxbngw.supabase.co/storage/v1/object/public/ClothingImages/" + // Updated Supabase storage URL
            fileName;
          setClothesItems(responseObject);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [clothesImage]);

  if (!permission) {
    return <View />;
  }

  let fileName = "";
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const sendImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const arrayBuffer = await new Response(blob).arrayBuffer();
    fileName = `public/${Date.now()}.jpg`;
    const { error } = await supabase.storage
      .from("ClothingImages")
      .upload(fileName, arrayBuffer, {
        contentType: "image/jpeg",
        upsert: false,
      });
    if (error) {
      console.log("Error uploading image:", error);
    }
  };

  const handleTakePhoto = async () => {
    if (cameraRef.current) {
      const takenPhoto = await cameraRef.current.takePictureAsync({
        base64: true,
      });
      setClothesImage(takenPhoto);
    }
  };

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  if (clothesItems.url) {
    return <Redirect href={"/new_item/new_item"} />;
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.cameraButton} onPress={handleTakePhoto}>
          <Icon name="camera" size={65} color="white" />
        </TouchableOpacity>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  cameraButton: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    bottom: -200,
  },
});