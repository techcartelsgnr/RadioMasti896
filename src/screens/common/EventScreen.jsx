import React, { useEffect, useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  RefreshControl,
  Share,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import AppHeader from "../../components/AppHeader";
import { fetchEvents } from "../../redux/slices/commonSlice";

import {
  useTheme,
  Spacing,
  FontSizes,
  Fonts,
  BorderRadius,
  Shadows,
} from "../../theme/theme";
import { SafeAreaView } from "react-native-safe-area-context";

const EventScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { colors } = useTheme();

  const { events, eventsLoading } = useSelector((state) => state.common);

  const [liked, setLiked] = useState({});

  useEffect(() => {
    dispatch(fetchEvents());
  }, []);

  const onRefresh = useCallback(() => {
    dispatch(fetchEvents());
  }, []);

  /* ❤️ LIKE TOGGLE */
  const toggleLike = (id) => {
    setLiked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  /* 🔗 SHARE */
  const onShare = async (item) => {
    try {
      await Share.share({
        message: `${item.title}\n📍 ${item.location}\n📅 ${item.date} ${item.time}`,
      });
    } catch (error) {
      console.log("Share error:", error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => navigation.navigate("EventDetails", { id: item.id })}
      style={[
        styles.card,
        { backgroundColor: colors.cardBackground, borderColor: colors.border },
      ]}
    >
      {/* IMAGE */}
      <View>
        <Image source={{ uri: item.image }} style={styles.image} />

        {/* 🏷️ BADGE */}
        <View
          style={[
            styles.badge,
            {
              backgroundColor:
                item.type === "Upcoming" ? "#2ECC71" : "#E74C3C",
            },
          ]}
        >
          <Text style={styles.badgeText}>{item.type}</Text>
        </View>
      </View>

      {/* CONTENT */}
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>
          {item.title}
        </Text>

        <Text style={[styles.location, { color: colors.textSecondary }]}>
          📍 {item.location}
        </Text>

        <Text style={[styles.date, { color: colors.textSecondary }]}>
          📅 {item.date} • {item.time}
        </Text>

        {/* ACTIONS */}
        <View style={styles.actions}>
          {/* ❤️ LIKE */}
          <TouchableOpacity onPress={() => toggleLike(item.id)}>
            <Text style={{ fontSize: 18 }}>
              {liked[item.id] ? "❤️" : "🤍"}
            </Text>
          </TouchableOpacity>

          {/* 🔗 SHARE */}
          <TouchableOpacity onPress={() => onShare(item)}>
            <Text style={{ fontSize: 18 }}>🔗</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <AppHeader title="Events" />

      <FlatList
        data={events}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={eventsLoading}
            onRefresh={onRefresh}
            tintColor={colors.primary}
          />
        }
      />
    </SafeAreaView>
  );
};

export default EventScreen;

/* =====================================================
   STYLES
===================================================== */

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  list: {
    padding: Spacing.md,
  },

  card: {
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.lg,
    borderWidth: 1,
    overflow: "hidden",
    ...Shadows.md,
  },

  image: {
    width: "100%",
    height: 180,
  },

  /* 🏷️ BADGE */
  badge: {
    position: "absolute",
    top: 10,
    right: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: BorderRadius.pill,
  },

  badgeText: {
    color: "#fff",
    fontSize: FontSizes.small,
    fontFamily: Fonts.primary.bold,
  },

  content: {
    padding: Spacing.md,
  },

  title: {
    fontSize: FontSizes.large,
    fontFamily: Fonts.primary.bold,
  },

  location: {
    fontSize: FontSizes.small,
    marginTop: 6,
  },

  date: {
    fontSize: FontSizes.small,
    marginTop: 4,
  },

  /* ACTIONS */
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 15,
    marginTop: 10,
  },
});