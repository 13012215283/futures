import React from 'react';
import { FlatList, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { request } from 'futures/utils/request';
import getBanks from 'futures/utils/getBanks';
import { Toast } from 'futures/components/Toast/index';
import OutMoneyProgressComponent from './OutProgressComponent';

// 出金进度
export default class OutMoneyProgress extends React.Component {
  static propTypes = {
    /* eslint-disable react/forbid-prop-types */
    navigation: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.num = 3;
    this.state = {
      resultList: [],
      currentIdx: 0,
    };
    this.load = this.load.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  async getData() {
    try {
      const { uId } = this.props.navigation.state.params;
      const { currentIdx } = this.state;
      const body = {
        '00': uId,
        '04': currentIdx,
        '05': this.num,
      };
      const { rows } = await request('0014', body);
      // 只在第一次获取数据时取银行列表
      if (currentIdx < 1 && rows.length > 0) {
        const banksSet = await getBanks();
        const bank = banksSet[rows[0].bank];
        this.setState({
          bankMsg: bank,
        });
      }

      this.setState(prevState => ({
        resultList: prevState.resultList.concat(rows),
      }));
    } catch (e) {
      switch (e.code) {
        case 'NO_DATA_ANYMORE':
          Toast.show('没有更多的数据了', Toast.SHORT);
          break;
        default:
          Toast.show('网络错误，请重试', Toast.SHORT);
      }
    }
  }

  load() {
    // 加载数据
    this.setState(
      {
        currentIdx: Number(this.state.currentIdx) + this.num,
      },
      () => this.getData()
    );
  }

  render() {
    const { resultList, bankMsg } = this.state;
    return (
      <View style={{ flex: 1 }}>
        {resultList.length > 0 ? (
          <FlatList
            data={resultList}
            renderItem={({ item }) => (
              <OutMoneyProgressComponent {...item} bankMsg={bankMsg} />
            )}
            keyExtractor={item => item.streamId}
            onEndReachedThreshold={0.1}
            onEndReached={this.load}
          />
        ) : (
          <Text style={{ textAlign: 'center' }}>暂无出金记录</Text>
        )}
      </View>
    );
  }
}
