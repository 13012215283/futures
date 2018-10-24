import React from 'react';
import {
  View,
  StyleSheet,
  DeviceEventEmitter,
  Text,
  FlatList,
} from 'react-native';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';
import Button from 'futures/components/Button';
import { request } from 'futures/utils/request';
import CollectionItem from './CollectionItem';
import { Toast } from '../../components/Toast/index';

export default class Collection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIdx: 0,
      selectArr: [],
      isEdit: false,
      data: [],
    };

    this.pageNum = 5;
    this.uId = this.props.navigation.state.params.uId;

    this.getData = this.getData.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.selectItem = this.selectItem.bind(this);
    this.load = this.load.bind(this);
  }

  componentDidMount() {
    this.getData();
    this.deEmitter = DeviceEventEmitter.addListener('isEdit', a => {
      this.setState({
        isEdit: a,
      });
    });
  }

  componentWillUnmount() {
    this.deEmitter.remove();
  }

  async getData(hasDelete = false) {
    const { currentIdx } = this.state;
    try {
      const body = {
        '00': this.uId,
        '04': hasDelete ? 0 : currentIdx,
        '05': this.pageNum,
      };
      const data = await request('0021', body);
      this.setState(
        { data: hasDelete ? data : this.state.data.concat(data) },
        () => {
          DeviceEventEmitter.emit('hasData', this.state.data.length > 0);
        }
      );
    } catch (err) {
      Toast.show(
        err.code === 'PARAM_INCOM' ? '参数不全' : '系统错误',
        Toast.SHORT
      );
    }
  }

  selectItem(index) {
    const selectArr = [].concat(this.state.selectArr);
    const findIndex = selectArr.indexOf(index);
    if (findIndex > -1) {
      selectArr.splice(findIndex, 1);
    } else {
      selectArr.push(index);
    }
    this.setState({ selectArr });
  }

  async deleteItem() {
    try {
      const body = {
        '00': this.uId,
        '35': this.state.selectArr,
      };
      await request('0022', body);
      Toast.show('删除成功', Toast.SHORT);
      this.setState({
        selectArr: [],
      });
      this.getData(true);
    } catch (e) {
      Toast.show('删除失败', Toast.SHORT);
    }
  }

  load() {
    // 加载数据
    this.setState(
      {
        currentIdx: Number(this.state.currentIdx) + this.pageNum,
      },
      () => this.getData()
    );
  }

  render() {
    const { isEdit, data, selectArr } = this.state;
    return (
      <View style={{ flex: 1 }}>
        {data.length > 0 ? (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <CollectionItem
                {...item}
                isEdit={isEdit}
                onPress={() => this.selectItem(item.gdsId)}
                labels={['标签一', '标签二']}
                onPressCollection={() => {
                  const navigateAction = NavigationActions.navigate({
                    routeName: 'GoodsTab',

                    params: {
                      productInfo: { gdsId: item.gdsId },
                    },

                    action: NavigationActions.navigate({
                      routeName: 'GoodsChart',
                      params: {
                        productInfo: { gdsId: item.gdsId },
                      },
                    }),
                  });
                  this.props.navigation.dispatch(navigateAction);
                }}
              />
            )}
            keyExtractor={item => item.gdsId}
            onEndReachedThreshold={0.1}
            onEndReached={this.load}
            style={{ flex: 1 }}
          />
        ) : (
          <View style={{ flex: 1 }}>
            <Text style={{ textAlign: 'center' }}>暂无记录</Text>
          </View>
        )}
        {isEdit &&
          data.length > 0 && (
            <Button
              type="primary"
              subStatus={selectArr.length > 0 ? 'enable' : 'disable'}
              disabled={!(selectArr.length > 0)}
              text="删 除"
              containerStyle={styles.buttonWrapper}
              onPress={this.deleteItem}
            />
          )}
      </View>
    );
  }
}

Collection.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  buttonWrapper: {
    marginLeft: 0,
    marginRight: 0,
    width: '100%',
    marginTop: 0,
    borderRadius: 0,
  },
});
