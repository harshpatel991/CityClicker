#pragma strict

/**
 * Defines a quick view menu (a small menu that appears on the bottom of the screen)
 */

public class QuickMenuView extends MenuView {

	public var tapRayBlocker: GameObject;

	public var buttonTransfer: UIActionBtn;
	
	public var buttonInfo: UIActionBtn;
	public var buttonBuyItems: UIActionBtn;
	public var buttonBuyEmployees: UIActionBtn;
	
	public var buttonClose: UIActionBtn;
	
	public var buttonInfoText: SpriteText;
	
	private var productionButtonSpacing = [-8, -4, 0, 4, 7.5];
	private var twoButtonSpacing = [-1.75, 1.75];

	/*
	 * Displays the menu
	 * Shows the incrementer and transfer buttons if the menu is used to display info about a production tile
	 * @param isProduction Whether or not the menu is displaying a production tile's info
	 */
	function showMenu(isProduction: boolean) {
		super.showMenu();
		buttonTransfer.gameObject.SetActive(isProduction);
		buttonBuyItems.gameObject.SetActive(isProduction);
		buttonBuyEmployees.gameObject.SetActive(isProduction);

		if(isProduction) {
			buttonTransfer.gameObject.transform.localPosition.x = productionButtonSpacing[0];
			buttonInfo.gameObject.transform.localPosition.x = productionButtonSpacing[1];
			buttonBuyItems.gameObject.transform.localPosition.x = productionButtonSpacing[2];
			buttonBuyEmployees.gameObject.transform.localPosition.x = productionButtonSpacing[3];
			buttonClose.gameObject.transform.localPosition.x = productionButtonSpacing[4];
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
	
	function setInfoButtonText(newValue: String) {
		buttonInfoText.Text = newValue;
	}

	/**
	 * Sets the controllers the buttons should respond to when hit
	 * @param object The script to call if the button is hit
	 */
	function setButtonObjects(object: MonoBehaviour) {
		buttonClose.scriptWithMethodToInvoke = object;
		buttonInfo.scriptWithMethodToInvoke = object;
		buttonBuyItems.scriptWithMethodToInvoke = object;
		buttonBuyEmployees.scriptWithMethodToInvoke = object;
		buttonTransfer.scriptWithMethodToInvoke = object;
	}

}