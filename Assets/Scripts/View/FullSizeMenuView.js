#pragma strict

/**
 * Defines a menu that takes up the entire screen, user is not allowed to interact with map
 * when a full size menu is displayed
 */

public class FullSizeMenuView extends MenuView {

	/**
	 * Displays the menu and disables input to main camera
	 */
	function showMenu() {
		Debug.Log("Show menu");
		super.showMenu();
		tileTouchController.disableInput(); 
		cameraMovement.disableInput();
	}

}