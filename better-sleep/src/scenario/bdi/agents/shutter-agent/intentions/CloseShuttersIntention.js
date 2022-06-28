const pddlActionIntention = require("../../../../../lib/pddl/actions/pddlActionIntention");

class CloseShuttersIntention extends pddlActionIntention {
  static parameters = ["time", "shutters"];
  static precondition = [
    ["DAYTIME", "time"],
    ["MORNING", "time"],
    ["SHUTTER", "shutters"]
    ["not open", "shutters"],
  ];
  static effect = [["not open", "shutters"]];

  #closeAllShutters() {
    for (const shutter of this.agent.room.shutters) {
      shutter.close();
    }
  }

  *exec() {
    try {
      yield this.#closeAllShutters();
      for (let b of this.effect) this.agent.beliefs.apply(b);
    } catch (err) {
      this.log(err);
    }
  }
}

module.exports = CloseShuttersIntention;
