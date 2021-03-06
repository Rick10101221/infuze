import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  Button,
} from "react-native";
import { Center } from "@builderx/utils";
import { withAuthenticator } from "aws-amplify-react-native";
import { API, graphqlOperation } from "aws-amplify";
import { createDrink } from "../graphql/mutations";
import RNPickerSelect from "react-native-picker-select";
// import { listDrink } from '../graphql/queries'

const initialState = { name: "", description: "", alcohol: true };
const randomIngredient = { name: "", description: "", alcohol: "" };
const ingredients = { ing1: "", ing2: "", ing3: "", ing4: "", ing5: "" };

let cocktail = {};

function Page1(props) {
  const [formState, setFormState] = useState(initialState);
  const [drinks, setDrinks] = useState([]);
  const [cocktails, setCocktails] = useState([]);

  async function getCocktailFromApi() {
    try {
      let response = await fetch(
        "https://www.thecocktaildb.com/api/json/v1/1/random.php"
      );
      let responseJson = await response.json();
      console.log(responseJson);
      cocktail = responseJson;
      getRandomIngredient(cocktail);
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  }

  async function getIngredientData(ingredientName) {
    try {
      let response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${ingredientName}`
      );
      let ingredientJson = await response.json();
      console.log(ingredientJson);
      randomIngredient["description"] = ingredientJson["ingredients"][0]["strDescription"]
      if (ingredientJson["ingredients"][0]["strAlcohol"] === "Yes") {
        randomIngredient["alcohol"] = true
      } else {
        randomIngredient["alcohol"] = false
      }
      console.log(randomIngredient)
    } catch (error) {
      console.error(error);
    }
  }

  function getRandomIngredient(responseJson) {
    let response = responseJson;
    let number = Math.floor(Math.random() * 15) + 1;
    let ingredientName = response["drinks"][0][`strIngredient${number}`];
    if (ingredientName !== null) {
      getIngredientData(ingredientName);
      randomIngredient["name"] = ingredientName;
      console.log(number);
    } else {
      getRandomIngredient(response);
    }
    return number;
  }
  // useEffect(() => {
  //   fetchTodos()
  // }, [])

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

  async function addDrink() {
    try {
      const drink = { ...formState };
      setDrinks([...drinks, drink]);
      setFormState(initialState);
      await API.graphql(graphqlOperation(createDrink, { input: drink }));
    } catch (err) {
      console.log("error creating drink:", err);
    }
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/silly_hacks_logo.png")}
        resizeMode="contain"
        style={styles.image1}
      ></Image>
      <Image
        source={require("../assets/images/logo.png")}
        resizeMode="contain"
        style={styles.image2}
      ></Image>
      <Center horizontal>
        <TouchableOpacity style={styles.button}></TouchableOpacity>
      </Center>
      <Text style={styles.randomize}>Randomize</Text>
      <Text style={styles.loremIpsum}>Lets choose some drinks for you</Text>
      <Text style={styles.drinks}>Non-Alcoholic Drinks:</Text>
      <TextInput
        onChangeText={(val) => setInput("name", val)}
        style={styles.input}
        value={formState.name}
        placeholder="Name"
      />
      <TextInput
        onChangeText={(val) => setInput("description", val)}
        style={styles.input}
        value={formState.description}
        placeholder="Description"
      />
      <Button title="Create Drink" onPress={addDrink} />
      <TouchableOpacity
        onPress={() => props.navigation.navigate("Page2")}
        style={styles.button2}
      ></TouchableOpacity>
      <Button title="Get Cocktail" onPress={getCocktailFromApi} />
      <Button title="See name of cocktail" onPress={getRandomIngredient} />
      <Text style={styles.next}>Next</Text>
      <Image
        source={require("../assets/images/logo.png")}
        resizeMode="contain"
        style={styles.image3}
      ></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(254,212,212,1)",
  },
  image1: {
    top: 46,
    left: 292,
    width: 62,
    height: 77,
    position: "absolute",
  },
  hiUsername: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginLeft: 193,
    marginTop: 24
  },
  image2: {
    top: 13,
    left: 0,
    width: 80,
    height: 123,
    position: "absolute",
  },
  button: {
    top: 252,
    width: 246,
    height: 67,
    position: "absolute",
    backgroundColor: "rgba(255,182,182,1)",
  },
  randomize: {
    top: 267,
    left: 129,
    position: "absolute",
    color: "#121212",
    fontSize: 24,
  },
  loremIpsum: {
    top: 202,
    left: 15,
    position: "absolute",
    color: "#121212",
    fontSize: 16,
  },
  drinks: {
    top: 136,
    left: 49,
    position: "absolute",
    color: "#121212",
    fontSize: 24,
  },
  button2: {
    top: 694,
    left: 201,
    width: 122,
    height: 56,
    position: "absolute",
    backgroundColor: "rgba(249,179,179,1)",
  },
  next: {
    top: 709,
    left: 240,
    position: "absolute",
    color: "#121212",
    fontSize: 18,
  },
  image3: {
    top: 158,
    left: -130,
    width: 668,
    height: 565,
    position: "absolute",
    opacity: 0.06,
  },
});

export default withAuthenticator(Page1);
