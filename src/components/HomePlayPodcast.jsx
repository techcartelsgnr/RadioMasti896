import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
   Modal,
  Pressable,
} from 'react-native';

import { Info } from 'lucide-react-native';

import commanServices from '../redux/services/commanServices';

import {
  useTheme,
  Fonts,
  FontSizes,
  Spacing,
  DeviceSize,
  BorderRadius,
} from '../theme/theme';

import { useNavigation } from '@react-navigation/native';

const HomePlayPodcast = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [infoVisible, setInfoVisible] = useState(false);

  // 🔹 Load podcasts
  const loadPodcasts = async () => {
    setLoading(true);
    const res = await commanServices.getPodcasts();
    setPodcasts(res?.podcasts || []);
    setLoading(false);
  };

  useEffect(() => {
    loadPodcasts();
  }, []);

  // 🧱 Render item
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() =>
          navigation.navigate('PodCastAudio', {
            title: item.title,
            audioUrl: item.audio,
            image: item.image,
            shortDesc: item.shortDesc,
          })
        }
        style={[
          styles.card,
          { backgroundColor: colors.elevated },
        ]}
      >
        {/* Thumbnail */}
        <Image
          source={
            item.image
              ? { uri: item.image }
              : require('../../assets/placeholder.png')
          }
          style={styles.cover}
        />
        {/* Info */}
        <View style={styles.info}>
           <View style={styles.titleRow}>
          <Text
            style={[styles.title, { color: colors.textPrimary }]}
            numberOfLines={1}
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
            </View>
          <Text
            style={[styles.artist, { color: colors.textSecondary }]}
            numberOfLines={2}
          >
            {item.shortDesc}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text
          style={[
            styles.headerTitle,
            { color: colors.textPrimary },
          ]}
        >
          Featured Shows
        </Text>
      </View>

      {/* List */}
      {loading ? (
        <ActivityIndicator
          size="large"
          color={colors.primary}
          style={{ marginTop: Spacing.xl }}
        />
      ) : (
        <FlatList
          data={podcasts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: Spacing.xl,
          }}
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
    </View>
  );
};

export default HomePlayPodcast;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
  },

  header: {
    marginTop: Spacing.sm,
    marginBottom: Spacing.sm,
  },

  headerTitle: {
    fontFamily: Fonts.primary.bold,
    fontSize: FontSizes.title,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.smt,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
  },

  cover: {
    width: DeviceSize.wp(14),
    height: DeviceSize.wp(14),
    borderRadius: BorderRadius.pill,
    backgroundColor: '#ccc',
  },

  info: {
    flex: 1,
    marginLeft: Spacing.md,
  },
titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  title: {
    fontFamily: Fonts.primary.bold,
    fontSize: FontSizes.normal,
    marginRight: 10,
  },

  artist: {
    fontFamily: Fonts.primary.regular,
    fontSize: FontSizes.small,
    marginTop: 2,
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
