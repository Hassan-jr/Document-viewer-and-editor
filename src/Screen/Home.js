import { StyleSheet, Text, View, Platform} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NativeModules} from 'react-native';
var PermissionFile = NativeModules.PermissionFile;
import * as RNFS from 'react-native-fs';
import {useSelector, useDispatch} from 'react-redux';
import {get_all} from '../redux/Actions/Main';


const Home = () => {
  // const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(get_all());
  }, []);

  // const data = useSelector((state) => state.Main.All);
  // console.log("DATA", data);

  async function name() {
    if (Platform.Version >= 30) {
      await PermissionFile.checkAndGrantPermission(
        err => console.log(err),
        res => console.log('result form manage', res),
      );
    } else {
      console.log('not to show');
    }
  }

  name();

  
  const backgroundStyle = "bg-neutral-300 dark:bg-slate-900"
  return (
    <View className={backgroundStyle}>
      <Text className="text-5xl text-black dark:text-white">
        Home 44444444444444444444444
      </Text>
    </View>
  );
};

export default Home;

// const styles = StyleSheet.create({});
