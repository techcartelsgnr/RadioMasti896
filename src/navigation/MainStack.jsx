import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabRoutes from './TabRoutes';
import { EventDetails, EventScreen, GalleryScreen, OurRJ, PodCastAudio, ProfileScreen, RjShows, VideoPlayerScreen } from './index';

const Stack = createNativeStackNavigator();

const MainStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="TabRoutes" component={TabRoutes} />
            <Stack.Screen name="VideoPlayerScreen" component={VideoPlayerScreen} />
            <Stack.Screen name="PodCastAudio" component={PodCastAudio} />
            <Stack.Screen name="RjShows" component={RjShows} />
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
            <Stack.Screen name="OurRJ" component={OurRJ} />
            <Stack.Screen name="EventScreen" component={EventScreen} />
            <Stack.Screen name="EventDetails" component={EventDetails} />
            <Stack.Screen name="GalleryScreen" component={GalleryScreen} />
            
        </Stack.Navigator>
    );
};

export default MainStack;