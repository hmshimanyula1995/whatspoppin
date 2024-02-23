import React, { useState, useRef, useEffect, useCallback } from 'react';
import useMaterialNavBarHeight from '@/hooks/useMaterialNavBarHeight';

import { Stack } from 'expo-router';
import ExploreHeader from '@/components/ExplorerHeader';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Video } from 'expo-av';

import { Dimensions, FlatList, View, Text, StyleSheet, SafeAreaView } from 'react-native';
const data = [
  {
    id: '1',
    uri: 'https://firebasestorage.googleapis.com/v0/b/getfit-7e3cb.appspot.com/o/Sequence%2001.mp4?alt=media&token=0e64274d-0d8d-486e-95e5-ec2440cc532b',
  },
  {
    id: '2',
    uri: 'https://firebasestorage.googleapis.com/v0/b/getfit-7e3cb.appspot.com/o/roofe.mp4?alt=media&token=e0be14c3-06fa-4c1a-85c8-f21a7a3b3643',
  },
  {
    id: '3',
    title:
      'https://firebasestorage.googleapis.com/v0/b/getfit-7e3cb.appspot.com/o/club3.mp4?alt=media&token=657c8c45-9f2e-4f24-9668-f14159e14930',
  },
];

const Page = () => {
  const [category, setCategory] = useState<string>('Tiny homes');
  const [contentList, setContentList] = useState(data);
  const insets = useSafeAreaInsets();
  const [playingId, setPlayingId] = useState(null); // New state to track the playing video ID

  useEffect(() => {
    setContentList(data);
  }, []);

  const renderItem = useCallback(
    ({ item }) => {
      const isPlaying = item.id === playingId; // Determine if the current item is the one that should be playing
      return (
        <View style={{ height: feedItemHeight, backgroundColor: 'black' }}>
          <Video
            source={{ uri: item.uri }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            shouldPlay={isPlaying} // Play only if the item is the current playing one
            isLooping
            style={{ width: '100%', height: '100%' }}
          />
        </View>
      );
    },
    [playingId]
  );

  const onDataChanged = (category: string) => {
    setCategory(category);
  };

  const feedItemHeight = Dimensions.get('window').height - insets.top - insets.bottom;
  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50, // Define when item is considered viewable
  }).current;

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    // If there is a viewable item and it's different from the current playing one, update the state
    if (viewableItems.length > 0) {
      const currentVisible = viewableItems[0].item;
      if (currentVisible.id !== playingId) {
        setPlayingId(currentVisible.id);
      }
    }
  }).current;
  return (
    <SafeAreaView style={[styles.container, { paddingBottom: insets.bottom }]}>
      {/* Define pour custom header */}
      {/* <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
        }}
      /> */}
      <FlatList
        data={contentList}
        windowSize={4}
        initialNumToRender={3}
        maxToRenderPerBatch={1}
        removeClippedSubviews
        viewabilityConfig={{
          itemVisiblePercentThreshold: 0,
        }}
        renderItem={renderItem}
        pagingEnabled
        keyExtractor={(item) => item.id}
        decelerationRate={'normal'}
        showsVerticalScrollIndicator={false}
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={onViewableItemsChanged}
      />
    </SafeAreaView>
  );
};

export default Page;
const styles = StyleSheet.create({
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black', // Ensure visibility against a light background
  },
  title: {
    fontSize: 32,
    color: 'black', // Ensure text visibility
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 50, // Adjust this value based on the height of your bottom bar
  },
});
