#pragma strict

@HideInInspector
var menu : UIBistateInteractivePanel;
var tileTouchController : TileTouchController; // needed for disabling input
var cameraMovement: CameraMovement; // needed for disabling input

public class MenuView extends MonoBehaviour {

	function Start() {
		menu = gameObject.GetComponent(UIBistateInteractivePanel);
	}

	/**
	 * Displays the menu and disables input to main camera
	 */
	function showMenu() {
		menu.Reveal();
		//tileTouchController.disableInput(); 
		//cameraMovement.disableInput();
	}

	/**
	 * Hides the menu and enables input to main camera
	 */
	function hideMenu() {
		menu.Hide();
		tileTouchController.enableInput();
		cameraMovement.enableInput();
	}
}