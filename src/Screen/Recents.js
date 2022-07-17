import { StyleSheet, Text, View, PermissionsAndroid, Button } from 'react-native'
import React,{useCallback} from 'react'
import DocumentPicker from 'react-native-document-picker'


const Recents = () => {
 //  PERMISSION =================================================================

 const requestStoragePermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, // read permissions
      {
        title: "Allow storage  access",
        message:
          "Cool Photo App needs access to your camera " +
          "so you can take awesome pictures.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    ) &&  await PermissionsAndroid.request(  // write permission
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: "Allow storage  access",
        message:
          "Cool Photo App needs access to your camera " +
          "so you can take awesome pictures.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("=====================You can use the storage  ===========================");
        // access file
        return true
       
    } else {
      console.log("Camera permission denied");
      return false;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
};
//   END OF permission request ===========================

const handleClick = useCallback(async () => {
  try {
    const response  = await DocumentPicker.pick({
      type: [DocumentPicker.types.pdf],
    });
    console.log(response);
  } catch (err) {
    console.warn(err);
  }
}, []);



// handleClick()
  return (
    <View>
      <Text style = {styles.sectionTitle}>Recents</Text>
      {/* <Button
      title = "CLICK"
      onPress={handleClick}
      /> */}
    </View>
  )
}

export default Recents

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black'
  },
})