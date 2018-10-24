import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import styles from './style';

// @flow
type Props = {
  images: Array,
};

export default class CustonSwiper extends Component<Props> {
  static renderPagination(index, total) {
    return (
      <View style={styles.pagination}>
        <Text style={styles.paginationText}>
          {index + 1}/{total}
        </Text>
      </View>
    );
  }

  constructor() {
    super();
    this.state = {
      visibleSwiper: false,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        visibleSwiper: true,
      });
    }, 0);
  }

  render() {
    const { images } = this.props;
    let swiper = null;
    if (this.state.visibleSwiper) {
      swiper = (
        <Swiper
          style={styles.swiper}
          renderPagination={CustonSwiper.renderPagination}
        >
          {images.map(imageUrl => (
            <Image
              style={styles.swiperImage}
              source={{ uri: imageUrl }}
              key={imageUrl}
            />
          ))}
        </Swiper>
      );
    } else {
      swiper = <View style={styles.swiper} />;
    }
    return swiper;
  }
}

CustonSwiper.defaultProps = {
  images: [],
};
