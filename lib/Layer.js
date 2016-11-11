"use strict"

const Sigmoid = require('./Sigmoid')

class Layer {

  constructor(sigmoidSpecs) {
    this.sigmoids = sigmoidSpecs.map(spec => new Sigmoid(spec.weights, spec.bias))
  }

  output(inputs) {
    return this.sigmoids.map(s => s.output(inputs))
  }

}

module.exports = Layer
