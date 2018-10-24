import React, { Component } from 'react';
import { View, Modal, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import { px2dp } from 'futures/utils/px2dp';
import { colors, sizes } from 'futures/components/themes';
import { alpha } from 'futures/utils/color';
import { px2sp } from 'futures/utils/px2sp';

import noop from 'futures/utils/noop';

import Picker from './Picker';
import regionJson from './city.json';

const { black, white } = colors;
const { f3, f4 } = sizes;

const PICKER = ['province', 'city'];

const NavBar = props => <View style={style.navBar}>{props.children}</View>;

NavBar.propTypes = {
  children: PropTypes.element.isRequired,
};

const RegionInfo = props => (
  <View style={style.regionInfo}>{props.children}</View>
);

RegionInfo.propTypes = {
  children: PropTypes.element.isRequired,
};

export default class RegionPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      provinces: [],
      citys: [],
      // areas: [],
      selectedProvince: this.props.selectedProvince,
      selectedCity: this.props.selectedCity,
      selectedArea: this.props.selectedArea,
      currentPicker: this.props.currentPicker,
    };

    this.filterCitys = this.filterCitys.bind(this);
    // this.filterAreas = this.filterAreas.bind(this);
    this.filterAllProvince = this.filterAllProvince.bind(this);

    // this.handleAreaChange = this.handleAreaChange.bind(this);
    this.handleProvinceChange = this.handleProvinceChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }

  componentWillMount() {
    const { selectedProvince } = this.state;
    this.regionJson = regionJson;
    const provinces = this.filterAllProvince();
    const citys = selectedProvince ? this.filterCitys(selectedProvince) : '';
    this.setState({
      provinces,
      citys,
    });
  }

  filterAllProvince() {
    return this.regionJson.map(item => item.name);
  }

  filterCitys(province) {
    const provinceData = this.regionJson.find(item => item.name === province);
    return provinceData.city.map(item => item.name);
  }

  // filterAreas(province, city) {
  //   const provinceData = this.regionJson.find(item => item.name === province);
  //   const cityData = provinceData.city.find(item => item.name === city);

  //   return cityData.area;
  // }

  close() {
    this.setState({
      visible: false,
    });
  }

  open() {
    this.setState({
      visible: true,
    });
  }

  handleProvinceChange(province) {
    const citys = this.filterCitys(province);
    // const areas = this.filterAreas(province, citys[0]);
    this.setState({
      selectedProvince: province,
      selectedCity: '',
      selectedArea: '',
      citys,
      // areas,
      currentPicker: PICKER[1],
    });
  }

  handleCityChange(city) {
    // const areas = this.filterAreas(this.state.selectedProvince, city);
    this.setState(
      {
        selectedCity: city,
        selectedArea: '',
        // areas,
        // currentPicker: PICKER[2],
      },
      () => {
        this.handleSubmit();
        this.close();
      }
    );
  }

  // handleAreaChange(area) {
  //   this.setState(
  //     {
  //       selectedArea: area,
  //     },
  //     () => {
  //       this.handleSubmit();
  //       this.close();
  //     }
  //   );
  // }

  handleSubmit() {
    if (this.props.onSubmit) {
      this.props.onSubmit({
        province: this.state.selectedProvince,
        city: this.state.selectedCity,
        area: this.state.selectedArea,
      });
    }
    this.close();
  }

  handleCancel() {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
    this.close();
  }

  selectPicker(value) {
    const index = PICKER.indexOf(value);

    switch (index) {
      case 0:
        this.setState({
          currentPicker: value,
          selectedCity: '',
          // selectedArea: '',
        });
        break;
      case 1:
        this.setState({
          currentPicker: value,
          // selectedArea: '',
        });
        break;
      default:
        break;
    }
  }

  renderPicker() {
    switch (this.state.currentPicker) {
      case PICKER[0]:
        return (
          <Picker
            onValueChange={this.handleProvinceChange}
            selectedValue={this.state.selectedProvince}
          >
            {this.state.provinces.map((province, index) => (
              // eslint-disable-next-line
              <Picker.Item value={province} label={province} key={index} />
            ))}
          </Picker>
        );
      case PICKER[1]:
        return (
          <Picker
            onValueChange={this.handleCityChange}
            selectedValue={this.state.selectedCity}
          >
            {this.state.citys.map((city, index) => (
              // eslint-disable-next-line
              <Picker.Item value={city} label={city} key={index} />
            ))}
          </Picker>
        );

      // case PICKER[2]:
      //   return (
      //     <Picker
      //       onValueChange={this.handleAreaChange}
      //       selectedValue={this.state.selectedArea}
      //     >
      //       {this.state.areas.map((area, index) => (
      //         // eslint-disable-next-line
      //         <Picker.Item value={area} label={area} key={index} />
      //       ))}
      //     </Picker>
      //   );
      default:
        break;
    }

    return null;
  }

  render() {
    const { selectedProvince, selectedCity, selectedArea } = this.state;
    const region = [selectedProvince, selectedCity, selectedArea];

    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <Modal
          animationType="slide"
          onRequestClose={noop}
          visible={this.state.visible}
          transparent
        >
          <Text style={style.mask} onPress={() => this.handleCancel()} />
          <View style={style.contentBox}>
            <View style={style.navContainer}>
              <NavBar>
                <Text style={style.navText}>配送至</Text>
                <Text
                  style={style.closeBtn}
                  onPress={() => this.handleCancel()}
                >
                  &#xe800;
                </Text>
              </NavBar>

              <RegionInfo>
                {region.map((v, k) => (
                  <Text
                    style={v ? style.regionText : {}}
                    onPress={() => this.selectPicker(PICKER[k])}
                    key={PICKER[k]}
                  >
                    {v}
                  </Text>
                ))}
                {selectedProvince && selectedCity ? null : (
                  <Text style={style.choose}>请选择</Text>
                )}
              </RegionInfo>
            </View>

            <View style={style.navContainer}>{this.renderPicker()}</View>
          </View>

          <View />
        </Modal>

        <TouchableOpacity onPress={this.open}>
          {this.props.children}
        </TouchableOpacity>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  closeBtn: {
    fontFamily: 'iconfont',
    fontSize: px2sp(32),
    color: colors[1103],
  },
  mask: {
    height: px2dp(450),
    backgroundColor: alpha(black, 0.4),
  },
  contentBox: {
    flex: 1,
    backgroundColor: white,
  },
  navContainer: {
    marginLeft: px2dp(64),
    marginRight: px2dp(64),
    marginTop: px2dp(8),
    marginBottom: px2dp(8),
  },
  navBar: {
    height: px2dp(88),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navText: {
    fontSize: f4,
    color: colors[1101],
  },
  regionInfo: {
    flexDirection: 'row',
    height: px2dp(60),
    borderBottomColor: colors[1104],
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  regionText: {
    fontSize: f3,
    color: colors[1102],
    marginRight: px2dp(32),
  },
  choose: {
    fontSize: f3,
    color: colors[1001],
    borderBottomColor: colors[1001],
    borderBottomWidth: px2dp(4),
  },
});

RegionPicker.defaultProps = {
  currentPicker: PICKER[0],
  onSubmit: noop,
  onCancel: noop,
  selectedProvince: '',
  selectedCity: '',
  selectedArea: '',
};

RegionPicker.propTypes = {
  selectedProvince: PropTypes.string,
  selectedCity: PropTypes.string,
  selectedArea: PropTypes.string,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  children: PropTypes.element.isRequired,
  currentPicker: PropTypes.oneOf(PICKER),
};
