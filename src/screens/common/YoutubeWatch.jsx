import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Play } from 'lucide-react-native';
import Header from '../../components/Header';
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
  const [loading, setLoading] = useState(false);

  /* -------------------- OPEN YOUTUBE EXTERNALLY -------------------- */
  const openExternalYoutube = async (url) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Unable to open this video');
      }
    } catch (err) {
      console.error('Open URL error:', err);
    }
  };

  /* -------------------- FETCH DATA -------------------- */
  const getData = async () => {
    try {
      setLoading(true);
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
      console.error('Error fetching watch data:', err);
      setWatchList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const featured = watchList[0];
  const talkList = watchList.slice(1);

  const timeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = (now - date) / 1000;

    if (diff < 60) return 'Just now';
    if (diff < 3600) return Math.floor(diff / 60) + ' minutes ago';
    if (diff < 86400) return Math.floor(diff / 3600) + ' hours ago';
    if (diff < 2592000) return Math.floor(diff / 86400) + ' days ago';
    if (diff < 31536000) return Math.floor(diff / 2592000) + ' months ago';
    return Math.floor(diff / 31536000) + ' years ago';
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.background }]}
      edges={['top']}
    >
      <StatusBar
        translucent={false}
        backgroundColor={colors.cardBackground}
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />

      <View style={styles.container}>
        <Header />

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

        {/* Featured Video */}
        {featured && (
          <>
            <ImageBackground
              source={{ uri: featured.thumbnail }}
              style={[styles.featureCard, { backgroundColor: colors.surface }]}
              imageStyle={{ borderRadius: BorderRadius.lg }}
            >
              {/* Dark overlay */}
              <View style={styles.overlay} />
              {/* Center content */}
              <View style={styles.featureCardContent}>
                {/* <TouchableOpacity
                  style={[styles.bigPlayCircle, { backgroundColor: colors.primary }]}
                  onPress={() => openExternalYoutube(featured.url)}
                >
                  <Play size={FontSizes.normal} color="#fff" fill="#fff" />
                </TouchableOpacity> */}
                 <TouchableOpacity
                  onPress={() => openExternalYoutube(featured.url)}
                >
                   <Text style={[styles.watchText, {color: colors.secondary}]}>
                  Watch on YouTube
                </Text>
                </TouchableOpacity>
               
              </View>
            </ImageBackground>

            <Text style={[styles.featTitle, { color: colors.textPrimary }]}>
              {featured.title}
            </Text>

            <Text style={[styles.featDate, { color: colors.textAccent }]}>
              {timeAgo(featured.time_stamp)}
            </Text>
          </>
        )}

        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
          Talk with Radio Masti
        </Text>

        {/* Video List */}
        <FlatList
          data={talkList}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Spacing.xl }}
          renderItem={({ item }) => (
            <View style={styles.talkRow}>
              <ImageBackground
                source={{ uri: item.thumbnail }}
                imageStyle={{ borderRadius: BorderRadius.md }}
                style={[styles.talkCard, { backgroundColor: colors.surface }]}
              >
                {/* Dark overlay */}
                <View style={styles.overlay} />
                {/* <TouchableOpacity
                  style={[styles.smallPlayCircle, { backgroundColor: colors.primary }]}
                  onPress={() => openExternalYoutube(item.url)}
                >
                  <Play size={FontSizes.medium} color="#fff" fill="#fff" />
                </TouchableOpacity> */}

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
                    <Text style={[styles.watchonDate, { color: colors.textAccent }]}>Watch On YouTube</Text>
                  </TouchableOpacity>
                </View>

              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default WatchScreen;

/* -------------------- STYLES -------------------- */
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingBottom: 70,
  },
  container: {
    flex: 1,
  },
  headerBox: {
    borderBottomLeftRadius: BorderRadius.lg,
    borderBottomRightRadius: BorderRadius.lg,
    paddingTop: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.sm,
    alignItems: 'center',
  },
  titleLine: {
    fontSize: FontSizes.hero,
    letterSpacing: 1,
  },
  orangeStrong: {
    fontFamily: Fonts.primary.bold,
    fontSize: FontSizes.hero,
  },
  strong: {
    fontFamily: Fonts.primary.bold,
  },
  subtitle: {
    fontFamily: Fonts.primary.regular,
    fontSize: FontSizes.medium,
    marginBottom: Spacing.sm,
  },
  featureCard: {
    borderRadius: BorderRadius.lg,
    marginHorizontal: CARD_SIDE_MARGIN,
    height: DeviceSize.hp(18),
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: Spacing.xs,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.80)',
    borderRadius: BorderRadius.lg,
  },
  featureCardContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    margin: Spacing.md,
  },
  bigPlayCircle: {
    width: DeviceSize.wp(10),
    height: DeviceSize.wp(10),
    borderRadius: DeviceSize.wp(11),
    margin: Spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  watchText: {
    
    fontFamily: Fonts.primary.medium,
    fontSize: FontSizes.normal,
  },
  featTitle: {
    marginHorizontal: CARD_SIDE_MARGIN,
    marginTop: Spacing.sm,
    fontFamily: Fonts.primary.medium,
    fontSize: FontSizes.normal,
  },
watchBox:{
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},
  featDate: {
    marginHorizontal: CARD_SIDE_MARGIN,
    fontFamily: Fonts.primary.regular,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallPlayCircle: {
    width: DeviceSize.wp(12),
    height: DeviceSize.wp(12),
    borderRadius: DeviceSize.wp(6),
    justifyContent: 'center',
    alignItems: 'center',
  },
  talkTitle: {
    fontFamily: Fonts.primary.bold,
    fontSize: FontSizes.normal,
    marginBottom: Spacing.xs,
  },
  talkDate: {
    fontFamily: Fonts.primary.regular,
    fontSize: FontSizes.small,
  },
  watchonDate: {
    fontFamily: Fonts.primary.bold,
    fontSize: FontSizes.small,
  },
});
