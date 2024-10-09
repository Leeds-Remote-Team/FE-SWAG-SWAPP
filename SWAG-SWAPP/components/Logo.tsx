import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const logoImage = require('../assets/images/swag_swapp_logo_transparent (1).webp');

export const Logo = ({ useImage = true, size = 100 }) => {
  return (
    <View style={styles.container}>
      {useImage ? (
        <Image
          source={logoImage}
          style={[styles.logoImage, { width: size, height: size }]}
          resizeMode="contain"
        />
      ) : (
        <Text style={[styles.logoText, { fontSize: size / 4 }]}>
          Swag Swapp
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: 100,
    height: 100,
    shadowColor: "#C79B71",
    shadowOffset: { width: 1, height: 5.5 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2f3640',
  },
});