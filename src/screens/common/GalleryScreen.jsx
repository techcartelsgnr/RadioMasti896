import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Modal,
  FlatList,
  ScrollView,
  RefreshControl,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";

import AppHeader from "../../components/AppHeader";
import { fetchGallery } from "../../redux/slices/commonSlice";

import {
  useTheme,
  Spacing,
  BorderRadius,
  Shadows,
  FontSizes,
  Fonts,
} from "../../theme/theme";

const { width } = Dimensions.get("window");
const GAP = 12;
const COLUMN_WIDTH = (width - GAP * 3) / 2;

const GalleryScreen = () => {
  const dispatch = useDispatch();
  const { colors } = useTheme();

  const { gallery, galleryLoading } = useSelector((state) => state.common);

  const [modalVisible, setModalVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const sliderRef = useRef(null);

  useEffect(() => {
    dispatch(fetchGallery());
  }, []);

  /* 🔄 REFRESH */
  const onRefresh = useCallback(() => {
    dispatch(fetchGallery());
  }, []);

  /* 📊 SPLIT INTO 2 COLUMNS */
  const leftColumn = [];
  const rightColumn = [];

  gallery.forEach((item, index) => {
    if (index % 2 === 0) leftColumn.push({ ...item, index });
    else rightColumn.push({ ...item, index });
  });

  const isOdd = gallery.length % 2 !== 0;
  const lastItem = isOdd ? gallery[gallery.length - 1] : null;

  /* 🔥 OPEN VIEWER */
  const openViewer = (index) => {
    setCurrentIndex(index);
    setModalVisible(true);

    setTimeout(() => {
      sliderRef.current?.scrollToIndex({ index, animated: false });
    }, 100);
  };

  /* 🔄 SLIDER INDEX */
  const onScroll = (e) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  /* 📸 ITEM */
  const renderItem = (item) => {
    const dynamicHeight = 140 + Math.random() * 80;

    return (
      <TouchableOpacity
        key={item.id}
        activeOpacity={0.9}
        onPress={() => openViewer(item.index)}
        style={[
          styles.card,
          {
            height: dynamicHeight,
            backgroundColor: colors.cardBackground,
            borderColor: colors.border,
          },
        ]}
      >
        <Image source={{ uri: item.image }} style={styles.image} />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <AppHeader title="Gallery" />

      <ScrollView
        contentContainerStyle={{ padding: GAP }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={galleryLoading}
            onRefresh={onRefresh}
            tintColor={colors.primary}
          />
        }
      >
        {/* 🧱 MASONRY */}
        <View style={styles.row}>
          <View style={{ width: COLUMN_WIDTH }}>
            {leftColumn.map(renderItem)}
          </View>

          <View style={{ width: COLUMN_WIDTH }}>
            {rightColumn.map(renderItem)}
          </View>
        </View>

        {/* 🔚 LAST FULL WIDTH */}
        {isOdd && (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => openViewer(gallery.length - 1)}
            style={[
              styles.card,
              {
                width: "100%",
                height: 180,
                marginTop: GAP,
              },
            ]}
          >
            <Image source={{ uri: lastItem.image }} style={styles.image} />
          </TouchableOpacity>
        )}
      </ScrollView>

      {/* 🔥 FULLSCREEN VIEWER */}
      <Modal visible={modalVisible} transparent>
        <View style={styles.modalContainer}>
          {/* HEADER */}
          <View style={styles.modalHeader}>
            <Text style={styles.counter}>
              {currentIndex + 1} / {gallery.length}
            </Text>

            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.close}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* SLIDER */}
          <FlatList
            ref={sliderRef}
            data={gallery}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={onScroll}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.fullImageContainer}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.fullImage}
                  resizeMode="contain"
                />
              </View>
            )}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default GalleryScreen;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  card: {
    marginBottom: GAP,
    borderRadius: BorderRadius.lg,
    overflow: "hidden",
    borderWidth: 1,
    ...Shadows.sm,
  },

  image: {
    width: "100%",
    height: "100%",
  },

  modalContainer: {
    flex: 1,
    backgroundColor: "#000",
  },

  modalHeader: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    zIndex: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  counter: {
    color: "#fff",
    fontSize: FontSizes.medium,
    fontFamily: Fonts.primary.bold,
  },

  close: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },

  fullImageContainer: {
    width,
    justifyContent: "center",
    alignItems: "center",
  },

  fullImage: {
    width: "100%",
    height: "80%",
  },
});