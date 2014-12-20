#pragma strict

enum trafficDirection {None, Horizontal, Vertical};
private var currentTrafficDirection = trafficDirection.None;

private var waitTime = 0.0;
private var waitingVehicles = new Array();
private var waitingVehiclesWaitTimes = new Array();

private var DIRECTION_TO_LEFT = Vector3(-1, 0, 0);
private var DIRECTION_TO_RIGHT = Vector3(1, 0, 0);
private var DIRECTION_TO_UP =Vector3(0, 0, 1);
private var DIRECTION_TO_DOWN = Vector3(0, 0, -1);

private var MAX_WAIT_TIME = 6.0;

/**
 * Switches to None direction of traffic flow if waitTime runs out
 * On traffic flow switch, notfies any vehicles that are currently waiting that they are allowed to go
 */
function FixedUpdate() {
 	waitTime = Mathf.Clamp(waitTime - Time.deltaTime, 0.0, MAX_WAIT_TIME);

	for (var i = 0; i < waitingVehiclesWaitTimes.Count; i++) {
		var currentWaitTime: float = waitingVehiclesWaitTimes[i];
		waitingVehiclesWaitTimes[i] = currentWaitTime - Time.deltaTime;
 	}
		
	if(waitTime <= 0) { //time to remove traffic direction
		currentTrafficDirection = trafficDirection.None;
	
		for (i = 0; i < waitingVehicles.Count; i++) { //notify all waiting vehicles that they are no longer need to wait for the waypoint
			
			var howLongThisVehicleHasWaited = waitingVehiclesWaitTimes[i];
			var waitingVehicle  = (waitingVehicles[i]) as Vehicle;
			waitingVehicle.removeWaitTime(howLongThisVehicleHasWaited);

			currentTrafficDirection = vectorDirectionToTrafficDirection(waitingVehicle.direction); //set direction of traffic to the direction of any waiting vehicles (if any exist)
		}

		waitingVehicles.Clear();
		waitingVehiclesWaitTimes.Clear();
	}
}

/**
 * Triggered when a vehicle starts to enter the intersection
 * If vehicle is not moving in the traffic flow direction, stop it by telling it to wait for 100 seconds
 * @param other The trigger that ran into the waypoint
 */
function OnTriggerEnter(other : Collider) {
	var vehicle = other.transform.gameObject.GetComponent(Vehicle) as Vehicle;
 
    if(vectorDirectionToTrafficDirection(vehicle.direction) == currentTrafficDirection || currentTrafficDirection == trafficDirection.None) {			
		currentTrafficDirection = vectorDirectionToTrafficDirection(vehicle.direction);
    	waitTime = 2;
    } else {
    	vehicle.stopMovingForSeconds(100);
    		
		waitingVehicles.push(vehicle);
    	waitingVehiclesWaitTimes.push(100.0);
    }    	
}

/**
 * For every frame that a vehicle is in the collider and it is moving in the direction of traffic (means the vehicle is waiting for a pedestrian)
 * Increment the waitTime to switch directions to allow the car to get past pedestrians
 */
function OnTriggerStay(other : Collider)
{
    var vehicle = other.transform.gameObject.GetComponent(Vehicle) as Vehicle;
	var vehicleTrafficDirection = vectorDirectionToTrafficDirection(vehicle.direction);

	if(vehicleTrafficDirection == currentTrafficDirection)
    	waitTime += Time.deltaTime + .0005;
}

/**
 * Converts a the movement direction of the vehicle to trafficDirection.Horizontal or trafficDirection.Vertical
 * @param vectorDirection The direction vector to convert
 */
function vectorDirectionToTrafficDirection(vectorDirection: Vector3) {
	if (vectorDirection == DIRECTION_TO_LEFT || vectorDirection == DIRECTION_TO_RIGHT) {
		return trafficDirection.Horizontal;
	} else if (vectorDirection == DIRECTION_TO_DOWN || vectorDirection == DIRECTION_TO_UP) {
		return trafficDirection.Vertical;
	} else {
		return trafficDirection.None;
	}
}