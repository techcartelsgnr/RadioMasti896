import React from 'react';
import {
    StyleSheet,
    View,
    StatusBar,
    Text,
    Switch,
    Linking
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import Header from '../../components/Header';

import FmRadioPlayer from '../../components/FmRadioPlayer';

import {
    Moon, // ✅ optional icon
} from "lucide-react-native";

import {
    useTheme,
    FontSizes,
    Fonts,
    DeviceSize,
    Spacing,
    BorderRadius,
} from '../../theme/theme';

export default function PlayFMProfile() {
    const { colors, isDarkMode, toggleTheme } = useTheme();
    return (
        <SafeAreaView
            style={[
                styles.safeArea,
                { backgroundColor: colors.background },
            ]}
            edges={['top']}
        >
            {/* 🔹 STATUS BAR (THEME AWARE) */}
            <StatusBar
                translucent={false}
                backgroundColor={colors.cardBackground} // Android
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            />

            <View style={styles.container}>
                {/* 🔹 HEADER */}
                <Header />

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

                <View style={{ marginTop: Spacing.md }}>
                    <FmRadioPlayer />
                </View>
                {/* 🔹 RADIO TAGLINE */}
                <View style={[styles.taglineBox, { borderTopColor: colors.surface }]}>
                    <Text
                        style={[
                            styles.taglinePrimary,
                            { color: colors.primary },
                        ]}
                    >
                        RadioMasti 89.6 FM —{" "}
                        <Text style={{ color: colors.textPrimary }}>
                            Feel the Beat of Your City.
                        </Text>
                    </Text>

                    <Text
                        style={[
                            styles.taglineSecondary,
                            { color: colors.textSecondary },
                        ]}
                    >
                        Voices that wake you up, stories that stay with you.
                    </Text>
                </View>


                {/* =====================================================
            🔹 THEME SWITCH (NEW)
        ===================================================== */}
                <View
                    style={[
                        styles.themeRow,
                        {
                            backgroundColor: colors.cardBackground,
                            borderColor: colors.divider,
                        },
                    ]}
                >
                    <View style={styles.optionLeft}>
                        <View style={styles.iconCircle}>
                            <Moon size={20} color={colors.primary} />
                        </View>
                        <Text
                            style={[styles.optionText, { color: colors.textPrimary }]}
                        >
                            Dark Mode
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
                {/* 🔹 FOOTER */}
                <View style={styles.footer}>
                    <Text style={[styles.footerText, { color: colors.textSecondary }]}>
                        Developed by{' '}
                        <Text
                            style={{ color: colors.primary }}
                            onPress={() => Linking.openURL('https://techcartel.in')}
                        >
                            TechCartel
                        </Text>
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        paddingBottom: 80,
    },

    container: {
        flex: 1,
    },

    topTextBlock: {
        paddingHorizontal: DeviceSize.wp(5),
        marginBottom: DeviceSize.wp(2),
        marginTop: DeviceSize.wp(5),
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
    themeRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: Spacing.smt,
        borderRadius: BorderRadius.large,
        borderWidth: 1,
        marginTop: Spacing.sm,
    },

    optionLeft: { flexDirection: "row", alignItems: "center" },

    iconCircle: {
        width: 42,
        height: 42,
        borderRadius: 21,
        alignItems: "center",
        justifyContent: "center",
        marginRight: Spacing.xs,
    },

    optionText: {
        fontFamily: Fonts.roboto.bold,
        fontSize: FontSizes.small,
    },

    taglineBox: {
        paddingHorizontal: DeviceSize.wp(5),
        marginTop: Spacing.lg,
        marginBottom: Spacing.md,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 1,
        paddingTop: Spacing.lg,
    },

    taglinePrimary: {
        fontFamily: Fonts.primary.bold,
        fontSize: FontSizes.title,
        lineHeight: FontSizes.title + 6,
        textAlign: 'center',
    },

    taglineSecondary: {
        marginTop: Spacing.xs,
        fontFamily: Fonts.primary.regular,
        fontSize: FontSizes.small,
        lineHeight: FontSizes.small + 6,
    },

    footer: {
        paddingVertical: Spacing.sm,
        alignItems: 'center',
    },

    footerText: {
        fontFamily: Fonts.primary.regular,
        fontSize: FontSizes.small,
    },


})