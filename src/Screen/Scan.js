import { StyleSheet, Text, View, PermissionsAndroid, Image } from 'react-native'
import React, {useState} from 'react'
import DocumentScanner from 'react-native-document-scanner';

const Scan = () => {

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Cool Photo App Camera Permission",
          message:
            "Cool Photo App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the camera");
        return true;
      } else {
        console.log("Camera permission denied");
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  requestCameraPermission();

const [state, setState] = useState({
  image: '',
  initialImage: '',
  rectangleCoordinates: '',
})  
const [state2, setState2] = useState({
  stableCounter : '',
   lastDetectionType : '',

})  
  return (
    <View>

    <DocumentScanner
      useBase64
      onPictureTaken={data =>setState({
        image: data.croppedImage,
        initialImage: data.initialImage,
        rectangleCoordinates: data.rectangleCoordinates,
      })}
      overlayColor="rgba(255,130,0, 0.7)"
      enableTorch={false}
      brightness={0.3}
      saturation={1}
      contrast={1.1}
      quality={0.5}
      onRectangleDetect={({ stableCounter, lastDetectionType }) =>setState2({ stableCounter, lastDetectionType })}
      detectionCountBeforeCapture={5}
      detectionRefreshRateInMS={50}
    />
    <Image source={{ uri: `data:image/jpeg;base64,${state.image}`}} resizeMode="contain" />
  </View>
  )
}

export default Scan

const styles = StyleSheet.create({})