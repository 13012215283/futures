import { testIDCards } from 'futures/utils/informValidTest';

describe('informValid', () => {
  describe('informValid#testIDCards', () => {
    it('will be true', () => {
      expect(testIDCards('14222219950321002x')).toEqual(true);
      expect(testIDCards('217856200002300041')).toEqual(true);
    });
  });
});
