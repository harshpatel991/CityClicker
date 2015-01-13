#pragma strict
/**
 * Defines a forward driving vehicle
 */

var speed = 10; //speed when moving
var direction = Vector3(0, 0, -1); 

private var currentSpeed = 0;
private var waitTime = 0.0;
private var WAIT_MAX_TIME = 25;

private var RAYCAST_DISTANCE = 4.5;
private var RAYCAST_DIRECTION: Vector3;

function Start() {
	RAYCAST_DIRECTION = transform.TransformDirection(Vector3.forward).normalized;
}

/**
 * Called every frame, determines if the vehicle can move after pedestrian wait timer has run out
 * Determines and stops if there is a vehicle directly infront of it otherwise moves if waitTime is <= 0
 */
function Update () {

	var raycastStartingPosition = Vector3(transform.position.x, transform.position.y+1, transform.position.z) + Vector3.Scale(direction, Vector3(2, 0, 2));

	Debug.DrawRay(raycastStartingPosition, RAYCAST_DIRECTION * RAYCAST_DISTANCE, Color.green);
	var hit: RaycastHit;
	if (Physics.Raycast(raycastStartingPosition, RAYCAST_DIRECTION, hit, RAYCAST_DISTANCE)) {
		if(hit.transform.gameObject.tag == "vehicle") { //there is a vehicle in front of me
			waitTime += Time.deltaTime + .005; //wait the amount exactly amount of the frame plus a small extra amount so it doesn't move in this frame
			stopMoving();
		}
	}
		
	waitTime = Mathf.Clamp(waitTime - Time.deltaTime, 0.0, WAIT_MAX_TIME);
	if(waitTime <= 0) {
		move();
	}
}

/**
 * Move the vehicle forward
 */
function move() {
	currentSpeed = speed;
	this.transform.position += (currentSpeed * direction * Time.deltaTime);
}

/**
 * Called when a vehicle runs into a trigger
 * Destroys the vehicle if it is a destroy waypoint
 * Stop the vehicle if it's a pedestrian
 * @param other the Collider object that the vehicle ran into
 */
function OnTriggerEnter (other : Collider) { //ran into a object (waypoint)
	if(other.gameObject.tag == "destroy_waypoint") { //time to die
		//Destroy(this.gameObject);
		PoolManager.Pools["AIPool"].Despawn(this.gameObject.transform);
		return;
	} else if (other.gameObject.tag == "pedestrian") {
		waitTime += 1; //wait 1 second for pedestrian/vehicle to move
		stopMoving();
	}
}

/**
 * Sets the vehicles speed to 0
 * Does not increase the waitTime, vehicle will begin moving again in the next frame if waitTime is <= 0
 */
function stopMoving() {
	currentSpeed = 0;
}

/**
 * Directly set the move direction without any animation
 */
function setMoveDirection(newDirection: Vector3) {
	direction = newDirection;
	Start();
}

/**
 * Stops the vehicle from moving for the specificed amount of time
 * @param timeToWait The time in seconds to wait
 */
function stopMovingForSeconds(timeToWait: double) {
	waitTime += timeToWait; //wait 1 second for pedestrian/vehicle to move
	stopMoving();
}

/**
 * Decreases the wait time for the vehicle
 * Vehicle moves when waitTime is <= 0
 * @param timeToRemove The amount of time to decrease the waitTime by
 */
function removeWaitTime(timeToRemove: double) {
	waitTime -= timeToRemove;
}