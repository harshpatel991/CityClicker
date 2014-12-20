#pragma strict

/**
 * Model for the Lemonade Stand
 * Defines the capacities of the factory and action of creating the resource
 */
public class LemonadeStandModel extends ProductionTileModel {

 	private var itemNames = ["Teenage Employee", "Normal Employee", "Pro Employee", "Cash Register", "Drink Dispenser", "Drink Mixer", "Atmosphere"];
 	private var itemProductionIncrease = [10, 100, 1000, 10, 150, 200, 1500]; //increase in cups per second
 	private var itemCosts = [100, 500, 10000, 500, 750, 1500, 20000];
 	private var methodsToCall = ["pressBuyTeenageEmployee", "pressBuyNormalEmployee", "pressBuyProEmployee", "pressBuyCashRegister", "pressBuyDrinkDispenser", 
 									"pressBuyDrinkMixer", "pressBuyAtomosphere"];
 	private var numberItemsOwned = [0,0,0,0,0,0,0];
	
	// Amount of ingredients to use in recipe per upgrade level
	private var PROFIT_PER_CUP : int[] = [5, 10, 15, 20, 30, 40, 50, 60, 80, 110]; 
	private var JUICE_PER_CUP: int[] = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5]; 
	private var SUGAR_PER_CUP: int[] = [2, 2, 3, 3, 4, 4, 5, 5, 6, 6];
	private var ICE_PER_CUP: int[] = [3, 3, 4, 4, 5, 5, 6, 6, 7, 7];

	private var upgradeCost: int[] = [250, 500, 1000, 1500, 2000, 2700, 3200, 4000, 5000]; //index 0 is the cost of the first upgrade
	private var cupsPerSecond : int = 1; //the amount of cups to sell per second, increases as you buy employees
			        
    public function Start() {
		super.Start();
    	InvokeRepeating("incrementProduct", 0, 1); // employees selling lemonade every second
		currentUpgradeLevel = 0; //TODO: Going to need to read this from a saved file
		//TODO: Read numberOwned from a saved file	
    }

	/**
  	 * Upgrades the tile if player has enough money and meets level requirements
  	 */
  	function upgradeTile() {
  		if(productsManager.getCurrent("Money") >= upgradeCost[currentUpgradeLevel] && currentUpgradeLevel < MAX_UPGRADE_LEVEL) { //TODO: pull most of this up into parent once finalized
  			productsManager.modifyValue("Money", -1*upgradeCost[currentUpgradeLevel]); 
	  		currentUpgradeLevel +=1;
		}
	}

	/**
  	 * Creates the resrouce if capacity exists
  	 */
  	public function incrementProduct() {
  		var cupsPerRevenue: int = productsManager.getRemainingCapacity("Money") / PROFIT_PER_CUP[currentUpgradeLevel]; //how many cups can be sold w/o going over money capacity
  		var cupsOfJuice: int = productsManager.getCurrent("Juice") / JUICE_PER_CUP[currentUpgradeLevel]; //how many cups can be sold w/o using more than current juice
  		var cupsOfSugar: int = productsManager.getCurrent("Sugar") / SUGAR_PER_CUP[currentUpgradeLevel]; //how many cups can be sold w/o using more thna current sugar
  		var cupsOfIce: int = productsManager.getCurrent("Ice") / ICE_PER_CUP[currentUpgradeLevel];
  		var produceableCups = Mathf.Min(cupsPerRevenue, Mathf.Min(cupsOfJuice, Mathf.Min(cupsOfSugar, cupsOfIce)));
		var cupsToSell = Mathf.Min(cupsPerSecond, produceableCups);
				
		makeLemonade(cupsToSell, PROFIT_PER_CUP[currentUpgradeLevel], JUICE_PER_CUP[currentUpgradeLevel], SUGAR_PER_CUP[currentUpgradeLevel], ICE_PER_CUP[currentUpgradeLevel]);
  	}

  	/**
  	 * Subtracts specified amount of resrouces, adds money, adds cups sold
  	 */
  	function makeLemonade(cups: int, costPerCup: int, juicePerCup: int, sugarPerCup: int, icePerCup: int) { //TODO: combine this into one fn call
  		productsManager.modifyValue("CupsSold", cups); 
		productsManager.modifyValue("Money", cups * costPerCup);
		productsManager.modifyValue("Juice", -1*cups * juicePerCup);
		productsManager.modifyValue("Sugar", -1*cups * sugarPerCup);
		productsManager.modifyValue("Ice", -1*cups * icePerCup);
	}

  	/**
  	 * Sets the text for the for the menu items
  	 */
  	public function setMenuTexts() {
  		view.setTitleText(myName + " (Level: " + (currentUpgradeLevel+1) + ")"); //add 1 because we want levels to go to 1-10
		view.setStatsText("Cups Per Minute: " + (cupsPerSecond * 60) + 
    						"\nProfit Per Cup: " + PROFIT_PER_CUP[currentUpgradeLevel]);

    	if(currentUpgradeLevel >= MAX_UPGRADE_LEVEL) {
  			view.setUpgradeButtonText("Fully Upgraded");
  		} else {
  			view.setUpgradeButtonText("Upgrade - " + upgradeCost[currentUpgradeLevel]);
  		
  		}
  	}

	/**
  	 * Adds items to the list of items that can be purchased for this tile
  	 */
  	public function setListItems(productionTileController: ProductionTileController) { //TODO: should be able to pull up into parent when finished, TODO: Pool the list items, no need to instantiate and destroy all the time
  		view.productionItemsList.ClearList(true); //destroy all current list items



  		addListItems(productionTileController, itemNames, itemProductionIncrease, itemCosts, methodsToCall, numberItemsOwned);
  	}

  	/**
  	 * Buy an item for the Lemonade stand
  	 */
	public function buyItem(index: int) {
		if(productsManager.getCurrent("Money") >= getItemCost(index, itemCosts, numberItemsOwned)) {
			productsManager.modifyValue("Money", -1*getItemCost(index, itemCosts, numberItemsOwned));
			cupsPerSecond += itemProductionIncrease[index];
			numberItemsOwned[index]++;
		}
	}


}

