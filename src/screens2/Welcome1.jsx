import React, { Component } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  Image,
  ImageBackground,
  TouchableOpacity,
  Text
} from "react-native";

function Welcome1(props) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.imageStack}>
        <ImageBackground
          source={require("../assets/images/drink1.png")}
          resizeMode="contain"
          style={styles.image}
          imageStyle={styles.image_imageStyle}
        >
          <TouchableOpacity style={styles.button1}>
            <Text style={styles.viewYourGallery}>View Your Gallery</Text>
          </TouchableOpacity>
        </ImageBackground>
        <ImageBackground
          source={require("../assets/images/logo.png")}
          resizeMode="contain"
          style={styles.image2}
          imageStyle={styles.image2_imageStyle}
        >
          <Image
            source={require("../assets/images/logo.png")}
            resizeMode="contain"
            style={styles.image4}
          ></Image>
        </ImageBackground>
        <Text style={styles.inFuze}>In-Fuze</Text>
        <Text style={styles.welcome3}>Welcome</Text>
        <Text style={styles.to2}>To</Text>
        <TouchableOpacity style={styles.button}
        onPress={() => props.navigation.navigate("Page1")}>
          <Text style={styles.letsBegin}>Lets Begin</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(242,138,138,1)",
    opacity: 0.7
  },
  image: {
    top: 0,
    left: 0,
    width: 997,
    height: 966,
    position: "absolute",
    backgroundColor: "#fff"
  },
  image_imageStyle: {
    opacity: 0.42
  },
  button1: {
    width: 257,
    height: 56,
    backgroundColor: "rgba(244,187,187,1)",
    borderWidth: 7,
    borderColor: "#000000",
    borderStyle: "solid",
    borderRadius: 15,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 0.37,
    shadowRadius: 0,
    overflow: "visible",
    marginTop: 807,
    marginLeft: 469
  },
  viewYourGallery: {
    color: "#121212",
    fontSize: 24,
    marginTop: 14,
    marginLeft: 36
  },
  image2: {
    top: 13,
    left: 405,
    width: 80,
    height: 123,
    position: "absolute"
  },
  image2_imageStyle: {},
  image4: {
    width: 80,
    height: 123
  },
  inFuze: {
    top: 227,
    position: "absolute",
    color: "#121212",
    fontSize: 54,
    left: 512
  },
  welcome3: {
    top: 90,
    left: 499,
    position: "absolute",
    color: "#121212",
    fontSize: 47
  },
  to2: {
    top: 155,
    left: 552,
    position: "absolute",
    color: "#121212",
    fontSize: 57
  },
  button: {
    top: 726,
    left: 469,
    width: 257,
    height: 56,
    position: "absolute",
    backgroundColor: "rgba(244,187,187,1)",
    borderWidth: 7,
    borderColor: "#000000",
    borderStyle: "solid",
    borderRadius: 15,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 0.37,
    shadowRadius: 0,
    overflow: "visible"
  },
  letsBegin: {
    color: "#121212",
    fontSize: 24,
    marginTop: 14,
    marginLeft: 73
  },
  imageStack: {
    width: 997,
    height: 966,
    marginLeft: -405
  }
});

export default Welcome1;
