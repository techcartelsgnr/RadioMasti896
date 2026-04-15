import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

// THEME
import {
  DeviceSize,
  useTheme,
} from "../theme/theme";

const Header = () => {
  const navigation = useNavigation();
  const { colors, isDarkMode } = useTheme();

  return (
    <View
      style={[
        styles.headerBox,
        {
          backgroundColor: colors.cardBackground,
          borderBottomColor: colors.divider,
        },
      ]}
    >
      {/* ================= LEFT ================= */}
      <View style={styles.leftSection}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.toggleDrawer()}
        >
          {/* 🔹 MENU ICON (RESPONSIVE) */}
          <Image
            source={isDarkMode ? require('../../assets/menuy.png') : require('../../assets/menu.png')}
            style={styles.menuIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* ================= RIGHT ================= */}
      <View style={styles.rightSection}>
        

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.toggleDrawer()}
        >
          {/* 🔹 LOGO (RESPONSIVE) */}
          <Image
            source={require('../../assets/MastiFmLogo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

/* =====================================================
   STYLES (100% RESPONSIVE)
===================================================== */

const styles = StyleSheet.create({
  headerBox: {
    paddingHorizontal: DeviceSize.wp(4),
    paddingVertical: DeviceSize.wp(2),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
  },

  leftSection: {
    flex: 1,
    justifyContent: "center",
  },

  rightSection: {
    justifyContent: "center",
    alignItems: "center",
  },

  /* 🔹 App Logo */
  logoImage: {
    width: DeviceSize.wp(30),   // ~28% of screen width
    height: DeviceSize.wp(10),   // proportional height
  },

  /* 🔹 Drawer/Menu Icon */
  menuIcon: {
    width: DeviceSize.wp(6),
    height: DeviceSize.wp(6),
  },
});
