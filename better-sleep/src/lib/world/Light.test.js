const Light = require('./Light')

test('Light.constructor', () => {
    let light = new Light('Light1')
    expect(light.name).toBe('Light1')
    expect(light.state).toBe('off')
    expect(light.brightness).toBe(0)
    expect(light.temperature).toBe(0)
})

test('Light.turnOn Light.turnOff', () => {
    let light = new Light('Test')
    expect(light.state).toBe('off')

    // simply turn on
    light.turnOn(500, 1700)
    expect(light.state).toBe('on')

    // simply turn off again
    light.turnOff()
    expect(light.state).toBe('off')

    // this should thro because of incorrect values
    expect(() => light.turnOn(801, 1700)).toThrow()
    expect(() => light.turnOn(500, 10)).toThrow()

    // this should thro as well, its already off
    expect(() => light.turnOff()).toThrow()
})

test('Light.setBrightness', () => {
    let light = new Light('Test')

    // this should throw since light is not on
    expect(() => light.setBrightness(300)).toThrow()

    light.turnOn(100, 1700)
    light.setBrightness(800)
    expect(light.brightness).toBe(800)

    // too low => throw
    expect(() => light.setBrightness(0)).toThrow()
    // too high => throw
    expect(() => light.setBrightness(801)).toThrow()
})

test('Light.setTemperature', () => {
    let light = new Light('test')

    // light is not on => throw
    expect(() => light.setTemperature(6000)).toThrow()

    light.turnOn(100, 1700)

    // too low => throw
    expect(() => light.setTemperature(1699)).toThrow()
    // too high => throw
    expect(() => light.setTemperature(6501)).toThrow()
})
