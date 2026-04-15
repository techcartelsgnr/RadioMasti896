import React, { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  ActivityIndicator,
  FlatList,
  RefreshControl,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

import FmRadioPlayer from '../../components/FmRadioPlayer';
import HomePlayPodcast from '../../components/HomePlayPodcast';
import CustomSlider from '../../components/CustomSlider';
import Header from '../../components/Header';
import ScreenWrapper from '../../components/ScreenWrapper';

import { fetchAdvertisements } from '../../redux/slices/commonSlice';

import {
  useTheme,
  FontSizes,
  Fonts,
  DeviceSize,
  Spacing,
} from '../../theme/theme';

export default function HomeScreen() {
  const { colors, isDarkMode } = useTheme();
  const dispatch = useDispatch();

  const [refreshing, setRefreshing] = useState(false);

  const {
    advertisements,
    advertisementsLoading,
  } = useSelector((state) => state.common);

  useEffect(() => {
    dispatch(fetchAdvertisements());
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await dispatch(fetchAdvertisements());
    setRefreshing(false);
  }, []);

  const today = new Date();

  const activeAds = advertisements.filter((ad) => {
    const start = new Date(ad.startDate);
    const end = new Date(ad.endDate);
    return today >= start && today <= end;
  });

  // 🔥 MAIN RENDER CONTENT
  const renderContent = () => (
    <View style={styles.container}>
      <Header />

      {/* TEXT */}
      <View style={styles.topTextBlock}>
        <Text style={[styles.topTxt, { color: colors.textPrimary }]}>
          <Text style={{ color: colors.primary }}>Sounds</Text> On-Air,
        </Text>

        <Text style={[styles.topTxt, { color: colors.textPrimary }]}>
          <Text style={{ color: colors.secondary }}>Stories</Text> On-Screen,
        </Text>

        <Text
          style={[
            styles.subHeading,
            { color: colors.textSecondary },
          ]}
        >
          Your favorite shows anytime
        </Text>
      </View>

      {/* RADIO */}
      <View style={{ marginTop: DeviceSize.wp(3) }}>
        <FmRadioPlayer />
      </View>

      {/* SLIDER */}
      <View style={{ marginTop: DeviceSize.wp(3) }}>
        {advertisementsLoading && !refreshing ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : activeAds.length > 0 ? (
          <CustomSlider data={activeAds} />
        ) : null}
      </View>

      {/* PODCAST */}
      <HomePlayPodcast />
    </View>
  );

  return (
    <ScreenWrapper
      style={[
        styles.safeArea,
        { backgroundColor: colors.background },
      ]}
      edges={['top']}
    >
      <StatusBar
        translucent={false}
        backgroundColor={colors.cardBackground}
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />

      {/* 🔥 FLATLIST INSTEAD OF SCROLLVIEW */}
      <FlatList
        data={[1]} // dummy data
        renderItem={renderContent}
        keyExtractor={(item) => item.toString()}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  container: {
    flex: 1,
  },

  topTextBlock: {
    paddingHorizontal: DeviceSize.wp(5),
    marginBottom: Spacing.xs,
    marginTop: Spacing.lg,
  },

  topTxt: {
    fontSize: FontSizes.title,
    fontFamily: Fonts.primary.bold,
    lineHeight: FontSizes.title + 6,
  },

  subHeading: {
    marginTop: Spacing.xs,
    fontSize: FontSizes.normal,
    fontFamily: Fonts.primary.regular,
  },
});