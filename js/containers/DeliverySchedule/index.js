/* 交割进度 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { px2dp } from 'futures/utils/px2dp';
import TimelineBlock from 'futures/components/TimelineBlock/index';
import { sizes, colors } from 'futures/components/themes';
import { request } from 'futures/utils/request';
import Dialog from 'futures/components/Dialog';
import { ConfirmBtn, ReturnGoodBtn, RefundBtn } from './ButtonGroups';
import { Toast } from '../../components/Toast/index';

export default class DeliverySchedule extends Component {
  constructor(props) {
    super(props);
    const { uId, deliveryId } = this.props.navigation.state.params;
    this.uId = uId;
    this.deliverId = deliveryId;
    this.reqSet = {
      '0': {
        req: '0312',
        name: '确认收货',
        tip: '您确定要收货吗？',
      },
      '1': {
        req: '0313',
        name: '申请退款',
        tip: '您已成功补缴尾款，退款只会退回已补缴的尾款，您确定要申请退款吗？',
      },
      '2': {
        req: '0314',
        name: '申请退货',
        tip: '您确定要申请退货吗？',
      },
    };
    this.state = {
      deliveryList: [],
      /* dialog */
      isVisible: false,
      dialogContent: '',
      confirmBtnEvent: () => {},
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    const body = { '00': this.uId, '21': this.deliverId };
    try {
      const { scheduleDescList } = await request('0306', body);
      this.setState({
        deliveryList: scheduleDescList.reverse(),
      });
    } catch (e) {
      const errTips = {
        PARAM_INCOM: '参数不全',
        DELIVERY_ERROR: '查无此交割号',
      };
      if (e.code in errTips) {
        Toast.show(errTips[e.code], Toast.SHORT);
      } else {
        Toast.show('获取交割进度失败', Toast.SHORT);
      }
    }
  }

  async btnEvents(type) {
    try {
      await request(this.reqSet[type].req, {
        '00': this.uId,
        '21': this.deliverId,
      });
      Toast.show(`${this.reqSet[type].name}成功`, Toast.SHORT);
      this.fetchData();
    } catch (e) {
      Toast.show('网络错误，请稍后再试', Toast.SHORT);
    }
  }

  openDialog(type) {
    this.setState({
      isVisible: true,
      dialogContent: this.reqSet[type].tip,
      confirmBtnEvent: () => this.btnEvents(type),
    });
  }

  renderButton(status = 'no', index) {
    const disabled = index !== 0;
    const Btn1 = () => (
      <RefundBtn onPress={() => this.openDialog(1)} disabled={disabled} />
    );
    const Btn2 = () => (
      <ReturnGoodBtn onPress={() => this.openDialog(2)} disabled={disabled} />
    );
    const Btn3 = () => (
      <ConfirmBtn onPress={() => this.openDialog(0)} disabled={disabled} />
    );
    const statusSet = {
      '0': [],
      refund: [Btn1],
      '2': [Btn2],
      '4': [Btn3],
      '5': [Btn3, Btn1],
      '6': [Btn3, Btn2],
    };
    return statusSet[status] || [];
  }

  render() {
    const { productName, productCode } = this.props.navigation.state.params;
    const {
      deliveryList,
      isVisible,
      dialogContent,
      confirmBtnEvent,
    } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: colors[1105] }}>
        <View style={styles.header}>
          <View>
            <Text style={{ color: colors.white, fontSize: sizes.f4 }}>
              {productName}
            </Text>
          </View>
          <View style={styles.itemCode}>
            <Text style={{ color: colors.white, fontSize: sizes.f0 }}>
              {productCode}
            </Text>
          </View>
        </View>
        <ScrollView style={{ margin: px2dp(32) }}>
          {/* eslint-disable react/no-array-index-key */}
          {deliveryList.map((props, index) => (
            <TimelineBlock
              {...props}
              isShowTimelineBar={index !== deliveryList.length - 1}
              key={index}
              isDone={index === 0}
            >
              {this.renderButton(props.button, index).map((Item, idx) => (
                <Item key={idx} />
              ))}
            </TimelineBlock>
          ))}
        </ScrollView>
        <Dialog
          content={dialogContent}
          header="提示"
          button={[
            {
              name: '确认',
              callback: confirmBtnEvent,
            },
            {
              name: '取消',
              callback: () => {
                this.setState({
                  isVisible: false,
                });
              },
            },
          ]}
          visible={isVisible}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: px2dp(100),
    backgroundColor: colors[1001],
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: px2dp(32),
  },
  itemCode: {
    borderWidth: px2dp(1),
    borderColor: colors.white,
    paddingLeft: px2dp(10),
    paddingRight: px2dp(10),
    borderRadius: px2dp(18),
    marginTop: px2dp(3),
    marginLeft: px2dp(32),
  },
});

DeliverySchedule.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  navigation: PropTypes.object.isRequired,
};
