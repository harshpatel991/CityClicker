#pragma strict
/**
 * Model for Juice Storage tile
 * Defines the capacities of the storage and actions for upgrading
 */
public class JuiceStorageModel extends StorageTileModel {
	
	private var capacityJuice: int[] = [100, 300, 500, 1000, 1400, 1800, 2300, 3000, 4500, 5100]; //the local capacity for this tile, increases the global capacity
	private var upgradeCost: int[] = [250, 500, 1000, 1500, 2000, 2700, 3200, 4000, 5000]; //index 0 is the cost of the first upgrade

	public function Awake() {
		super.Awake();
   		currentUpgradeLevel = 0; //TODO: Going to need to read this from a saved file

   		productsManager.setCapacity("Juice", productsManager.getCapacity("Juice") + capacityJuice[currentUpgradeLevel]);		
    }
   		
  	/**
  	 * Upgrades the tile if player has enough money and meets level requirements
  	 */
  	public function upgradeTile() {
  		if(productsManager.getCurrent("Money") >= upgradeCost[currentUpgradeLevel] && currentUpgradeLevel < MAX_UPGRADE_LEVEL) { //TODO: pull most of this up into parent once finalized
	  		var juiceCapacity = productsManager.getCapacity("Juice");
	  		productsManager.setCapacity("Juice", juiceCapacity - capacityJuice[currentUpgradeLevel] + capacityJuice[currentUpgradeLevel+1]); //remove the old capacity, add the new capacity to global storage
	  		productsManager.modifyValue("Money", -1*upgradeCost[currentUpgradeLevel]);
	  		currentUpgradeLevel +=1;
		}
  	}

  	/**
  	 * Sets the text for the for the menu items
  	 */
  	function setMenuTexts() {
  		view.setTitleText(tileName + " (Level: " + (currentUpgradeLevel+1) + ")"); //add 1 because we want levels to go to 1-10
  		view.setStatsText("Juice Capacity: " + capacityJuice[currentUpgradeLevel]);

  		if(currentUpgradeLevel >= MAX_UPGRADE_LEVEL) {
  			view.setUpgradeButtonText("Fully Upgraded");
  		} else {
  			view.setUpgradeButtonText("Upgrade - " + upgradeCost[currentUpgradeLevel]);
  		}
  	}
}