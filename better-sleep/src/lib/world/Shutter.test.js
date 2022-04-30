const Shutter = require('./Shutter')

test('Shutter.constructor', () => {
    let shutter = new Shutter('test')
    expect(shutter.name).toBe('test')
    expect(shutter.state).toBe('closed')
    expect(shutter.isClosed).toBeTruthy()
    expect(shutter.isOpen).toBeFalsy()
})

test('Shutter.open, Shutter.close', () => {
    let shutter = new Shutter('test')

    // already closed => throw
    expect(() => shutter.close()).toThrow()

    shutter.open()
    expect(shutter.isOpen).toBeTruthy()
    // already open => throw
    expect(() => shutter.open()).toThrow()

    shutter.close()
    expect(shutter.isClosed).toBeTruthy()
})
