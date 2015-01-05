#pragma strict

var direction = Vector3(0, 0, -1); //direction the vehicle is moving

private var shiftPosition = Vector3(.35, 0, -.35); //shift your position depending on which direction you are walking in
private var speed = 2.0;

var walkAnimation: Animation;

/**
 * Called every frame, updates the pedestrians position
 */
function Update () {
	walk();
}

/**
 * Increases the position (independent of framerate) by the speed
 */
function walk() {
	this.transform.position += (speed * direction * Time.deltaTime);
}

/**
 * Called when a pedestrian runs into a trigger
 * Destroys the pedestrian if it is a destroy waypoint
 * Turns the pedestrian if it is a waypoint
 * @param other the Collider object that the pedestrian ran into
 */
function OnTriggerEnter (other : Collider) { //ran into a object (waypoint)
	if(other.gameObject.tag == "destroy_waypoint") { //time to die
		Destroy(this.gameObject);
		return;
	}
	else if(other.gameObject.tag == "waypoint") { //at an intersection
		var waypoint = other.gameObject.GetComponent(PedestrianWayPoint);
		changeDirection(waypoint.getDirectionToMove(-1*direction), other.gameObject);
	}
}

/**
 * Change the direction the pedestrian is facing
 * @param newDirection the new direction to face
 * @param waypoint the waypoint of the intersection
 */
function changeDirection(newDirection: Vector3, waypoint: GameObject) {
	var rotateAmount = signedAngleBetween(newDirection, direction);

	iTween.RotateBy(this.gameObject, iTween.Hash(
										"amount", Vector3(0, rotateAmount/360, 0),
										"time", .2, 
										"easetype", "linear"));

	var shiftDirection = Vector3(newDirection.z, 0, newDirection.x); //flip the x and z components to get position shift direction
	iTween.MoveTo(this.gameObject, iTween.Hash(
										"position", waypoint.transform.position + (Vector3.Scale(shiftDirection, shiftPosition)),
										"time", .2, 
										"easetype", "linear"));
	direction = newDirection;
}

/**
 * Retrieves signed the angle between two vectors
 * @return angle in degrees
 */
function signedAngleBetween(a: Vector3, b:Vector3){
    var angle = Vector3.Angle(a,b);
    var sign = Mathf.Sign(Vector3.Dot(Vector3(0,1,0),Vector3.Cross(a,b)));
    var signedAngle = angle * sign;

    return -1*signedAngle;
}
   
/**
 * Directly set the move direction without any animation
 * Called by AI spawner
 */
function setMoveDirection(newDirection: Vector3) {
	direction = newDirection;
}

function run() {
	speed *= 1.3;
	walkAnimation["Pedestrian_walk"].speed *= 1.3;
}