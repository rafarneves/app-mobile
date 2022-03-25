import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  ImageBackground,
  Alert,
} from "react-native";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function App() {
  const [user, setUser] = useState([]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");

  useEffect(() => {
    axios
      .get("https://rafa-m.herokuapp.com/")
      .then((response) => setUser(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, [user]);

  function onCreatePost() {
    const postData = {
      nome: nome,
      email: email,
      telefone: telefone,
    };

    if (postData.nome === "" || postData.email === "" || postData === "") {
      Alert.alert("Preencha todos os campos!");
    } else {
      axios
        .post(`https://rafa-m.herokuapp.com/users`, postData)
        .then(() => {
          console.log("Tiziu viado alterou: ", postData);
        })
        .catch((error) => {
          console.log("Roge deu o cu", error);
        });

      setNome("");
      setEmail("");
      setTelefone("");
    }
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("./assets/01.jpg")}
        resizeMode="cover"
        blurRadius={5}
        style={{
          flex: 1,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextInput
          style={{
            backgroundColor: "white",
            height: 40,
            width: 200,
            marginTop: "25%",
            marginBottom: 5,
            padding: 10,
            borderRadius: 5,
          }}
          value={nome}
          placeholder="Digite um nome"
          onChangeText={(text) => {
            setNome(text);
          }}
        />
        <TextInput
          style={{
            backgroundColor: "white",
            height: 40,
            width: 200,
            padding: 10,
            margin: 5,
            borderRadius: 5,
          }}
          value={email}
          placeholder="Digite o email"
          onChangeText={(mail) => setEmail(mail)}
        />
        <TextInput
          style={{
            backgroundColor: "white",
            height: 40,
            width: 200,
            padding: 10,
            marginTop: 5,
            marginBottom: 20,
            borderRadius: 5,
            overflow: "visible",
            borderColor: "black",
            shadowColor: "black",
            shadowOpacity: 1,
            elevation: 15,
          }}
          value={telefone}
          placeholder="Digite o telefone"
          onChangeText={(phone) => setTelefone(phone)}
          keyboardType="numeric"
          textContentType="telephoneNumber"
        />
        <View style={{ paddingBottom: 10 }}>
          <Button onPress={onCreatePost} title="Enviar" />
        </View>

        <FlatList
          data={user}
          initialNumToRender={3}
          renderItem={({ item }) => (
            <View
              style={{
                flexShrink: 1,
                backgroundColor: "white",
                marginVertical: 10,
                padding: 10,
                borderRadius: 5,
                marginHorizontal: "10%",
                overflow: "visible",
                borderColor: "black",
                shadowColor: "black",
                shadowOpacity: 1,
                elevation: 20,
              }}
            >
              <Text>Id: {item._id}</Text>
              <Text>Nome: {item.nome}</Text>
              <Text>Email: {item.email}</Text>
              <Text>Telefone: {item.telefone}</Text>
            </View>
          )}
          keyExtractor={(item) => item._id}
        />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
