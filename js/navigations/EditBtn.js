import React from 'react';
import { DeviceEventEmitter } from 'react-native';
import PropTypes from 'prop-types';
import NavBtn from 'futures/navigations/NavBtn';

export default class EditBtn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      hasData: false,
    };
    this.onPress = this.onPress.bind(this);
  }

  componentDidMount() {
    this.deEmitter = DeviceEventEmitter.addListener('hasData', a => {
      this.setState({
        hasData: a,
      });
    });
  }

  componentWillUnmount() {
    this.deEmitter.remove();
  }

  onPress() {
    this.setState(
      {
        isEdit: !this.state.isEdit,
      },
      () => {
        DeviceEventEmitter.emit('isEdit', this.state.isEdit);
      }
    );
  }

  render() {
    const { isEdit, hasData } = this.state;
    return (
      hasData && (
        <NavBtn
          navName={!isEdit ? '编辑' : '取消'}
          event={this.onPress}
          navigation={this.props.navigation}
        />
      )
    );
  }
}

EditBtn.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  navigation: PropTypes.object.isRequired,
};
