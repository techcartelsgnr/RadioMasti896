import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';

import { SafeAreaView } from 'react-native-safe-area-context';

import {
  Headphones,
  Video,
  Smile,
  BookOpen,
} from 'lucide-react-native';

import MainStack from './MainStack';
import ReadScreen from '../screens/common/ReadScreen';
import RjShows from '../screens/common/RjShows';

import commanServices from '../redux/services/commanServices';

import {
  useTheme,
  DeviceSize,
  FontSizes,
  Fonts,
} from '../theme/theme';
import PodCasts from '../screens/common/PodCasts';
import { YoutubeWatch } from '.';

/* =========================
   DRAWER ITEM
========================= */

const DrawerItem = ({ icon: Icon, label, onPress }) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={styles.itemRow}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <Icon size={22} color={colors.textPrimary} />
      <Text style={[styles.itemLabel, { color: colors.textPrimary }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

/* =========================
   CUSTOM DRAWER CONTENT
========================= */

function CustomDrawerContent(props) {
  const { colors, isDarkMode } = useTheme();
  const [socialLinks, setSocialLinks] = useState({});

  useEffect(() => {
    (async () => {
      const res = await commanServices.getSocialMediaLinks();
      setSocialLinks(res?.socialLinks || {});
    })();
  }, []);

  const openLink = (url) => {
    if (url) Linking.openURL(url);
  };

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        { backgroundColor: colors.background },
      ]}
      edges={['top', 'bottom']}
    >
      {/* ───────── LOGO ───────── */}
      <View style={styles.logoBox}>
        <Image
          source={
            isDarkMode
              ? require('../../assets/MastiFmLogo.png')
              : require('../../assets/radiomastibg.png')
          }
          style={styles.logo}
        />
      </View>

      {/* ───────── MENU ───────── */}
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.menuContainer}
        showsVerticalScrollIndicator={false}
      >
        

        <DrawerItem
          icon={Smile}
          label="RJs / Shows"
          onPress={() => props.navigation.navigate('RjShows')}
        />

        <DrawerItem
          icon={BookOpen}
          label="Read"
          onPress={() => props.navigation.navigate('ReadScreen')}
        />
      </DrawerContentScrollView>

      {/* ───────── SOCIAL ───────── */}
      <View style={styles.bottomSection}>
        <Text style={[styles.followText, { color: colors.textSecondary }]}>
          Follow us on
        </Text>

        <View style={styles.socialRow}>
          <TouchableOpacity onPress={() => openLink(socialLinks.facebook)}>
            <Image source={require('../../assets/facebook.png')} style={styles.socialIcon} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => openLink(socialLinks.instagram)}>
            <Image source={require('../../assets/instagram.png')} style={styles.socialIcon} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => openLink(socialLinks.youtube)}>
            <Image source={require('../../assets/youtube.png')} style={styles.socialIcon} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => openLink(socialLinks.twitter)}>
            <Image source={require('../../assets/twitter.png')} style={styles.socialIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

/* =========================
   DRAWER NAVIGATOR
========================= */

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  const { colors } = useTheme();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        drawerStyle: {
          width: '76%',
          backgroundColor: colors.background,
        },
      }}
    >
      <Drawer.Screen name="Tabs" component={MainStack} />
      <Drawer.Screen name="RjShows" component={RjShows} />
      <Drawer.Screen name="ReadScreen" component={ReadScreen} />
      <Drawer.Screen name="PodCasts" component={PodCasts} />
      <Drawer.Screen name="YoutubeWatch" component={YoutubeWatch} />
    </Drawer.Navigator>
  );
}

/* =========================
   STYLES
========================= */

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  logoBox: {
    alignItems: 'center',
    paddingVertical: DeviceSize.wp(5),
  },

  logo: {
    width: DeviceSize.wp(50),
    height: DeviceSize.wp(22),
    resizeMode: 'contain',
  },

  menuContainer: {
    paddingVertical: DeviceSize.wp(2),
  },

  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: DeviceSize.wp(3.5),
    paddingHorizontal: DeviceSize.wp(5),
    gap: 14,
  },

  itemLabel: {
    fontSize: FontSizes.medium,
    fontFamily: Fonts.primary.medium,
  },

  bottomSection: {
    paddingVertical: DeviceSize.wp(4),
    paddingHorizontal: DeviceSize.wp(5),
    borderTopWidth: 1,
    borderColor: '#E5E5E5',
  },

  followText: {
    fontSize: FontSizes.small,
    fontFamily: Fonts.primary.medium,
    marginBottom: 12,
  },

  socialRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },

  socialIcon: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
  },
});
