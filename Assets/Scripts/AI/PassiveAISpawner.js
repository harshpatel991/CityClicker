#pragma strict
import PathologicalGames;

var spawnRateDecrease: float[] = [.15, .25, .35]; //the amount the spawn rate decreases with each business item purchased

private var pedestrianBaseSpawnTime: double = 1.1;
var pedestrianSpawnTime: double = 1.1;
var pedestrians : GameObject[];
private var pedestianTimer: double;
private var pedestrianCreateWaypoints: GameObject[];

private var vehicleBaseSpawnTime: double = 1.1;
var vehicleSpawnTime: double = 1.1;
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
	//var newPedestrain = Instantiate(randomPedestrian, pedestrianSpawnWaypoint.transform.position, pedestrianSpawnWaypoint.transform.rotation); //create pedestrian at location

	var newPedestrain = PoolManager.Pools["AIPool"].Spawn(randomPedestrian.transform);
	
	if(newPedestrain != null) {
		newPedestrain.gameObject.transform.position = pedestrianSpawnWaypoint.transform.position;
		newPedestrain.gameObject.transform.rotation = pedestrianSpawnWaypoint.transform.rotation;

		newPedestrain.gameObject.GetComponent(Pedestrian).setMoveDirection(moveDirection);
	}
}

/**
 * Spawns a vehicle at a random vehicle create waypoint
 */
function spawnVehicle() {
	var vehicleSpawnWaypoint: GameObject = vehicleCreateWaypoints[Random.Range(0, vehicleCreateWaypoints.length)]; //choose a random waypoint to spawn at
	var vehicleMoveDirection = vehicleSpawnWaypoint.GetComponent(CreateWaypoint).getInitialMovementDirection(); //get the direction the waypoint would like the vehicle to go

	var randomVehicle = vehicles[Random.Range(0, vehicles.length)]; //choose a random vehicle to spawn
	//var newVehicle = Instantiate(randomVehicle, vehicleSpawnWaypoint.transform.position, vehicleSpawnWaypoint.transform.rotation); //create vehicle at location
	var newVehicle = PoolManager.Pools["AIPool"].Spawn(randomVehicle.transform);
	
	if(newVehicle != null) {
		newVehicle.gameObject.transform.position = vehicleSpawnWaypoint.transform.position;
		newVehicle.gameObject.transform.rotation = vehicleSpawnWaypoint.transform.rotation;
		
		newVehicle.gameObject.GetComponent(Vehicle).setMoveDirection(vehicleMoveDirection);
	}
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

function setSpawnRate(bonusPurchased: int[]) {
	pedestrianSpawnTime = pedestrianBaseSpawnTime - TileModel.Dot(spawnRateDecrease, bonusPurchased);
	vehicleSpawnTime = vehicleBaseSpawnTime - TileModel.Dot(spawnRateDecrease, bonusPurchased);
}