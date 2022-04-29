const BeliefSet = require('./BeliefSet')
const Goal = require('./Goal')

test('Goal.constructor', () => {
    let goal = new Goal('light-on', 'on')
    expect(goal.property).toBe('light-on')
    expect(goal.desiredState).toBe('on')
})

test('Goal.hasAlreadBeenAchieved', () => {
    let beliefs = new BeliefSet({'light': 'on', 'other_light': 'off'})
    let goal = new Goal('light', 'off')
    expect(goal.hasAlreadyBeenAchieved(beliefs)).toBe(false)

    let otherGoal = new Goal('other_light', 'off')
    expect(otherGoal.hasAlreadyBeenAchieved(beliefs)).toBe(true)
})
