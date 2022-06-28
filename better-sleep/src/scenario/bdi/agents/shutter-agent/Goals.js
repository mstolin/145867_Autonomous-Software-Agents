const Goal = require("../../../../lib/bdi/Goal");

class OpenShuttersMorningGoal extends Goal {}

class CloseShuttersEveningGoal extends Goal {}

module.exports = {
    OpenShuttersMorningGoal,
    CloseShuttersEveningGoal
};
