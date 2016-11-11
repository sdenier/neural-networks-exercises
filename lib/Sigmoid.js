"use strict"

const _ = require('lodash')

class Sigmoid {

  constructor(weights, bias) {
    this.weights = weights
    this.bias = bias
  }

  output(inputs) {
    return this.sigmoidFn(this.weightedProduct(inputs))
  }

  weightedProduct(inputs) {
    const weighted = _.zipWith(this.weights, inputs, (w, i) => w * i)
    return _.sum(weighted) - this.bias
  }

  sigmoidFn(input) {
    return 1 / (1 + Math.exp(-input))
  }

}

module.exports = Sigmoid
