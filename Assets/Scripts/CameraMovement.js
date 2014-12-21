#pragma strict

var CameraHolder : GameObject;
private var mainCamera : Camera;
private var hudCamera: Camera;

private var groundCameraViewX: double = 0;
private var groundCameraViewY: double = 0;

private var MIN_X_POSITION = -38;
private var MAX_X_POSITION = 80;
private var MIN_Y_POSITION = 85;
private var MAX_Y_POSITION = 200;
private var MIN_Z_POSITION = -38;
private var MAX_Z_POSITION = 70;

private var SLIDE_MIN_AMMOUNT = 5; //the min delta position to start a slide

var ZOOM_SPEED = .1;
private var CAMERA_MIN_FOV = 5;
private var CAMERA_MAX_FOV = 19;

private var MAX_MOVE_AMMOUNT = 20; //amount camera can move in a single frame

private var prevPosition : Vector3 = new Vector3(-20, 0, 0);
private var canMoveCamera = true; //disable camera movement when a menu is showing

var tapRayBlocker : LayerMask; //ignore the button blocker when caculating camera ground view

/**
 * At start of game, determines maximum/minimum camera view positions
 */
function Start () {
	mainCamera = this.camera;
	setGroundCameraView();
}

/**
 * Occurs every frame to recieve/process touch and mouse input
 */
function Update() { 	
	 if(canMoveCamera) {
		if (Input.touchCount == 1) {
			var touch : Touch = Input.GetTouch(0);

			if(touch.phase == TouchPhase.Began) {
				StartCoroutine(stopCameraSlide());
			} else if(touch.phase == TouchPhase.Moved) {
				moveCamera(touch.position);
			} else if(touch.phase == TouchPhase.Ended) {
				startCameraSlide(deltaPosition(touch.position));
			}
			prevPosition = touch.position; 
		} else if (Input.touchCount == 2 && Input.GetTouch(0).phase == TouchPhase.Moved && Input.GetTouch(1).phase == TouchPhase.Moved) { //it's a zoom
			var finger1 = Input.GetTouch(0);
			var finger2 = Input.GetTouch(1);

			var finger1PrevPos = finger1.position - finger1.deltaPosition;
        	var finger2PrevPos = finger2.position - finger2.deltaPosition;

        	var prevTouchDeltaMag = (finger1PrevPos - finger2PrevPos).magnitude;
        	var touchDeltaMag = (finger1.position - finger2.position).magnitude;
    		
    		var zoomMagnitude = prevTouchDeltaMag - touchDeltaMag;

        	zoom(zoomMagnitude);
        	prevPosition = (finger1.position + finger2.position) / 2;
		} else if (Input.touchCount == 2 && Input.GetTouch(0).phase == TouchPhase.Ended) { //it's a zoom, then one finger lift
			prevPosition = Input.GetTouch(1).position;		
		} else if (Input.touchCount == 2 && Input.GetTouch(1).phase == TouchPhase.Ended) { //it's a zoom, then one finger lift
			prevPosition = Input.GetTouch(0).position;
		} else if (Input.GetAxis("Mouse ScrollWheel")) {
			zoom(Input.GetAxis("Mouse ScrollWheel")*10);
		}
		else if(Input.touchCount == 0) {
			var click = Input.mousePosition;

			if(Input.GetMouseButtonDown(0)) {
				StartCoroutine(stopCameraSlide());
			} else if(Input.GetMouseButton(0)) {
				moveCamera(click);
				prevPosition = click; 
			} else if(Input.GetMouseButtonUp(0)) {
				startCameraSlide(deltaPosition(click));
			}
			prevPosition = Input.mousePosition;
		}
	}
}

function zoom(zoomMagnitude: double) {
	if((CameraHolder.transform.position.y + (zoomMagnitude * ZOOM_SPEED)) > MIN_Y_POSITION && (CameraHolder.transform.position.y + (zoomMagnitude * ZOOM_SPEED)) < MAX_Y_POSITION) {
		CameraHolder.transform.Translate(Vector3(0, zoomMagnitude * ZOOM_SPEED, -1*zoomMagnitude * ZOOM_SPEED));
		boundCameraHolder();
    	setGroundCameraView(); //recalculate the size of the view of the ground so translation will work exactly
  	}
}

function boundCameraHolder() {
	CameraHolder.transform.localPosition.x = Mathf.Clamp(CameraHolder.transform.localPosition.x, (CameraHolder.transform.localPosition.y * -0.727) + MIN_X_POSITION, (CameraHolder.transform.localPosition.y * -0.727) + MAX_X_POSITION);
	CameraHolder.transform.localPosition.z = Mathf.Clamp(CameraHolder.transform.localPosition.z, (CameraHolder.transform.localPosition.y * -0.727) + MIN_Z_POSITION, (CameraHolder.transform.localPosition.y * -0.727) + MAX_Z_POSITION);
}

/**
 * Sets how much of the ground is visible by the camera so 
 * camera translation will move exactly with finger/mouse input
 */
function setGroundCameraView() {	
	groundCameraViewX = (CameraHolder.transform.position.y) * .55 - 19.3;
	groundCameraViewY = (CameraHolder.transform.position.y) * .45 - 18.7;
}

/**
 * Determine the user input amount moved from the prevous frame to the current frame
 */
function deltaPosition(position: Vector3) {
	  return prevPosition - Input.mousePosition;
}

/**
 * Start to slide the camera, returns immediately
 * @param delta amount to slide 
 */
function startCameraSlide(delta: Vector3) {

	if(delta.magnitude > SLIDE_MIN_AMMOUNT) {
		delta.x = Mathf.Clamp(delta.x, -1*MAX_MOVE_AMMOUNT, MAX_MOVE_AMMOUNT);
	 	delta.y = Mathf.Clamp(delta.y, -1*MAX_MOVE_AMMOUNT, MAX_MOVE_AMMOUNT);

		iTween.MoveBy(CameraHolder, 
			iTween.Hash("name", "cameraSlide",
						"amount", Vector3(delta.x, 0, delta.y),
						"time", 1.5,
						"easeType", "easeOutExpo",
						"onupdate", "stopSlideOutOfBounds", 
						"onupdatetarget", gameObject));
	}
}

/**
 * Stops any camera slide occuring
 */
function stopCameraSlide() {
	iTween.StopByName("cameraSlide");     
    yield WaitForSeconds(0.01);
}

/**
 * Determines user input position movement and moves camera accordingly
 */
function moveCamera(userInputPosition: Vector2) {
	var deltaPos = userInputPosition - prevPosition;

	var camMoveAmmX = (deltaPos.x/Screen.width) * groundCameraViewX;
	var camMoveAmmY = (deltaPos.y/Screen.height) * groundCameraViewY;
	
	var newPoint = CameraHolder.transform.TransformDirection(Vector3(camMoveAmmX, 0, camMoveAmmY));

	CameraHolder.transform.position.x = CameraHolder.transform.position.x - newPoint.x; //Mathf.Clamp(CameraHolder.transform.position.x - newPoint.x, MIN_X_POSITION, MAX_X_POSITION);
	CameraHolder.transform.position.z = CameraHolder.transform.position.z - newPoint.z; //Mathf.Clamp(CameraHolder.transform.position.z - newPoint.z, MIN_Z_POSITION, MAX_Z_POSITION);

	boundCameraHolder();
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

/**
 * Called every frame of slide animation
 * Forces animation to stay inbounds
 */
function stopSlideOutOfBounds() {
	boundCameraHolder();
}