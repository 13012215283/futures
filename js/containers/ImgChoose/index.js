import React, { Component } from 'react';
import { View, CameraRoll, Image, ScrollView, Text } from 'react-native';
import PropTypes from 'prop-types';

import { Toast } from 'futures/components/Toast';

import style from './style';

const ImgScroll = props => {
  const { data } = props;
  const imgsRender = data.map(item => {
    const imgSrc = { uri: item.uri, cache: 'only-if-cached' };

    return (
      <View key={item.uri}>
        <Image
          source={imgSrc}
          style={style.image}
          resizeMethod="resize"
          onError={() => {}}
        />
      </View>
    );
  });

  return <View style={style.ImgScroll}>{imgsRender}</View>;
};

const NoPics = () => (
  <View style={style.noPic}>
    <Text style={style.noPicText}>暂无图片</Text>
  </View>
);

export default class ImgChoose extends Component {
  constructor(props) {
    super(props);
    this.PAGEINFO = '';
    this.fetchParams = {
      first: 30,
      assetType: 'Photos',
      after: '',
    };

    this.state = {
      images: [{}],
    };

    this.firstGetPhoto = this.firstGetPhoto.bind(this);
    this.nextGetPhoto = this.nextGetPhoto.bind(this);
    this.onMomentumScrollEnd = this.onMomentumScrollEnd.bind(this);
  }

  componentWillMount() {
    this.firstGetPhoto();
  }

  onMomentumScrollEnd() {
    this.nextGetPhoto();
  }

  firstGetPhoto() {
    CameraRoll.getPhotos(this.fetchParams)
      .then(pics => {
        const images = pics.edges.map(item => item.node.image);
        this.setState({ images });
        this.PAGEINFO = pics.page_info;
      })
      .catch(() => Toast.show('读取本地图片失败！', Toast.SHORT));
  }

  nextGetPhoto() {
    if (!this.PAGEINFO.has_next_page) {
      return;
    }

    this.fetchParams = {
      first: 20,
      after: this.PAGEINFO.end_cursor,
      assetType: 'Photos',
    };

    CameraRoll.getPhotos(this.fetchParams)
      .then(picdata => {
        let { images } = this.state;
        images = images.concat(picdata.edges.map(item => item.node.image));
        this.setState({ images });
        this.PAGEINFO = picdata.page_info;
      })
      .catch(() => {
        Toast.show('读取本地图片失败！', Toast.SHORT);
      });
  }

  render() {
    const { images } = this.state;
    let render;
    if (images.length === 0) {
      render = <NoPics />;
    } else {
      render = <ImgScroll data={images} />;
    }
    return (
      <ScrollView
        style={style.container}
        onMomentumScrollEnd={this.onMomentumScrollEnd}
      >
        {render}
      </ScrollView>
    );
  }
}

ImgScroll.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
