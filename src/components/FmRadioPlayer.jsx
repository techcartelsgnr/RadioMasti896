import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Video from 'react-native-video';
import { Play, Pause } from 'lucide-react-native';

import commanServices from '../redux/services/commanServices';

import {
  useTheme,
  FontSizes,
  Fonts,
  Spacing,
  BorderRadius,
} from '../theme/theme';

const FmRadioPlayer = () => {
  const { colors } = useTheme();

  const playerRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [streamUrl, setStreamUrl] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  /* ===============================
     🔴 LOAD STREAM (ONLY ONCE)
  =============================== */
  useEffect(() => {
    loadStream();
  }, []);

  const loadStream = async () => {
    try {
      const { stream } = await commanServices.getLiveStream();

      if (stream?.status && stream?.url) {
        setStreamUrl(stream.url); // ❌ no timestamp spam
      }
    } catch (e) {
      console.log('Stream Load Error:', e);
    }
  };

  /* ===============================
     ▶️ PLAY
  =============================== */
  const playRadio = () => {
    if (!streamUrl) return;
    setIsPlaying(true);
  };

  /* ===============================
     ⏸ STOP
  =============================== */
  const stopRadio = () => {
    setIsPlaying(false);
  };

  return (
    <View style={styles.container}>

      {/* AUDIO */}
      {streamUrl && (
        <Video
          ref={playerRef}
          source={{ uri: streamUrl }}
          paused={!isPlaying}
          audioOnly
          playInBackground
          ignoreSilentSwitch="ignore"

          onLoad={() => {
            setIsReady(true);
            setRetryCount(0);
          }}

          onError={(e) => {
            console.log('Stream Error:', e);

            // ❌ stop infinite loop
            if (retryCount < 3) {
              setRetryCount(prev => prev + 1);

              setTimeout(() => {
                loadStream();
              }, 2000);
            } else {
              console.log('Max retry reached');
            }
          }}

          style={{ width: 0, height: 0 }}
        />
      )}

      {/* BUTTON */}
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={isPlaying ? stopRadio : playRadio}
        disabled={!isReady}
        style={[
          styles.button,
          {
            backgroundColor: isPlaying ? '#3CD10A' : '#9a183a',
            opacity: isReady ? 1 : 0.6,
          },
        ]}
      >
        {isPlaying ? (
          <Pause size={FontSizes.xlarge} color="#fff" />
        ) : (
          <Play size={FontSizes.xlarge} color="#fff" />
        )}

        <Text style={styles.label}>
          Radio Masti 89.6
        </Text>
      </TouchableOpacity>

      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        {!isReady ? 'Loading stream…' : 'Live Streaming'}
      </Text>
    </View>
  );
};

export default FmRadioPlayer;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: Spacing.md,
  },
  button: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.pill,
  },
  label: {
    marginLeft: Spacing.sm,
    fontFamily: Fonts.primary.bold,
    fontSize: FontSizes.xlarge,
    color: '#fff',
  },
  subtitle: {
    marginTop: Spacing.sm,
    textAlign: 'center',
    fontFamily: Fonts.primary.regular,
    fontSize: FontSizes.small,
  },
});