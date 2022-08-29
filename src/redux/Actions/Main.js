import * as t from '../Types';
import RNFetchBlob from 'rn-fetch-blob';
import * as RNFS from 'react-native-fs';

const dirs = RNFetchBlob.fs.dirs;
const path = dirs.SDCardDir;
console.log('path', path);
const path2 = [`${path}/Download`, `${path}/Documents`];

export const get_all = () => async dispatch => {
  //   //  is dirs
  //   const isDirs = async isdirpath => {
  //     const result = await RNFetchBlob.fs.isDir(isdirpath).then(isDir => {
  //       return isDir ? 1 : 0;
  //     });

  //     return result;
  //   };

  //   const getdocs = async path => {
  //     await RNFetchBlob.fs.ls(path).then(result => {
  //       result.map(async item => {
  //         // const newPath = `${path}/${item}`
  //         const result = await isDirs(`${path}/${item}`);
  //         if (result) {
  //           getdocs(`${path}/${item}`);
  //         } else {
  //           const file = `${path}/${item}`;
  //           if (file.slice(((file.lastIndexOf('.') - 1) >>> 0) + 2) === 'pdf') {
  //           }
  //           setDocs(prev => [...prev, `${path}/${item}`]);

  //           // console.log(docs);
  //         }
  //       });
  //     });
  //   };

  const alldata = [];

  const getAllData = async path => {
    await RNFS.readDir(RNFS.ExternalStorageDirectoryPath + '/Documents') // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
      .then(async result => {
        await result.map(async item => {
          if (await item.isDirectory) {
            await getAllData(item.path);
          } else {
            await [...alldata, item];
          }
        });
      });
  };

  try {
    await getAllData(RNFS.ExternalStorageDirectoryPath + '/Documents').then(
      () =>
        dispatch({
          type: t.GET_ALL_FILES,
          payload: alldata,
        }),
    );
  } catch (error) {
    console.log('RNFS ERROR', error);
  }
};
