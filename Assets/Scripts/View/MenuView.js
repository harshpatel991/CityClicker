#pragma strict

@HideInInspector
var menu : UIBistateInteractivePanel;
var tileTouchController : TileTouchController; // needed for disabling input
var cameraMovement: CameraMovement; // needed for disabling input
var titleText: SpriteText;


public class MenuView extends MonoBehaviour {

	function Start() {
		menu = gameObject.GetComponent(UIBistateInteractivePanel);
	}
	
	function setTitleText(newTitleText: String) {
		titleText.Text = newTitleText;
	}

	/**
	 * Displays the menu and disables input to main camera
	 */
	function showMenu() {
		menu.Reveal();
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