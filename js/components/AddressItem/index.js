import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import noop from 'futures/utils/noop';
import { px2dp } from 'futures/utils/px2dp';
import IconBtn from './IconBtn';
import style from './style';

// @flow
type Props = {
  data: Object, // 当前地址数据
  onEdit: Function, // 编辑
  onDelete: Function, // 删除
  setDefault: Function, // 设置默认
  onPressItem?: Function, // 点击选择方法
  selectId?: string, // 选中的列表id
};

export default class Item extends Component<Props> {
  constructor(props) {
    super(props);
    this.showInfo = this.showInfo.bind(this);
  }

  /** 地址信息 */
  showInfo() {
    const { selectId, data } = this.props;
    const { name, mobile, detailed, province, city, id } = data;
    const address = `${province} ${city} ${detailed}`;
    const ifSelect = selectId === id;
    const wordStyle = ifSelect
      ? [style.infoText, style.selectColor]
      : style.infoText;

    return (
      <View style={[style.line, style.row]}>
        {ifSelect ? <Text style={style.selectIcon}>&#xe61b;</Text> : null}
        <View style={{ flex: 1 }}>
          <View style={style.info}>
            <Text style={wordStyle}>{name}</Text>
            <Text style={wordStyle}>{mobile}</Text>
          </View>
          <Text style={style.addressText}>{address}</Text>
        </View>
      </View>
    );
  }

  render() {
    const { onEdit, onDelete, data, onPressItem, setDefault } = this.props;
    return (
      <TouchableWithoutFeedback onPress={() => onPressItem(data)}>
        <View style={style.container}>
          {this.showInfo()}

          <View style={[style.line, style.opertions]}>
            {data.defaultAddress === '1' ? (
              <IconBtn type="default" onPress={noop} />
            ) : (
              <IconBtn type="circle" onPress={() => setDefault(data.id)} />
            )}
            <View style={style.row}>
              <IconBtn
                type="edit"
                onPress={() => onEdit(data)}
                style={{ marginRight: px2dp(32) }}
              />
              <IconBtn type="delete" onPress={() => onDelete(data.id)} />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
