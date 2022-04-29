const Goal = require("./Goal")

class Intention {
 
    /**
     * Checks if this Intention can be used to achieve the given goal
     * (is applicable).
     * 
     * @param {Goal} goal 
     * @returns {boolean} True of the given goal is applicable
     */
    static applicable(goal) {
        return goal instanceof Goal
    }

    /**
     * Executes a Plan to achieve the given Goal.
     * 
     * @returns {boolean} True if the intentions plan was successful
     */
    async run() {
        // get the plan
        let iterator = this.exec()
        var action = null

        var failed = false
        var done = false

        // as long as the intention has not failed
        // try to execute the plan to achieve
        while(!failed && !done) {
            try {
                // execute action defined in the plan
                var {value: action, done: done} = iterator.next(await action)

                if(action instanceof Promise) {
                    action.catch(_ => {
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
