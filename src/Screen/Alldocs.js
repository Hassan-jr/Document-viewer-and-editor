import {StyleSheet, Text, View, PermissionsAndroid} from 'react-native';
import React, {useState} from 'react';
import RNFetchBlob from 'rn-fetch-blob';
import * as RNFS from 'react-native-fs';

const Alldocs = () => {

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

  const dirs = RNFetchBlob.fs.dirs;
  console.log(dirs.SDCardDir);
  const [docs, setDocs] = useState([]);
 //const  docs = [];
  const path = dirs.SDCardDir;
  async function name (){
    console.log("ALL FILES");
    await RNFetchBlob.fs.ls(`${path}/Download`).then(res=> console.log(res));
  }
name()
  

  //  is dirs
  const isDirs = async (isdirpath )=> {
   const  result = await  RNFetchBlob.fs.isDir(isdirpath).then(isDir => {
       return  isDir ?  1 : 0;
    });

    return result;
  };

  // getting alldocs
  // const getdocs = async (path) => {
  // await  RNFetchBlob.fs.ls(path).then(result => {
  //     result.map(async (item) => {
  //      // const newPath = `${path}/${item}`
  //      const result = await  isDirs(`${path}/${item}`)
  //        if (result){
  //          getdocs(`${path}/${item}`)
  //        }else {
  //           setDocs(prev=> [...prev, `${path}/${item}` ] )
  //           console.log(docs);
  //        }
         
  //     });
  //   });
  // };

  // getdocs(path)
  // async function  random (){
  //   await getdocs(path)
  //  if (docs.length > 0){
  //   console.log(docs);
  //  }
  // }
  //  random()
 
 // end





if (requestStoragePermission()){
  RNFetchBlob.fs.ls(path).then(files => {
   // console.log('=============== All files ===================');
   // console.log(files);
    RNFetchBlob.fs.ls(`${path}/${files[9]}`).then(files2 => {
    //  console.log('=============== All files not folders ===================');
     // console.log(files2);
     files2.map(async (file3) =>{
      if( await isDirs(`${path}/${files[9]}/${file3}`)){
         //  console.log(file3);
      }
     })
    });
  });
}

// RNFS
if (requestStoragePermission()){
  RNFS.readDir( RNFS.ExternalStorageDirectoryPath + '/Documents') // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
  .then((result) => {
   console.log('GOT RESULT', result)
   // result.map(item=> console.log('GOT RESULT', item))
   // console.log('GOT RESULT', result);
  })
}


 

  return (
    <View>
      <Text>Alldocs</Text>
    </View>
  );
};

export default Alldocs;

const styles = StyleSheet.create({});
