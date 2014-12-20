#pragma strict

var initialMovementDirection : Vector3;

/**
 * Specifies the initial movement direction for AI spawned at this create waypoint
 * @return direction vector
 */
function getInitialMovementDirection() {
	return initialMovementDirection;
}