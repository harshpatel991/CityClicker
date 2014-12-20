#pragma strict

public var titleText: SpriteText;
public var statsText: SpriteText;
public var buttonUpgradeText: SpriteText;

public var storageStatsPanel : UIBistateInteractivePanel;
public var storageItemsPanel : UIBistateInteractivePanel;

public var buttonUpgrade: UIActionBtn;
public var buttonClose: UIActionBtn;

public class StorageMenuView extends FullSizeMenuView {

	/** 
	 * Sets the text of the title of the menu
	 * @param newTitleText The new text to be displayed on the button
	 */
	function setTitleText(newTitleText: String) {
		titleText.Text = newTitleText;
	}

	/** 
	 * Sets the stats text
	 * @param newStatsText The new stats text
	 */
	function setStatsText(newStatsText: String) {
		statsText.Text = newStatsText;
	}

	/** 
	 * Sets the text of the upgrade button
	 * @param newText The new text to be displayed on the button
	 */
	function setUpgradeButtonText(newUpgradeText: String) {
		buttonUpgradeText.Text = newUpgradeText;
	}

	/**
	 * Sets the controllers the buttons should respond to when hit
	 */
	function setButtonObjects(object: MonoBehaviour) {
		buttonUpgrade.scriptWithMethodToInvoke = object;
		buttonClose.scriptWithMethodToInvoke = object;
	}

	/** 
	 * Displays the stats tab
	 */
	function showStats() {
		storageItemsPanel.Hide();
		storageStatsPanel.Reveal();
	} 

	/** 
	 * Displays the items tab
	 */
	function showItems() {
		storageStatsPanel.Hide();
		storageItemsPanel.Reveal();
	}

	/**
	 * Displays the menu starting with stats tab
	 */
	function showMenu() {
		showStats();
		super.showMenu();
	}
}