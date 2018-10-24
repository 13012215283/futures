import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { apis, errtips } from 'futures/constants';
import { request } from 'futures/utils/request';
import { Toast } from 'futures/components/Toast';
import equal from 'fast-deep-equal';
import { px2dp } from 'futures/utils/px2dp';
import PreloadImage from 'futures/components/PreloadImage';
import CustomSwiper from 'futures/components/CustomSwiper';
import styles from './style';

// @flow
type Props = {
  screenProps: Object,
};
export default class GoodsDetail extends Component<Props> {
  constructor(props) {
    super(props);
    const { productInfo } = props.screenProps.params;
    this.state = {
      productInfo,
      gdsUrls: [],
      descUrl: [],
      gdsDesc: '',
      gdsDesc2: [],
      gdsName: '',
      uptodatePrice: '',
    };
    this.getGoodsDetailsData = this.getGoodsDetailsData.bind(this);
  }

  componentDidMount() {
    this.getGoodsDetailsData();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !equal(this.state, nextState);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  async getGoodsDetailsData() {
    try {
      const { productInfo } = this.state;
      const { gdsId } = productInfo;

      const body = {
        '03': gdsId,
      };

      const response = await request(apis.GdsC_gdsDetail, body);
      const {
        gdsUrls,
        gdsDesc,
        gdsDesc2,
        gdsName,
        uptodatePrice,
        descUrl,
      } = response;

      this.setState({
        gdsUrls,
        descUrl,
        uptodatePrice,
        gdsName,
        gdsDesc,
        gdsDesc2,
      });
    } catch (e) {
      if (e.code in errtips) {
        Toast.show(errtips[e.code], Toast.SHORT);
      } else {
        Toast.show('未知错误，请稍后重试', Toast.SHORT);
      }
    } finally {
      this.timer = setTimeout(this.getGoodsDetailsData, 5000);
    }
  }

  render() {
    const {
      gdsUrls,
      uptodatePrice,
      gdsName,
      gdsDesc,
      gdsDesc2,
      descUrl,
    } = this.state;
    return (
      <ScrollView style={styles.container} bounces={false}>
        <CustomSwiper images={gdsUrls} />
        <Text style={styles.nameText}>{gdsName}</Text>
        <Text style={styles.configurationText}>{gdsDesc}</Text>
        <Text style={styles.detialsText}>
          {gdsDesc2.reduce((a, b) => {
            if (a === '' || b === '') {
              return a + b;
            }
            return `${a}\n${b}`;
          }, '')}
        </Text>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>{uptodatePrice}</Text>
          <View style={styles.noticeContainer}>
            <Text style={styles.noticeText}>最新成交价</Text>
          </View>
        </View>
        <View style={styles.separateLine} />
        <View style={styles.separateView}>
          <View style={styles.separateViewLine} />
          <Text style={styles.commodifyInfoText}>商品信息</Text>
          <View style={styles.separateViewLine} />
        </View>
        <View style={styles.imagesContainer}>
          {descUrl.map(imageUrl => (
            <PreloadImage width={px2dp(750)} url={imageUrl} key={imageUrl} />
          ))}
        </View>
      </ScrollView>
    );
  }
}
