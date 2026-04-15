import React, { useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  RefreshControl,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

import AppHeader from "../../components/AppHeader";
import { fetchRjShows } from "../../redux/slices/commonSlice";

import {
  useTheme,
  Fonts,
  FontSizes,
  Spacing,
  BorderRadius,
  Shadows,
} from "../../theme/theme";

import { Play } from "lucide-react-native";

const RjShows = () => {
  const dispatch = useDispatch();
  const { colors } = useTheme();

  const { rjShows, rjShowsLoading } = useSelector(
    (state) => state.common
  );

  /* 📡 LOAD */
  useEffect(() => {
    dispatch(fetchRjShows());
  }, []);

  /* 🔄 REFRESH */
  const onRefresh = useCallback(() => {
    dispatch(fetchRjShows());
  }, []);

  /* ▶️ OPEN URL */
  const openYoutube = async (url) => {
    if (!url) return;
    const supported = await Linking.canOpenURL(url);
    if (supported) Linking.openURL(url);
  };

  /* 🎧 ITEM */
  const renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => openYoutube(item.url)}
      style={[
        styles.card,
        {
          backgroundColor: colors.cardBackground,
          borderColor: colors.border,
        },
      ]}
    >
      {/* IMAGE */}
      <View style={styles.imageWrapper}>
        <Image
          source={
            item.image
              ? { uri: item.image }
              : require("../../../assets/placeholder.png")
          }
          style={styles.image}
        />

        {/* ▶️ PLAY BUTTON */}
        <View style={styles.playBtn}>
          <Play size={18} color="#fff" />
        </View>
      </View>

      {/* INFO */}
      <View style={styles.info}>
        <Text
          style={[styles.name, { color: colors.textPrimary }]}
          numberOfLines={1}
        >
          {item.name || "RJ Show"}
        </Text>

        <Text
          style={[styles.desc, { color: colors.textSecondary }]}
          numberOfLines={2}
        >
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <AppHeader title="RJ Shows" />

      {/* HEADER */}
      <View style={styles.headerBox}>
        <Text style={styles.title}>
          <Text style={{ color: colors.primary }}>RJ's </Text>
          <Text style={{ color: colors.textPrimary }}>/ Shows</Text>
        </Text>

        <Text
          style={[
            styles.subtitle,
            { color: colors.textSecondary },
          ]}
        >
          Know about Your Favorite RJ
        </Text>
      </View>

      {/* LIST */}
      <FlatList
        data={rjShows}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: Spacing.md,
          paddingBottom: Spacing.xl,
        }}
        refreshControl={
          <RefreshControl
            refreshing={rjShowsLoading}
            onRefresh={onRefresh}
            tintColor={colors.primary}
          />
        }
      />
    </SafeAreaView>
  );
};

export default RjShows;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  headerBox: {
    paddingVertical: Spacing.smt,
    alignItems: "center",
  },

  title: {
    fontFamily: Fonts.primary.bold,
    fontSize: FontSizes.title,
    // marginBottom: Spacing.xs,
  },

  subtitle: {
    fontFamily: Fonts.primary.regular,
    fontSize: FontSizes.medium,
  },

  /* 🎧 CARD */
  card: {
    marginBottom: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    overflow: "hidden",
    ...Shadows.md,
  },

  imageWrapper: {
    width: "100%",
    height: 180,
    position: "relative",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  /* ▶️ PLAY BUTTON */
  playBtn: {
    position: "absolute",
    top: "40%",
    alignSelf: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },

  info: {
    padding: Spacing.md,
  },

  name: {
    fontFamily: Fonts.primary.bold,
    fontSize: FontSizes.large,
    marginBottom: 4,
  },

  desc: {
    fontFamily: Fonts.primary.regular,
    fontSize: FontSizes.small,
    lineHeight: 18,
  },
});