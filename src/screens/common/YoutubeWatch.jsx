import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  Linking,
  Alert,
  RefreshControl,
} from 'react-native';

import { Play } from 'lucide-react-native';
import TopHeader from '../../components/TopHeader';
import ScreenWrapper from '../../components/ScreenWrapper';
import commanServices from '../../redux/services/commanServices';

import {
  useTheme,
  FontSizes,
  Fonts,
  DeviceSize,
  Spacing,
  BorderRadius,
} from '../../theme/theme';

const CARD_SIDE_MARGIN = Spacing.lg;
const CARD_HEIGHT = DeviceSize.hp(12);

const WatchScreen = () => {
  const navigation = useNavigation();
  const { colors, isDarkMode } = useTheme();

  const [watchList, setWatchList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  /* -------------------- OPEN YOUTUBE -------------------- */
  const openExternalYoutube = async (url) => {
  try {
    if (!url) {
      Alert.alert("Error", "Invalid video URL");
      return;
    }

    let finalUrl = url;

    // ✅ Fix missing https
    if (!finalUrl.startsWith("http")) {
      finalUrl = "https://" + finalUrl;
    }

    await Linking.openURL(finalUrl);
  } catch (err) {
    console.error("Open URL error:", err);
    Alert.alert("Error", "Unable to open this video");
  }
};

  /* -------------------- FETCH -------------------- */
  const getData = async () => {
    try {
      const res = await commanServices.getWatchVideos();

      if (res && Array.isArray(res.videos)) {
        setWatchList(
          res.videos.map(item => ({
            id: item.id,
            title: item.title,
            url: item.url,
            time_stamp: item.timeStamp,
            thumbnail: item.thumbnail,
          }))
        );
      } else {
        setWatchList([]);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setWatchList([]);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  /* 🔄 REFRESH */
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getData();
    setRefreshing(false);
  }, []);

  /* 🕒 TIME FORMAT */
  const timeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = (now - date) / 1000;

    if (diff < 60) return 'Just now';
    if (diff < 3600) return Math.floor(diff / 60) + ' min ago';
    if (diff < 86400) return Math.floor(diff / 3600) + ' hrs ago';
    if (diff < 2592000) return Math.floor(diff / 86400) + ' days ago';
    return Math.floor(diff / 2592000) + ' months ago';
  };

  /* -------------------- RENDER ITEM -------------------- */
  const renderItem = ({ item, index }) => {

    /* 🔥 FIRST ITEM = FEATURED */
    if (index === 0) {
      return (
        <>
          {/* Featured */}
          <ImageBackground
            source={{ uri: item.thumbnail }}
            style={[styles.featureCard, { backgroundColor: colors.surface }]}
            imageStyle={{ borderRadius: BorderRadius.lg }}
          >
            <View style={styles.overlay} />

            <View style={styles.featureCardContent}>
              <TouchableOpacity onPress={() => openExternalYoutube(item.url)}>
                <Text style={[styles.watchText, { color: colors.secondary }]}>
                  Watch on YouTube
                </Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>

          <Text style={[styles.featTitle, { color: colors.textPrimary }]}>
            {item.title}
          </Text>

          <Text style={[styles.featDate, { color: colors.textAccent }]}>
            {timeAgo(item.time_stamp)}
          </Text>

          {/* Section Title */}
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
            Talk with Radio Masti
          </Text>
        </>
      );
    }

    /* 📺 NORMAL ITEMS */
    return (
      <View style={styles.talkRow}>
        <ImageBackground
          source={{ uri: item.thumbnail }}
          imageStyle={{ borderRadius: BorderRadius.md }}
          style={[styles.talkCard, { backgroundColor: colors.surface }]}
        >
          <View style={styles.overlay} />
        </ImageBackground>

        <View style={{ flex: 1, marginLeft: Spacing.sm }}>
          <Text
            style={[styles.talkTitle, { color: colors.textPrimary }]}
            numberOfLines={2}
          >
            {item.title}
          </Text>

          <View style={styles.watchBox}>
            <Text style={[styles.talkDate, { color: colors.textAccent }]}>
              {timeAgo(item.time_stamp)}
            </Text>

            <TouchableOpacity onPress={() => openExternalYoutube(item.url)}>
              <Text style={[styles.watchonDate, { color: colors.textAccent }]}>
                Watch On YouTube
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScreenWrapper
      style={[styles.safeArea, { backgroundColor: colors.background }]}
      edges={['top']}
    >
      <StatusBar
        backgroundColor={colors.cardBackground}
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />

      <View style={styles.container}>
        <TopHeader title="Video Profile" />
        {/* Header */}
        <View style={styles.headerBox}>
          <Text style={styles.titleLine}>
            <Text style={[styles.orangeStrong, { color: colors.secondary }]}>
              Stream{' '}
            </Text>
            <Text style={[styles.strong, { color: colors.textPrimary }]}>
              Stories
            </Text>
          </Text>

          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Videos That Speak
          </Text>
        </View>
        {/* LIST */}
        <FlatList
          data={watchList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Spacing.xl }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.primary}
              colors={[colors.primary]}
            />
          }
        />
      </View>
    </ScreenWrapper>
  );
};

export default WatchScreen;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1 },

  featureCard: {
    borderRadius: BorderRadius.lg,
    marginHorizontal: CARD_SIDE_MARGIN,
    height: DeviceSize.hp(18),
    justifyContent: 'flex-end',
    marginBottom: Spacing.xs,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: BorderRadius.lg,
  },

  featureCardContent: {
    alignItems: 'center',
    margin: Spacing.md,
  },

  watchText: {
    fontFamily: Fonts.primary.medium,
    fontSize: FontSizes.normal,
  },
headerBox: {
    borderBottomLeftRadius: BorderRadius.lg,
    borderBottomRightRadius: BorderRadius.lg,
    paddingTop: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    // paddingBottom: Spacing.sm,
    alignItems: 'center',
  },
   titleLine: {
    fontSize: FontSizes.hero,
    letterSpacing: 1,
  },
  subtitle: {
    fontFamily: Fonts.primary.regular,
    fontSize: FontSizes.medium,
    marginBottom: Spacing.sm,
  },
  featTitle: {
    marginHorizontal: CARD_SIDE_MARGIN,
    marginTop: Spacing.sm,
    fontFamily: Fonts.primary.medium,
    fontSize: FontSizes.normal,
  },
  orangeStrong: {
    fontFamily: Fonts.primary.bold,
    fontSize: FontSizes.hero,
  },
  strong: {
    fontFamily: Fonts.primary.bold,
  },

  featDate: {
    marginHorizontal: CARD_SIDE_MARGIN,
    fontSize: FontSizes.small,
    marginBottom: Spacing.md,
  },

  sectionTitle: {
    marginHorizontal: CARD_SIDE_MARGIN,
    marginBottom: Spacing.sm,
    fontFamily: Fonts.primary.bold,
    fontSize: FontSizes.medium,
  },

  talkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
    paddingHorizontal: CARD_SIDE_MARGIN,
  },

  talkCard: {
    borderRadius: BorderRadius.md,
    width: DeviceSize.wp(28),
    height: CARD_HEIGHT,
  },

  talkTitle: {
    fontFamily: Fonts.primary.bold,
    fontSize: FontSizes.normal,
  },

  watchBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },

  talkDate: {
    fontSize: FontSizes.small,
  },

  watchonDate: {
    fontSize: FontSizes.small,
    fontFamily: Fonts.primary.bold,
  },
});