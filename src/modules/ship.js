class Ship {
    constructor(length) {
        this.length = length;
        this.numHits = 0;
        this.sunk = false;
        this.alignment = null;
        this.coordinates = [];
    }

    hit() {
        if(!this.sunk) {
            this.numHits++;
            this.isSunk();
        }
    }

    isSunk() {
        if(this.numHits === this.length) {
            this.sunk = true;
        }
    }

    setCoordinates(startPoint, alignment) {
        this.alignment = alignment;
        this.coordinates = [];
        for (let i = 0; i < this.length; i++) {
            if (alignment === 'horizontal') {
                this.coordinates.push([startPoint[0], startPoint[1] + i]);
            } else if (alignment === 'vertical') {
                this.coordinates.push([startPoint[0] + i, startPoint[1]]);
            }
        }
    }
}

module.exports = Ship;