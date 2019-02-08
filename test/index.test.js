import server from '../src/index'

describe('running smoke test', () => {
  it('works', () => {
    expect(1).to.equal(1)
  })
})

describe('Hapi server', () => {
  it('returns an object', () => {
    expect(server).to.exist()
  })

})
