#pragma strict

public class BankModel extends TileModel {

 	protected var view: ProductionMenuView;
	protected var productsManager : ProductManager;

	var buildingTitleText: SpriteText; //text above the buliding

	protected var upgradeCost: int[] = [1200,1400,1750,2000,2500,3000,3750,6500,8000];
	protected var upgradeCapacityValue: int[] = [1000 , 2600 , 4600 , 7350 , 10600 , 14700 , 19700 , 26700 , 38700 , 56700]; //the increase of capacity at each upgrade level

	function Awake () {
		super.Awake();
		
		var myYAngle:int = this.gameObject.transform.rotation.eulerAngles.y;

		if( myYAngle == 270) {
			buildingTitleText.gameObject.transform.Rotate(Vector3(0, 90,0), Space.World);
		} 
		else if( myYAngle == 180) {
			Debug.Log("this");
			buildingTitleText.gameObject.transform.Rotate(Vector3(0, -180,0), Space.World);
		}
		
		productsManager = FindObjectsOfType(ProductManager)[0] as ProductManager;
		view = FindObjectsOfType(ProductionMenuView)[0] as ProductionMenuView;		
	}
	
    function Initialize(index: String) {
    	super.Initialize(index);
    }
    
    function Initialize(index: String, upgradeLevel: int) {
    	super.Initialize(index);
    	
    	currentUpgradeLevel = upgradeLevel;
    }

	function upgradeTile() {
		if(currentUpgradeLevel < MAX_UPGRADE_LEVEL && productsManager.getCurrent("Money") >= upgradeCost[currentUpgradeLevel]) {
  			productsManager.modifyValue("Money", -1*upgradeCost[currentUpgradeLevel]); //subtract money
	  		super.upgradeTile(); //update level
	  		gameStateManager.updateUpgradeLevel(buildingIndex, currentUpgradeLevel, 0);//TODO: this
	  		productsManager.addCapacity("Money", upgradeCapacityValue[currentUpgradeLevel]);
	  		setTitleText();
		}
	}
	
	function setTitleText() {
		view.setTitleText(tileName + " (Level: " + (currentUpgradeLevel+1) + ")"); //add 1 because we want levels to go to 1-10
	}
	
	/**
  	 * Sets the text for the for the menu items
  	 */
  	public function setStatsTexts() {
  		var currentCapacity: int = 0;
  		
  		for(var i:int = 0; i <= currentUpgradeLevel; i++) {
  			currentCapacity += upgradeCapacityValue[i];
  		}
    						
    	if(currentUpgradeLevel >= MAX_UPGRADE_LEVEL) {
  			view.setUpgradeButtonText("Fully Upgraded");
  			view.setStatsText("Current Capcity: " + currentCapacity);
  		} else {
  			view.setUpgradeButtonText("Upgrade Capacity - $" + upgradeCost[currentUpgradeLevel]);
  			view.setStatsText("Current Capcity: $" + currentCapacity + 
  								"\nUpgrade to increase capacity by $" + upgradeCapacityValue[currentUpgradeLevel+1]);
  		}		
  	}

}