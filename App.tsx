import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import {Text, View, StyleSheet} from "react-native";
import {Navbar} from "./src/userInterface/Navbar";
import {SignIn} from "./src/userInterface/SignIn";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
        <View style={styles.container}>
          <Navbar title={"Authorization"}/>
          <SignIn/>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  }
})

// <SafeAreaProvider>
//   <Navigation colorScheme={colorScheme} />
//   <StatusBar />
// </SafeAreaProvider>
