import { NgxCodertyFilterPipe } from './ngx-coderty-filter.pipe';

const simpleDataset = [{ name: 'alvaro' }, { name: 'genaro' }];
const simpleDataset2 = [{ name: 'alvaro', surname: 'Quiros' }, { name: 'Antonio', surname: 'Genaro' }];
const datasetWithAcents = [{ name: 'Álvaro', surname: 'Quirós' }, { name: 'Antonio', surname: 'Genaro' }];


describe('CodertyFilterPipe', () => {
  let pipe;
  beforeEach(() => {
    pipe = new NgxCodertyFilterPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty string if no dataset is defined', () => {
    expect(pipe.transform('', '')).toEqual('');
  });

  it('should return the entire dataset if no filter is defined', () => {
    expect(pipe.transform(simpleDataset, '').length).toBe(2);
  });

  it('should filter simple dataset', () => {
    const res = pipe.transform(simpleDataset, 'alvaro');
    expect(res.length).toBe(1);
    expect(res).toEqual([{ name: 'alvaro', _itemSummary: 'alvaro' }]);
  });

  it('should filter dataset2', () => {
    const res = pipe.transform(simpleDataset2, 'alvaro');
    expect(res.length).toBe(1);
    expect(res).toEqual([{ name: 'alvaro', surname: 'Quiros', _itemSummary: 'quiros alvaro' }]);
  });

  it('should filter without case sensitive', () => {
    const res = pipe.transform(simpleDataset2, 'alVaro');
    expect(res.length).toBe(1);
    expect(res).toEqual([{ name: 'alvaro', surname: 'Quiros', _itemSummary: 'quiros alvaro' }]);
  });

  it('should return the second element of the dataset', () => {
    const res = pipe.transform(simpleDataset2, 'GEnaro');
    expect(res.length).toBe(1);
    expect(res).toEqual([{ name: 'Antonio', surname: 'Genaro', _itemSummary: 'genaro antonio' }]);
  });

  describe('with acents ', () => {

    it('should return the second element of the dataset', () => {
      const res = pipe.transform(datasetWithAcents, 'antonio');
      expect(res.length).toBe(1);
      expect(res).toEqual([{ name: 'Antonio', surname: 'Genaro', _itemSummary: 'genaro antonio' }]);
    });

    it('should return the first element of the dataset', () => {
      const res = pipe.transform(datasetWithAcents, 'alvaro');
      expect(res.length).toBe(1);
      expect(res).toEqual([{ name: 'Álvaro', surname: 'Quirós', _itemSummary: 'quiros alvaro' }]);
    });

    it('should filter by two properties with acents', () => {
      const res = pipe.transform(datasetWithAcents, 'Álvaro Quirós');
      expect(res.length).toBe(1);
      expect(res).toEqual([{ name: 'Álvaro', surname: 'Quirós', _itemSummary: 'quiros alvaro' }]);
    });

    it('should filter ignoring acents', () => {
      const res = pipe.transform(datasetWithAcents, 'Quirós');
      expect(res.length).toBe(1);
      expect(res).toEqual([{ name: 'Álvaro', surname: 'Quirós', _itemSummary: 'quiros alvaro' }]);
    });

  });

});
