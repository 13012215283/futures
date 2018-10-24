import React from 'react';
import PropTypes from 'prop-types';
import { WebView, Platform, NativeModules } from 'react-native';

import styles from './styles';

/**
 * K线图
 */
class CandleStickChart extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      uri: '',
    };
  }

  componentDidMount() {
    this.getUrlForChart(this.props);
  }

  componentWillReceiveProps(props) {
    if (props.type !== this.props.type) {
      this.getUrlForChart(props, true);
    }
  }

  getUrlForChart = (props, isReceiveProps = false) => {
    if (Platform.OS === 'ios') {
      NativeModules.HTMLManager.getHTMLPath(props.type, (err, uri) => {
        if (isReceiveProps) {
          this.setState({
            uri,
          });
        } else {
          setTimeout(() => {
            this.setState({
              uri,
            });
          }, 16);
        }
      });
    } else if (Platform.OS === 'android') {
      if (isReceiveProps) {
        this.setState({
          uri: `file:///android_asset/www/${props.type}.html`,
          // uri: `http://192.168.10.247:8080/${props.type}.html`,
        });
      } else {
        setTimeout(() => {
          this.setState({
            uri: `file:///android_asset/www/${props.type}.html`,
            // uri: `http://192.168.10.247:8080/${props.type}.html`,
          });
        }, 16);
      }
    }
  };

  render() {
    const jsForInjection = `
            injectJavaScript('${this.props.id}');
        `;

    return (
      <WebView
        source={{ uri: this.state.uri }}
        style={styles.container}
        bounces={false}
        mediaPlaybackRequiresUserAction={false}
        startInLoadingState
        dataDetectorTypes="none"
        injectedJavaScript={jsForInjection}
      />
    );
  }
}

CandleStickChart.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['tendency', 'daily', 'weekly']).isRequired,
};

export default CandleStickChart;
