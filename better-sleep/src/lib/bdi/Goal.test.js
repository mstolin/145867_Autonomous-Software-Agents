const Goal = require('./Goal')

test('Goal.constructor', () => {
    let goal = new Goal('light-on', 'on', (belief) => belief['light-on'] == 'off')
    expect(goal.property).toBe('light-on')
    expect(goal.desiredState).toBe('on')
})
