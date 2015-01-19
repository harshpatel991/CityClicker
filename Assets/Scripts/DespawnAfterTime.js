#pragma strict

var lifespan: float = 1;

function OnSpawned() {
	// Start the timer as soon as this instance is spawned.
	StartCoroutine(this.TimedDespawn());
}

function TimedDespawn() {
	yield WaitForSeconds(lifespan);

	PoolManager.Pools["AIPool"].Despawn(this.transform);
}