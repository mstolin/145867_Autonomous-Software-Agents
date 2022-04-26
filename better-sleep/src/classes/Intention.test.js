const Goal = require('./Goal')
const Intention = require('./Intention')

test('Intention.constructor', () => {
    let goal = new Goal({})
    let intention = new Intention(goal)
    expect(intention.goal).toBe(goal)
})

test('Intention.run', async() => {
    var s1, s2, s3, s4

    class TestIntention extends Intention {
        *exec() {
            s1 = yield new Promise(res => setTimeout(res, 50))
            s2 = yield 1234
            s3 = yield false
            s4 = yield
        }
    }

    let goal = new Goal()

    expect(await new TestIntention(goal).run()).toBe(true)
    expect(s1).toBe(undefined)
    expect(s2).toBe(1234)
    expect(s3).toBe(false)
    expect(s4).toBe(undefined)
})

test('Intention.run (Fail because of Promise.reject)', async () => {
    class TestIntention extends Intention {
        *exec() {
            yield Promise.reject('Fail reason')
        }
    }

    let goal = new Goal({})
    expect(await new TestIntention(goal).run()).toBe(false)
})

test('Intention.run (Fail because of throw error)', async () => {
    class TestIntention extends Intention {
        *exec() {
            throw new Error('Fail error')
        }
    }

    let goal = new Goal({})
    expect(await new TestIntention(goal).run()).toBe(false)
})
