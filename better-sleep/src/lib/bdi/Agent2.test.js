const Agent = require('./Agent2')
const BeliefSet = require('./BeliefSet')
const Intention = require('./Intention')
const Goal = require('./Goal')

test('Agent.constructor', () => {
    let beliefs = new BeliefSet({
        'kitchen_light': 'off'
    })
    let agent = new Agent('007', beliefs)
    expect(agent.name).toBe('007')
    expect(agent.beliefs).toBe(beliefs)
})

/*test('Agent.postSubGoal', async() => {
    var kitchenLightState = 'off'

    let beliefs = new BeliefSet({
        'kitchen_light': 'off'
    })
    // New agent that beliefs the kitchen light is off
    let agent = new Agent('007', beliefs)

    // A new goal to turn on the kitchen light
    let kitchenLightOn = new Goal('kitchen_light', 'on')

    // This intention is supposed to turn the kitchen light on if its off
    class TurnLightOn extends Intention {
       *exec() {
           kitchenLightState = yield 'on'
       } 
    }
    agent.addIntention(TurnLightOn)

    expect(await agent.postSubGoal(kitchenLightOn)).toBe(true)
    expect(kitchenLightState).toBe('on')
})*/
