#pragma strict

var CameraHolder : GameObject;
private var mainCamera : Camera;
private var hudCamera: Camera;

private var groundCameraViewX = 0;
private var groundCameraViewY = 0;

private var MIN_X_POSITION = -100;
private var MAX_X_POSITION = -10;
private var MIN_Y_POSITION = 35;
private var MAX_Y_POSITION = 150;
private var MIN_Z_POSITION = -90;
private var MAX_Z_POSITION = -10;

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
 * Sets how much of the ground is visible by the camera so 
 * camera translation will move exactly with finger/mouse input
 * TODO: this is probably just a function of the camera height and FOV
 */
function setGroundCameraView() {
 	var hit : RaycastHit;

	// Determine the maximum view of the ground the camera has
	var ray = mainCamera.ScreenPointToRay(Vector2(Screen.width, Screen.height));
	Physics.Raycast(ray.origin,ray.direction, hit, 200, tapRayBlocker.value);
	var groundMaxY = CameraHolder.transform.InverseTransformPoint(hit.point).z;
	var groundMaxX = CameraHolder.transform.InverseTransformPoint(hit.point).x;

	// Determine the minimum view of the ground the camera has
	ray = mainCamera.ScreenPointToRay(Vector2(0, 0));
	Physics.Raycast(ray.origin,ray.direction, hit, 200, tapRayBlocker.value);
	var groundMinY = CameraHolder.transform.InverseTransformPoint(hit.point).z;
	var groundMinX = CameraHolder.transform.InverseTransformPoint(hit.point).x;

	groundCameraViewX = groundMaxX - groundMinX;
	groundCameraViewY = groundMaxY - groundMinY;
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
		}
		else if (Input.GetAxis("Mouse ScrollWheel")) {
			zoom(Input.GetAxis("Mouse ScrollWheel")*10);
		}
		else {
			#if UNITY_EDITOR
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
			#endif

		}
	}
}

function zoom(zoomMagnitude: double) {

	//mainCamera.fieldOfView += zoomMagnitude * ZOOM_SPEED;

    // Clamp the field of view to make sure it's between 0 and 180.
   // mainCamera.fieldOfView = Mathf.Clamp(camera.fieldOfView, CAMERA_MIN_FOV, CAMERA_MAX_FOV);

   //CameraHolder.transform.position.y += zoomMagnitude * ZOOM_SPEED;
   CameraHolder.transform.Translate(Vector3(0, zoomMagnitude * ZOOM_SPEED, -1*zoomMagnitude * ZOOM_SPEED));

   CameraHolder.transform.position.x = Mathf.Clamp(CameraHolder.transform.position.x, MIN_X_POSITION, MAX_X_POSITION);
   CameraHolder.transform.position.y = Mathf.Clamp(CameraHolder.transform.position.y, MIN_Y_POSITION, MAX_Y_POSITION);
   CameraHolder.transform.position.z = Mathf.Clamp(CameraHolder.transform.position.z, MIN_Z_POSITION, MAX_Z_POSITION);

    setGroundCameraView(); //recalculate the size of the view of the ground so translation will work exactly
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
 //	delta.x = Mathf.Clamp(delta.x, -1*MAX_MOVE_AMMOUNT, MAX_MOVE_AMMOUNT);
// 	delta.y = Mathf.Clamp(delta.y, -1*MAX_MOVE_AMMOUNT, MAX_MOVE_AMMOUNT);

	iTween.MoveBy(CameraHolder, 
		iTween.Hash("name", "cameraSlide",
					"amount", Vector3(delta.x, 0, delta.y),
					"time", 2,
					"easeType", "easeOutExpo",
					"onupdate", "stopSlideOutOfBounds", 
					"onupdatetarget", gameObject));
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


//	camMoveAmmX = Mathf.Clamp(camMoveAmmX, -1*MAX_MOVE_AMMOUNT, MAX_MOVE_AMMOUNT);
// 	camMoveAmmY = Mathf.Clamp(camMoveAmmY, -1*MAX_MOVE_AMMOUNT, MAX_MOVE_AMMOUNT);

	var newPoint = CameraHolder.transform.TransformDirection(Vector3(camMoveAmmX, 0, camMoveAmmY));

	CameraHolder.transform.position.x = Mathf.Clamp(CameraHolder.transform.position.x - newPoint.x, MIN_X_POSITION, MAX_X_POSITION);
	CameraHolder.transform.position.z = Mathf.Clamp(CameraHolder.transform.position.z - newPoint.z, MIN_Z_POSITION, MAX_Z_POSITION);

	//CameraHolder.transform.Translate(-1*camMoveAmmX, 0, -1*camMoveAmmY); //This works but the above allows camera constraint to be applied, leaving here JIC
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
	CameraHolder.transform.position.x = Mathf.Clamp(CameraHolder.transform.position.x, MIN_X_POSITION, MAX_X_POSITION);
	CameraHolder.transform.position.z = Mathf.Clamp(CameraHolder.transform.position.z, MIN_Z_POSITION, MAX_Z_POSITION);
}