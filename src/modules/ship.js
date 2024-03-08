class Ship {
    constructor(length) {
        this.length = length
        this.numHits = 0
        this.sunk = false
    }

    hit() {
        if(!this.sunk) {
            this.numHits++
            this.isSunk()
        }
    }

    isSunk() {
        if(this.numHits == this.length) {
            this.sunk = true
        }
    }
}

module.exports = Ship;