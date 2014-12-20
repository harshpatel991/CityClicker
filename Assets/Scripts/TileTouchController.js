#pragma strict

/**
 * Process touch input and mouse input to allow tapping on the map to select tiles.
 */
private var totalMovement : Vector2;

private var prevPosition : Vector2; //used for determining deltaPosition of mouse
private var canMoveCamera = true; //disable camera movement when a menu is showing

var quickMenuView: QuickMenuView;

/**
 * Occurs every frame to recieve/process touch and mouse input
 */
function Update () {

	if(canMoveCamera) {

	    if (Input.touchCount > 0) {
			var touch : Touch = Input.GetTouch(0);
			
			if(touch.phase == TouchPhase.Began) {
				totalMovement = Vector2(0, 0);
				prevPosition = touch.position;
			} else if(touch.phase == TouchPhase.Moved) {
				totalMovement += Vector2(Mathf.Abs(touch.deltaPosition.x), Mathf.Abs(touch.deltaPosition.y));
			} else if(touch.phase == TouchPhase.Ended) {
	    		revealMenuIfTileTouch(touch.position);
			}
		}

		if(Input.GetMouseButtonDown(0)) {
			totalMovement = Vector2(0, 0);
			prevPosition = Input.mousePosition;
		} else if(Input.GetMouseButton(0)) {
			var delta = deltaMousePosition();
			totalMovement += Vector2(Mathf.Abs(delta.x), Mathf.Abs(delta.y));
		} else if(Input.GetMouseButtonUp(0)) {
			revealMenuIfTileTouch(Input.mousePosition);
		}
	}
}

/**
 * Determine if the touch action was a tap and open specified tile menu
 * @param touch the Touch object retreieved from Input
 */
function revealMenuIfTileTouch(inputPosition: Vector2) {
	if((Mathf.Abs(totalMovement.x) < 5) && (Mathf.Abs(totalMovement.y) < 5)) { //Check if it's a 'tap'
		var hitGameObject = castRayToWorld(inputPosition);
		if(hitGameObject != null) {
			var hitTile = retrieveHitTile(hitGameObject);
			var hitPedestrian = retreiveHitPedestrian(hitGameObject);
			if(hitTile != null) {
				hitTile.pressShowQuickMenu();

			} else if (hitPedestrian) {
				hitPedestrian.run();
			}

		}
	}  
}

/**
 * Determine the user input amount moved from the prevous frame to the current frame
 */
function deltaMousePosition() {
	  var click = Input.mousePosition;
	  var delta = prevPosition - click;

	  prevPosition = click;
	  return delta;
}

function castRayToWorld(userInputPosition: Vector2) {
	var hit: RaycastHit;
	var ray = Camera.main.ScreenPointToRay (userInputPosition);
	if (Physics.Raycast (ray, hit, 150)) { //cast a ray forward in direction of users input
		return hit.transform.gameObject;
	}
	return null;
}

/**
 * Cast ray to users input position and determine if a tile was hit.
 * @param userInputPosition x-y location of users input
 * @return a tile if one was hit, null otherwise
 */
function retrieveHitTile(object: GameObject) {
	var tile = object.GetComponent("TileController") as TileController; //TODO: change to generic tile controller
	return tile;
}

function retreiveHitPedestrian(object: GameObject) {
	var pedestrian = object.GetComponent("Pedestrian") as Pedestrian; //TODO: change to generic tile controller
	return pedestrian;
}

/**
 * Disables user input from moving the camera
 */
function enableInput() {
	canMoveCamera = true;
}

/**
 * Enables user input to move camera
 */
function disableInput() {
	canMoveCamera = false;
}