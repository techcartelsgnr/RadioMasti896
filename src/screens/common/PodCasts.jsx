import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableOpacity, // ✅ FIX
  ImageBackground,
  Modal,
  Pressable,
} from 'react-native';
import { Play, Info } from 'lucide-react-native'; // ✅ FIX

import TopHeader from '../../components/TopHeader';
import EmptyState from '../../components/EmptyState';
import commanServices from '../../redux/services/commanServices'; // ✅ FIX
import ScreenWrapper from '../../components/ScreenWrapper';

import {
  useTheme,
  FontSizes,
  Fonts,
  DeviceSize,
  Spacing,
  BorderRadius,
} from '../../theme/theme';
import { useNavigation } from '@react-navigation/native';

const NUM_COLUMNS = 2;

const PodCasts = () => {

  const navigation = useNavigation();
  const { colors } = useTheme();

  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);

  // ===============================
  // 📡 Fetch Podcasts
  // ===============================
  const loadPodcasts = async () => {
    try {
      setLoading(true);
      const { podcasts } = await commanServices.getPodcasts();
      setPodcasts(podcasts || []);
    } catch (error) {
      console.log('Podcast API Error:', error);
      setPodcasts([]);
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // 🔄 Pull to Refresh
  // ===============================
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadPodcasts();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    loadPodcasts();
  }, []);

  // ===============================
  // 🎧 Podcast Card
  // ===============================
  const renderItem = ({ item }) => (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.elevated,
          borderColor: colors.border,
        },
      ]}
    >
      {/* Play Button */}
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('PodCastAudio', {
            title: item.title,
            audioUrl: item.audio,
            image: item.image,
            shortDesc: item.shortDesc,
          })
        }
        activeOpacity={0.8}

      >
        <ImageBackground
          style={styles.ImagePodBg}
          source={{ uri: item.image }}
          imageStyle={{ borderRadius: BorderRadius.lg }}
        >
          {/* Dark overlay */}
          <View style={styles.overlay} />

          {/* <View style={[
            styles.playCircle, { backgroundColor: colors.primary },
          ]}>
            <Play size={FontSizes.large} color="#fff" fill="#fff" />
          </View> */}

          {/* <Text style={[styles.watchText, {color: colors.secondary}]}>
                            Listen in Player
                          </Text> */}

        </ImageBackground>

      </TouchableOpacity>

      {/* Title */}
      <Text
        style={[
          styles.cardTitle,
          { color: colors.textPrimary },
        ]}
        numberOfLines={2}
      >
        {item.title}
      </Text>
      <TouchableOpacity
        onPress={() => setInfoVisible(true)}
        hitSlop={10}
      >
        <Info
          size={18}
          color={colors.textSecondary}
        />
      </TouchableOpacity>

      {/* Subtitle */}
      <Text
        style={[
          styles.cardSub,
          { color: colors.textSecondary },
        ]}
        numberOfLines={2}
      >
        {item.shortDesc}
      </Text>
    </View>
  );

  return (
    <ScreenWrapper
      style={[
        styles.safeArea,
        { backgroundColor: colors.background },
      ]}
    >
      <TopHeader title="Podcast Audio" />

      {/* 🔹 PAGE HEADING */}
      <View style={styles.headingBox}>
        <Text style={styles.heading}>
          <Text style={{ color: colors.primary }}>Echoes </Text>
          <Text style={{ color: colors.textPrimary }}>On-Air</Text>
        </Text>

        <Text
          style={[
            styles.subHeading,
            { color: colors.textSecondary },
          ]}
        >
          Dive Into Sound
        </Text>
      </View>

      {/* 🔴 EMPTY STATE */}
      {!loading && podcasts.length === 0 ? (
        <EmptyState
          title="No Podcasts Available"
          style={{ marginTop: Spacing.xxl }}
        />
      ) : (
        <FlatList
          data={podcasts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          numColumns={NUM_COLUMNS}
          columnWrapperStyle={{
            justifyContent: 'space-between',
          }}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.primary}
              colors={[colors.primary]}
            />
          }
        />
      )}
      {/* ℹ️ Info Modal */}
            <Modal
              transparent
              animationType="fade"
              visible={infoVisible}
              onRequestClose={() => setInfoVisible(false)}
            >
              <Pressable
                style={styles.modalOverlay}
                onPress={() => setInfoVisible(false)}
              >
                <View
                  style={[
                    styles.modalBox,
                    { backgroundColor: colors.elevated },
                  ]}
                >
                  <Text
                    style={[
                      styles.modalTitle,
                      { color: colors.textPrimary },
                    ]}
                  >
                    Audio Content Information
                  </Text>
      
                  <Text
                    style={[
                      styles.modalText,
                      { color: colors.textSecondary },
                    ]}
                  >
                    “All audio content available in this app is either originally
                    produced by Radio Masti 89.6 or used with appropriate rights and
                    permissions. The app does not provide access to third-party music
                    streaming services.”
                  </Text>
      
                  <TouchableOpacity
                    style={[
                      styles.closeBtn,
                      { backgroundColor: colors.primary },
                    ]}
                    onPress={() => setInfoVisible(false)}
                  >
                    <Text style={styles.closeText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </Pressable>
            </Modal>
    </ScreenWrapper>
  );
};

export default PodCasts;


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  headingBox: {
    alignItems: 'center',
    marginTop: Spacing.sm,
    marginBottom: Spacing.smt,
  },

  heading: {
    fontFamily: Fonts.primary.bold,
    fontSize: FontSizes.hero,
  },

  subHeading: {

    fontSize: FontSizes.normal,
    fontFamily: Fonts.primary.regular,
  },

  list: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
    marginTop: Spacing.sm,
  },

  card: {
    width: (DeviceSize.width - Spacing.lg * 3) / 2,
    borderRadius: BorderRadius.lg,
    paddingBottom: Spacing.md,
    paddingHorizontal: Spacing.xs,
    alignItems: 'center',
    marginBottom: Spacing.lg,
    borderWidth: 1,
  },

  ImagePodBg: {
    width: DeviceSize.wp(40),
    height: DeviceSize.wp(30),
    borderRadius: DeviceSize.wp(9),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.20)',
    borderRadius: BorderRadius.lg,
  },
  playCircle: {
    width: DeviceSize.wp(10),
    height: DeviceSize.wp(10),
    borderRadius: DeviceSize.wp(9),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },

  cardTitle: {
    fontFamily: Fonts.roboto.bold,
    fontSize: FontSizes.normal,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },

  cardSub: {
    fontFamily: Fonts.roboto.regular,
    fontSize: FontSizes.tiny,
    textAlign: 'center',
  },
  /* Modal */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },

  modalBox: {
    width: '100%',
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
  },

  modalTitle: {
    fontFamily: Fonts.primary.bold,
    fontSize: FontSizes.medium,
    marginBottom: Spacing.sm,
  },

  modalText: {
    fontFamily: Fonts.primary.regular,
    fontSize: FontSizes.normal,
    lineHeight: 22,
    textAlign: 'justify',
  },

  closeBtn: {
    marginTop: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },

  closeText: {
    color: '#fff',
    fontFamily: Fonts.primary.bold,
  },
});

