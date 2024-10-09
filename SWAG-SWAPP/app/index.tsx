import { View } from "react-native";
import UserLogin from "./user/userLogin";


export default function Index() {
  return (
    <View style={{ flex: 1 }}>
      <UserLogin />
    </View>
  );
}