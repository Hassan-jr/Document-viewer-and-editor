import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';
// navigation imports
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Provider} from 'react-redux';
import Store from './src/redux/Store.js';

import * as RNFS from 'react-native-fs';

import {
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

// SCREENS
import Alldocs from './src/Screen/Alldocs';
import Home from './src/Screen/Home';
import Recents from './src/Screen/Recents';
import Scan from './src/Screen/Scan';

const App: () => Node = () => {
  // const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = "bg-neutral-300 dark:bg-slate-900"

  const Tab = createBottomTabNavigator();
  // star =================================

  RNFS.readDir(RNFS.DownloadDirectoryPath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
    .then(result => {
      // console.log('GOT RESULT', result);

      // stat the first file
      return Promise.all([RNFS.stat(result[0].path), result[0].path]);
    })
    .then(statResult => {
      if (statResult[0].isFile()) {
        // if we have a file, read it
        return RNFS.readFile(statResult[1], 'utf8');
      }

      return 'no file';
    })
    .then(contents => {
      // log the file contents
      console.log(contents);
    })
    .catch(err => {
      console.log(err.message, err.code);
    });

  // stop========================================

  return (
    
    <Provider store={Store}>
     
      <NavigationContainer >
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home';
              } else if (route.name === 'Alldocs') {
                iconName = 'document';
              } else if (route.name === 'Recents') {
                iconName = 'bookmark';
              } else if (route.name === 'Scan') {
                iconName = 'scan-sharp';
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Alldocs" component={Alldocs} />
          <Tab.Screen name="Recents" component={Recents} />
          <Tab.Screen name="Scan" component={Scan} />
        </Tab.Navigator>
      </NavigationContainer>
     
    </Provider>
   
  );
};



export default App;
