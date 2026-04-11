import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CustomBottomTabBar from '../components/CustomBottomTabBar';
import {
  HomeScreen,
  PlayFMProfile,
  PodCasts,
  ReadScreen,
  YoutubeWatch,
} from './index';

import { DeviceSize } from '../theme/theme';

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <CustomBottomTabBar {...props} />}
    >
      {/* ---------------- Home ---------------- */}
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: () => (
            <Image
              source={require('../../assets/tab/radio.png')}
              style={styles.icon}
            />
          ),
        }}
      />

      {/* ---------------- Our Proud ---------------- */}
      <Tab.Screen
        name="PodCasts"
        component={PodCasts}
        options={{
          tabBarLabel: 'PodCasts',
          tabBarIcon: () => (
            <Image
              source={require('../../assets/tab/listen.png')}
              style={styles.icon}
            />
          ),
        }}
      />

      {/* ---------------- Contacts ---------------- */}
      <Tab.Screen
        name="Watch"
        component={YoutubeWatch}
        options={{
          tabBarLabel: 'Watch',
          tabBarIcon: () => (
            <Image
              source={require('../../assets/tab/video.png')}
              style={styles.icon}
            />
          ),
        }}
      />

      {/* ---------------- Posts ---------------- */}
      <Tab.Screen
        name="PlayFMProfile"
        component={PlayFMProfile}
        options={{
          tabBarLabel: 'Play 89.6 FM',
          tabBarIcon: () => (
            <Image
              source={require('../../assets/tab/smile.png')}
              style={styles.icon}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

/* =====================================================
   STYLES
===================================================== */

const styles = StyleSheet.create({
  icon: {
    width: DeviceSize.wp(5),
    height: DeviceSize.wp(5),
    resizeMode: 'contain',
  },
});
