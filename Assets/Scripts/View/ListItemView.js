#pragma strict

public class ListItemView extends MonoBehaviour { 

	var buttonBuy : UIListButton;
	var textBuy : SpriteText;
	var textItemName: SpriteText;
	var textStats: SpriteText;

	/**
	 * Sets the controller the button should respond to when hit
	 */
	function setButtonBuyObject(object: MonoBehaviour) {
		buttonBuy.scriptWithMethodToInvoke = object;
	}

	/**
	 * Sets the method to be called when the button is hit
	 */
	function setButtonBuyMethod(newMethod: String) {
		buttonBuy.methodToInvoke = newMethod;
	}

	/** 
	 * Sets the text of the buy button
	 * @param newText The new text to be displayed on the button
	 */
	function setTextBuy(newText: String) {
		textBuy.Text = newText;
	}

	/** 
	 * Sets the name text of the item
	 * @param newItemName The new text to be displayed on the list item
	 */
	function setTextItemName(newItemName: String) {
		textItemName.Text = newItemName;
	}

	/** 
	 * Sets the text of the stats
	 * @param  newStats The new text to be displayed on the list item
	 */
	function setTextStats(newStats: String) {
		textStats.Text = newStats;
	}

}