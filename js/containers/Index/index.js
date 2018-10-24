import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableWithoutFeedback,
  DeviceEventEmitter,
} from 'react-native';

import { Toast } from 'futures/components/Toast';
import Dialog from 'futures/components/Dialog';

import Banner from 'futures/components/Banner';
import { request } from 'futures/utils/request';
import { apis, errtips } from 'futures/constants';
import styles from './styles';

// @flow

type Props = {
  navigation: Object,
};

export default class Index extends Component<Props> {
  constructor() {
    super();
    this.state = {
      indexData: [],
      slides: [],
      dialog: {
        content: '',
        visible: false,
      },
    };
    this.onPress = this.onPress.bind(this);
  }

  componentDidMount() {
    DeviceEventEmitter.addListener('tradeLogin', () => {
      this.setState({
        dialog: {
          visible: true,
          content: '请先登录',
        },
      });
    });
    this.getIndexData();
  }

  onPress(type, productInfo) {
    return () => {
      const futuresInfo = {
        gdsName: productInfo.name,
        gdsId: productInfo.id,
      };
      switch (type) {
        case '1':
          this.props.navigation.navigate('SecondCategory', {
            id: productInfo.id,
          });
          break;
        case '2':
          this.props.navigation.navigate('ProductList', { id: productInfo.id });
          break;
        case '3':
          // this.props.navigation.navigate('FuturesMarket', {
          //   productInfo: futuresInfo,
          // });
          this.props.navigation.navigate('GoodsTab', {
            productInfo: futuresInfo,
          });
          break;
        default:
      }
    };
  }

  async getIndexData() {
    try {
      const slides = await request(apis.GdsC_carouselList, {});
      const indexSlides = slides.filter(slide => slide.showType === '0');
      const indexData = await request(apis.GdsC_index, {});
      this.setState({
        indexData,
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

  showDialog = (isVisible, callback = () => {}) => () => {
    this.setState(
      {
        dialog: {
          visible: isVisible,
          content: isVisible ? '请先登录' : '',
        },
      },
      () => {
        callback();
      }
    );
  };

  render() {
    const { slides, dialog } = this.state;
    return (
      <ScrollView bounces={false}>
        <Banner slides={slides} navigation={this.props.navigation} />
        <View>
          {this.state.indexData.map(category => (
            <View key={category.id}>
              <View style={styles.productAreaTitle}>
                <Image
                  source={{ uri: category.imageUrl }}
                  style={styles.productAreaTitleImg}
                />
              </View>
              <View style={styles.categoryContainer}>
                {category.list.map(product => (
                  <TouchableWithoutFeedback
                    onPress={this.onPress(category.type, product)}
                    key={product.id}
                  >
                    <View style={styles.categoryView}>
                      <View style={styles.imgView}>
                        <Image
                          source={{
                            uri: product.imageUrl,
                          }}
                          style={styles.categoryImg}
                        />
                      </View>
                      <View style={styles.textView}>
                        <Text style={styles.categoryName}>{product.name}</Text>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                ))}
              </View>
            </View>
          ))}
        </View>
        <Dialog
          header="提示"
          content={dialog.content}
          visible={dialog.visible}
          button={[
            { name: '取消', callback: this.showDialog(false) },
            {
              name: '确认',
              callback: this.showDialog(false, () => {
                this.props.navigation.navigate('Login');
              }),
            },
          ]}
        />
      </ScrollView>
    );
  }
}
