import * as ImagePicker from 'expo-image-picker';
import { Alert, Image, View } from 'react-native';
import { WFButton } from '@/shared/components/WFPrimitives';
import { useUploadProfilePhoto } from '../hooks/useUploadProfilePhoto';

const MAX_SIZE = 5 * 1024 * 1024;
export function ProfilePhotoPicker({ userId, currentUrl }: { userId: string; currentUrl?: string | null }) {
  const upload = useUploadProfilePhoto(userId);
  const handleAsset = async (asset: ImagePicker.ImagePickerAsset) => {
    if (asset.fileSize && asset.fileSize > MAX_SIZE) { Alert.alert('Imagen muy grande', 'Selecciona una imagen menor a 5MB.'); return; }
    const type = asset.mimeType ?? 'image/jpeg';
    if (!type.startsWith('image/')) { Alert.alert('Tipo no válido', 'Selecciona una imagen compatible.'); return; }
    await upload.mutateAsync({ uri: asset.uri, name: asset.fileName ?? `profile-${userId}.jpg`, type });
  };
  const pick = async () => { const permission = await ImagePicker.requestMediaLibraryPermissionsAsync(); if (!permission.granted) return; const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.82 }); if (!result.canceled) await handleAsset(result.assets[0]); };
  const camera = async () => { const permission = await ImagePicker.requestCameraPermissionsAsync(); if (!permission.granted) return; const result = await ImagePicker.launchCameraAsync({ quality: 0.82 }); if (!result.canceled) await handleAsset(result.assets[0]); };
  return <View>{currentUrl ? <Image source={{ uri: currentUrl }} style={{ width: 96, height: 96, borderRadius: 48, alignSelf: 'center' }} /> : null}<WFButton loading={upload.isPending} onPress={pick}>Seleccionar foto</WFButton><WFButton variant="ghost" onPress={camera}>Tomar foto</WFButton></View>;
}
