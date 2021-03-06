#pragma strict

/**
 * Defines a menu that takes up the entire screen, user is not allowed to interact with map
 * when a full size menu is displayed
 */

public class FullSizeMenuView extends MenuView {
	public var grayBackgroundMenu: UIBistateInteractivePanel;
	
	function Awake() {
		super.Awake();
	}

	/**
	 * Displays the menu and disables input to main camera
	 */
	function showMenu() {
		grayBackgroundMenu.Reveal();
		super.showMenu();
		tileTouchController.disableInput(); 
		cameraMovement.disableInput();
	}
	
	function hideMenu() {
		grayBackgroundMenu.Hide();
		super.hideMenu();
	}
	
	//Hide the menu without hiding the gray background
	function temporaryHideMenu() {
		super.hideMenu();
	}

}