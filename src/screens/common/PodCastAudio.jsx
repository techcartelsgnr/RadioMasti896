// import React, { useRef, useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   StatusBar,
// } from 'react-native';

// import Video from 'react-native-video';
// import Slider from '@react-native-community/slider';
// import { Play, Pause } from 'lucide-react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

// import AppHeader from '../../components/AppHeader';

// import {
//   useTheme,
//   FontSizes,
//   Fonts,
//   DeviceSize,
//   Spacing,
//   BorderRadius,
// } from '../../theme/theme';

// const PodCastAudio = ({ route }) => {
//   const { title, audioUrl, image, shortDesc } = route.params;
//   const { colors, isDarkMode } = useTheme();

//   const playerRef = useRef(null);

//   const [paused, setPaused] = useState(false);
//   const [duration, setDuration] = useState(0);
//   const [currentTime, setCurrentTime] = useState(0);

//   // ▶️ Play / Pause
//   const togglePlay = () => {
//     setPaused(prev => !prev);
//   };

//   // ⏱ When audio loads
//   const onLoad = (data) => {
//     setDuration(data.duration);
//   };

//   // ⏱ Track progress
//   const onProgress = (data) => {
//     setCurrentTime(data.currentTime);
//   };

//   // ⏩ Seek
//   const onSeek = (value) => {
//     playerRef.current?.seek(value);
//     setCurrentTime(value);
//   };

//   // 🔁 Resume playback automatically
//   useEffect(() => {
//     setPaused(false);
//   }, []);

//   // =========================
//   // 🔥 TIME FORMAT (mm:ss)
//   // =========================
//   const formatTime = (time) => {
//     if (!time) return '00:00';

//     const minutes = Math.floor(time / 60);
//     const seconds = Math.floor(time % 60);

//     return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
//   };

//   // 🔥 Remaining time
//   const remainingTime = duration - currentTime;

//   return (
//     <SafeAreaView
//       style={[
//         styles.safeArea,
//         { backgroundColor: colors.background },
//       ]}
//     >
//       <StatusBar
//         translucent={false}
//         backgroundColor={colors.cardBackground}
//         barStyle={isDarkMode ? 'light-content' : 'dark-content'}
//       />

//       <AppHeader title={'Back'} />

//       {/* 🎧 AUDIO PLAYER */}
//       <Video
//         ref={playerRef}
//         source={{ uri: audioUrl }}
//         paused={paused}
//         audioOnly
//         onLoad={onLoad}
//         onProgress={onProgress}
//         playInBackground
//         playWhenInactive
//         ignoreSilentSwitch="ignore"
//         style={{ height: 0, width: 0 }}
//       />

//       {/* 🎶 UI */}
//       <View style={styles.container}>
//         {/* TITLE */}
//         <Text
//           style={[
//             styles.title,
//             { color: colors.textPrimary },
//           ]}
//           numberOfLines={2}
//         >
//           {title}
//         </Text>

//         {shortDesc ? (
//           <Text
//             style={[
//               styles.shortDesc,
//               { color: colors.textSecondary },
//             ]}
//           >
//             {shortDesc}
//           </Text>
//         ) : null}

//         {image && (
//           <Image
//             source={{ uri: image }}
//             style={styles.coverImage}
//             resizeMode="cover"
//           />
//         )}

//         {/* SEEK BAR */}
//         <Slider
//           style={styles.slider}
//           minimumValue={0}
//           maximumValue={duration}
//           value={currentTime}
//           minimumTrackTintColor={colors.primary}
//           maximumTrackTintColor={colors.border}
//           thumbTintColor={colors.primary}
//           onSlidingComplete={onSeek}
//         />

//         {/* ⏱ TIME */}
//         <View style={styles.timeRow}>
//           {/* current time */}
//           <Text style={styles.time}>
//             {formatTime(currentTime)}
//           </Text>

//           {/* remaining time */}
//           <Text style={styles.time}>
//             -{formatTime(remainingTime)}
//           </Text>
//         </View>

//         {/* ▶️ PLAY / PAUSE */}
//         <TouchableOpacity
//           style={[
//             styles.playBtn,
//             { backgroundColor: colors.primary },
//           ]}
//           onPress={togglePlay}
//         >
//           {paused ? (
//             <Play size={FontSizes.hero} color="#fff" />
//           ) : (
//             <Pause size={FontSizes.hero} color="#fff" />
//           )}
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default PodCastAudio;

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//   },

//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingHorizontal: Spacing.xl,
//   },

//   title: {
//     fontFamily: Fonts.primary.bold,
//     fontSize: FontSizes.large,
//     textAlign: 'center',
//     marginBottom: Spacing.sm,
//   },

//   shortDesc: {
//     fontFamily: Fonts.primary.regular,
//     fontSize: FontSizes.medium,
//     textAlign: 'center',
//     marginBottom: Spacing.xl,
//     lineHeight: FontSizes.large + 6,
//   },

//   slider: {
//     width: '100%',
//     height: 40,
//   },

//   timeRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: Spacing.xl,
//   },

//   time: {
//     fontFamily: Fonts.roboto.regular,
//     fontSize: FontSizes.small,
//     color: '#999',
//   },

//   playBtn: {
//     width: DeviceSize.wp(22),
//     height: DeviceSize.wp(22),
//     borderRadius: DeviceSize.wp(11),
//     alignSelf: 'center',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   coverImage: {
//     width: DeviceSize.wp(70),
//     height: DeviceSize.wp(70),
//     borderRadius: BorderRadius.lg,
//     alignSelf: 'center',
//     marginBottom: Spacing.lg,
//   },
// });



import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';

import Video from 'react-native-video';
import Slider from '@react-native-community/slider';
import { Play, Pause } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import notifee, { AndroidImportance } from '@notifee/react-native';

import AppHeader from '../../components/AppHeader';

import {
  useTheme,
  FontSizes,
  Fonts,
  DeviceSize,
  Spacing,
  BorderRadius,
} from '../../theme/theme';

const PodCastAudio = ({ route }) => {
  const { title, audioUrl, image, shortDesc } = route.params;
  const { colors, isDarkMode } = useTheme();

  const playerRef = useRef(null);

  const [paused, setPaused] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  /* =========================
     🔔 SHOW NOTIFICATION
  ========================= */
  const showNotification = async () => {
    await notifee.createChannel({
      id: 'audio',
      name: 'Audio Channel',
      importance: AndroidImportance.HIGH,
    });

    await notifee.displayNotification({
      title: title,
      body: 'Now Playing',
      android: {
        channelId: 'audio',
        smallIcon: 'ic_launcher',
        ongoing: true,
        actions: [
          { title: 'Play/Pause', pressAction: { id: 'toggle' } },
          { title: 'Stop', pressAction: { id: 'stop' } },
        ],
      },
    });
  };

  /* =========================
     ▶️ PLAY / PAUSE
  ========================= */
  const togglePlay = () => {
    setPaused(prev => !prev);
  };

  /* =========================
     ⏱ LOAD
  ========================= */
  const onLoad = (data) => {
    setDuration(data.duration);
  };

  const onProgress = (data) => {
    setCurrentTime(data.currentTime);
  };

  const onSeek = (value) => {
    playerRef.current?.seek(value);
    setCurrentTime(value);
  };

  /* =========================
     🔁 AUTO PLAY + NOTIFICATION
  ========================= */
  useEffect(() => {
    setPaused(false);
    showNotification();

    // 🔥 Handle notification actions
    const unsubscribe = notifee.onForegroundEvent(({ type, detail }) => {
      if (detail.pressAction?.id === 'toggle') {
        togglePlay();
      }
      if (detail.pressAction?.id === 'stop') {
        setPaused(true);
      }
    });

    return () => unsubscribe();
  }, []);

  /* =========================
     ⏱ TIME FORMAT
  ========================= */
  const formatTime = (time) => {
    if (!time) return '00:00';

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const remainingTime = duration - currentTime;

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        { backgroundColor: colors.background },
      ]}
    >
      <StatusBar
        backgroundColor={colors.cardBackground}
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />

      <AppHeader title={'Back'} />

      {/* 🎧 AUDIO PLAYER */}
      <Video
        ref={playerRef}
        source={{ uri: audioUrl }}
        paused={paused}
        audioOnly
        onLoad={onLoad}
        onProgress={onProgress}
        playInBackground
        playWhenInactive
        ignoreSilentSwitch="ignore"
        style={{ height: 0, width: 0 }}
      />

      {/* 🎶 UI */}
      <View style={styles.container}>
        <Text
          style={[
            styles.title,
            { color: colors.textPrimary },
          ]}
          numberOfLines={2}
        >
          {title}
        </Text>

        {shortDesc && (
          <Text
            style={[
              styles.shortDesc,
              { color: colors.textSecondary },
            ]}
          >
            {shortDesc}
          </Text>
        )}

        {image && (
          <Image
            source={{ uri: image }}
            style={styles.coverImage}
          />
        )}

        {/* SEEK */}
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={duration}
          value={currentTime}
          minimumTrackTintColor={colors.primary}
          maximumTrackTintColor={colors.border}
          thumbTintColor={colors.primary}
          onSlidingComplete={onSeek}
        />

        {/* TIME */}
        <View style={styles.timeRow}>
          <Text style={styles.time}>
            {formatTime(currentTime)}
          </Text>

          <Text style={styles.time}>
            -{formatTime(remainingTime)}
          </Text>
        </View>

        {/* PLAY BUTTON */}
        <TouchableOpacity
          style={[
            styles.playBtn,
            { backgroundColor: colors.primary },
          ]}
          onPress={togglePlay}
        >
          {paused ? (
            <Play size={FontSizes.hero} color="#fff" />
          ) : (
            <Pause size={FontSizes.hero} color="#fff" />
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PodCastAudio;


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
  },

  title: {
    fontFamily: Fonts.primary.bold,
    fontSize: FontSizes.large,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },

  shortDesc: {
    fontFamily: Fonts.primary.regular,
    fontSize: FontSizes.medium,
    textAlign: 'center',
    marginBottom: Spacing.xl,
    lineHeight: FontSizes.large + 6,
  },

  slider: {
    width: '100%',
    height: 40,
  },

  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.xl,
  },

  time: {
    fontFamily: Fonts.roboto.regular,
    fontSize: FontSizes.small,
    color: '#999',
  },

  playBtn: {
    width: DeviceSize.wp(22),
    height: DeviceSize.wp(22),
    borderRadius: DeviceSize.wp(11),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },

  coverImage: {
    width: DeviceSize.wp(70),
    height: DeviceSize.wp(70),
    borderRadius: BorderRadius.lg,
    alignSelf: 'center',
    marginBottom: Spacing.lg,
  },
});