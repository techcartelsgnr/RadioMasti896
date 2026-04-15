import React, { useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  RefreshControl,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";

import AppHeader from "../../components/AppHeader";
import { fetchOurRj } from "../../redux/slices/commonSlice";

import {
  useTheme,
  Spacing,
  FontSizes,
  Fonts,
  BorderRadius,
  Shadows,
  DeviceSize,
} from "../../theme/theme";

const CARD_WIDTH = DeviceSize.wp(44); // 2 columns with spacing
const CARD_HEIGHT = DeviceSize.wp(46);

const OurRJ = () => {
  const dispatch = useDispatch();
  const { colors } = useTheme();

  const { rjList, rjLoading } = useSelector((state) => state.common);

  /* 📡 LOAD */
  useEffect(() => {
    dispatch(fetchOurRj());
  }, []);

  /* 🔄 REFRESH */
  const onRefresh = useCallback(() => {
    dispatch(fetchOurRj());
  }, []);

  /* 🎙️ ITEM */
  const renderItem = ({ item }) => (
    <View
      style={[
        styles.card,
        {
          width: CARD_WIDTH,
          height: CARD_HEIGHT,
          backgroundColor: colors.cardBackground,
          borderColor: colors.border,
        },
      ]}
    >
      {/* IMAGE */}
      <Image
        source={{ uri: item.image }}
        style={styles.image}
      />

      {/* OVERLAY */}
      <View style={styles.overlay}>
        <Text
          style={[styles.name, { color: "#fff" }]}
          numberOfLines={1}
        >
          {item.name || "Radio Jockey"}
        </Text>

        <Text
          style={[styles.designation, { color: "#ddd" }]}
          numberOfLines={1}
        >
          {item.designation}
        </Text>
      </View>
    </View>
  );

  /* 🎯 EMPTY */
  const EmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
        No RJ Found 🎙️
      </Text>
    </View>
  );

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <AppHeader title="Our RJ" />

      <FlatList
        data={rjList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-between",
          paddingHorizontal: Spacing.md,
        }}
        contentContainerStyle={{
          paddingTop: Spacing.md,
          paddingBottom: Spacing.xl,
        }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={!rjLoading && <EmptyComponent />}
        refreshControl={
          <RefreshControl
            refreshing={rjLoading}
            onRefresh={onRefresh}
            tintColor={colors.primary}
          />
        }
      />
    </SafeAreaView>
  );
};

export default OurRJ;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  card: {
    borderRadius: BorderRadius.lg,
    overflow: "hidden",
    marginBottom: Spacing.md,
    borderWidth: 1,
    ...Shadows.md,
  },

  image: {
    width: "100%",
    height: "100%",
  },

  overlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: Spacing.sm,
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  name: {
    fontSize: FontSizes.medium,
    fontFamily: Fonts.primary.bold,
  },

  designation: {
    fontSize: FontSizes.small,
    fontFamily: Fonts.primary.regular,
    marginTop: 0,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: DeviceSize.hp(10),
  },

  emptyText: {
    fontSize: FontSizes.medium,
    fontFamily: Fonts.primary.medium,
  },
});