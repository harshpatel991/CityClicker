#pragma strict

/**
 * Defines a quick view menu (a small menu that appears on the bottom of the screen)
 */

public class QuickMenuView extends MenuView {

	public var buttonInfo: UIActionBtn;
	public var buttonClose: UIActionBtn;
//	public var titleText: SpriteText;

	public var buttonIncrementer: UIActionBtn;
	public var buttonTransfer: UIActionBtn;

	/**
 	 * Sets the text of the tile
 	 * @param newTitleText The new text to be displayed on the title
 	 * TODO: remove this
 	 */
//	function setTitleText(newTitleText: String) {
//		titleText.Text = newTitleText;
//	}

	/*
	 * Displays the menu
	 * Shows the incrementer and transfer buttons if the menu is used to display info about a production tile
	 * @param isProduction Whether or not the menu is displaying a production tile's info
	 */
	function showMenu(isProduction: boolean) {
		super.showMenu();
		menu.Reveal();

		buttonIncrementer.gameObject.SetActive(isProduction);
		buttonTransfer.gameObject.SetActive(isProduction);
	}

	/**
	 * Sets the controllers the buttons should respond to when hit
	 * @param object The script to call if the button is hit
	 */
	function setButtonObjects(object: MonoBehaviour) {
		buttonClose.scriptWithMethodToInvoke = object;
		buttonInfo.scriptWithMethodToInvoke = object;
		buttonIncrementer.scriptWithMethodToInvoke = object;
		buttonTransfer.scriptWithMethodToInvoke = object;
	}

}