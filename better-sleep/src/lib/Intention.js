const Goal = require("./Goal")

class Intention {

    goal

    constructor(goal) {
        this.goal = goal
    }

    static applicable(goal) {
        return goal instanceof Goal
    }

    async run() {
        let iterator = this.exec()
        var actionVal = null

        var failed = false
        var done = false

        while(!failed && !done) {
            try {
                var {value: actionVal, done: done} = iterator.next(await actionVal)

                if(actionVal instanceof Promise) {
                    actionVal.catch(_ => {
                        failed = true
                        return false
                    })
                }

                await new Promise(res => setTimeout(res, 0))
            } catch (err) {
                failed = true
                return false
            }
        }

        if(done && !failed) {
            return true
        } else {
            return false
        }

    }

}

module.exports = Intention
