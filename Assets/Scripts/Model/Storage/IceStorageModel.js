#pragma strict
/**
 * Model for Ice Storage tile
 * Defines the capacities of the storage and actions for upgrading
 */
public class IceStorageModel extends StorageTileModel {
	
	private var capacityIce: int[] = [100, 300, 500, 1000, 1400, 1800, 2300, 3000, 4500, 5100]; //the local capacity for this tile, increases as upgrade
	private var upgradeCost: int[] = [250, 500, 1000, 1500, 2000, 2700, 3200, 4000, 5000]; //index 0 is the cost of the first upgrade

	public function Awake() {
		super.Awake();
   		currentUpgradeLevel = 0;

   		productsManager.setCapacity("Ice", productsManager.getCapacity("Ice") + capacityIce[currentUpgradeLevel]);	
    }
   		
  	/**
  	 * Upgrades the tile if player has enough money and meets level requirements
  	 */
  	public function upgradeTile() {
  		if(productsManager.getCurrent("Money") >= upgradeCost[currentUpgradeLevel] && currentUpgradeLevel < MAX_UPGRADE_LEVEL) { //TODO: pull most of this up into parent once finalized
	  		var iceCapacity = productsManager.getCapacity("Ice");
	  		productsManager.setCapacity("Ice", iceCapacity - capacityIce[currentUpgradeLevel] + capacityIce[currentUpgradeLevel+1]); //remove the old capacity, add the new capacity to global storage
	  		productsManager.modifyValue("Money", -1*upgradeCost[currentUpgradeLevel]); 
	  		currentUpgradeLevel +=1;
		}
  	}

  	/**
  	 * Sets the text for the for the menu items
  	 */
  	function setMenuTexts() {
  		view.setTitleText(tileName + " (Level: " + (currentUpgradeLevel+1) + ")"); //add 1 because we want levels to display to 1-10
  		view.setStatsText("Ice Capacity: " + capacityIce[currentUpgradeLevel]);

  		if(currentUpgradeLevel >= MAX_UPGRADE_LEVEL) {
  			view.setUpgradeButtonText("Fully Upgraded");
  		} else {
  			view.setUpgradeButtonText("Upgrade - " + upgradeCost[currentUpgradeLevel]);
  		}
  	}
}