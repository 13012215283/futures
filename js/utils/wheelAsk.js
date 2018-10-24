/**
 * 轮询函数
 * @param callback:轮询的执行函数
 * @param time:轮询时间 default：3000
 */

class WheelAsk {
  constructor() {
    this.setTimeOut = null;
  }

  processWhellAsk(callback, time = 3000) {
    let callfunc = () => {};

    if (callback) {
      callfunc = callback;
    }

    const processor = () => {
      this.setTimeOut = setTimeout(() => {
        callfunc();
        processor();
      }, time);
    };

    processor();
  }

  clearWhellAsk() {
    if (this.setTimeOut !== null) {
      clearTimeout(this.setTimeOut);
    }
  }
}

const wheelAsk = new WheelAsk();

export default wheelAsk;
