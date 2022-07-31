import { StyleSheet, Text, View, Platform } from 'react-native'
import React from 'react'
import {NativeModules} from 'react-native';
var PermissionFile = NativeModules.PermissionFile;

const Home = () => {

  async function name () {
    if (Platform.Version >= 30) {
      await PermissionFile.checkAndGrantPermission(
        (err) => console.log(err),
        (res) =>  console.log(res),
      );
    } else {
  console.log("not to show");
    }
  }
 
name()
  return (
    <View>
      <Text>Home</Text>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})