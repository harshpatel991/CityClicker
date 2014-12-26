#pragma strict

/**
 * Base class for Lemonade Stand tile and Juice/Sugar/Ice factory tiles
 */
public class ProductionTileModel extends TileModel {

 	@HideInInspector
 	var view: ProductionMenuView;
 	@HideInInspector
	var productsManager : ProductManager;
	
	protected var incrementRate : double = 0.0;
	
	protected var upgradeCost: int[] = [];
	
	protected var itemNames = [];
	protected var itemProductionIncrease: float[] = []; //increase in money per second
 	protected var itemCosts: int[] = [];
 	protected var itemsOwnedCount: int[] = []; // TODO: load this from file
	protected var itemPurchaseMethods = [];
 									
 	protected var employeeNames = [];
 	protected var employeeRateIncrease: float[] = []; //how often the employee 'clicks' the button
 	protected var employeeCosts: int[] = [];
 	protected var employeesOwnedCount: int[] = [];//TODO: load this from file
 	protected var employeePurchaseMethods = [];
	
	function Start() {
		super.Start();
		productsManager = FindObjectsOfType(ProductManager)[0] as ProductManager;
		view = FindObjectsOfType(ProductionMenuView)[0] as ProductionMenuView;
    	
    	InvokeRepeating("incrementProduct", 0, 1); // employees selling lemonade every second
	}
	
	/**
  	 * Upgrades the level if player has enough money and meets level requirements
  	 */
  	function upgradeTile() {
  		if(productsManager.getCurrent("Money") >= upgradeCost[currentUpgradeLevel] && currentUpgradeLevel < MAX_UPGRADE_LEVEL) { //TODO: pull most of this up into parent once finalized
  			productsManager.modifyValue("Money", -1*upgradeCost[currentUpgradeLevel]); 
	  		currentUpgradeLevel +=1;
		}
	}
	
	/**
  	 * Sets the text for the for the menu items
  	 */
  	public function setMenuTexts(productionTileController: ProductionTileController) {
  		view.setTitleText(myName + " (Level: " + (currentUpgradeLevel+1) + ")"); //add 1 because we want levels to go to 1-10

		view.setStatsText("Profit Per Increment: " + TileModel.Dot(itemProductionIncrease, itemsOwnedCount) + 
    						"\nRate: " + incrementRate);
    						
    	if(currentUpgradeLevel >= MAX_UPGRADE_LEVEL) {
  			view.setUpgradeButtonText("Fully Upgraded");
  		} else {
  			view.setUpgradeButtonText("Upgrade Capacity - " + upgradeCost[currentUpgradeLevel]);
  		}
  		
  		setListItems(productionTileController);
  	}

	/**
  	 * Creates the resource if capacity exists
  	 */
	function incrementProduct() {
		productsManager.modifyValue("Money", TileModel.Dot(itemProductionIncrease, itemsOwnedCount));
	}

	/**
  	 * Transfers the accumulated product to global prodcut manager
  	 */
	function transferProduct() {
		Debug.LogWarning("This should not be directly called."); //defined by children, abstract classes don't exist in Unity JS
	}
	
	/**
  	 * Adds items to the list of items that can be purchased for this tile
  	 */
  	public function setListItems(productionTileController: ProductionTileController) { 
		var itemsCost: double[] = new double[3];
		
		for(var listItemIndex: int = 0; listItemIndex < itemNames.Length; listItemIndex++) {
			itemsCost[listItemIndex] = getItemCost(listItemIndex);
		}
		view.setListItems(itemNames, itemProductionIncrease, itemPurchaseMethods, productionTileController, itemsCost);	
  	}
	
	public function setListEmployees(productionTileController: ProductionTileController) {
	
	}

	/**
	 * Determines the cost of the item as determined by the type of item 
	 */
	public function getItemCost(itemIndex: int) {
		return Mathf.Ceil(itemCosts[itemIndex] * Mathf.Pow(1.3, itemsOwnedCount[itemIndex]));
	}
	
  	/**
  	 * Buy an item
  	 */
	public function buyItem(index: int) {
		if(productsManager.getCurrent("Money") >= getItemCost(index)) {
			productsManager.modifyValue("Money", -1*getItemCost(index));
			itemsOwnedCount[index]++;
		}
	}

  	/**
  	 * Buy an employee
  	 */
	public function buyEmployee(index: int) {
		/*if(productsManager.getCurrent("Money") >= getItemCost(index, itemCosts, numberItemsOwned)) {
			productsManager.modifyValue("Money", -1*getItemCost(index, itemCosts, numberItemsOwned));
			cupsPerSecond += itemProductionIncrease[index];
			numberItemsOwned[index]++;
		}*/
	}
}