import React, { Component } from 'react';
import { View, Text, Linking } from 'react-native';
import PropTypes from 'prop-types';

import Button from 'futures/components/Button';
import Dialog from 'futures/components/Dialog';
import { alpha } from 'futures/utils/color';
import { colors } from 'futures/components/themes/index';
import style from './style';

// 审核状态颜色：0：已提交，1：审核中，2：认证成功，3：认证失败
const statusColor = [
  {
    color: '#59C5FF',
    text: '已提交',
    info: '',
    textAlign: 'left',
  },
  {
    color: '#F2A437',
    text: '审核中',
    info: '您的实名认证正在审核中，请耐心等待',
    textAlign: 'center',
    textColor: colors[1001],
  },
  {
    color: '#44cf89',
    text: '认证成功',
    info: '实名认证成功',
    textAlign: 'right',
    textColor: colors[1002],
  },
  {
    color: '#FF3657',
    text: '认证失败',
    info: '实名认证失败',
    textAlign: 'right',
    textColor: colors[1001],
  },
];

const Circle = () => <View style={style.Circle} />;
const Info = props => <View style={style.Info}>{props.children}</View>;
const ListText = props => <Text style={style.ListText}>{props.value}</Text>;
const NormalText = props => <Text style={style.NormalText}>{props.value}</Text>;
const Line = () => <View style={style.Line} />;

const WarningText = props => (
  <Text style={[style.NormalText, { color: props.color }]}>{props.value}</Text>
);

const UpLoadBtn = ({ value, ...props }) => (
  <Button
    type="primary"
    subStatus="enable"
    text={value}
    containerStyle={style.uploadBtn}
    {...props}
  />
);

const NotYetUpload = props => (
  <View style={style.NotYetUpload}>{props.children}</View>
);

const Icon = props => {
  const { status } = props;
  const { color } = statusColor[status];
  return (
    <View>
      <View style={[style.filterBg, { backgroundColor: alpha(color, 0.2) }]}>
        {status === '3' ? (
          <Text style={[style.icon, { color }]}>&#xe80F;</Text>
        ) : (
          <Text style={[style.icon, { color }]}>&#xe80B;</Text>
        )}
      </View>
    </View>
  );
};

/** 认证进度文字 */
const AuthWord = props => {
  const { status, isCurrent } = props;
  const { text, textAlign, textColor } = statusColor[status];

  const textStyle = isCurrent
    ? [style.chooseText, { textAlign, color: textColor }]
    : [style.statusText, { textAlign }];

  return <Text style={textStyle}>{text}</Text>;
};

/** 认证进度条组件 */
const StatusBar = ({ status }) => (
  <View style={[style.row, style.statusBar]}>
    <Icon status="0" />
    <Line />
    <Icon status="1" />
    <Line />
    {status === '1' ? <Circle /> : <Icon status={status} />}
  </View>
);

/** 认证文字进度条 */
const StatusWord = ({ status }) => (
  <View style={[style.row, style.textBar]}>
    <AuthWord status="0" isCurrent={false} />
    <AuthWord status="1" isCurrent={status === '1'} />
    {status === '1' ? (
      <Text style={style.statusText} />
    ) : (
      <AuthWord status={status} isCurrent />
    )}
  </View>
);

/** 认证失败 */
const Uploaded = ({ status, personal, onPress }) => {
  const { info, textColor } = statusColor[status];
  const refer = (
    <View>
      <NormalText value="您提交的信息" />
      <NormalText value={personal} />
    </View>
  );
  const operation = (
    <View>
      <View style={[style.row, { marginBottom: 16 }]}>
        <NormalText value="原因是" />
        <WarningText value="身份证件信息不清晰" />
        <NormalText value="请重新上传" />
      </View>
      <UpLoadBtn value="重新上传" onPress={onPress} />
    </View>
  );

  return (
    <View>
      <StatusBar status={status} />
      <StatusWord status={status} />
      <View style={style.tipBox}>
        {status === '1' ? null : refer}
        <WarningText value={info} color={textColor} />
        {status === '3' ? operation : null}
      </View>
    </View>
  );
};

class ServiceBtn extends Component {
  static callService() {
    Linking.openURL('tel:022-58313111');
  }

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };

    this.callService = ServiceBtn.callService.bind(this);
    this.renderDialog = this.renderDialog.bind(this);
    this.renderDialogContent = this.renderDialogContent.bind(this);
  }

  renderDialogContent() {
    return (
      <Text style={style.dialogText}>
        <Text>可以拨打客服热线</Text>
        <Text
          onPress={this.callService}
          style={{
            color: colors['1004'],
            textDecorationLine: 'underline',
          }}
        >
          022-58313111
        </Text>
        <Text>咨询产品信息详情</Text>
      </Text>
    );
  }

  /** 弹窗 */
  renderDialog() {
    return (
      <Dialog
        content={this.renderDialogContent}
        visible={this.state.visible}
        button={[
          {
            name: '我知道了',
            callback: () => {
              this.setState({ visible: false });
            },
            style: { color: colors[1001] },
          },
        ]}
      />
    );
  }

  render() {
    return (
      <View>
        <Text
          onPress={() => this.setState({ visible: true })}
          style={style.ServiceBtn}
        >
          &#xe7fe;
        </Text>
        {this.renderDialog()}
      </View>
    );
  }
}

Info.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};
ListText.propTypes = {
  value: PropTypes.string,
};
ListText.defaultProps = { value: '' };
NormalText.propTypes = {
  value: PropTypes.string.isRequired,
};
WarningText.propTypes = {
  value: PropTypes.string.isRequired,
  color: PropTypes.string,
};
WarningText.defaultProps = {
  color: colors[1001],
};
UpLoadBtn.propTypes = {
  value: PropTypes.string.isRequired,
};
NotYetUpload.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};
Icon.propTypes = {
  status: PropTypes.oneOf(['0', '1', '2', '3']).isRequired,
};
StatusBar.propTypes = {
  status: PropTypes.oneOf(['1', '2', '3']).isRequired,
};
StatusWord.propTypes = {
  status: PropTypes.oneOf(['1', '2', '3']).isRequired,
};
AuthWord.propTypes = {
  status: PropTypes.oneOf(['0', '1', '2', '3']).isRequired,
  isCurrent: PropTypes.bool.isRequired,
};

Uploaded.propTypes = {
  status: PropTypes.oneOf(['1', '2', '3']).isRequired,
  personal: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

module.exports = {
  Info,
  NormalText,
  NotYetUpload,
  Icon,
  Line,
  Circle,
  Uploaded,
  UpLoadBtn,
  ListText,
  StatusBar,
  StatusWord,
  ServiceBtn,
};
