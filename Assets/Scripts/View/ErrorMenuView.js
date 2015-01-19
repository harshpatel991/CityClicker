#pragma strict

var errorText: SpriteText;

private var ERROR_DISPLAY_TIME: float = 2;

public class ErrorMenuView extends MenuView {

	/** 
	 * Sets the text of the agree button
	 * @param newAgreeText The new text to be displayed on the button
	 */
	function displayErrorText(newErrorText: String) {
		showMenu();
		errorText.Text = newErrorText;
		yield WaitForSeconds(ERROR_DISPLAY_TIME);
		hideMenu();
	}
	
	/**
	 * Hides the menu and enables input to main camera
	 */
	function hideMenu() {
		menu.Hide();
	}
	
}