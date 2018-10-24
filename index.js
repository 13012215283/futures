import {
  AppRegistry,
  AsyncStorage,
  DeviceEventEmitter,
  NetInfo,
  Platform,
  // YellowBox,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Pingpp from 'pingpp-react-native';
import { getWebSocketUrl } from 'futures/utils/config';

import App from 'futures/App';
import fixOppoTextCutOff from 'futures/utils/fixOppoTextCutOff';

// YellowBox.ignoreWarnings(['Warning:']);

if (DeviceInfo.getManufacturer() === 'OPPO') {
  // fix Oppo cut-off
  fixOppoTextCutOff();
}

if (__DEV__) {
  if (Platform.OS === 'ios') {
    Pingpp.setDebugModel(true);
  } else if (Platform.OS === 'android') {
    Pingpp.setDebug(true);
  }
}

AppRegistry.registerComponent('futures', () => App);

let ws = null;
let timmer;

function connect() {
  if (
    ws &&
    (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING)
  ) {
    return;
  }

  try {
    ws = new WebSocket(getWebSocketUrl());

    ws.addEventListener('open', onopen);
    ws.addEventListener('message', onmessage);
    ws.addEventListener('close', onclose);
  } catch (ignore) {
    reconnect();
  }
}

async function reconnect() {
  clearTimeout(timmer);
  timmer = setTimeout(() => {
    connect();
  }, 3 * 1000);
}

// connect();

async function onopen() {
  try {
    clearTimeout(timmer);
    const id = await AsyncStorage.getItem('id');
    if (id !== null) {
      sendLogin(id);
    }
  } catch (ignore) {
    // ignore
  }
}

function onclose() {
  reconnect();
}

function onmessage(e) {
  DeviceEventEmitter.emit(e.data);
}

DeviceEventEmitter.addListener('login', sendLogin);

function sendLogin(uid) {
  const message = {
    type: 'login',
    data: { '00': uid },
  };

  ws.send(JSON.stringify(message));
}

NetInfo.isConnected.fetch().then(isConnected => {
  if (isConnected) {
    connect();
  }
});

NetInfo.isConnected.addEventListener('connectionChange', isConnected => {
  if (isConnected) {
    connect();
  } else {
    ws.close();
  }
});
