#pragma strict

/**
 * Defines a waypoint located at an a sidewalk intersection
 */

var canMovePositiveZDirection: boolean;
var canMoveNegativeZDirection: boolean;
var canMovePositiveXDirection: boolean;
var canMoveNegativeXDirection: boolean;

private var directions = new Array();

/**
 * Defines the vectors the waypoint allows pedestrians to move
 */
function Start () {
	if(canMovePositiveZDirection == true)
		directions.Add(Vector3(0, 0, 1));
	if(canMoveNegativeZDirection == true)
		directions.Add(Vector3(0, 0, -1));
	if(canMovePositiveXDirection == true)
		directions.Add(Vector3(1, 0, 0));
	if(canMoveNegativeXDirection == true)
		directions.Add(Vector3(-1, 0, 0));

	if(directions.length < 2) 
		Debug.LogWarning("Waypoint must have two directions to push pedestrian in."); //must allow pedestrian to move in more than one directoin
}

/**
 * Retrieves a random direction vector for the pedestrian to travel in excluding the excludingDirection
 * exludingDirection so that pedestrain cannot go back the direction it came from
 * @return a direction vector
 */
function getDirectionToMove(excludingDirection: Vector3) {
	var randomDirection = excludingDirection;
	while(randomDirection == excludingDirection) {
		randomDirection = directions[Random.Range(0, directions.length)];
	}
	return randomDirection;
}