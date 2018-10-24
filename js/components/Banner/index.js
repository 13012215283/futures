import React from 'react';
import { View, Image, TouchableWithoutFeedback } from 'react-native';
import Swipper from 'react-native-swiper';
import styles from './style';

// @flow
type Props = {
  slides: Array,
};

export default function Banner(props: Props) {
  if (props.slides.length === 0) {
    return <View style={styles.container} />;
  }
  return (
    <View style={styles.container}>
      <Swipper
        autoplay
        paginationStyle={styles.paginationStyle}
        dot={<View style={[styles.dotStyle, styles.inactiveDotStyle]} />}
        activeDot={<View style={[styles.dotStyle, styles.activeDotStyle]} />}
      >
        {props.slides.map(item => (
          <TouchableWithoutFeedback
            key={item.imgUrl}
            onPress={() => {
              props.navigation.navigate('BannerWebView', {
                webUrl: item.webUrl,
              });
            }}
          >
            <View style={styles.bannerImageView}>
              <Image
                source={{
                  uri: item.imgUrl,
                }}
                style={styles.bannerImage}
              />
            </View>
          </TouchableWithoutFeedback>
        ))}
      </Swipper>
    </View>
  );
}
