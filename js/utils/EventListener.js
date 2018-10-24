import { DeviceEventEmitter } from 'react-native';

/**
 * @param  obj key:ListenerName  value:function
 * 返回map对象 键是事件名称，值是监听事件对象
 */

class EventListener {
  constructor(event = {}) {
    this.event = event;
  }

  get eventListener() {
    return this.event;
  }

  addEventListen(obj) {
    Object.keys(obj).forEach(item => {
      const keyEv = DeviceEventEmitter.addListener(item, params => {
        obj[item](params || '');
      });

      this.event[item] = keyEv;
    });

    return this;
  }

  clearEventListen(key) {
    if (key) {
      this.event[key].remove();
      return this;
    }

    Object.keys(this.event).forEach(item => this.event[item].remove());
    return this;
  }
}

const eventlistener = new EventListener({});

export default eventlistener;
