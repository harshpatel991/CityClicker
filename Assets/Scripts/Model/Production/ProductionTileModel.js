#pragma strict

/**
 * Base class for Lemonade Stand tile, ...
 */
public class ProductionTileModel extends TileModel {

 	@HideInInspector
 	var view: ProductionMenuView;
 	@HideInInspector
 	var confirmationView: ConfirmationBoxView;
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
 	
 	protected var managerOwned: boolean = false;
 	protected var managerCost: int = 0;
	
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
		confirmationView = FindObjectsOfType(ConfirmationBoxView)[0] as ConfirmationBoxView;	
		progressBar.setTextTitle(tileName);
		updateProgressBar();
    }
    
    function Initialize(index: String) {
    	super.Initialize(index);
    }
    
    function Initialize(index: String, money: float, upgradeLevel: int, newItemsOwnedCount: int[], newEmployeesOwnedCount: int[], isManagerOwned: boolean, timeDifference: long) {
    	super.Initialize(index);
    	
    	currentUpgradeLevel = upgradeLevel;
    	itemsOwnedCount = newItemsOwnedCount;
    	employeesOwnedCount = newEmployeesOwnedCount;
    	managerOwned = isManagerOwned;
    	
		var timeToClick: float = TileModel.Dot(employeeRateIncrease, employeesOwnedCount);
		var increaseAmm: float = incrementPerClick() * timeDifference * timeToClick;
		increaseAmm = money + increaseAmm;
			
    	increaseMoney(increaseAmm);
    	hideProgressBar();
    }
    
    function getCurrentMoney() {
    	return currentMoney;
    }
	
	/**
  	 * Upgrades the level if player has enough money and meets level requirements
  	 */
  	function upgradeTile() {
  		if(currentUpgradeLevel < MAX_UPGRADE_LEVEL && productsManager.buyOrDisplayError("Money", upgradeCost[currentUpgradeLevel])) {
	  		super.upgradeTile();
	  		gameStateManager.updateUpgradeLevel(buildingIndex, currentUpgradeLevel, currentMoney);
	  		updateProgressBar();
	  		setTitleText();
		}
	}
	
	function buyManager() {
		if(!managerOwned && productsManager.buyOrDisplayError("Money", managerCost)) {
			managerOwned = true;
			gameStateManager.updateManagerOwned(buildingIndex, managerOwned, currentMoney);
			transferProduct();
			hideProgressBar();
		}
	}
	
	function hideProgressBar() {
		if(managerOwned)
			progressBar.hideProgressBar();
	}
	
	function setTitleText() {
		view.setTitleText(tileName + " (Level: " + (currentUpgradeLevel+1) + ")"); //add 1 because we want levels to go to 1-10
	}
	
	/**
  	 * Sets the text for the for the menu items
  	 */
  	public function setStatsTexts() {
		view.setStatsText("Earning " + TileModel.Dot(itemProductionIncrease, itemsOwnedCount) + " # per click.\n" + 
    						"Employees are working " + TileModel.Dot(employeeRateIncrease, employeesOwnedCount) + " clicks per second.\n" +
    						"Generating " + (TileModel.Dot(itemProductionIncrease, itemsOwnedCount) * TileModel.Dot(employeeRateIncrease, employeesOwnedCount)) + " # per second" +
    						"\n\nCurrent value held in this building: " + Mathf.Floor(currentMoney) + "/" + upgradeCapacityValue[currentUpgradeLevel] + " #");
    						
    	if(currentUpgradeLevel >= MAX_UPGRADE_LEVEL) {
  			view.setUpgradeButtonText("Fully Upgraded");
  		} else {
  			view.setUpgradeButtonText("Upgrade Capacity - " + upgradeCost[currentUpgradeLevel] + " #");
  		}
  		
  		if(managerOwned) {
  			view.setManagerButtonText("Manager Owned");
  		} else {
  			view.setManagerButtonText("Manager " + managerCost + " #");
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
  		
  		increaseMoney(increaseAmm);
	}
	
	function manualIncrement() {
		var incrementAmm:int = incrementPerClick();
	
		var floatingText: GameObject = PoolManager.Pools["AIPool"].Spawn(floatingTextPrefab.transform).gameObject;
		floatingText.transform.position = Vector3(this.gameObject.transform.position.x-.2, this.gameObject.transform.position.y+12, this.gameObject.transform.position.z+.2);
		
		var floatingTextView: FloatingTextView = floatingText.GetComponent(FloatingTextView) as FloatingTextView;
		floatingTextView.setValue(incrementAmm);
		
		increaseMoney(incrementAmm);
	}
	
	/**
	 * Add to local money if no manager
	 * Add to global money if manager owned
	 */
	function increaseMoney(incrementAmm: float) {
		if(managerOwned) {
			productsManager.modifyValue("Money", incrementAmm); //add to global
		} else {
			currentMoney = Mathf.Clamp(currentMoney+incrementAmm, 0, upgradeCapacityValue[currentUpgradeLevel]);
		}
	}

	/**
  	 * Transfers the accumulated money to global prodcut manager
  	 */
	function transferProduct() {
		var amountTransfered = productsManager.transferOrDisplayError(currentMoney);
 		currentMoney -= amountTransfered; //remove from local
 		
 		gameStateManager.updateCurrentMoney(buildingIndex, currentMoney);
 		
 		if(amountTransfered > 0) {
 			var particlesCoin: GameObject = PoolManager.Pools["AIPool"].Spawn(particlesCoinPrefab.transform).gameObject;
			particlesCoin.transform.position = Vector3(this.gameObject.transform.position.x, this.gameObject.transform.position.y+10, this.gameObject.transform.position.z);
			particlesCoin.transform.rotation.eulerAngles = Vector3(270, 0, 0);
			
			var particlesCoinParticles: ParticleSystem = particlesCoin.GetComponent(ParticleSystem) as ParticleSystem;
			particlesCoinParticles.maxParticles = ((amountTransfered / upgradeCapacityValue[currentUpgradeLevel]) * 10)+1;
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
  	 
  	private var callOnConfrimationBoxAccept: Function; //function called when cofirmation box is accepted
  	private var paramOnConfirmationBoxAccept; //paramter to function called when confirmation box is accepted
  	
  	//User has pressed buy button, bring up confirmation box
	public function buyItem(index: int) { 
		confirmationView.setButtonObjects(this);
		view.hideMenu();//hide production menu
		confirmationView.showMenu();
		
		
		callOnConfrimationBoxAccept = buyItemConfirmed;	
		paramOnConfirmationBoxAccept = index;
	}
	
  	//User has pressed buy button, bring up confirmation box
	public function buyEmployee(index: int) {
		confirmationView.setButtonObjects(this);
		view.hideMenu();//hide production menu
		
		confirmationView.showMenu();
		
		callOnConfrimationBoxAccept = buyEmployeeConfirmed;	
		paramOnConfirmationBoxAccept = index;
	}
	
	private function buyItemConfirmed(index: int) {
		if(productsManager.buyOrDisplayError("Money", getItemCost(index))) {
			itemsOwnedCount[index]++;
			gameStateManager.updateBuildingItemsOwnedCount(buildingIndex, itemsOwnedCount, currentMoney);
		}
		view.showItems();
	}
	
	private function buyEmployeeConfirmed(index: int) {
		if(productsManager.buyOrDisplayError("Money", getEmployeeCost(index))) {
			employeesOwnedCount[index]++;
			gameStateManager.updateEmployeesOwnedCount(buildingIndex, employeesOwnedCount, currentMoney);
		}
		view.showEmployees();
	}


	
	public function updateProgressBar() {
		progressBar.setProgressBar(currentMoney, upgradeCapacityValue[currentUpgradeLevel]);
	}
	
	//---------Functions defined for the confirmation box view--------- 
	
  	/**
  	 * User input has selected to purchase the item/employee
  	 */
  	public function pressAgree() {
  		pressHideMenu(); //close confirmation menu
  		view.showMenu(); //show our menu
		callOnConfrimationBoxAccept(paramOnConfirmationBoxAccept); //purchase item and show proper production tab
		
		
	}

	/**
  	 * User input has selected to not purchase the lot
  	 */
	public function pressCancel() {
		confirmationView.hideMenu();
		view.showMenu();
	}

	/**
  	 * User input has selected to close the confirmation menu
  	 */
	public function pressHideMenu() {
		confirmationView.hideMenu();
	}
}