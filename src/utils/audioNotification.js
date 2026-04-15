import notifee from '@notifee/react-native';

export const showAudioNotification = async (title) => {
  await notifee.displayNotification({
    title: title,
    body: "Now Playing",
    android: {
      channelId: 'audio',
      smallIcon: 'ic_launcher',
      actions: [
        { title: 'Play/Pause', pressAction: { id: 'toggle' } },
        { title: 'Stop', pressAction: { id: 'stop' } },
      ],
    },
  });
};