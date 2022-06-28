const pddlActionIntention = require("../../../../../lib/pddl/actions/pddlActionIntention");

class OpenShutterIntention extends pddlActionIntention {
  static parameters = ["time", "shutters"];
  static precondition = [
    ["DAYTIME", "time"],
    ["MORNING", "time"],
    ["SHUTTER", "shutters"]
    ["not open", "shutters"],
  ];
  static effect = [["open", "shutters"]];

  #openAllShutters() {
    console.log("ROOM HAS #SHUTTER", this.agent.room.shutters.length)
    /*for (const shutter of this.agent.room.shutters) {
      console.log("TRYING TO OPEN", shutter.name)
      //shutter.open();
    }*/
    this.agent.room.shutters.forEach((shutter) => {
      try {
        shutter.open();
      } catch (err) {
        this.log(err);
      }
    })
  }

  *exec() {
    while (true) {
      yield;
      this.#openAllShutters();
      for (let b of this.effect) this.agent.beliefs.apply(b);
      break;
    }
  }
}

module.exports = OpenShutterIntention;
