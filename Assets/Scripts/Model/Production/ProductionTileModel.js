#pragma strict

/**
 * Base class for Lemonade Stand tile, ...
 */
public class ProductionTileModel extends TileModel {

 	@HideInInspector
 	var view: ProductionMenuView;
 	@HideInInspector
	var productsManager : ProductManager;
	
	var progressBar: BuildingProgressView;
	var floatingTextPrefab: GameObject;
	var particlesCoinPrefab: GameObject;
		
    protected var currentMoney: float;
	
	protected var upgradeCost: int[] = [];
	protected var upgradeCapacityValue: int[] = []; //the value of capacity at each upgrade level
	
	//These values are supplied by the subclasses
	protected var itemNames = [];
	protected var itemProductionIncrease: float[] = []; //increase in money per second
 	protected var itemBaseCosts: int[] = [];
 	protected var itemsOwnedCount: int[] = [0,0,0];
	protected var itemPurchaseMethods = [];
 									
 	protected var employeeNames = [];
 	protected var employeeRateIncrease: float[] = []; //how often the employee 'clicks' the button
 	protected var employeeBaseCosts: int[] = [];
 	protected var employeesOwnedCount: int[] = [0,0,0];
 	protected var employeePurchaseMethods = [];
	
	function Awake() {
		super.Awake();
		
		//Rotate the direction of the progress bar
		var myYAngle:int = this.gameObject.transform.rotation.eulerAngles.y;

		if( myYAngle == 270) {
			progressBar.gameObject.transform.Rotate(Vector3(0, 90,0), Space.World);
		} 
		else if( myYAngle == 180) {
			Debug.Log("this");
			progressBar.gameObject.transform.Rotate(Vector3(0, -180,0), Space.World);
		} 
		
		
		productsManager = FindObjectsOfType(ProductManager)[0] as ProductManager;
		view = FindObjectsOfType(ProductionMenuView)[0] as ProductionMenuView;		
		progressBar.setTextTitle(tileName);
		updateProgressBar();
    }
    
    function Initialize(index: String) {
    	super.Initialize(index);
    }
    
    function Initialize(index: String, money: float, upgradeLevel: int, newItemsOwnedCount: int[], newEmployeesOwnedCount: int[], timeDifference: long) {
    	super.Initialize(index);
    	
    	currentUpgradeLevel = upgradeLevel;
    	itemsOwnedCount = newItemsOwnedCount;
    	employeesOwnedCount = newEmployeesOwnedCount;
    	
    		
		var timeToClick: float = TileModel.Dot(employeeRateIncrease, employeesOwnedCount);
		var increaseAmm: float = incrementPerClick() * timeDifference * timeToClick;
		currentMoney = money + increaseAmm;
	
       	Mathf.Clamp(currentMoney, 0, upgradeCapacityValue[currentUpgradeLevel]);
    	
    }
    
    function getCurrentMoney() {
    	return currentMoney;
    }
	
	/**
  	 * Upgrades the level if player has enough money and meets level requirements
  	 */
  	function upgradeTile() {
  		if(currentUpgradeLevel < MAX_UPGRADE_LEVEL && productsManager.getCurrent("Money") >= upgradeCost[currentUpgradeLevel]) {
  			productsManager.modifyValue("Money", -1*upgradeCost[currentUpgradeLevel]); 
	  		super.upgradeTile();
	  		gameStateManager.updateUpgradeLevel(buildingIndex, currentUpgradeLevel, currentMoney);
	  		updateProgressBar();
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
		view.setStatsText("  $" + TileModel.Dot(itemProductionIncrease, itemsOwnedCount) + " per click\n" + 
    						" * " + TileModel.Dot(employeeRateIncrease, employeesOwnedCount) + " per second" +
    						"\n= $" + (TileModel.Dot(itemProductionIncrease, itemsOwnedCount) * TileModel.Dot(employeeRateIncrease, employeesOwnedCount)) + " per second" +
    						"\n\nMoney: " + Mathf.Floor(currentMoney) + "/" +upgradeCapacityValue[currentUpgradeLevel]);
    						
    	if(currentUpgradeLevel >= MAX_UPGRADE_LEVEL) {
  			view.setUpgradeButtonText("Fully Upgraded");
  		} else {
  			view.setUpgradeButtonText("Upgrade Capacity - $" + upgradeCost[currentUpgradeLevel]);
  		}		
  	}
	
	/**
  	 * Adds items to the list of items that can be purchased for this tile
  	 */
  	public function setListItems(productionTileController: ProductionTileController) { 
		var itemsCost: double[] = new double[3];
		
		for(var listItemIndex: int = 0; listItemIndex < itemNames.Length; listItemIndex++) {
			itemsCost[listItemIndex] = getItemCost(listItemIndex);
		}
		view.setListItems(itemNames, itemProductionIncrease, itemsOwnedCount, itemPurchaseMethods, productionTileController, itemsCost);	
  	}
	
	/**
  	 * Adds employees to the list of employees that can be purchased for this tile
  	 */
	public function setListEmployees(productionTileController: ProductionTileController) {
		var employeeCosts: double[] = new double[3];
		
		for(var listEmployeeIndex: int = 0; listEmployeeIndex < itemNames.Length; listEmployeeIndex++) {
			employeeCosts[listEmployeeIndex] = getEmployeeCost(listEmployeeIndex);
		}
		view.setListEmployees(employeeNames, employeeRateIncrease, employeesOwnedCount, employeePurchaseMethods, productionTileController, employeeCosts);	
	}
  	  	
  	function Update() {
  		incrementProduct();		
  		updateProgressBar();
  	}
  	
  	function incrementPerClick() {
  		return TileModel.Dot(itemProductionIncrease, itemsOwnedCount);
  	}

	/**
  	 * Creates the resource if capacity exists
  	 */
	function incrementProduct() {
		var timeToClick: float = TileModel.Dot(employeeRateIncrease, employeesOwnedCount);
  		var increaseAmm: float = incrementPerClick() * Time.deltaTime * timeToClick;
  		currentMoney = Mathf.Clamp(currentMoney+increaseAmm, 0, upgradeCapacityValue[currentUpgradeLevel]);
	}
	
	function manualIncrement() {
		var incrementAmm:int = incrementPerClick();
	
		var floatingText: GameObject = PoolManager.Pools["AIPool"].Spawn(floatingTextPrefab.transform).gameObject;
		floatingText.transform.position = Vector3(this.gameObject.transform.position.x-.2, this.gameObject.transform.position.y+12, this.gameObject.transform.position.z+.2);
		
		var floatingTextView: FloatingTextView = floatingText.GetComponent(FloatingTextView) as FloatingTextView;
		floatingTextView.setValue(incrementAmm);
		
		currentMoney = Mathf.Clamp(currentMoney+incrementAmm, 0, upgradeCapacityValue[currentUpgradeLevel]);
	}

	/**
  	 * Transfers the accumulated product to global prodcut manager
  	 * Only transfers greatest integer amount
  	 */
	function transferProduct() {
		var transferAmount : int = Mathf.Min(currentMoney, productsManager.getRemainingCapacity("Money")); //calculate most amount that can be trasferred
 		productsManager.modifyValue("Money", transferAmount); //add to global
 		currentMoney -= transferAmount; //remove from local
 		gameStateManager.updateCurrentMoney(buildingIndex, currentMoney);
 		
 		if(transferAmount > 0) {
 			var particlesCoin: GameObject = PoolManager.Pools["AIPool"].Spawn(particlesCoinPrefab.transform).gameObject;
			particlesCoin.transform.position = Vector3(this.gameObject.transform.position.x, this.gameObject.transform.position.y+10, this.gameObject.transform.position.z);
 		}
	}

	/**
	 * Determines the cost of the item as determined by the type of item 
	 */
	public function getItemCost(itemIndex: int) {
		return Mathf.Ceil(itemBaseCosts[itemIndex] * Mathf.Pow(1.3, itemsOwnedCount[itemIndex]));
	}
	
	public function getEmployeeCost(employeeIndex: int) {
		return Mathf.Ceil(employeeBaseCosts[employeeIndex] * Mathf.Pow(1.3, employeesOwnedCount[employeeIndex]));
	}
	
  	/**
  	 * Buy an item
  	 */
	public function buyItem(index: int) {
		if(productsManager.getCurrent("Money") >= getItemCost(index)) {
			productsManager.modifyValue("Money", -1*getItemCost(index));
			itemsOwnedCount[index]++;
			
			gameStateManager.updateBuildingItemsOwnedCount(buildingIndex, itemsOwnedCount, currentMoney);
  			//gameStateManager.saveGame();
		}
	}

  	/**
  	 * Buy an employee
  	 */
	public function buyEmployee(index: int) {
		if(productsManager.getCurrent("Money") >= getEmployeeCost(index)) {
			productsManager.modifyValue("Money", -1*getEmployeeCost(index));
			employeesOwnedCount[index]++;
			
			gameStateManager.updateEmployeesOwnedCount(buildingIndex, employeesOwnedCount, currentMoney);
  			//gameStateManager.saveGame();
		}
	}
	
	public function updateProgressBar() {
		progressBar.setProgressBar(currentMoney, upgradeCapacityValue[currentUpgradeLevel]);
	}
}