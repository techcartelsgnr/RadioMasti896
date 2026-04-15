import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Switch,
    Linking,
    StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import ScreenWrapper from "../../components/ScreenWrapper";
import TopHeader from "../../components/TopHeader";

import {
    useTheme,
    Spacing,
    FontSizes,
    Fonts,
    BorderRadius,
    Shadows,
    DeviceSize,
} from "../../theme/theme";

import {
    CalendarDays,
    Radio,
    Image as ImageIcon,
    FileText,
    Shield,
    ChevronRight,
    Moon,
} from "lucide-react-native";

const ProfileScreen = () => {
    const navigation = useNavigation();
    const { colors, isDarkMode, toggleTheme } = useTheme();

    /* 📌 MENU DATA */
    const menuItems = [
        {
            title: "Event",
            icon: CalendarDays,
            color: "#6C63FF",
            screen: "EventScreen",
        },
        {
            title: "Our RJ",
            icon: Radio,
            color: "#002FED",
            screen: "OurRJ",
        },
         {
            title: "Gallery",
            icon: ImageIcon,
            color: "#00A8E8",
            screen: "GalleryScreen",
        },
        {
            title: "Our Shows",
            icon: Radio,
            color: "#FF7A00",
            screen: "RjShows",
        },
         
       
        {
            title: "Terms & Conditions",
            icon: FileText,
            color: "#9B5DE5",
            screen: "TermsScreen",
        },
        {
            title: "Privacy Policy",
            icon: Shield,
            color: "#E63946",
            screen: "PrivacyScreen",
        },
    ];

    /* 📌 MENU ITEM */
    const renderItem = (item, index) => {
        const Icon = item.icon;

        return (
            <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                onPress={() => navigation.navigate(item.screen)}
                style={[
                    styles.item,
                    {
                        borderBottomColor: colors.divider,
                    },
                ]}
            >
                <View style={[styles.iconBox, { backgroundColor: item.color }]}>
                    <Icon size={18} color="#fff" />
                </View>

                <Text style={[styles.title, { color: colors.textPrimary }]}>
                    {item.title}
                </Text>

                <ChevronRight size={20} color={colors.textSecondary} />
            </TouchableOpacity>
        );
    };

    return (
        <ScreenWrapper style={[styles.container, { backgroundColor: colors.background }]}>
            {/* 🔹 STATUS BAR (THEME AWARE) */}
            <StatusBar
                translucent={false}
                backgroundColor={colors.cardBackground} // Android
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            />
            <TopHeader title="RadioMasti89.6 Profile" />

            <ScrollView contentContainerStyle={styles.content}>

                {/* 🔹 TOP TEXT BLOCK */}
                <View style={styles.topTextBlock}>
                    <Text style={[styles.topTxt, { color: colors.textPrimary }]}>
                        <Text style={{ color: colors.primary }}>Sounds</Text> On-Air,
                    </Text>

                    <Text style={[styles.topTxt, { color: colors.textPrimary }]}>
                        <Text style={{ color: colors.secondary }}>Stories</Text> On-Screen,
                    </Text>

                    <Text
                        style={[
                            styles.subHeading,
                            { color: colors.textSecondary },
                        ]}
                    >
                        Your favorite shows anytime
                    </Text>
                </View>


                {/* 📋 MENU LIST */}
                <View
                    style={[
                        styles.card,
                        { backgroundColor: colors.cardBackground },
                    ]}
                >
                    {menuItems.map(renderItem)}
                </View>
                {/* 🌙 DARK MODE */}
                <View
                    style={[
                        styles.card,
                        { backgroundColor: colors.cardBackground },
                    ]}
                >
                    <View style={styles.darkModeRow}>
                        <View style={styles.optionLeft}>
                            <View style={[styles.iconCircle, { backgroundColor: colors.primary + "20" }]}>
                                <Moon size={20} color={colors.primary} />
                            </View>

                            <Text style={[styles.optionText, { color: colors.textPrimary }]}>
                                {isDarkMode ? "Dark Mode" : "Light Mode"}
                            </Text>
                        </View>

                        <Switch
                            value={isDarkMode}
                            onValueChange={toggleTheme}
                            thumbColor={colors.primary}
                            trackColor={{
                                false: colors.divider,
                                true: colors.primary + "55",
                            }}
                        />
                    </View>
                </View>

                {/* 🔻 FOOTER */}
                <View style={styles.footer}>
                    <Text style={[styles.footerText, { color: colors.textSecondary }]}>
                        Developed by{" "}
                        <Text
                            style={{ color: colors.primary }}
                            onPress={() => Linking.openURL("https://techcartel.in")}
                        >
                            TechCartel
                        </Text>
                    </Text>
                </View>

            </ScrollView>
        </ScreenWrapper>
    );
};

export default ProfileScreen;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    content: {
        padding: Spacing.md,
    },

    card: {
        borderRadius: BorderRadius.lg,
        overflow: "hidden",
        marginBottom: Spacing.md,
        ...Shadows.sm,
    },

    /* 🌙 DARK MODE */
    darkModeRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: Spacing.md,
    },

    optionLeft: {
        flexDirection: "row",
        alignItems: "center",
    },

    iconCircle: {
        width: 36,
        height: 36,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },

    optionText: {
        fontSize: FontSizes.normal,
        fontFamily: Fonts.primary.medium,
    },

    /* 📋 MENU */
    item: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 16,
        paddingHorizontal: 14,
        borderBottomWidth: 1,
    },

    iconBox: {
        width: 36,
        height: 36,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 14,
    },

    title: {
        flex: 1,
        fontSize: FontSizes.normal,
        fontFamily: Fonts.primary.medium,
    },

    topTextBlock: {
        // paddingHorizontal: DeviceSize.wp(5),
        marginBottom: DeviceSize.wp(4),
        marginTop: DeviceSize.wp(1),
    },

    topTxt: {
        fontSize: FontSizes.title,
        fontFamily: Fonts.primary.bold,
        lineHeight: FontSizes.title + 6,
    },
    subHeading: {
        marginTop: DeviceSize.wp(1.5),
        fontSize: FontSizes.normal,
        fontFamily: Fonts.primary.regular,
    },

    /* 🔻 FOOTER */
    footer: {
        alignItems: "center",
        marginTop: 20,
    },

    footerText: {
        fontSize: FontSizes.small,
        fontFamily: Fonts.primary.regular,
    },
});