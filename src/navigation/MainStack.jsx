import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabRoutes from './TabRoutes';
import { PodCastAudio, ReadScreen, RjShows, VideoPlayerScreen } from './index';

const Stack = createNativeStackNavigator();

const MainStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="TabRoutes" component={TabRoutes} />
            <Stack.Screen name="VideoPlayerScreen" component={VideoPlayerScreen} />
            <Stack.Screen name="PodCastAudio" component={PodCastAudio} />
            <Stack.Screen name="RjShows" component={RjShows} />
        </Stack.Navigator>
    );
};

export default MainStack;