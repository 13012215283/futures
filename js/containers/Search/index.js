import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  TextInput,
} from 'react-native';
import { BackBtn } from 'futures/navigations';
import { Toast } from 'futures/components/Toast';
import { apis, errtips } from 'futures/constants';
import { request } from 'futures/utils/request';
import { colors } from 'futures/components/themes';

import styles from './styles';

// @flow
type Props = {
  navigation: Object,
};

export default class Search extends Component<Props> {
  static navigationOptions = () => ({
    // header: <IndexNav {...props} currentPage="search" />,
    header: null,
  });

  constructor() {
    super();
    this.state = {
      productLists: [
        {
          gdsDesc: 'iphone8',
          gdsId: '00011808',
          gdsName: 'iphone8',
          gdsUrl:
            'http://img14.360buyimg.com/n0/jfs/t9085/22/907696059/71305/93f88c62/59b85847N20776d8e.jpg',
          uptodatePrice: '6000',
        },
      ],
    };
  }

  componentDidMount() {
    // this.getProductList();
  }

  getProductList = async () => {
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
      console.log(e);
      if (e.code in errtips) {
        Toast.show(errtips[e.code], Toast.SHORT);
      } else {
        Toast.show('未知错误，请稍后重试', Toast.SHORT);
      }
    }
  };

  goToProductDetail = productInfo => () => {
    this.props.navigation.navigate('GoodsTab', { productInfo });
  };

  render() {
    const { navigation } = this.props;
    return (
      <View>
        <View style={styles.navContainer}>
          <BackBtn navigation={navigation} />
          <View style={styles.inputView}>
            <Text style={[styles.font, styles.searchBtn]}>&#xe805;</Text>
            <TextInput
              placeholder="请输入期货名称或ID号"
              placeholderTextColor={colors['1103']}
              style={styles.searchInput}
              underlineColorAndroid="transparent"
              autoFocus
            />
          </View>
          {/* TODO: 搜索事件 */}
          <TouchableWithoutFeedback>
            <View style={styles.searchView}>
              <Text style={styles.searchText}>搜索</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
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
      </View>
    );
  }
}
