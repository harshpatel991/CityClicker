#pragma strict

//public var titleText: SpriteText;
public var statsText: SpriteText;
public var buttonUpgradeText: SpriteText;

public var productionStatsPanel : UIBistateInteractivePanel;
public var productionItemsPanel : UIBistateInteractivePanel;
public var productionEmployeesPanel: UIBistateInteractivePanel;

public var productionItemsList: UIScrollList;
public var productionEmployeesList: UIScrollList;

public var buttonUpgrade: UIActionBtn;
public var buttonManager: UIActionBtn;
public var buttonClose: UIActionBtn;
public var buttonTabStats: UIActionBtn;
public var buttonTabItems: UIActionBtn; 
public var buttonTabEmployees: UIActionBtn;

public var STATS_BUTTON_POSITION = [-6, 6]; //positions of the upgrade and manager buttons

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
	
	function setManagerButtonText(newManagerText: String) {
		buttonManager.Text = newManagerText;
	}
	/**
	 * Sets the controllers the buttons should respond to when hit
	 */
	function setButtonObjects(object: MonoBehaviour) {
		buttonUpgrade.scriptWithMethodToInvoke = object;
		buttonManager.scriptWithMethodToInvoke = object;
		buttonClose.scriptWithMethodToInvoke = object;
		buttonTabStats.scriptWithMethodToInvoke = object;
		buttonTabItems.scriptWithMethodToInvoke = object;
		buttonTabEmployees.scriptWithMethodToInvoke = object;
	}
	
	/**
	 * Displays the menu starting with stats tab
	 * Shows all tabs and manager button
	 */
	function showMenu() {
		showStats();
		super.showMenu();
		buttonTabStats.gameObject.SetActive(true);
		buttonTabItems.gameObject.SetActive(true);
		buttonTabEmployees.gameObject.SetActive(true);
		buttonManager.gameObject.SetActive(true);
		
		buttonUpgrade.gameObject.transform.localPosition.x = STATS_BUTTON_POSITION[0];
		buttonManager.gameObject.transform.localPosition.x = STATS_BUTTON_POSITION[1];
	}
	
	/**
	 * Show the menu without tabs or manager button
	 */
	
	function showMenuAsBank() {
		showStats();
		super.showMenu();
		buttonTabStats.gameObject.SetActive(false);
		buttonTabItems.gameObject.SetActive(false);
		buttonTabEmployees.gameObject.SetActive(false);
		buttonManager.gameObject.SetActive(false);
		
		buttonUpgrade.gameObject.transform.localPosition.x = 0;
	}

	/** 
	 * Displays the stats tab
	 */
	function showStats() {
		productionItemsPanel.Hide();
		productionStatsPanel.Reveal();
		productionEmployeesPanel.Hide();
	} 

	/** 
	 * Displays the items tab
	 */
	function showItems() {
		productionStatsPanel.Hide();
		productionItemsPanel.Reveal();
		productionEmployeesPanel.Hide();
	}
	
	function showEmployees() {
		productionStatsPanel.Hide();
		productionItemsPanel.Hide();
		productionEmployeesPanel.Reveal();
	}
	
	/*
	 * Add all list items to scroll list and hook wire one up
	 */
	function setListItems(itemNames: String[], itemProductionIncrease: float[], itemsOwnedCount: int[], itemPurchaseMethods: String[], productionTileController: ProductionTileController, itemsCost: double[]) {
  		for(var listItemIndex: int = 0; listItemIndex < itemNames.Length; listItemIndex++) {
  			var listItem: UIListItemContainer = productionItemsList.GetItem(listItemIndex) as UIListItemContainer;
  			var listItemView : ListItemView = listItem.GetComponent(ListItemView) as ListItemView;
  			
  			listItemView.setTextItemName(itemNames[listItemIndex]);
  			listItemView.setTextStats("+" + itemProductionIncrease[listItemIndex] + " per click   Owned: " + itemsOwnedCount[listItemIndex]);
  			listItemView.setButtonBuyObject(productionTileController);
  			listItemView.setButtonBuyMethod(itemPurchaseMethods[listItemIndex]);
  			listItemView.setTextBuy(itemsCost[listItemIndex] + " #");
  		}
	}
	
	function setListEmployees(employeeNames: String[], employeeRateIncrease: float[], employeesOwnedCount: int[], employeePurchaseMethods: String[], productionTileController: ProductionTileController, employeeCosts: double[]) {
		for(var employeeItemIndex: int = 0; employeeItemIndex < employeeNames.Length; employeeItemIndex++) {
  			var listItem: UIListItemContainer = productionEmployeesList.GetItem(employeeItemIndex) as UIListItemContainer; //get the list item
  			var listItemView : ListItemView = listItem.GetComponent(ListItemView) as ListItemView; //get the view of the list item
  			
  			listItemView.setTextItemName(employeeNames[employeeItemIndex]);
  			listItemView.setTextStats("Once every " + (1/employeeRateIncrease[employeeItemIndex])+ " seconds   Owned: " + employeesOwnedCount[employeeItemIndex]);
  			listItemView.setButtonBuyObject(productionTileController);
  			listItemView.setButtonBuyMethod(employeePurchaseMethods[employeeItemIndex]);
  			listItemView.setTextBuy(employeeCosts[employeeItemIndex] + " #");
  		}
	}
}