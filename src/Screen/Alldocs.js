import {StyleSheet, Text, View, PermissionsAndroid} from 'react-native';
import React, {useState} from 'react';
import RNFetchBlob from 'rn-fetch-blob';
import * as RNFS from 'react-native-fs';

const Alldocs = () => {
  //  PERMISSION =================================================================

  const requestStoragePermission = async () => {
    try {
      const granted =
        (await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, // read permissions
          {
            title: 'Allow storage  access',
            message:
              'Cool Photo App needs access to your camera ' +
              'so you can take awesome pictures.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        )) &&
        (await PermissionsAndroid.request(
          // write permission
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Allow storage  access',
            message:
              'Cool Photo App needs access to your camera ' +
              'so you can take awesome pictures.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        ));
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log(
          '=====================You can use the storage  ===========================',
        );
        // access file
        return true;
      } else {
        console.log('Camera permission denied');
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  };
  //   END OF permission request ===========================

  const dirs = RNFetchBlob.fs.dirs;
  // console.log(dirs.SDCardDir);
  const [docs, setDocs] = useState([]);
  //const  docs = [];
  const path = dirs.SDCardDir;
  const path2 = [`${path}/Download`, `${path}/Documents`];

  // ==================================================================================================================================
  // RNFetchBlob to get all files in a directory
  async function name() {
    console.log('ALL FILES');
    await RNFetchBlob.fs.ls(`${path}/Download`).then(res => console.log('J'));
  }
  // name();
  // ==================================================================================================================================

  // **************************************************************************************************************************************
  //  is dirs
  const isDirs = async isdirpath => {
    const result = await RNFetchBlob.fs.isDir(isdirpath).then(isDir => {
      return isDir ? 1 : 0;
    });

    return result;
  };

  // getting alldocs
  const getdocs = async path => {
    await RNFetchBlob.fs.ls(path).then(result => {
      result.map(async item => {
        // const newPath = `${path}/${item}`
        const result = await isDirs(`${path}/${item}`);
        if (result) {
          getdocs(`${path}/${item}`);
        } else {
          const file = `${path}/${item}`;
          if (file.slice(((file.lastIndexOf('.') - 1) >>> 0) + 2) === 'pdf') {
          }
          setDocs(prev => [...prev, `${path}/${item}`]);

          // console.log(docs);
        }
      });
    });
  };
  getdocs(path2);

  // *******************************************************************************************************************************************
  // async function random() {
  //   await getdocs(path);
  //   if (docs.length > 0) {
  //     // console.log(docs);
  //   }
  // }
  //  random()

  // end

  //  =========================================================================================================
  // RNFS to get all files in a directory
  if (requestStoragePermission()) {
    RNFS.readDir(RNFS.ExternalStorageDirectoryPath + '/Documents') // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
      .then(result => {
        // console.log('GOT RESULT', result);
      });
  }
  // ==================================================================================================================================

  console.log('TEST IMPORTATION', docs);

  return (
    <View>
      <Text>Alldocs</Text>
    </View>
  );
};

export default Alldocs;

const styles = StyleSheet.create({});
