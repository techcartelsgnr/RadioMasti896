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
import { LinearGradient } from 'react-native-linear-gradient';

import {
  Headphones,
  Smile,
  BookOpen,
  Info,
  Shield,
  FileText,
} from 'lucide-react-native';

import MainStack from './MainStack';
import { RjShows, ReadScreen, AboutScreen } from '../navigation/index'

import commanServices from '../redux/services/commanServices';

import {
  useTheme,
  DeviceSize,
  FontSizes,
  Fonts,
  BorderRadius,
  Shadows,
} from '../theme/theme';

/* =========================
   DRAWER ITEM
========================= */
const DrawerItem = ({ icon: Icon, label, active, onPress }) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        styles.itemRow,
        active && {
          backgroundColor: colors.cardBackground,
          borderRadius: BorderRadius.md,
        },
      ]}
    >
      <Icon
        size={22}
        color={active ? colors.primary : colors.textSecondary}
      />
      <Text
        style={[
          styles.itemLabel,
          {
            color: active ? colors.primary : colors.textPrimary,
          },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

/* =========================
   CUSTOM DRAWER
========================= */
function CustomDrawerContent(props) {
  const { colors } = useTheme();
  const [socialLinks, setSocialLinks] = useState({});

  useEffect(() => {
    (async () => {
      const res = await commanServices.getSocialMediaLinks();
      setSocialLinks(res?.socialLinks || {});
    })();
  }, []);

  const openLink = (url) => url && Linking.openURL(url);

  const currentRoute = props.state.routeNames[props.state.index];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>

      {/* 🔥 HEADER */}
      <LinearGradient
        colors={[colors.surface, colors.cardBackground]}
        style={styles.header}
      >
        <Image
          source={require('../../assets/radiomastibg.png')}
          style={styles.logo}
        />

        <Text style={styles.tagline}>
          Radio Masti 89.6 FM
        </Text>
      </LinearGradient>

      {/* 🔥 MENU */}
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.menuContainer}
        showsVerticalScrollIndicator={false}
      >
        <DrawerItem
          icon={Headphones}
          label="Live Radio"
          active={currentRoute === 'Tabs'}
          onPress={() => props.navigation.navigate('Tabs')}
        />

        <DrawerItem
          icon={BookOpen}
          label="Read"
          active={currentRoute === 'ReadScreen'}
          onPress={() => props.navigation.navigate('ReadScreen')}
        />

        <DrawerItem
          icon={Info}
          label="About Us"
          active={currentRoute === 'AboutScreen'}
          onPress={() => props.navigation.navigate('AboutScreen')}
        />
        <DrawerItem
          icon={Shield}
          label="Privacy Policy"
        />
        <DrawerItem
          icon={FileText}
          label="Terms & Conditions"
        />

      </DrawerContentScrollView>

      {/* 🔥 FOOTER */}
      <View style={styles.footer}>
        <Text style={[styles.followText, { color: colors.textSecondary }]}>
          Connect with us
        </Text>

        <View style={styles.socialRow}>
          <TouchableOpacity onPress={() => openLink(socialLinks.facebook)}>
            <Image source={require('../../assets/facebook.png')} style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => openLink(socialLinks.instagram)}>
            <Image source={require('../../assets/instagram.png')} style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => openLink(socialLinks.youtube)}>
            <Image source={require('../../assets/youtube.png')} style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => openLink(socialLinks.twitter)}>
            <Image source={require('../../assets/twitter.png')} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

/* =========================
   NAVIGATION
========================= */

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  const { colors } = useTheme();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'slide',
        overlayColor: 'rgba(0,0,0,0.4)',
        drawerStyle: {
          width: '75%',
          backgroundColor: colors.background,
        },
      }}
    >
      <Drawer.Screen name="Tabs" component={MainStack} />
      <Drawer.Screen name="RjShows" component={RjShows} />
      <Drawer.Screen name="ReadScreen" component={ReadScreen} />
      <Drawer.Screen name="AboutScreen" component={AboutScreen} />
    </Drawer.Navigator>
  );
}

/* =========================
   STYLES
========================= */

const styles = StyleSheet.create({
  header: {
    paddingVertical: DeviceSize.hp(4),
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  logo: {
    width: DeviceSize.wp(45),
    height: DeviceSize.wp(20),
    resizeMode: 'contain',
  },

  tagline: {
    color: '#000',
    marginTop: 8,
    fontSize: FontSizes.small,
    fontFamily: Fonts.primary.medium,
  },

  menuContainer: {
    paddingTop: 20,
    paddingHorizontal: 10,
  },

  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 6,
    gap: 12,
  },

  itemLabel: {
    fontSize: FontSizes.medium,
    fontFamily: Fonts.primary.medium,
  },

  footer: {
    paddingBottom: 15,
    paddingTop: 10,
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },

  followText: {
    fontSize: FontSizes.small,
    marginBottom: 10,
    fontFamily: Fonts.primary.medium,
  },

  socialRow: {
    flexDirection: 'row',
    gap: 20,
  },

  icon: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
  },
});