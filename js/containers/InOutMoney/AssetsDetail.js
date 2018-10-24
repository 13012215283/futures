// 金额明细（真实账户）

import React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { px2dp } from 'futures/utils/px2dp';
import { colors, sizes } from 'futures/components/themes';
import { request } from 'futures/utils/request';
import { twoDecimal } from 'futures/utils/numberFormat';
import { Toast } from 'futures/components/Toast/index';
import { navOptions } from 'futures/navigations';
import BackBtn from 'futures/navigations/BackBtn';

const Row = ({ time, amount, type }) => {
  const isInMoney = amount > 0;
  return (
    <View style={styles.rowWrapper}>
      <View>
        <Text style={styles.title}>{type}</Text>
        <Text style={styles.date}>{time}</Text>
      </View>
      <Text
        style={[
          styles.title,
          { color: isInMoney ? colors[1001] : colors[1002] },
        ]}
      >
        {(amount > 0 ? '+' : '') + twoDecimal(amount)}
      </Text>
    </View>
  );
};

Row.propTypes = {
  time: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default class AssetsDetail extends React.Component {
  static navigationOptions = ({ navigation }) =>
    navOptions(
      navigation.state.params.isRealAccount ? '金额明细' : '资金明细',
      navOptions.TYPE_RED,
      {
        headerLeft: <BackBtn navigation={navigation} />,
      }
    );

  /* eslint-disable react/forbid-prop-types */
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      currentIdx: 0,
    };
    this.pageNum = 10;
    this.load = this.load.bind(this);
  }

  componentDidMount() {
    this.getDetail();
  }

  async getDetail() {
    const { currentIdx } = this.state;
    try {
      const body = {
        '00': this.props.navigation.state.params.uId,
        '04': currentIdx,
        '05': this.pageNum,
      };
      const { rows } = await request('0011', body);
      const resultList = rows;
      this.setState(prevState => ({ data: prevState.data.concat(resultList) }));
    } catch (e) {
      Toast.show('获取金额明细错误', Toast.SHORT);
    }
  }

  load() {
    // 加载数据
    this.setState(
      {
        currentIdx: Number(this.state.currentIdx) + this.pageNum,
      },
      () => this.getDetail()
    );
  }

  render() {
    const { data } = this.state;
    return (
      <View style={styles.container}>
        {data.length > 0 ? (
          <FlatList
            data={data}
            renderItem={({ item }) => <Row {...item} />}
            keyExtractor={(item, index) => index}
            onEndReachedThreshold={0.1}
            onEndReached={this.load}
          />
        ) : (
          <Text style={{ textAlign: 'center' }}>暂无记录</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    marginTop: px2dp(20),
    backgroundColor: colors.white,
  },
  rowWrapper: {
    height: px2dp(120),
    paddingLeft: px2dp(32),
    paddingRight: px2dp(32),
    borderBottomWidth: 1,
    borderBottomColor: colors[1104],
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: sizes.f3,
    color: colors[1101],
    fontWeight: 'bold',
  },
  date: {
    fontSize: sizes.f0,
    color: colors[1102],
  },
});
