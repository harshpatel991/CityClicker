#pragma strict

var pedestrianSpawnTime: double = 1.5;
var pedestrians : GameObject[];
private var pedestianTimer: double;
private var pedestrianCreateWaypoints: GameObject[];

var vehicleSpawnTime: double = 1;
var vehicles: GameObject[];
private var vehicleTimer: double;
private var vehicleCreateWaypoints: GameObject[];

function Start () {
	pedestrianCreateWaypoints = GameObject.FindGameObjectsWithTag("pedestrian_create_waypoint");
	vehicleCreateWaypoints = GameObject.FindGameObjectsWithTag("vehicle_create_waypoint");
}

/**
 * Determines if spawner should spawn pedestrians or vehicles at the current frame
 */
function Update () {
	pedestianTimer += Time.deltaTime;
	vehicleTimer += Time.deltaTime;

	if(pedestianTimer > pedestrianSpawnTime) {
		spawnPedestrian();
		pedestianTimer = 0;
	}

	if(vehicleTimer > vehicleSpawnTime) {
		spawnVehicle();
		vehicleTimer = 0;
	}
}

/**
 * Spawns a pedestrian at a random pedestrain create waypoint
 */
function spawnPedestrian() {
	var pedestrianSpawnWaypoint: GameObject = pedestrianCreateWaypoints[Random.Range(0, pedestrianCreateWaypoints.length)]; //choose a random waypoint to spawn at
	var moveDirection = pedestrianSpawnWaypoint.GetComponent(CreateWaypoint).getInitialMovementDirection(); //get the direction the waypoint would like the pedestrian to go

	var randomPedestrian = pedestrians[Random.Range(0, pedestrians.length)]; //choose a random pedestrain to spawn
	var newPedestrain = Instantiate(randomPedestrian, pedestrianSpawnWaypoint.transform.position, pedestrianSpawnWaypoint.transform.rotation); //create pedestrian at location

	newPedestrain.GetComponent(Pedestrian).setMoveDirection(moveDirection);
}

/**
 * Spawns a vehicle at a random vehicle create waypoint
 */
function spawnVehicle() {
	var vehicleSpawnWaypoint: GameObject = vehicleCreateWaypoints[Random.Range(0, vehicleCreateWaypoints.length)]; //choose a random waypoint to spawn at
	var vehicleMoveDirection = vehicleSpawnWaypoint.GetComponent(CreateWaypoint).getInitialMovementDirection(); //get the direction the waypoint would like the vehicle to go

	var randomVehicle = vehicles[Random.Range(0, vehicles.length)]; //choose a random vehicle to spawn
	var newVehicle = Instantiate(randomVehicle, vehicleSpawnWaypoint.transform.position, vehicleSpawnWaypoint.transform.rotation); //create vehicle at location

	newVehicle.GetComponent(Vehicle).setMoveDirection(vehicleMoveDirection);
}

/**
 * Decreases the amount of time required to spawn a pedestrain or vehicle
 */
//TODO: put this on a log scale
function decreaseSpawnTime(decreaseAmount: double) {
	pedestrianSpawnTime -= decreaseAmount; 
	vehicleSpawnTime -= decreaseAmount;
}

/**
 * Increases the amount of time required to spawn a pedestrain or vehicle
 */
function inreaseSpawnTime(increaseAmount: double) {
	pedestrianSpawnTime += increaseAmount; 
	vehicleSpawnTime += increaseAmount;
}