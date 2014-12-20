#pragma strict
/**
 * Model for Sugar Storage tile
 * Defines the capacities of the storage and actions for upgrading
 */
public class SugarStorageModel extends StorageTileModel {
	
	private var capacitySugar: int[] = [100, 300, 500, 1000, 1400, 1800, 2300, 3000, 4500, 5100]; //the local capacity for this tile, increases the global capacity
	private var upgradeCost: int[] = [250, 500, 1000, 1500, 2000, 2700, 3200, 4000, 5000]; //index 0 is the cost of the first upgrade

	public function Start() {
		super.Start();
   		currentUpgradeLevel = 0; //TODO: Going to need to read this from a saved file	

   		productsManager.setCapacity("Sugar", productsManager.getCapacity("Sugar") + capacitySugar[currentUpgradeLevel]);	
    }
   		
  	/**
  	 * Upgrades the tile if player has enough money and meets level requirements
  	 */
  	public function upgradeTile() {
  		if(productsManager.getCurrent("Money") >= upgradeCost[currentUpgradeLevel] && currentUpgradeLevel < MAX_UPGRADE_LEVEL) { //TODO: pull most of this up into parent once finalized
	  		var sugarCapacity = productsManager.getCapacity("Sugar");
	  		productsManager.setCapacity("Sugar", sugarCapacity - capacitySugar[currentUpgradeLevel] + capacitySugar[currentUpgradeLevel+1]); //remove the old capacity, add the new capacity to global storage
	   		productsManager.modifyValue("Money", -1*upgradeCost[currentUpgradeLevel]);
	  		currentUpgradeLevel +=1;
		}
  	}

  	/**
  	 * Sets the text for the for the menu items
  	 */
  	function setMenuTexts() {
  		view.setTitleText(myName + " (Level: " + (currentUpgradeLevel+1) + ")"); //add 1 because we want levels to go to 1-10
  		view.setStatsText("Sugar Capacity: " + capacitySugar[currentUpgradeLevel]);

  		if(currentUpgradeLevel >= MAX_UPGRADE_LEVEL) {
  			view.setUpgradeButtonText("Fully Upgraded");
  		} else {
  			view.setUpgradeButtonText("Upgrade - " + upgradeCost[currentUpgradeLevel]);
  		}
  	}
}