import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { px2dp } from 'futures/utils/px2dp';
import { colors, sizes } from 'futures/components/themes';
import { twoDecimal } from 'futures/utils/numberFormat';

const SelectBox = ({ isSelected, onPress }) => (
  <TouchableOpacity
    style={[
      styles.selectBox,
      { backgroundColor: colors[isSelected ? '1001' : 'white'] },
    ]}
    onPress={onPress}
  >
    <View>
      {isSelected ? (
        <Text
          style={{
            fontSize: px2dp(38),
            fontFamily: 'iconfont',
            color: colors.white,
          }}
        >
          &#xe6d6;
        </Text>
      ) : (
        <Text
          style={{
            fontSize: px2dp(30),
            fontFamily: 'iconfont',
            color: colors[1103],
          }}
        >
          &#xe80a;
        </Text>
      )}
    </View>
  </TouchableOpacity>
);

SelectBox.propTypes = {
  isSelected: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default class CollectionItem extends React.Component {
  static productTag(tags, index) {
    return (
      <View style={styles.tagView} key={index}>
        <Text style={styles.tagText}>{tags}</Text>
      </View>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      isSelected: false,
    };
    this.onSelect = this.onSelect.bind(this);
  }

  onSelect() {
    this.setState(prevState => ({
      isSelected: !prevState.isSelected,
    }));
    this.props.onPress();
  }

  render() {
    const {
      gdsName,
      gdsId,
      gdsUrl,
      labels,
      uptodatePrice,
      isEdit,
      onPressCollection,
    } = this.props;

    const { isSelected } = this.state;

    return (
      <TouchableOpacity onPress={isEdit ? this.onSelect : onPressCollection}>
        <View style={styles.container}>
          {isEdit && (
            <SelectBox isSelected={isSelected} onPress={this.onSelect} />
          )}
          <View style={styles.imgView}>
            <Image
              source={{
                uri: gdsUrl,
              }}
              style={styles.productPoster}
            />
          </View>
          <View style={styles.productIntro}>
            <Text style={styles.productName}>{`${gdsName}（${gdsId}）`}</Text>
            <View style={styles.tagContainer}>
              {labels.map((item, index) =>
                CollectionItem.productTag(item, index)
              )}
            </View>
            <View style={styles.amountContainer}>
              <Text style={styles.amount}>
                {twoDecimal(uptodatePrice || 0)}
              </Text>
              <View style={styles.newPriceView}>
                <Text style={styles.newPriceText}>最新成交价</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

CollectionItem.propTypes = {
  gdsName: PropTypes.string.isRequired,
  gdsId: PropTypes.string.isRequired,
  uptodatePrice: PropTypes.string.isRequired,
  gdsUrl: PropTypes.string.isRequired,
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  isEdit: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
  onPressCollection: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: px2dp(260),
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: px2dp(1),
  },
  selectBox: {
    marginLeft: px2dp(16.5),
    marginRight: px2dp(16.5),
    width: px2dp(30),
    height: px2dp(30),
    borderRadius: px2dp(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgView: {
    width: px2dp(250),
    height: px2dp(250),
  },
  productPoster: {
    width: '100%',
    height: '100%',
  },
  productIntro: {
    marginLeft: px2dp(32),
  },
  productName: {
    fontSize: sizes.f2,
    color: colors[1101],
    fontWeight: 'bold',
  },
  tagContainer: {
    flexDirection: 'row',
    marginTop: px2dp(15),
  },
  tagView: {
    paddingLeft: px2dp(8),
    paddingRight: px2dp(8),
    paddingTop: px2dp(5),
    paddingBottom: px2dp(5),
    backgroundColor: colors[1105],
    borderRadius: px2dp(4),
    marginRight: px2dp(8),
  },
  tagText: {
    fontSize: sizes.f0,
    color: colors['1102'],
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: px2dp(35),
  },
  amount: {
    fontSize: sizes.f4,
    color: colors['1001'],
    fontWeight: 'bold',
  },
  newPriceView: {
    paddingLeft: px2dp(8),
    paddingRight: px2dp(8),
    paddingTop: px2dp(5),
    paddingBottom: px2dp(5),
    borderRadius: px2dp(4),
    backgroundColor: colors['1001'],
    height: px2dp(30),
    justifyContent: 'center',
    marginLeft: px2dp(16),
  },
  newPriceText: {
    fontSize: sizes.f0,
    color: colors.white,
  },
  commentWrapper: {
    flexDirection: 'row',
    marginTop: px2dp(10),
  },
  comment: {
    color: colors[1103],
    fontSize: sizes.f0,
  },
});
