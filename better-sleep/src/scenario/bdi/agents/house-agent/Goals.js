const Goal = require('../../../../lib/bdi/Goal')

let morningLightGoal = new Goal('bedroom_light', 'on')
let morningShuttersGoal = new Goal('shutters', 'open')

module.exports = {
    morningLightGoal,
    morningShuttersGoal
}
