import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  RefreshControl,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppHeader from '../../components/AppHeader';
import commanServices from '../../redux/services/commanServices';

import {
  useTheme,
  Fonts,
  FontSizes,
  Spacing,
  DeviceSize,
} from '../../theme/theme';

const RjShows = () => {
  const { colors } = useTheme();

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const loadShows = async () => {
    setLoading(true);
    const res = await commanServices.getRjShows();
    setList(res?.rjShows || []);
    setLoading(false);
  };

  useEffect(() => {
    loadShows();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    const res = await commanServices.getRjShows();
    setList(res?.rjShows || []);
    setRefreshing(false);
  }, []);

  const openYoutube = async (url) => {
    if (!url) return;

    const supported = await Linking.canOpenURL(url);
    if (supported) {
      Linking.openURL(url);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => openYoutube(item.url)}
      style={styles.row}
    >
      {/* Avatar */}
      <Image
        source={
          item.image
            ? { uri: item.image }
            : require('../../../assets/placeholder.png')
        }
        style={styles.avatar}
      />

      {/* Info */}
      <View style={styles.info}>
        <Text
          style={[
            styles.name,
            { color: colors.textPrimary },
          ]}
          numberOfLines={1}
        >
          {item.name}
        </Text>

        <Text
          style={[
            styles.desc,
            { color: colors.textSecondary },
          ]}
          numberOfLines={2}
        >
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <AppHeader title={'Back'} />

      {/* Title */}
      <View style={styles.headerBox}>
        <Text style={styles.title}>
          <Text style={{ color: colors.primary }}>RJ's </Text>
          <Text style={{ color: colors.textPrimary }}>/ Shows</Text>
        </Text>

        <Text
          style={[
            styles.subtitle,
            { color: colors.textSecondary },
          ]}
        >
          Know about Your Favorite RJ
        </Text>
      </View>

      {/* List */}
      <FlatList
        data={list}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: Spacing.xl,
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
          />
        }
      />
    </SafeAreaView>
  );
};

export default RjShows;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 40,
  },

  headerBox: {
    paddingVertical: Spacing.lg,
    alignItems: 'center',
  },

  title: {
    fontFamily: Fonts.primary.bold,
    fontSize: FontSizes.title,
    marginBottom: Spacing.xs,
  },

  subtitle: {
    fontFamily: Fonts.primary.regular,
    fontSize: FontSizes.medium,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },

  avatar: {
    width: DeviceSize.wp(18),
    height: DeviceSize.wp(18),
    borderRadius: DeviceSize.wp(9),
    backgroundColor: '#ddd',
  },

  info: {
    flex: 1,
    marginLeft: Spacing.md,
  },

  name: {
    fontFamily: Fonts.roboto.bold,
    fontSize: FontSizes.large,
    marginBottom: Spacing.xs,
  },

  desc: {
    fontFamily: Fonts.roboto.regular,
    fontSize: FontSizes.small,
    lineHeight: 18,
  },
});
