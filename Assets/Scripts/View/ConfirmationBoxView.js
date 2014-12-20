#pragma strict
/**
 * Represents the confirmation box view
 */

var buttonAgree: UIActionBtn;
var buttonCancel: UIActionBtn;
var buttonClose: UIActionBtn;
var titleText: SpriteText;
var agreeText: SpriteText;

public class ConfirmationBoxView extends FullSizeMenuView {

 	/**
 	 * Sets the text of the tile
 	 * @param newTitleText The new text to be displayed on the title
 	 */
	function setTitleText(newTitleText: String) {
		titleText.Text = newTitleText;
	}

	/** 
	 * Sets the text of the agree button
	 * @param newAgreeText The new text to be displayed on the button
	 */
	function setAgreeText(newAgreeText: String) {
		agreeText.Text = newAgreeText;
	}

	/**
	 * Sets the controllers the buttons should respond to when hit
	 */
	function setButtonObjects(object: MonoBehaviour) {
		buttonAgree.scriptWithMethodToInvoke = object;
		buttonCancel.scriptWithMethodToInvoke = object;
		buttonClose.scriptWithMethodToInvoke = object;
	}
}