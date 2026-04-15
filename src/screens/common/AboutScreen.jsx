import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import AppHeader from "../../components/AppHeader";
import { fetchAboutUs } from "../../redux/slices/commonSlice";

import {
  useTheme,
  Spacing,
  FontSizes,
  Fonts,
  BorderRadius,
  Shadows,
} from "../../theme/theme";
import { SafeAreaView } from "react-native-safe-area-context";

const AboutScreen = () => {
  const dispatch = useDispatch();
  const { colors } = useTheme();

  const { about, aboutLoading } = useSelector((state) => state.common);

  useEffect(() => {
    dispatch(fetchAboutUs());
  }, []);

  /* 🔄 LOADING */
  if (aboutLoading) {
    return (
      <SafeAreaView style={[styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </SafeAreaView>
    );
  }

  if (!about) return null;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <AppHeader title="About Us" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 🔥 HERO IMAGE */}
        <Image source={{ uri: about.image }} style={styles.heroImage} />

        {/* CONTENT */}
        <View style={styles.content}>
          {/* TITLE */}
          <Text style={[styles.title, { color: colors.textPrimary }]}>
            {about.title}
          </Text>

          {/* SHORT DESCRIPTION */}
          <Text style={[styles.description, { color: colors.textSecondary }]}>
            {about.shortDescription}
          </Text>

          {/* 📊 STATS */}
          <View style={styles.statsContainer}>
            <StatCard label="Listeners" value={about.totalListener} colors={colors} />
            <StatCard label="RJ" value={about.totalRJ} colors={colors} />
            <StatCard label="Shows" value={about.totalShow} colors={colors} />
            <StatCard label="Awards" value={about.totalAward} colors={colors} />
          </View>

          {/* EXTRA IMAGE */}
          {about.aboutImage && (
            <Image source={{ uri: about.aboutImage }} style={styles.aboutImage} />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutScreen;

/* ===============================
   📊 STAT CARD
================================ */
const StatCard = ({ label, value, colors }) => {
  return (
    <View
      style={[
        styles.statCard,
        {
          backgroundColor: colors.cardBackground,
          borderColor: colors.border,
        },
      ]}
    >
      <Text style={[styles.statValue, { color: colors.primary }]}>
        {value}+
      </Text>
      <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
        {label}
      </Text>
    </View>
  );
};

/* ===============================
   🎨 STYLES
================================ */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  heroImage: {
    width: "100%",
    height: 220,
  },

  content: {
    padding: Spacing.md,
  },

  title: {
    fontSize: FontSizes.xlarge,
    fontFamily: Fonts.primary.bold,
    marginBottom: 10,
  },

  description: {
    fontSize: FontSizes.normal,
    lineHeight: 22,
  },

  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: Spacing.lg,
  },

  statCard: {
    width: "48%",
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },

  statValue: {
    fontSize: FontSizes.large,
    fontFamily: Fonts.primary.bold,
  },

  statLabel: {
    fontSize: FontSizes.small,
    marginTop: 4,
  },

  aboutImage: {
    width: "100%",
    height: 180,
    borderRadius: BorderRadius.lg,
    marginTop: Spacing.md,
  },
});