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
import { useRoute } from "@react-navigation/native";

import AppHeader from "../../components/AppHeader";
import { fetchEventDetail } from "../../redux/slices/commonSlice";

import {
  useTheme,
  Spacing,
  FontSizes,
  Fonts,
  BorderRadius,
} from "../../theme/theme";

import { SafeAreaView } from "react-native-safe-area-context";

const EventDetails = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const { id } = route.params;

  const { colors } = useTheme();

  const { eventDetail, eventDetailLoading } = useSelector(
    (state) => state.common
  );

  useEffect(() => {
    dispatch(fetchEventDetail(id));
  }, [id]);

  if (eventDetailLoading) {
    return (
      <SafeAreaView style={[styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </SafeAreaView>
    );
  }

  if (!eventDetail) return null;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <AppHeader title="Event Details" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* IMAGE */}
        <Image source={{ uri: eventDetail.image }} style={styles.image} />

        <View style={styles.content}>
          <Text style={[styles.type, { color: colors.primary }]}>
            {eventDetail.type}
          </Text>

          <Text style={[styles.title, { color: colors.textPrimary }]}>
            {eventDetail.title}
          </Text>

          <Text style={[styles.info, { color: colors.textSecondary }]}>
            📍 {eventDetail.location}
          </Text>

          <Text style={[styles.info, { color: colors.textSecondary }]}>
            📅 {eventDetail.date} • {eventDetail.time}
          </Text>

          <Text style={[styles.description, { color: colors.textPrimary }]}>
            {eventDetail.description}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EventDetails;

const styles = StyleSheet.create({
  container: { flex: 1 },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: "100%",
    height: 250,
  },

  content: {
    padding: Spacing.md,
  },

  type: {
    fontSize: FontSizes.small,
    fontFamily: Fonts.primary.bold,
  },

  title: {
    fontSize: FontSizes.xlarge,
    fontFamily: Fonts.primary.bold,
    marginVertical: 8,
  },

  info: {
    fontSize: FontSizes.normal,
    marginBottom: 6,
  },

  description: {
    fontSize: FontSizes.normal,
    marginTop: 12,
    lineHeight: 22,
  },
});