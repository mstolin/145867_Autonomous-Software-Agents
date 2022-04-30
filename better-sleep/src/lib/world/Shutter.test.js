const Shutter = require('./Shutter')

test('Shutter.constructor', () => {
    let shutter = new Shutter('test')
    expect(shutter.name).toBe('test')
    expect(shutter.state).toBe('closed')
})

test('Shutter.open, Shutter.close', () => {
    let shutter = new Shutter('test')

    // already closed => throw
    expect(() => shutter.close()).toThrow()

    shutter.open()
    expect(shutter.state).toBe('open')
    // already open => throw
    expect(() => shutter.open()).toThrow()

    shutter.close()
    expect(shutter.state).toBe('closed')
})
