import React, { Component, ReactNode } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import equal from 'fast-deep-equal';

// import Button from 'futures/components/Button';
import Stepper from 'futures/components/Stepper';
import Dialog from 'futures/components/Dialog';
import styles from './Pruchase.style';

// @flow
type Props = {
  latestPrice: string,
  changedValue: Function,
  minPosition: string,
  maxPosition: string,
};

type States = {
  dialogVisible: boolean,
  latestPrice: string,
  margin: string,
  commission: string,
};

const dialogs = {
  initialMargin: {
    title: '履行保证金',
    msg:
      '作为履行期货合约的财力担保，每手合约建仓时需缴纳的保证金为建仓价格的20%',
  },
  commission: {
    title: '手续费',
    msg:
      '委托成交后需要缴纳的交易费用，每交易1手会收取一次费用，手续费为保证金的5‰',
  },
  priceChangeUnit: {
    title: '最小变动单位',
    msg: '当前商品最小变动单位为',
  },
};

export default class Purchase extends Component<Props, States> {
  static inputFieldTitle(
    title: string,
    hasDialog: boolean,
    onPress?: Function
  ): ReactNode {
    return (
      <View style={styles.inputFieldView}>
        <Text style={styles.inputFieldText}>{title}</Text>
        {hasDialog ? (
          <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.tipsView}>
              <Text style={styles.tips}>&#xe808;</Text>
            </View>
          </TouchableWithoutFeedback>
        ) : null}
      </View>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      dialogVisible: false,
      dialogInfo: {
        header: '',
        content: '',
      },
      latestPrice: props.latestPrice,
      minPosition: props.minPosition,
      maxPosition: props.maxPosition,
    };
    this.fillIn = this.fillIn.bind(this);
    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.updateParentValue = this.updateParentValue.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      latestPrice: nextProps.latestPrice,
      minPosition: nextProps.minPosition,
      maxPosition: nextProps.maxPosition,
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !equal(this.state, nextState);
  }

  updateValue() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.updateParentValue();
    }, 0);
  }

  updateParentValue() {
    const openPositionPrice = this.positionPriceRef.getValue();
    const position = this.positionRef.getValue();
    this.props.changedValue(openPositionPrice, position);
  }

  closeDialog() {
    this.setState({ dialogVisible: false });
  }

  openDialog(dialogInfo) {
    return () => {
      const { minPriceChangeUnit } = this.state;
      this.setState({
        dialogInfo: {
          header: dialogs[dialogInfo].title,
          content:
            dialogInfo !== 'priceChangeUnit'
              ? dialogs[dialogInfo].msg
              : dialogs[dialogInfo].msg + minPriceChangeUnit,
        },
        dialogVisible: true,
      });
    };
  }

  fillIn() {
    const { latestPrice } = this.state;
    this.positionPriceRef.setValue(latestPrice, this.updateValue);
  }

  render() {
    const { latestPrice, minPosition, maxPosition } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.newPriceView}>
          <Text style={styles.newPriceTitle}>
            最新价&nbsp;&nbsp;
            <Text style={styles.newPrice}>{latestPrice}</Text>
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.stepperContainer}>
            <View style={styles.inputFieldView}>
              {Purchase.inputFieldTitle(
                '建仓价格',
                true,
                this.openDialog('priceChangeUnit')
              )}
            </View>
            <View style={styles.stepperView}>
              <Stepper
                min={latestPrice}
                max={latestPrice}
                step={0}
                editable={false}
                value={latestPrice}
                originalValue={latestPrice}
                onChange={this.updateValue}
                ref={stepper => {
                  this.positionPriceRef = stepper;
                }}
              />
            </View>
          </View>
          <View style={styles.stepperContainer}>
            <View style={styles.inputFieldView}>
              <Text style={styles.inputFieldText}>
                建仓手数({minPosition}-{maxPosition})
              </Text>
            </View>
            <View style={styles.stepperView}>
              <Stepper
                step="1"
                min={Number(minPosition)}
                max={Number(maxPosition)}
                // value={position}
                value=""
                onChange={this.updateValue}
                ref={stepper => {
                  this.positionRef = stepper;
                }}
              />
            </View>
          </View>
        </View>
        <Dialog
          header={this.state.dialogInfo.header}
          content={this.state.dialogInfo.content}
          button={[
            {
              name: '关 闭',
              callback: this.closeDialog,
            },
          ]}
          visible={this.state.dialogVisible}
        />
      </View>
    );
  }
}
