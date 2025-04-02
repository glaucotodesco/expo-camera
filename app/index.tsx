import React, { useState, useEffect } from 'react';
import { View, Button, Image, FlatList, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';

const Index = () => {
  const [images, setImages] = useState<string[]>([]);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState<boolean | null>(null);

  // Solicitar permissões quando o app iniciar
  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');

      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === 'granted');
    })();
  }, []);

  // Função para capturar foto com a câmera
  const takePhoto = async () => {
    if (!hasCameraPermission) {
      Alert.alert('Erro', 'Permissão para acessar a câmera negada.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, result.assets[0].uri]); // Adiciona a imagem ao estado
    }
  };

  // Função para selecionar uma imagem da galeria
  const pickImage = async () => {
    if (!hasGalleryPermission) {
      Alert.alert('Erro', 'Permissão para acessar a galeria negada.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, result.assets[0].uri]); // Adiciona a imagem ao estado
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Tirar Foto" onPress={takePhoto} />
      <Button title="Selecionar da Galeria" onPress={pickImage} />

      <FlatList
        data={images}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={{ width: 100, height: 100, margin: 5 }} />
        )}
      />
    </View>
  );
};

export default Index;
