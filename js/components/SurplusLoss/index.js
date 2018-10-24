import React from 'react';
import { Text, View } from 'react-native';
import Stepper from '../Stepper';
import Dialog from '../Dialog';
import style from './style';

class SurplusLoss extends Dialog {
  static defaultProps = {
    step: 0.01,
    max: '0',
    min: '0',
  };

  constructor() {
    super();
    this.renderContent = this.renderContent.bind(this);
  }

  renderContent() {
    const { min, max, step } = this.props;

    return (
      <View>
        <Text style={style.text}>止损</Text>
        <Stepper
          value={min}
          step={step}
          inputViewStyle={{ flex: 1 }}
          inputItemStyle={{ width: '100%' }}
        />
        <Text style={[style.text, style.surplusText]}>止盈</Text>
        <Stepper
          value={max}
          step={step}
          inputViewStyle={{ flex: 1 }}
          inputItemStyle={{ width: '100%' }}
        />
      </View>
    );
  }

  render() {
    return <Dialog {...this.props} content={() => this.renderContent()} />;
  }
}

export default SurplusLoss;
