import React, { Component } from 'react';
import { View, SectionList, Text } from 'react-native';
import { apis, errtips } from 'futures/constants';
import { request } from 'futures/utils/request';
import { Toast } from 'futures/components/Toast';
import equal from 'fast-deep-equal';
import ParamsItem from './paramsItem';
import styles from './style';

// @flow
type Props = {
  screenProps: Object,
};

const itemSeparatorComponent = () => <View style={styles.itemSeparate} />;

const renderItemComponent = data => {
  const { column, content } = data.item;
  switch (Number(column)) {
    case 1:
      return (
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>{content[0]}</Text>
        </View>
      );
    case 2:
      return <ParamsItem paramsName={content[0]} paramsValue={content[1]} />;
    default:
      break;
  }
  return null;
};

export default class GoodsParams extends Component<Props> {
  constructor(props) {
    super(props);
    const { productInfo } = props.screenProps.params;
    this.state = {
      productInfo,
      parameterRow: [],
    };
    this.getGoodsDetailsData = this.getGoodsDetailsData.bind(this);
  }

  componentDidMount() {
    this.getGoodsDetailsData();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !equal(this.state, nextState);
  }

  async getGoodsDetailsData() {
    try {
      const { productInfo } = this.state;
      const { gdsId } = productInfo;

      const body = {
        '03': gdsId,
      };

      const response = await request(apis.GdsC_gdsDetail, body);
      const { parameterRow } = response;
      this.setState({
        parameterRow,
      });
    } catch (e) {
      if (e.code in errtips) {
        Toast.show(errtips[e.code], Toast.SHORT);
      } else {
        Toast.show('未知错误，请稍后重试', Toast.SHORT);
      }
    }
  }

  render() {
    const { parameterRow } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.listContainer}>
          <SectionList
            sections={[
              {
                data: parameterRow,
              },
            ]}
            renderItem={renderItemComponent}
            ItemSeparatorComponent={itemSeparatorComponent}
            renderSectionFooter={itemSeparatorComponent}
            ListHeaderComponent={itemSeparatorComponent}
            stickySectionHeadersEnabled={false}
            bounces
          />
        </View>
      </View>
    );
  }
}
