import { Stack } from "expo-router";
import { useState, useContext, createContext } from "react";
import { useRef } from "react";

export const ClothesContext = createContext(null);
export const UserAccountContext = createContext(null);

export default function RootLayout() {
  const [clothesItems, setClothesItems] = useState({});
  const [userAccount, setUserAccount] = useState("");
  return (
    <UserAccountContext.Provider value={[userAccount, setUserAccount]}>
      <ClothesContext.Provider value={[clothesItems, setClothesItems]}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
        </Stack>
      </ClothesContext.Provider>
    </UserAccountContext.Provider>
  );
}
