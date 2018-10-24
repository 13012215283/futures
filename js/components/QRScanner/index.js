// 二维码扫描组件
import React, { Component } from 'react';
import Camera from 'react-native-camera';
import PropTypes from 'prop-types';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Animated,
  Easing,
  Text,
  Image,
  ViewPropTypes,
} from 'react-native';
import { px2dp } from '../../utils/px2dp';

/**
 * 扫描界面遮罩
 * 单独写一个类，方便拷贝使用
 */
/* eslint-disable react/prop-types,react/sort-comp */
class QRScannerRectView extends Component {
  constructor(props) {
    super(props);

    this.getBackgroundColor = this.getBackgroundColor.bind(this);
    this.getRectSize = this.getRectSize.bind(this);
    this.getCornerSize = this.getCornerSize.bind(this);
    this.renderLoadingIndicator = this.renderLoadingIndicator.bind(this);

    this.state = {
      topWidth: 0,
      topHeight: 0,
      leftWidth: 0,
      animatedValue: new Animated.Value(0),
    };

    this.viewFinderTop = px2dp(256); // 扫描框距上距离
  }

  componentDidMount() {
    this.scannerLineMove();
  }

  // 获取背景颜色
  getBackgroundColor() {
    return {
      backgroundColor: this.props.maskColor,
    };
  }

  // 获取扫描框背景大小
  getRectSize() {
    return {
      height: this.props.rectHeight,
      width: this.props.rectWidth,
    };
  }

  // 获取扫描框边框大小
  getBorderSize() {
    if (this.props.isCornerOffset) {
      return {
        height: this.props.rectHeight - this.props.cornerOffsetSize * 2,
        width: this.props.rectWidth - this.props.cornerOffsetSize * 2,
      };
    }
    return {
      height: this.props.rectHeight,
      width: this.props.rectWidth,
    };
  }

  // 获取扫描框转角的颜色
  getCornerColor() {
    return {
      borderColor: this.props.cornerColor,
    };
  }

  // 获取扫描框转角的大小
  getCornerSize() {
    return {
      height: this.props.cornerBorderLength,
      width: this.props.cornerBorderLength,
    };
  }

  // 获取扫描框大小
  getBorderWidth() {
    return {
      borderWidth: this.props.borderWidth,
    };
  }

  // 获取扫描框颜色
  getBorderColor() {
    return {
      borderColor: this.props.borderColor,
    };
  }

  // 渲染加载动画
  renderLoadingIndicator() {
    if (!this.props.isLoading) {
      return null;
    }

    return (
      <ActivityIndicator
        animating={this.props.isLoading}
        color={this.props.color}
        size="large"
      />
    );
  }

  // 测量整个扫描组件的大小
  measureTotalSize(e) {
    const totalSize = e.layout;
    this.setState({
      topWidth: totalSize.width,
    });
  }

  // 获取顶部遮罩高度
  getTopMaskHeight() {
    if (this.props.isCornerOffset) {
      return (
        this.state.topHeight +
        this.props.rectHeight -
        this.props.cornerOffsetSize
      );
    }
    return this.viewFinderTop;
  }

  // 测量扫描框的位置
  measureRectPosition(e) {
    const rectSize = e.layout;
    this.setState({
      topHeight: rectSize.y,
      leftWidth: rectSize.x,
    });
  }

  // 获取底部遮罩高度
  getBottomMaskHeight() {
    if (this.props.isCornerOffset) {
      return (
        this.props.rectHeight +
        this.state.topHeight -
        this.props.cornerOffsetSize
      );
    }
    return this.state.topHeight + this.props.rectHeight;
  }

  // 获取左右两边遮罩高度
  getSideMaskHeight() {
    if (this.props.isCornerOffset) {
      return this.props.rectHeight - this.props.cornerOffsetSize * 2;
    }
    return this.props.rectHeight + px2dp(1);
  }

  // 获取左右两边遮罩宽度
  getSideMaskWidth() {
    if (this.props.isCornerOffset) {
      return this.state.leftWidth + this.props.cornerOffsetSize;
    }
    return this.state.leftWidth;
  }

  getBottomMenuHeight() {
    return {
      bottom: this.props.bottomMenuHeight,
    };
  }

  getScanBarMargin() {
    return {
      marginRight: this.props.scanBarMargin,
      marginLeft: this.props.scanBarMargin,
    };
  }

  getScanImageWidth() {
    return this.props.rectWidth - this.props.scanBarMargin * 2;
  }

  scannerLineMove() {
    this.state.animatedValue.setValue(0); // 重置Rotate动画值为0
    Animated.timing(this.state.animatedValue, {
      toValue: this.props.rectHeight,
      duration: this.props.scanBarAnimateTime,
      easing: Easing.linear,
    }).start(() => this.scannerLineMove());
  }

  // 绘制扫描线
  renderScanBar() {
    if (!this.props.isShowScanBar) return null;
    if (this.props.scanBarImage) {
      return (
        <Image
          style={{ resizeMode: 'contain', width: this.getScanImageWidth() }}
          source={this.props.scanBarImage}
        />
      );
    }
    return (
      <View
        style={[
          this.getScanBarMargin(),
          {
            backgroundColor: this.props.scanBarColor,
            height: this.props.scanBarHeight,
          },
        ]}
      />
    );
  }

  render() {
    const animatedStyle = {
      transform: [{ translateY: this.state.animatedValue }],
    };

    return (
      <View
        onLayout={({ nativeEvent: e }) => this.measureTotalSize(e)}
        style={[styles.container, this.getBottomMenuHeight()]}
      >
        <View
          style={[
            styles.viewfinder,
            this.getRectSize(),
            { top: this.viewFinderTop },
          ]}
          onLayout={({ nativeEvent: e }) => this.measureRectPosition(e)}
        >
          {/* 扫描框边线 */}
          <View
            style={[
              this.getBorderSize(),
              this.getBorderColor(),
              this.getBorderWidth(),
            ]}
          >
            <Animated.View style={[animatedStyle]}>
              {this.renderScanBar()}
            </Animated.View>
          </View>

          {/* 扫描框转角-左上角 */}
          <View
            style={[
              this.getCornerColor(),
              this.getCornerSize(),
              styles.topLeftCorner,
              {
                borderLeftWidth: this.props.cornerBorderWidth,
                borderTopWidth: this.props.cornerBorderWidth,
              },
            ]}
          />

          {/* 扫描框转角-右上角 */}
          <View
            style={[
              this.getCornerColor(),
              this.getCornerSize(),
              styles.topRightCorner,
              {
                borderRightWidth: this.props.cornerBorderWidth,
                borderTopWidth: this.props.cornerBorderWidth,
              },
            ]}
          />

          {/* 加载动画 */}
          {this.renderLoadingIndicator()}

          {/* 扫描框转角-左下角 */}
          <View
            style={[
              this.getCornerColor(),
              this.getCornerSize(),
              styles.bottomLeftCorner,
              {
                borderLeftWidth: this.props.cornerBorderWidth,
                borderBottomWidth: this.props.cornerBorderWidth,
              },
            ]}
          />

          {/* 扫描框转角-右下角 */}
          <View
            style={[
              this.getCornerColor(),
              this.getCornerSize(),
              styles.bottomRightCorner,
              {
                borderRightWidth: this.props.cornerBorderWidth,
                borderBottomWidth: this.props.cornerBorderWidth,
              },
            ]}
          />
        </View>

        <View
          style={[
            this.getBackgroundColor(),
            styles.topMask,
            {
              height: this.getTopMaskHeight(),
              width: this.state.topWidth,
              backgroundColor: this.props.maskColor,
              zIndex: -1,
            },
          ]}
        />

        <View
          style={[
            this.getBackgroundColor(),
            styles.leftMask,
            {
              top: this.viewFinderTop - px2dp(0.5),
              height: this.getSideMaskHeight(),
              width: this.getSideMaskWidth(),
            },
          ]}
        />

        <View
          style={[
            this.getBackgroundColor(),
            styles.rightMask,
            {
              top: this.viewFinderTop - px2dp(0.5),
              height: this.getSideMaskHeight(),
              width: this.getSideMaskWidth(),
            },
          ]}
        />

        <View
          style={[
            this.getBackgroundColor(),
            styles.bottomMask,
            {
              top: this.getBottomMaskHeight(),
              width: this.state.topWidth,
            },
          ]}
        >
          <View
            style={{
              marginTop: this.props.hintTextPosition,
            }}
          >
            <Text style={this.props.hintTextStyle}>{this.props.hintText}</Text>
          </View>
        </View>
      </View>
    );
  }
}

/**
 * 扫描界面
 */
/* eslint-disable react/no-multi-comp */
export default class QRScannerView extends React.Component {
  constructor(props) {
    super(props);
    // 通过这句代码屏蔽 YellowBox
    // eslint-disable-next-line
    console.disableYellowBox = true;
    this.state = {
      showCameraComponent: true,
    };
  }

  componentDidMount() {}

  render() {
    const { showCameraComponent } = this.state;
    return (
      <View style={{ flex: 1 }}>
        {showCameraComponent && (
          <Camera
            onBarCodeRead={this.props.onScanResultReceived}
            style={{ flex: 1 }}
            torchMode={
              this.props.isOpenTorchMode
                ? Camera.constants.TorchMode.on
                : Camera.constants.TorchMode.off
            }
          >
            {/* 绘制顶部标题栏组件 */}
            {this.props.renderTopBarView()}

            {/* 绘制扫描遮罩 */}
            <QRScannerRectView
              maskColor={this.props.maskColor}
              cornerColor={this.props.cornerColor}
              borderColor={this.props.borderColor}
              rectHeight={this.props.rectHeight}
              rectWidth={this.props.rectWidth}
              borderWidth={this.props.borderWidth}
              cornerBorderWidth={this.props.cornerBorderWidth}
              cornerBorderLength={this.props.cornerBorderLength}
              isLoading={this.props.isLoading}
              cornerOffsetSize={this.props.cornerOffsetSize}
              isCornerOffset={this.props.isCornerOffset}
              bottomMenuHeight={this.props.bottomMenuHeight}
              scanBarAnimateTime={this.props.scanBarAnimateTime}
              scanBarColor={this.props.scanBarColor}
              scanBarHeight={this.props.scanBarHeight}
              scanBarMargin={this.props.scanBarMargin}
              hintText={this.props.hintText}
              hintTextStyle={this.props.hintTextStyle}
              scanBarImage={this.props.scanBarImage}
              hintTextPosition={this.props.hintTextPosition}
              isShowScanBar={this.props.isShowScanBar}
            />

            {/* 绘制底部操作栏 */}
          </Camera>
        )}
        <View style={[styles.buttonsContainer, this.props.bottomMenuStyle]}>
          {this.props.renderBottomMenuView()}
        </View>
      </View>
    );
  }
}

/* eslint-disable react/forbid-prop-types,react/require-default-props */
QRScannerView.propTypes = {
  maskColor: PropTypes.string,
  borderColor: PropTypes.string,
  cornerColor: PropTypes.string,
  borderWidth: PropTypes.number,
  cornerBorderWidth: PropTypes.number,
  cornerBorderLength: PropTypes.number,
  rectHeight: PropTypes.number,
  rectWidth: PropTypes.number,
  isLoading: PropTypes.bool,
  isCornerOffset: PropTypes.bool, // 边角是否偏移
  cornerOffsetSize: PropTypes.number,
  bottomMenuHeight: PropTypes.number,
  scanBarAnimateTime: PropTypes.number,
  scanBarColor: PropTypes.string,
  scanBarImage: PropTypes.any,
  scanBarHeight: PropTypes.number,
  scanBarMargin: PropTypes.number,
  hintText: PropTypes.string,
  hintTextStyle: PropTypes.object,
  hintTextPosition: PropTypes.number,
  renderTopBarView: PropTypes.func,
  renderBottomMenuView: PropTypes.func,
  isShowScanBar: PropTypes.bool,
  bottomMenuStyle: ViewPropTypes.style,
};

QRScannerView.defaultProps = {
  maskColor: '#0000004D',
  cornerColor: '#22ff00',
  borderColor: '#000000',
  rectHeight: 200,
  rectWidth: 200,
  borderWidth: 0,
  cornerBorderWidth: px2dp(4),
  cornerBorderLength: px2dp(20),
  isLoading: false,
  cornerOffsetSize: 0,
  isCornerOffset: false,
  bottomMenuHeight: 0,
  scanBarAnimateTime: 2500,
  scanBarColor: '#22ff00',
  scanBarImage: null,
  scanBarHeight: px2dp(1.5),
  scanBarMargin: px2dp(6),
  hintText: '将二维码/条码放入框内，即可自动扫描',
  hintTextStyle: {
    color: '#fff',
    fontSize: px2dp(20),
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
  hintTextPosition: px2dp(0),
  isShowScanBar: true,
};

const styles = StyleSheet.create({
  buttonsContainer: {
    zIndex: 999,
    position: 'absolute',
    height: px2dp(100),
    bottom: 0,
    left: 0,
    right: 0,
  },
  container: {
    alignItems: 'center',
    // justifyContent: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
  },
  viewfinder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  topLeftCorner: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  topRightCorner: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  bottomLeftCorner: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  bottomRightCorner: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  topMask: {
    position: 'absolute',
    top: 0,
  },
  leftMask: {
    position: 'absolute',
    left: 0,
  },
  rightMask: {
    position: 'absolute',
    right: 0,
  },
  bottomMask: {
    position: 'absolute',
    bottom: 0,
  },
});
