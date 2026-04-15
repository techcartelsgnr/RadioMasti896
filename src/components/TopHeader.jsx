import React from "react";
import {
    View,
    Text,
    StyleSheet,
} from "react-native";

/* ✅ THEME */
import { useTheme } from "../theme/ThemeContext";
import { FontSizes, Fonts } from "../theme/theme";

const TopHeader = ({ title }) => {
    const { colors } = useTheme();

    return (
        <View
            style={[
                styles.header,
                {
                    backgroundColor: colors.cardBackground,
                    borderBottomColor: colors.divider,
                },
            ]}
        >
            {/* TITLE CENTER */}
            <Text
                style={[
                    styles.headerTitle,
                    { color: colors.textPrimary },
                ]}
                numberOfLines={1}
            >
                {title}
            </Text>
        </View>
    );
};

export default TopHeader;

/* =====================================================
   STYLES
===================================================== */

const styles = StyleSheet.create({
    header: {
        height: 52,
        justifyContent: "center",
        alignItems: "center", // ✅ center horizontally
        borderBottomWidth: 1,
    },

    headerTitle: {
        textAlign: "center",
        fontSize: FontSizes.medium,
        fontFamily: Fonts.primary.bold,
        lineHeight: FontSizes.title + 6,
    },
});