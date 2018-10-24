import { alpha } from 'futures/utils/color';

describe('color', () => {
  describe('color#alpha', () => {
    it('will add a alpha value', () => {
      expect(alpha('#fff', 0.67)).toEqual('#FFFFFFAB');
      expect(alpha('#c814e9', 0.2)).toEqual('#C814E933');
      expect(alpha('#c814e9', 0)).toEqual('#C814E900');
      expect(alpha('#c814e9', 1)).toEqual('#C814E9');
    });

    it('will change the exist alpha value', () => {
      expect(alpha('#fffa', 0.67)).toEqual('#FFFFFFAB');
      expect(alpha('#c814e900', 0.2)).toEqual('#C814E933');
      expect(alpha('#c814e956', 0)).toEqual('#C814E900');
      expect(alpha('#c814e911', 1)).toEqual('#C814E9');
      expect(alpha('#c814e9', 0.1)).toEqual('#C814E91A');
      expect(alpha('#c814e9', 0.01)).toEqual('#C814E903');
      expect(alpha('#c814e9', 0.001)).toEqual('#C814E900');
      expect(alpha('#c814e9', 0.0001)).toEqual('#C814E900');
      expect(alpha('#c814e9', 0.00000001)).toEqual('#C814E900');
      expect(alpha('#c814e9', Number.MIN_VALUE)).toEqual('#C814E900');
    });

    it('named color', () => {
      expect(alpha('transparent', 0)).toEqual('#00000000');
      expect(alpha('blue', 0.2)).toEqual('#0000FF33');
      expect(alpha('black', 0)).toEqual('#00000000');
      expect(alpha('cyan', 1)).toEqual('#00FFFF');
    });

    it('will out of the range', () => {
      expect(alpha('#fffa', 2)).toEqual('#FFFA');
      expect(alpha('#c814e9', -2)).toEqual('#C814E9');
      expect(alpha('#c814e9', 9)).toEqual('#C814E9');
      expect(alpha('#c814e9', Number.MAX_VALUE)).toEqual('#C814E9');
      expect(alpha('#c814e9', -Number.MAX_VALUE)).toEqual('#C814E9');
      expect(alpha('#c814e9', Number.MIN_SAFE_INTEGER)).toEqual('#C814E9');
      expect(alpha('#c814e9', -Number.MIN_SAFE_INTEGER)).toEqual('#C814E9');
    });

    it('will return the original color when color is invalid', () => {
      expect(alpha('1', 0.6)).toBeNull();
      expect(alpha('#1', 0.6)).toBeNull();
      expect(alpha('#f', 0.6)).toBeNull();
      expect(alpha('#ttt', 0.6)).toBeNull();
      expect(alpha('123456789', 0.6)).toBeNull();
      expect(alpha('#45ab4', 0.6)).toBeNull();
      expect(alpha('#45ab45e', 0.6)).toBeNull();
      expect(alpha('#45ab45eeee', 0.6)).toBeNull();
    });
  });

  describe('color#hex2rgb', () => {});
});
