import { Stack } from "expo-router";
import { useState, useContext, createContext } from "react";
import { useRef } from "react";

export const ClothesContext = createContext(null);
export const UserAccountContext = createContext(null);
export const DescriptionContext = createContext(null);

export default function RootLayout() {
  const [clothesItems, setClothesItems] = useState({});
  const [userAccount, setUserAccount] = useState("");
  const [description, setDescription] = useState("");

  return (
    <UserAccountContext.Provider value={[userAccount, setUserAccount]}>
      <ClothesContext.Provider value={[clothesItems, setClothesItems]}>
        <DescriptionContext.Provider value={[description, setDescription]}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
        </Stack>
        </DescriptionContext.Provider>
      </ClothesContext.Provider>
    </UserAccountContext.Provider>
  );
}
