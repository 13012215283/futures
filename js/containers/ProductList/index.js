import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
  RefreshControl,
} from 'react-native';
import equal from 'fast-deep-equal';

import Banner from 'futures/components/Banner';
import { Toast } from 'futures/components/Toast';
import { apis, errtips } from 'futures/constants';
import { request } from 'futures/utils/request';
import styles from './styles';

// @flow
type Props = {
  navigation: Object,
};

export default class ProductList extends Component<Props> {
  constructor() {
    super();
    this.state = {
      productLists: [],
      refreshing: false,
      slides: [],
    };
    this.getProductList = this.getProductList.bind(this);
    this.goToProductDetail = this.goToProductDetail.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
  }

  componentDidMount() {
    this.getProductList();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !equal(this.state.productLists, nextState.productLists);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  onRefresh() {
    this.setState({ refreshing: true }, async () => {
      try {
        const { state } = this.props.navigation;
        const { productId } = state.params;
        const body = {
          '06': productId,
          '04': '0',
          '05': '9999',
        };
        const response = await request(apis.GdsC_gdsList, body);
        this.setState({
          productLists: response,
        });
      } catch (e) {
        if (e.code in errtips) {
          Toast.show(errtips[e.code], Toast.SHORT);
        } else {
          Toast.show('未知错误，请稍后重试', Toast.SHORT);
        }
      } finally {
        this.setState({
          refreshing: false,
        });
      }
    });
  }

  async getProductList() {
    try {
      const { state } = this.props.navigation;
      const { productId } = state.params;
      const body = {
        '06': productId,
        '04': '0',
        '05': '9999',
      };
      const response = await request(apis.GdsC_gdsList, body);
      const slides = await request(apis.GdsC_carouselList, {});
      const indexSlides = slides.filter(slide => slide.showType === '2');
      this.setState({
        productLists: response,
        slides: indexSlides,
      });
    } catch (e) {
      if (e.code in errtips) {
        Toast.show(errtips[e.code], Toast.SHORT);
      } else {
        Toast.show('未知错误，请稍后重试', Toast.SHORT);
      }
    } finally {
      this.timer = setTimeout(this.getProductList, 5000);
    }
  }

  goToProductDetail(productInfo) {
    return () => {
      // this.props.navigation.navigate('FuturesMarket', { productInfo });
      this.props.navigation.navigate('GoodsTab', { productInfo });
    };
  }

  render() {
    const { slides } = this.state;
    const { navigation } = this.props;
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />
        }
      >
        <Banner slides={slides} navigation={navigation} />
        <View style={styles.listContainer}>
          {this.state.productLists.map(product => (
            <TouchableWithoutFeedback
              key={product.gdsId}
              onPress={this.goToProductDetail(product)}
            >
              <View style={styles.itemContainer}>
                <View style={styles.imgView}>
                  <Image
                    source={{
                      uri: product.gdsUrl,
                    }}
                    style={styles.productImg}
                  />
                </View>
                <View style={styles.productInfo}>
                  <View>
                    <View style={styles.productNameView}>
                      <Text style={styles.productName}>{product.gdsName}</Text>
                    </View>
                    <View style={styles.productTagView}>
                      <Text style={styles.tagText}>{product.gdsDesc}</Text>
                    </View>
                  </View>
                  <View style={styles.priceContainer}>
                    <View style={styles.lastedPriceView}>
                      <Text style={styles.lastedPriceText}>
                        {product.uptodatePrice}
                      </Text>
                    </View>
                    <View style={styles.lastedPriceTagView}>
                      <Text style={styles.lastedPriceTagText}>最新成交价</Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>
      </ScrollView>
    );
  }
}
