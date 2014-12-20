#pragma strict

/**
 * Model for the SugarFactory
 * Defines the capacities of the factory and action of creating the resource
 */
public class SugarFactoryModel extends ProductionTileModel {

   	private var itemNames = ["Teenage Employee", "Normal Employee", "Pro Employee", "Rolling Pin", "Small Crusher", "Industrial Crusher"];
 	private var itemProductionIncrease = [10, 100, 1000, 10, 150, 200]; //increase in juice per second
 	private var itemCosts = [100, 500, 10000, 500, 750, 15000];
 	private var methodsToCall = ["pressBuyTeenageEmployee", "pressBuyNormalEmployee", "pressBuyProEmployee", "pressBuyRollingPin", "pressBuyCaneCrusher", 
 									"pressBuyIndustrialCaneCrusher"];
 	private var numberItemsOwned = [0,0,0,0,0,0];

	private var currentSugar: int = 0;
	private var capacitySugar: int[]= [10, 30, 50, 100, 140, 180, 230, 300, 450, 510]; //local capacity of the ice factory for each upgrade level
	private var upgradeCost: int[] = [250, 500, 1000, 1500, 2000, 2700, 3200, 4000, 5000]; //index 0 is the cost of the first upgrade

	private var sugarPerSecond : int = 1; //the amount of sugar earned, increases as you buy employees/upgrades

	public function Start() {
		super.Start();
    	InvokeRepeating("incrementProduct", 0, 1); // employees selling lemonade every second
		currentUpgradeLevel = 0; //TODO: Going to need to read this from a saved file	
   		currentSugar= 0; //TODO: Going to need to read this from a saved file
    }

  	/**
  	 * Upgrades the tile if player has enough money and meets level requirements
  	 */
  	public function upgradeTile() {
  		if(productsManager.getCurrent("Money") >= upgradeCost[currentUpgradeLevel] && currentUpgradeLevel < MAX_UPGRADE_LEVEL) { //TODO: pull most of this up into parent once finalized
  			productsManager.modifyValue("Money", -1*upgradeCost[currentUpgradeLevel]); 
	  		currentUpgradeLevel +=1;
		}
  	}

	/**
  	 * Creates the resource if capacity exists
  	 */
  	public function incrementProduct() {
		if(currentSugar < capacitySugar[currentUpgradeLevel]) {
  			currentSugar += Mathf.Min(sugarPerSecond, (capacitySugar[currentUpgradeLevel] - currentSugar));
  			Instantiate(incrementParticles, Vector3(this.gameObject.transform.position.x, this.gameObject.transform.position.y + 5, this.gameObject.transform.position.z), incrementParticles.transform.rotation);
		}
  	}

  	/**
  	 * Transfers the accumulated product to global prodcut manager
  	 */
  	public function transferProduct() {
		var transferAmount :int = Mathf.Min(currentSugar, productsManager.getRemainingCapacity("Sugar"));
 		productsManager.modifyValue("Sugar", transferAmount);
  		currentSugar -= transferAmount;
  	}

  	/**
  	 * Sets the text for the for the menu items
  	 */
  	function setMenuTexts() {
  		view.setTitleText(myName + " (Level: " + (currentUpgradeLevel+1) + ")"); //add 1 because we want levels to go to 1-10
    	view.setStatsText("Sugar Per Minute: " + (sugarPerSecond * 60) + 
    							"\nCurrent Sugar: " + currentSugar +
    							"\nSugar Capacity: " + capacitySugar[currentUpgradeLevel]);

		if(currentUpgradeLevel >= MAX_UPGRADE_LEVEL) {
  			view.setUpgradeButtonText("Fully Upgraded");
  		} else {
  			view.setUpgradeButtonText("Upgrade - " + upgradeCost[currentUpgradeLevel]);
  		}
  	}

  	/**
  	 * Adds items to the list of items that can be purchased for this tile
  	 */
  	function setListItems(productionTileController: ProductionTileController) { //TODO: should be able to pull up into parent when finished
  		view.productionItemsList.ClearList(true); //destroy all current list items
  	
  		addListItems(productionTileController, itemNames, itemProductionIncrease, itemCosts, methodsToCall, numberItemsOwned);
  	}

  	/**
  	 * Buy an item for the sugar factory
  	 */
	public function buyItem(index: int) {
		if(productsManager.getCurrent("Money") >= getItemCost(index, itemCosts, numberItemsOwned)) {
			productsManager.modifyValue("Money", -1*getItemCost(index, itemCosts, numberItemsOwned));
			sugarPerSecond += itemProductionIncrease[index];
			numberItemsOwned[index]++;
		}
	}
}