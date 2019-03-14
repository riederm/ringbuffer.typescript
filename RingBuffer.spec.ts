
import { expect } from 'chai';
import 'mocha';
import { RingBuffer } from './RingBuffer';

let buffer: RingBuffer<number>;

describe('RingBuffer', () => {

  beforeEach(() => {
    buffer = new RingBuffer<number>(4);
  });

  it('should return size = 0 if the ring is empty', () => {
    expect(buffer.size()).to.equal(0);
  });


});
