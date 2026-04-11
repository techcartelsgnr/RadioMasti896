import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Image,
  FlatList,
  Dimensions,
  StyleSheet,
  Animated,
} from "react-native";

const { width } = Dimensions.get("window");

// ✅ CENTER ITEM WIDTH (80%)
const ITEM_WIDTH = width * 0.8;

// ✅ SIDE SPACE (10% each side)
const SPACING = (width - ITEM_WIDTH) / 2;

const CustomSlider = ({ data = [], autoPlay = true, interval = 4000 }) => {
  const flatListRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const loopData =
    data.length > 1
      ? [data[data.length - 1], ...data, data[0]]
      : data;

  const [currentIndex, setCurrentIndex] = useState(
    data.length > 1 ? 1 : 0
  );

  // =========================
  // 🔁 AUTO PLAY
  // =========================
  useEffect(() => {
    if (!autoPlay || data.length === 0) return;

    const timer = setInterval(() => {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    }, interval);

    return () => clearInterval(timer);
  }, [currentIndex]);

  // =========================
  // 📍 SCROLL END
  // =========================
  const onMomentumScrollEnd = (event) => {
    const index = Math.round(
      event.nativeEvent.contentOffset.x / ITEM_WIDTH
    );

    setCurrentIndex(index);

    if (data.length > 1) {
      if (index === 0) {
        flatListRef.current.scrollToIndex({
          index: data.length,
          animated: false,
        });
        setCurrentIndex(data.length);
      } else if (index === data.length + 1) {
        flatListRef.current.scrollToIndex({
          index: 1,
          animated: false,
        });
        setCurrentIndex(1);
      }
    }
  };

  // =========================
  // 🎨 RENDER ITEM
  // =========================
  const renderItem = ({ item, index }) => {
    const inputRange = [
      (index - 1) * ITEM_WIDTH,
      index * ITEM_WIDTH,
      (index + 1) * ITEM_WIDTH,
    ];

    // 🔥 CENTER SCALE
    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.9, 1, 0.9],
      extrapolate: "clamp",
    });

    // 🔥 BLUR EFFECT (opacity)
    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.5, 1, 0.5],
      extrapolate: "clamp",
    });

    return (
      <Animated.View
        style={[
          styles.slide,
          {
            transform: [{ scale }],
            opacity,
          },
        ]}
      >
        <Image
          source={{ uri: item.image }}
          style={styles.image}
        />
      </Animated.View>
    );
  };

  // =========================
  // 🔘 DOTS
  // =========================
  const renderDots = () => {
    let realIndex = currentIndex - 1;

    if (realIndex < 0) realIndex = data.length - 1;
    if (realIndex >= data.length) realIndex = 0;

    return (
      <View style={styles.dotsContainer}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              realIndex === index && styles.activeDot,
            ]}
          />
        ))}
      </View>
    );
  };

  // =========================
  // 🚀 INITIAL POSITION
  // =========================
  useEffect(() => {
    if (data.length > 1) {
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          index: 1,
          animated: false,
        });
      }, 100);
    }
  }, []);

  return (
    <View>
      <Animated.FlatList
        ref={flatListRef}
        data={loopData}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}

        // 🔥 PERFECT CENTER SNAP
        snapToInterval={ITEM_WIDTH}
        decelerationRate="fast"
        snapToAlignment="center"

        // ❌ NO EXTRA MARGIN ISSUE FIX
        contentContainerStyle={{
          paddingHorizontal: SPACING,
        }}

        onMomentumScrollEnd={onMomentumScrollEnd}

        // 🔥 ANIMATION DRIVER
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}

        scrollEventThrottle={16}

        getItemLayout={(_, index) => ({
          length: ITEM_WIDTH,
          offset: ITEM_WIDTH * index,
          index,
        })}
      />

      {renderDots()}
    </View>
  );
};

export default CustomSlider;

// =========================
// 🎨 STYLES
// =========================
const styles = StyleSheet.create({
  slide: {
    width: ITEM_WIDTH,
    height: 180,
    borderRadius: 16,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: 'cover',

  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  dot: {
    width: 10,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#999",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#000",
    width: 20,
  },
});