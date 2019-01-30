
import { expect } from 'chai';
import 'mocha';
import { RingBuffer } from './RingBuffer';

let buffer: RingBuffer<number>;

describe('RingBuffer', () => {
  
  beforeEach(() => {
    buffer = new RingBuffer<number>(4);
  });

  it('an empty ringbuffer should return size = 0', () => {
    expect(buffer.size()).to.equal(0);
  });

  it('it should count the elements added', () => {
    expect(buffer.size()).to.equal(0);
    buffer.add(1);
    buffer.add(1);
    buffer.add(1);
    expect(buffer.size()).to.equal(3);
  });

  it('it should not exceed its maximum length', () => {
    for (let index = 0; index < 10; index++) {
      buffer.add(index);
    }
    expect(buffer.size()).to.equal(4);
  });

  it('it should return the elements in the order they were added', () => {
    buffer.add(4);
    buffer.add(7);
    buffer.add(9);
    buffer.add(4711);

    expect(buffer.remove()).to.equal(4);
    expect(buffer.remove()).to.equal(7);
    expect(buffer.remove()).to.equal(9);
    expect(buffer.remove()).to.equal(4711);
  });

  it('it should throw an error if remove() is called on an empty ringBuffer', ()=>{
    expect(()=>{buffer.remove()}).to.throw('Cannot remove from empty Ringbuffer');
  });
  
  it('it should return the "oldest" element when reading', ()=>{
    buffer.add(4);
    buffer.add(7);
    buffer.add(9);

    expect(buffer.remove()).to.equal(4);
    expect(buffer.remove()).to.equal(7);

    buffer.add(4);
    buffer.add(7);
    buffer.add(9);

    expect(buffer.remove()).to.equal(9);
    expect(buffer.remove()).to.equal(4);
    
    expect(buffer.size()).to.equal(2);   
  });

  it('it should overwrite the oldest element when the ring is full',() => {
    buffer.add(4);
    buffer.add(7);
    buffer.add(9);
    buffer.add(4711);
    buffer.add(99);
    
    expect(buffer.remove()).to.equal(7);
    expect(buffer.remove()).to.equal(9);
    expect(buffer.remove()).to.equal(4711);
    expect(buffer.remove()).to.equal(99);
    expect(buffer.size()).to.equal(0);
  });

  it('multiple roundtrips should work', ()=>{
    for (let index = 0; index < 100; index++) {
      buffer.add(index);
    }

    expect(buffer.remove()).to.equal(96);
    expect(buffer.remove()).to.equal(97);
    expect(buffer.remove()).to.equal(98);
    expect(buffer.remove()).to.equal(99);
  });
  

});
