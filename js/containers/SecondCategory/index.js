import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';

import Banner from 'futures/components/Banner';
import { Toast } from 'futures/components/Toast';
import { apis, errtips } from 'futures/constants';
import { request } from 'futures/utils/request';
import styles from './styles';

// @flow
type Props = {
  navigation: Object,
};

export default class SecondCategory extends Component<Props> {
  constructor() {
    super();
    this.state = {
      secondCategory: [],
      slides: [],
      visibleSlides: false,
    };

    this.getCategoryData = this.getCategoryData.bind(this);
    this.goToList = this.goToList.bind(this);
  }

  componentDidMount() {
    this.getCategoryData();
    setTimeout(() => {
      this.setState({
        visibleSlides: true,
      });
    }, 100);
  }

  async getCategoryData() {
    try {
      const { state } = this.props.navigation;
      const { id } = state.params;
      const response = await request(apis.GdsC_categoryList, { 29: id });
      const slides = await request(apis.GdsC_carouselList, {});
      const indexSlides = slides.filter(slide => slide.showType === '1');

      this.setState({
        secondCategory: response,
        slides: indexSlides,
      });
    } catch (e) {
      if (e.code in errtips) {
        Toast.show(errtips[e.code], Toast.SHORT);
      } else {
        Toast.show('未知错误，请稍后重试', Toast.SHORT);
      }
    }
  }

  goToList(productId) {
    return () => {
      this.props.navigation.navigate('ProductList', { productId });
    };
  }

  render() {
    const { slides, visibleSlides } = this.state;
    const { navigation } = this.props;
    return (
      <ScrollView style={styles.container}>
        {visibleSlides ? (
          <Banner slides={slides} navigation={navigation} />
        ) : (
          <View />
        )}
        <View style={styles.categoryContainer}>
          {this.state.secondCategory.map(item => (
            <TouchableWithoutFeedback
              key={item.name}
              onPress={this.goToList(item.secondClassId)}
            >
              <View style={styles.productItem}>
                <View style={styles.productItemNameView}>
                  <Text style={styles.productItemNameText}>{item.name}</Text>
                </View>
                {/* <View style={styles.productItemDescView}>
                  <Text style={styles.productItemDescText}>{item.gdsDesc}</Text>
                </View> */}
                <View style={styles.productItemImgView}>
                  <Image
                    source={{ uri: item.imageUrl }}
                    style={styles.productItemImg}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>
      </ScrollView>
    );
  }
}
