const Goal = require('../../../../lib/bdi/Goal2')

/*let morningLightGoal = new Goal('bedroom_light', 'on')
let morningShuttersGoal = new Goal('shutters', 'open')*/

class MorningLightGoal extends Goal {

}

class MorningShuttersGoal extends Goal {

}

module.exports = {
    MorningLightGoal,
    MorningShuttersGoal
}
