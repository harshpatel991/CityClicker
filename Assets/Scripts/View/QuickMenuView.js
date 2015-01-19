#pragma strict

/**
 * Defines a quick view menu (a small menu that appears on the bottom of the screen)
 */

public class QuickMenuView extends MenuView {

	public var tapRayBlocker: GameObject;

	public var buttonTransfer: UIActionBtn;
	public var buttonInfo: UIActionBtn;
	public var buttonClose: UIActionBtn;
	
	private var threeButtonSpacing = [-3.5, 0, 3.5];
	private var twoButtonSpacing = [-1.75, 1.75];

	/*
	 * Displays the menu
	 * Shows the incrementer and transfer buttons if the menu is used to display info about a production tile
	 * @param isProduction Whether or not the menu is displaying a production tile's info
	 */
	function showMenu(isProduction: boolean) {
		super.showMenu();
		buttonTransfer.gameObject.SetActive(isProduction);

		if(isProduction) {
			buttonTransfer.gameObject.transform.localPosition.x = threeButtonSpacing[0];
			buttonInfo.gameObject.transform.localPosition.x = threeButtonSpacing[1];
			buttonClose.gameObject.transform.localPosition.x = threeButtonSpacing[2];
		}
		else {
			buttonInfo.gameObject.transform.localPosition.x = twoButtonSpacing[0];
			buttonClose.gameObject.transform.localPosition.x = twoButtonSpacing[1];
		}
		
		tapRayBlocker.SetActive(true);
	}
	
	function hideMenu() {
		super.hideMenu();
		tapRayBlocker.SetActive(false);
	}

	/**
	 * Sets the controllers the buttons should respond to when hit
	 * @param object The script to call if the button is hit
	 */
	function setButtonObjects(object: MonoBehaviour) {
		buttonClose.scriptWithMethodToInvoke = object;
		buttonInfo.scriptWithMethodToInvoke = object;
		buttonTransfer.scriptWithMethodToInvoke = object;
	}

}