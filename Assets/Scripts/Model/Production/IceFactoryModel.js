#pragma strict

/**
 * Model for the Ice Factory
 * Defines the local capacities of the factory and action of creating the resource
 */
public class IceFactoryModel extends ProductionTileModel {

	private var itemNames = ["Teenage Employee", "Normal Employee", "Pro Employee", "Tiny Freezer", "Regular Feezer", "Industrial Freezer"];
 	private var itemProductionIncrease = [10, 100, 1000, 10, 150, 200]; //increase in juice per second
 	private var itemCosts = [100, 500, 10000, 500, 750, 15000];
 	private var methodsToCall = ["pressBuyTeenageEmployee", "pressBuyNormalEmployee", "pressBuyProEmployee", "pressBuyTinyFreezer", "pressBuyRegularFreezer", 
 									"pressBuyIndustrialIndustrialFreezer"];
 	private var numberItemsOwned = [0,0,0,0,0,0];

	private var currentIce: int = 0;
	private var capacityIce: int[] = [10, 30, 50, 100, 140, 180, 230, 300, 450, 510]; //local capacity of the ice factory for each upgrade level
	private var upgradeCost: int[] = [250, 500, 1000, 1500, 2000, 2700, 3200, 4000, 5000]; //index 0 is the cost of the first upgrade

	public var icePerSecond : int = 1; //the amount of ice earned per unit time

	public function Start() {
		super.Start();
    	InvokeRepeating("incrementProduct", 0, 1); 
   		currentUpgradeLevel = 0; //TODO: Going to need to read this from a saved file	
   		currentIce = 0; //TODO: Going to need to read this from a saved file
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
  	 * Creates the resource if local capacity exists
  	 */
  	public function incrementProduct() {
		if(currentIce < capacityIce[currentUpgradeLevel]) {
  			currentIce += Mathf.Min(icePerSecond, (capacityIce[currentUpgradeLevel] - currentIce));
  			Instantiate(incrementParticles, Vector3(this.gameObject.transform.position.x, this.gameObject.transform.position.y + 5, this.gameObject.transform.position.z), incrementParticles.transform.rotation);
		}
  	}

  	/**
  	 * Transfers the accumulated product to global prodcut manager
  	 */
  	public function transferProduct() {
		var transferAmount :int = Mathf.Min(currentIce, productsManager.getRemainingCapacity("Ice"));
 		productsManager.modifyValue("Ice", transferAmount);
  		currentIce -= transferAmount;
  	}

  	/**
  	 * Sets the text for the for the menu items
  	 */
  	public function setMenuTexts() {
  		view.setTitleText(myName + " (Level: " + (currentUpgradeLevel+1) + ")"); //add 1 because we want levels to go to 1-10
    	view.setStatsText("Ice Per Minute: " + (icePerSecond * 60) + 
    							"\nCurrent Ice: " + currentIce +
    							"\nIce Capacity: " + capacityIce[currentUpgradeLevel]);

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
  	 * Buy an item for the Ice factory
  	 */
	public function buyItem(index: int) {
		if(productsManager.getCurrent("Money") >= getItemCost(index, itemCosts, numberItemsOwned)) {
			productsManager.modifyValue("Money", -1*getItemCost(index, itemCosts, numberItemsOwned));
			icePerSecond += itemProductionIncrease[index];
			numberItemsOwned[index]++;
		}
	}

}