"use strict"

const { expect } = require('chai')

const Sigmoid = require('../lib/Sigmoid')

describe('Sigmoid', () => {

  describe('#output', () => {
    it('should return an output based on a sigmoid weighting of inputs', () => {
      const testData = [
        { weights: [1, 1, 1], bias: 0, input: [0, 0, 0], expected: 0.5 },
        { weights: [2, 1, 1], bias: 0, input: [1, 1, 1], expected: 0.98 },
        { weights: [2, 1, 1], bias: 3, input: [0, 1, 1], expected: 0.27 },
      ]

      testData.forEach(test => {
        const sigmoid = new Sigmoid(test.weights, test.bias)
        expect(sigmoid.output(test.input)).to.be.closeTo(test.expected, 0.01)
      })
    })
  })
})
