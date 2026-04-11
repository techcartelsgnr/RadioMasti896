import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import YoutubePlayer from 'react-native-youtube-iframe';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  useTheme,
  Spacing,
  FontSizes,
  Fonts,
  DeviceSize, 
} from '../theme/theme';

import AppHeader from '../components/AppHeader';

const VideoPlayerScreen = ({ route, navigation }) => {
  const { title, url } = route.params;
  const { colors, isDarkMode } = useTheme();

  // 🔑 YouTube ID extract (UNCHANGED LOGIC)
  const extractVideoId = (youtubeUrl) => {
    const regex = /(?:v=|youtu\.be\/)([a-zA-Z0-9_-]+)/;
    const match = youtubeUrl.match(regex);
    return match ? match[1] : null;
  };

  const videoId = extractVideoId(url);

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        { backgroundColor: colors.background },
      ]}
    >
      {/* 🔹 HEADER */}
      <AppHeader title={'Back'} />

      {/* ▶️ YOUTUBE PLAYER */}
      <YoutubePlayer
        height={DeviceSize.hp(30)}
        play={true}
        videoId={videoId}
      />

      {/* 🎬 TITLE */}
      <Text
        style={[
          styles.title,
          { color: colors.textPrimary },
        ]}
      >
        {title}
      </Text>
    </SafeAreaView>
  );
};

export default VideoPlayerScreen;


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },


  title: {
    paddingHorizontal: Spacing.lg,
    fontFamily: Fonts.roboto.bold, // ✅ Hindi + English safe
    fontSize: FontSizes.medium,
    lineHeight: FontSizes.large + 6,
  },
});
