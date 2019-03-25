import { ORDER_ASC, ORDER_DESC } from '../constants';
import {
  assignIfNull,
  cycleValues,
  getSortValue,
  makeSorter,
  makeMultiSorter,
} from './utils';

describe('assignIfNull', () => {
  it('only overwrites null values', () => {
    const o1 = { a: 'a1', b: null };
    const o2 = { a: 'a2', b: 'b2' };
    expect(assignIfNull(o1, o2)).toEqual({ a: 'a1', b: 'b2' });
  });

  it('handles any number of objects', () => {
    const o1 = { a: 'a1', b: null, c: null };
    const o2 = { a: 'a2', b: 'b2', c: null };
    const o3 = { a: 'a3', b: 'b3', c: 'c3' };
    expect(assignIfNull(o1, o2, o3)).toEqual({ a: 'a1', b: 'b2', c: 'c3' });
  });
});

describe('cycleValues', () => {
  it('cycles to the next value', () => {
    expect(cycleValues(1, 1, 2, 3)).toBe(2);
    expect(cycleValues(2, 1, 2, 3)).toBe(3);
  });

  it('cycles around to the beginning', () => {
    expect(cycleValues(3, 1, 2, 3)).toBe(1);
  });

  it('handles mixed values', () => {
    const obj = { hi: 'bye' };
    const arr = [1, 2];
    expect(cycleValues(null, null, false, obj, arr, 'str')).toBe(false);
    expect(cycleValues(false, null, false, obj, arr, 'str')).toBe(obj);
    expect(cycleValues(obj, null, false, obj, arr, 'str')).toBe(arr);
    expect(cycleValues(arr, null, false, obj, arr, 'str')).toBe('str');
    expect(cycleValues('str', null, false, obj, arr, 'str')).toBe(null);
  });

  it('throws for missing values', () => {
    expect(() => {
      cycleValues('str', 1, 2, 3);
    }).toThrow();
  });
});

describe('getSortValue', () => {
  it('returns numeric values as is', () => {
    expect(getSortValue(123)).toBe(123);
  });

  it('extracts numbers from strings', () => {
    expect(getSortValue('N2')).toBe(2);
  });

  it("treats 'S' as a high number", () => {
    expect(getSortValue('S')).toBe(100);
  });

  it('returns null when there is no number', () => {
    expect(getSortValue(null)).toBe(null);
    expect(getSortValue('kanji')).toBe(null);
  });
});

describe('makeSorter', () => {
  it('returns a function', () => {
    expect(typeof makeSorter(ORDER_ASC, 'field')).toBe('function');
  });

  it('returns a sorting function', () => {
    const input = [{ a: 2 }, { a: 1 }, { a: 3 }];
    const expected = [{ a: 1 }, { a: 2 }, { a: 3 }];
    const sorter = makeSorter(ORDER_ASC, 'a');
    expect(input.slice().sort(sorter)).toEqual(expected);
  });

  it('can make a descending sorting function', () => {
    const input = [{ a: 2 }, { a: 1 }, { a: 3 }];
    const expected = [{ a: 3 }, { a: 2 }, { a: 1 }];
    const sorter = makeSorter(ORDER_DESC, 'a');
    expect(input.slice().sort(sorter)).toEqual(expected);
  });

  it('parses numbers from strings', () => {
    const input = [{ a: 'A2' }, { a: 'A1' }, { a: 'A3' }];
    const expected = [{ a: 'A1' }, { a: 'A2' }, { a: 'A3' }];
    const sorter = makeSorter(ORDER_ASC, 'a');
    expect(input.slice().sort(sorter)).toEqual(expected);
  });

  it('places null values last', () => {
    const input = [{ a: 'A2' }, { a: null }, { a: 'A1' }, { a: 'A3' }];
    const expectedAsc = [{ a: 'A1' }, { a: 'A2' }, { a: 'A3' }, { a: null }];
    const expectedDesc = [{ a: 'A3' }, { a: 'A2' }, { a: 'A1' }, { a: null }];
    const sorterAsc = makeSorter(ORDER_ASC, 'a');
    const sorterDesc = makeSorter(ORDER_DESC, 'a');
    expect(input.slice().sort(sorterAsc)).toEqual(expectedAsc);
    expect(input.slice().sort(sorterDesc)).toEqual(expectedDesc);
  });
});

describe('makeMultiSorter', () => {
  it('returns a function', () => {
    expect(typeof makeMultiSorter(ORDER_ASC, 'field')).toBe('function');
  });

  it('returns a sorting function for multiple fields', () => {
    const input = [
      { a: 1, b: 6 },
      { a: 3, b: 3 },
      { a: 2, b: 4 },
      { a: 2, b: 2 },
      { a: 1, b: 1 },
      { a: 3, b: 5 },
    ];
    const expected = [
      { a: 1, b: 1 },
      { a: 1, b: 6 },
      { a: 2, b: 2 },
      { a: 2, b: 4 },
      { a: 3, b: 3 },
      { a: 3, b: 5 },
    ];
    const sorter = makeMultiSorter(ORDER_ASC, 'a', 'b');
    expect(input.slice().sort(sorter)).toEqual(expected);
  });

  it('handles mixed null fields', () => {
    const input = [
      { a: null, b: 6 },
      { a: 3, b: 3 },
      { a: 2, b: null },
      { a: 2, b: 4 },
      { a: 1, b: 1 },
      { a: 3, b: 5 },
    ];
    const expected = [
      { a: 1, b: 1 },
      { a: 2, b: 4 },
      { a: 2, b: null },
      { a: 3, b: 3 },
      { a: 3, b: 5 },
      { a: null, b: 6 },
    ];
    const sorter = makeMultiSorter(ORDER_ASC, 'a', 'b');
    expect(input.slice().sort(sorter)).toEqual(expected);
  });

  it('can take objects with per-prop sort order', () => {
    const input = [
      { a: 1, b: 6 },
      { a: 3, b: 3 },
      { a: 2, b: 4 },
      { a: 2, b: 2 },
      { a: 1, b: 1 },
      { a: 3, b: 5 },
    ];
    const expected = [
      { a: 1, b: 6 },
      { a: 1, b: 1 },
      { a: 2, b: 4 },
      { a: 2, b: 2 },
      { a: 3, b: 5 },
      { a: 3, b: 3 },
    ];
    const sorter = makeMultiSorter({ a: ORDER_ASC }, { b: ORDER_DESC });
    expect(input.slice().sort(sorter)).toEqual(expected);
  });

  // TODO: Fix/implement
  it.skip('handles mixed null fields with per-prop sort order', () => {
    const input = [
      { a: 2, b: null },
      { a: 1, b: 6 },
      { a: null, b: null },
      { a: 2, b: 2 },
      { a: null, b: 3 },
      { a: null, b: 1 },
      { a: null, b: 4 },
    ];
    const expected = [
      { a: 2, b: 2 },
      { a: 2, b: null },
      { a: 1, b: 6 },
      { a: null, b: 1 },
      { a: null, b: 3 },
      { a: null, b: 4 },
      { a: null, b: null },
    ];
    const sorter = makeMultiSorter({ a: ORDER_DESC }, { b: ORDER_ASC });
    expect(input.slice().sort(sorter)).toEqual(expected);
  });

  it('handles field duplicates', () => {
    const input = [{ a: 1, b: 2 }, { a: 2, b: 1 }, { a: 1, b: 1 }];
    const expected = [{ a: 1, b: 2 }, { a: 1, b: 1 }, { a: 2, b: 1 }];
    const sorter = makeMultiSorter(ORDER_ASC, 'a', 'a');
    expect(input.slice().sort(sorter)).toEqual(expected);
  });

  it('handles field duplicates for per-prop sorting', () => {
    const input = [{ a: 1, b: 2 }, { a: 2, b: 1 }, { a: 1, b: 1 }];
    const expected = [{ a: 1, b: 2 }, { a: 1, b: 1 }, { a: 2, b: 1 }];
    const sorter = makeMultiSorter({ a: ORDER_DESC }, { a: ORDER_ASC });
    expect(input.slice().sort(sorter)).toEqual(expected);
  });
});
