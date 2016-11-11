"use strict"

const { assert } = require('chai')

const Layer = require('../lib/Layer')

describe('Layer', () => {

  function formatOutput(output, precision) {
    return output.map(n => n.toFixed(precision))
  }

  describe('Example: Bitwise Digits', () => {
    it('transforms an unary digit input into its bitwise representation', () => {
      const testData = [
        { input: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], expected: [0.01, 0.01, 0.01, 0.01], decoded: 0 },
        { input: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0], expected: [0.01, 0.01, 0.01, 0.99], decoded: 1 },
        { input: [0, 0, 1, 0, 0, 0, 0, 0, 0, 0], expected: [0.01, 0.01, 0.99, 0.01], decoded: 2 },
        { input: [0, 0, 0, 1, 0, 0, 0, 0, 0, 0], expected: [0.01, 0.01, 0.99, 0.99], decoded: 3 },
        { input: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0], expected: [0.01, 0.99, 0.01, 0.01], decoded: 4 },
        { input: [0, 0, 0, 0, 0, 1, 0, 0, 0, 0], expected: [0.01, 0.99, 0.01, 0.99], decoded: 5 },
        { input: [0, 0, 0, 0, 0, 0, 1, 0, 0, 0], expected: [0.01, 0.99, 0.99, 0.01], decoded: 6 },
        { input: [0, 0, 0, 0, 0, 0, 0, 1, 0, 0], expected: [0.01, 0.99, 0.99, 0.99], decoded: 7 },
        { input: [0, 0, 0, 0, 0, 0, 0, 0, 1, 0], expected: [0.99, 0.01, 0.01, 0.01], decoded: 8 },
        { input: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1], expected: [0.99, 0.01, 0.01, 0.99], decoded: 9 },
      ]

      const bit4 = { weights: [0,  0,  0,  0,  0,  0,  0,  0, 10, 10], bias: 5 }
      const bit3 = { weights: [0,  0,  0,  0, 10, 10, 10, 10,  0,  0], bias: 5 }
      const bit2 = { weights: [0,  0, 10, 10,  0,  0, 10, 10,  0,  0], bias: 5 }
      const bit1 = { weights: [0, 10,  0, 10,  0, 10,  0, 10,  0, 10], bias: 5 }
      const layer = new Layer([ bit4, bit3, bit2, bit1 ])

      testData.forEach(test => {
        const output = layer.output(test.input)

        console.log(`\tNumeric ${ test.decoded } ~> Bits [${ formatOutput(output, 2) }] ?`)

        output.forEach((o, i) => {
          const expected = test.expected[i]
          const msg = `expected ${ test.decoded } does not match bitwise [${ output }]->${ i }`
          if (expected < 0.5) {
            assert.isBelow(o, expected, msg)
          } else {
            assert.isAtLeast(o, expected, msg)
          }
        })
      })
    })
  })

})
