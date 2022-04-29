const BeliefSet = require('./BeliefSet')
const Goal = require('./Goal')
const Intention = require('./Intention')

test('Intention.applicable', () => {
    class CustomGoal extends Goal {} 
    class CustomIntention extends Intention {
        static applicable(goal) {
            return goal instanceof CustomGoal
        }
    }

    let goal = new CustomGoal()
    expect(CustomIntention.applicable(goal)).toBe(true)
})

test('Intention.run (A general test if run works as expected)', async() => {
    var s1, s2, s3, s4

    // Cusom intention with custom plan
    class TestIntention extends Intention {
        *exec() {
            s1 = yield new Promise(res => setTimeout(res, 50))
            s2 = yield 1234
            s3 = yield false
            s4 = yield
        }
    }
    let beliefs = new BeliefSet({'light': 'on'})
    let goal = new Goal('light', 'off')

    expect(await new TestIntention().run(goal, beliefs)).toBe(true)
    expect(s1).toBe(undefined)
    expect(s2).toBe(1234)
    expect(s3).toBe(false)
    expect(s4).toBe(undefined)
})

test('Intention.run (Fail because Goal has already been achieved)', async () => {
    class TestIntention extends Intention {
        *exec() {
            // wont reach this anyway
            yield true
        }
    }

    let beliefs = new BeliefSet({'light': 'on'})
    let goal = new Goal('light', 'on')
    expect(await new TestIntention().run(goal, beliefs)).toBe(false)
})

test('Intention.run (Fail because of Promise.reject)', async () => {
    class TestIntention extends Intention {
        *exec() {
            yield Promise.reject('Fail reason')
        }
    }

    let beliefs = new BeliefSet({'light': 'on'})
    let goal = new Goal('light', 'off')
    expect(await new TestIntention().run(goal, beliefs)).toBe(false)
})

test('Intention.run (Fail because of throw error)', async () => {
    class TestIntention extends Intention {
        *exec() {
            throw new Error('Fail error')
        }
    }

    let beliefs = new BeliefSet({'light': 'on'})
    let goal = new Goal('light', 'off')
    expect(await new TestIntention().run(goal, beliefs)).toBe(false)
})
