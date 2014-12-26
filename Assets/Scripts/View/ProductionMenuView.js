#pragma strict

//public var titleText: SpriteText;
public var statsText: SpriteText;
public var buttonUpgradeText: SpriteText;

public var productionStatsPanel : UIBistateInteractivePanel;
public var productionItemsPanel : UIBistateInteractivePanel;

public var productionItemsList: UIScrollList;

public var buttonUpgrade: UIActionBtn;
public var buttonClose: UIActionBtn;
public var buttonTabStats: UIActionBtn;
public var buttonTabItems: UIActionBtn; 
//public var buttonTabEmployees: UIActionBtn; //TODO: uncomment once employees added

public class ProductionMenuView extends FullSizeMenuView {

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
		buttonTabStats.scriptWithMethodToInvoke = object;
		buttonTabItems.scriptWithMethodToInvoke = object;
		//buttonTabEmployees.scriptWithMethodToInvoke = object; //TODO: uncomment this when employees tab is added
	}
	
	/**
	 * Displays the menu starting with stats tab
	 */
	function showMenu() {
		showStats();
		super.showMenu();
	}

	/** 
	 * Displays the stats tab
	 */
	function showStats() {
		productionItemsPanel.Hide();
		productionStatsPanel.Reveal();
	} 

	/** 
	 * Displays the items tab
	 */
	function showItems() {
		productionStatsPanel.Hide();
		productionItemsPanel.Reveal();
	}
	
	/*
	 * Add all list items to scroll list and hook wire one up
	 */
	function setListItems(itemNames: String[], itemProductionIncrease: float[], itemPurchaseMethods: String[], controller: ProductionTileController, itemsCost: double[]) {
  		for(var listItemIndex: int = 0; listItemIndex < itemNames.Length; listItemIndex++) {
  			var listItem: UIListItemContainer = productionItemsList.GetItem(listItemIndex) as UIListItemContainer;
  			var listItemView : ListItemView = listItem.GetComponent(ListItemView) as ListItemView;
  			
  			listItemView.setTextItemName(itemNames[listItemIndex]);
  			listItemView.setTextStats("+" + (itemProductionIncrease[listItemIndex]*60)+ "/minute");
  			listItemView.setButtonBuyObject(controller);
  			listItemView.setButtonBuyMethod(itemPurchaseMethods[listItemIndex]);
  			listItemView.setTextBuy("Buy - " + itemsCost[listItemIndex]);
  		}
	}
	
	function setListEmployees() {
	 //TODO: once employees is added
	}
}