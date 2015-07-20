'use strict';

function Robot() {
  // implement your solution here!
    this.bearing = null;
}

Robot.prototype.orient = function(bearing) {
    //var directions = [ 'east', 'west', 'north', 'south' ];
    var directions = [ 'north', 'east', 'south', 'west' ];

    if (directions.indexOf(bearing) === -1){
        throw new Error("Invalid Robot Bearing");
    } else {
        this.bearing = bearing;
    }

}

Robot.prototype.changeDirection = function(directions) {

    var current_index = directions.indexOf(this.bearing);
    var new_direction;

    if (current_index === directions.length-1){
        new_direction = directions[0];
    } else {
        new_direction = directions[current_index+1];
    };


    this.bearing = new_direction;
}

Robot.prototype.turnRight = function() {
    var directions = [ 'north', 'east', 'south', 'west' ];
    this.changeDirection(directions);
}

Robot.prototype.turnLeft = function() {
    var directions = [ 'north', 'east', 'south', 'west' ].reverse();
    this.changeDirection(directions);
}

Robot.prototype.at = function(x, y) {
    this.coordinates = [x, y];
}

Robot.prototype.advance = function() {
    var orientation = this.bearing;
    var coordinates = this.coordinates;

    switch (orientation) {
        case 'north':
            this.at(coordinates[0], coordinates[1] + 1);
            break;
        case 'south':
            this.at(coordinates[0], coordinates[1] - 1);
            break;
        case 'east':
            this.at(coordinates[0] + 1, coordinates[1]);
            break;
        case 'west':
            this.at(coordinates[0]-1, coordinates[1]);
            break;
    }

}

Robot.prototype.instructions = function(instructions) {
    var instructions_dictionary = {
        "A": "advance",
        "R": "turnRight",
        "L": "turnLeft"
    }

    return instructions.split("").map(function(letter) {
        return instructions_dictionary[letter];
    })
}

Robot.prototype.place = function(place_object){
    this.at(place_object.x, place_object.y);
    this.orient(place_object.direction);
}

Robot.prototype.evaluate = function(instructions) {
    var instructions_to_evaluate = this.instructions(instructions);
    var robot = this;

    instructions_to_evaluate.forEach(function(instruction) {
        robot[instruction]();
    })

}

