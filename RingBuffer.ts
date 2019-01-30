export class RingBuffer<T>{

    data: T[];
    
    public constructor(private ringSize: number){
        this.data = [];
    }

    public add(element: T){
        this.data.push(element);
        if (this.size() > this.ringSize){
            this.remove();
        }
    }

    public remove() : T {
        if (this.size() === 0){
            throw new Error('Cannot remove from empty Ringbuffer');
        }
        return this.data.splice(0, 1)[0];
    }

    public size(){
        return this.data.length;
    }

}

