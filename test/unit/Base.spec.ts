import { Base } from '../../src'

describe('Base', () => {
  let base: Base

  beforeEach(() => {
    base = new Base()
  })

  describe('#baseFunction', () => {
    it('resolves', () => {
      return base.baseFunction()
        .should.be.fulfilled
    })
  })
})
