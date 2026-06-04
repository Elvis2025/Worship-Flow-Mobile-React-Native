import * as ImagePicker from 'expo-image-picker';
import { Alert, Image, View } from 'react-native';
import { WFButton } from '@/shared/components/WFPrimitives';
import { useUploadProfilePhoto } from '../hooks/useUploadProfilePhoto';

const MAX_PROFILE_PHOTO_SIZE = 5 * 1024 * 1024;

export function ProfilePhotoPicker({ userId, currentUrl }: { userId: string; currentUrl?: string | null }) {
  const uploadPhoto = useUploadProfilePhoto(userId);

  async function uploadAsset(asset: ImagePicker.ImagePickerAsset) {
    const mimeType = asset.mimeType ?? 'image/jpeg';

    if (asset.fileSize && asset.fileSize > MAX_PROFILE_PHOTO_SIZE) {
      Alert.alert('Imagen muy grande', 'Selecciona una imagen menor a 5MB.');
      return;
    }

    if (!mimeType.startsWith('image/')) {
      Alert.alert('Tipo no válido', 'Selecciona una imagen compatible.');
      return;
    }

    await uploadPhoto.mutateAsync({
      uri: asset.uri,
      name: asset.fileName ?? `profile-${userId}.jpg`,
      type: mimeType,
    });
  }

  async function pickFromGallery() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.82,
    });

    if (!result.canceled) await uploadAsset(result.assets[0]);
  }

  async function takePhoto() {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) return;

    const result = await ImagePicker.launchCameraAsync({ quality: 0.82 });
    if (!result.canceled) await uploadAsset(result.assets[0]);
  }

  return (
    <View>
      {currentUrl ? <Image source={{ uri: currentUrl }} style={{ width: 104, height: 104, borderRadius: 52, alignSelf: 'center', marginBottom: 12 }} /> : null}
      <WFButton loading={uploadPhoto.isPending} onPress={pickFromGallery}>Seleccionar desde galería</WFButton>
      <WFButton variant="ghost" disabled={uploadPhoto.isPending} onPress={takePhoto}>Tomar foto</WFButton>
    </View>
  );
}
