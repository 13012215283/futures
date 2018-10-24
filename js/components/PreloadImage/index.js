import React, { Component } from 'react';
import { Image } from 'react-native';

// @flow
type Props = {
  url: string,
  width: number,
  style: object,
};
export default class PreloadImage extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      imageHeight: this.props.width / 2,
    };
    Image.getSize(props.url, (imageWidth, imageHeight) => {
      this.setState({
        imageHeight: this.props.width * imageHeight / imageWidth,
      });
    });
  }
  render() {
    const { url, width, style, ...otherProps } = this.props;
    const { imageHeight } = this.state;
    return (
      <Image
        style={[style, { width, height: imageHeight }]}
        source={{ uri: imageHeight === this.props.width / 2 ? 'dd' : url }}
        {...otherProps}
      />
    );
  }
}
