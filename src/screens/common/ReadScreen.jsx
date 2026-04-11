import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

import AppHeader from '../../components/AppHeader';
import commanServices from '../../redux/services/commanServices';

import {
  useTheme,
  Spacing,
} from '../../theme/theme';

const ReadScreen = () => {
  const { colors } = useTheme();

  const [readLink, setReadLink] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadReadLink = async () => {
    setLoading(true);
    const res = await commanServices.getReadLink();
    setReadLink(res.readLink);
    setLoading(false);
  };

  useEffect(() => {
    loadReadLink();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    const res = await commanServices.getReadLink();
    setReadLink(res.readLink);
    setRefreshing(false);
  }, []);

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <AppHeader title={'Back'} />

      {/* ================= WEBVIEW ================= */}
      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <WebView
          source={{
            uri: readLink
              ? `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(readLink)}`
              : '',
          }}
          startInLoadingState
          renderLoading={() => (
            <ActivityIndicator
              size="large"
              color={colors.primary}
              style={{ marginTop: Spacing.lg }}
            />
          )}
          style={{ flex: 1 }}
          allowsInlineMediaPlayback
          javaScriptEnabled
          domStorageEnabled
          pullToRefreshEnabled={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.primary}
            />
          }
        />
      )}
    </SafeAreaView>
  );
};

export default ReadScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
