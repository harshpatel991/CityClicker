#pragma strict

/**
 * Manages all the global resources used in the game including cups sold, money, juice, sugar, and ice.
 * Resrouces created in each of the factories are not transfered to the product manager until user decides to transfer resource
 * Keeps track of each resources capacity and current value.
 * Updates the LemonadeBusinessHUDView if a resource's current value is changed.
 */
public class ProductManager extends MonoBehaviour {
 	private var hudView : HUDView;
	protected var errorMenuView: ErrorMenuView;

 	private var purchaseBusinessItemsView: PurchaseBusinessItemView;
 	private var passiveAISpawner: PassiveAISpawner;

	private var capacity: Hashtable;
	private var current: Hashtable;
	
	private var bonusCount: int[] = [0, 0, 0];
	private var bonusAmount: float[] = [0.05, 0.1, 0.2];
	private var bonusCost: int[] = [10000, 15000, 25000];
	private var bonusSpawnRateDecrease: float[] = [.05, .1, .2];
	private var bonusEndTime: long[] = [0l, 0l, 0l];
	
	private var BONUS_SECONDS_LENGTH = 86400;
	
	private var buildingsOwned: Hashtable;
	
	private var STARTING_MONEY_CAPACITY = 15000.0;
	private var STARTING_MONEY = 15000.0; 
	
	private var gameStateManager: GameStateManager;
	
  	private var businessItemsOwned = [0,0,0]; //how many of each is currently owned 

	
	/**
	 * Called before the start of any other script's Start()
	 * Initializes capacity and current hashtables
	 */
	function Awake() {

		capacity = new Hashtable();
		current = new Hashtable();
		buildingsOwned = new Hashtable();

		capacity.Add("Money", STARTING_MONEY_CAPACITY);
		current.Add("Money", STARTING_MONEY);
		
		buildingsOwned.Add("LemonadeStand", 0);
		buildingsOwned.Add("MiniMart", 0);
		buildingsOwned.Add("FastFood", 0);
		buildingsOwned.Add("PostOffice", 0);
		buildingsOwned.Add("FancyRestaurant", 0);
		buildingsOwned.Add("Hospital", 0);
		buildingsOwned.Add("HighTechCompany", 0);
		buildingsOwned.Add("PowerPlant", 0);
		buildingsOwned.Add("Bank", 0);
		
	}
	
	function Start() {
		hudView = gameObject.GetComponent("HUDView") as HUDView; 
		hudView.updateTextMoney(getCurrent("Money"), getCapacity("Money"));
		errorMenuView = FindObjectsOfType(ErrorMenuView)[0] as ErrorMenuView;
		purchaseBusinessItemsView = FindObjectsOfType(PurchaseBusinessItemView)[0] as PurchaseBusinessItemView;
		gameStateManager = FindObjectsOfType(GameStateManager)[0] as GameStateManager;
		passiveAISpawner = FindObjectsOfType(PassiveAISpawner)[0] as PassiveAISpawner;
		
		setBonusMenuTexts();
	}

	/**
	 * Retrieves the current globally shared amount of product
	 * @param product Name of the product to retrieve
	 */ 
	function getCurrent(product: String) {
		return parseFloat(current[product].ToString());
	}
	
	function getNumberBuildingsOwned(buildingName: String) {
		return parseInt(buildingsOwned[buildingName].ToString());
	}
	
	function modifyNumberBuildingsOwned(buildingName: String, changeAmount: int) { //TODO: should be able to remove this
		var currentBuildingCount: int = getNumberBuildingsOwned(buildingName);
		buildingsOwned[buildingName] = currentBuildingCount + changeAmount;
	}
		
	/**
	 * Modifies the resource by the value specified and updates the HUD
	 * @param product "Money" or "Diamonds" or "Experience"
	 * @param value Amount to increase the product
	 */
	function modifyValue(product: String, value: float) {
		Debug.Log("Someone is adding " + value + " to global money");
		var currentValue: float = getCurrent(product);
		
		if(value > 0) { //if the value is being added, add a bonus
			current[product] = Mathf.Clamp(currentValue + value + (getBonus() * value), 0.0, capacity[product]);
		} else { //otherwise subtract, don't involve the bonus here
			current[product] = currentValue + value;
		}
		
		//update the hud text
		if(hudView != null) {
			if(product == "Money") {
				hudView.updateTextMoney(getCurrent(product), capacity["Money"]);
				gameStateManager.updateGlobalCurrentMoney(current[product]);
			} else {
				Debug.LogWarning("Modify value called with an invalid key: " + product);
			}

//			if(bonus[product] != 0) {
//				//TODO: tell view to play an animation that tells player a bounus was added
//			}
		}
	}

	/**
	 * Retrieves the global capacity of the shared product
	 * @param product Name of the product to retrieve
	 */
	function getCapacity(product: String) {
		return parseInt(capacity[product].ToString());
	}
	
	/**
	 * Sets the current value of a product
	 * @param product Name of the resouce capacity to change 
	 */
	function setCurrent(product: String, value: int) {
		current[product] = value;
		if(product == "Money") {
			hudView.updateTextMoney(getCurrent(product), capacity["Money"]);
		}
		
	}
	
	/**
	 * Sets the capacity value of a product
	 * @param product Name of the resouce capacity to change 
	 */
	function addCapacity(product: String, value: int) {
		capacity[product] = parseFloat(capacity[product].ToString()) + value;
		
		if(product == "Money") {
			gameStateManager.updateGlobalCapacityMoney(capacity[product]);
			hudView.updateTextMoney(getCurrent(product), capacity["Money"]);
		}
	}

	/**
	 * Sets the capacity value of a product
	 * @param product Name of the resouce capacity to change 
	 */
	function setCapacity(product: String, value: int) {
		capacity[product] = value;
		
		if(product == "Money") {
			gameStateManager.updateGlobalCapacityMoney(capacity[product]);
			hudView.updateTextMoney(getCurrent(product), capacity["Money"]);
		}
	}

	/**
	 * Retrieves the remaining capaicity in the globally shared resrouce
 	 * @param product Name of the product to retrieve
	 */
	function getRemainingCapacity(product: String) {
		return getCapacity(product) - getCurrent(product);
	}
		
	//Purchases the item if there is enough of the product (returns true) other wise, displays error and returns false
	function buyOrDisplayError(product: String, cost: int) {
		if(getCurrent(product) >= cost) {
			modifyValue("Money", -1*cost); 
			return true;
		}
		else {
			errorMenuView.displayErrorText("Bank does not have enough money!");
			return false;
		}
	}
	
	function transferOrDisplayError(maxTransferAmount: float) {
		var transferAmount : float = Mathf.Min(maxTransferAmount, getRemainingCapacity("Money")); //calculate most amount that can actually be trasferred
		
		if(transferAmount < maxTransferAmount && maxTransferAmount > 0) { //we had money to transfer and we did not, so error
			errorMenuView.displayErrorText("Bank is full! Create or upgrade banks.");
		}
		modifyValue("Money", transferAmount); //add to global
		return transferAmount;
			
	}
	
	function setBonusMenuTexts() { //todo: move this to a purchase business items model class
		var buttonTexts: String[] = new String[3]; 
		
		for (var i: int = 0; i< buttonTexts.Length; i++) {
			if(bonusCount[i] > 0) {
				buttonTexts[i] = "Ends: " + System.DateTime.FromBinary(bonusEndTime[i]).ToString();
			} else {
	  			buttonTexts[i] = bonusCost[i] + " #";
  			}
  		}
  		
		purchaseBusinessItemsView.setButtonText(buttonTexts);
		hudView.updateTextBonus(getBonus());
		passiveAISpawner.setSpawnRate(bonusCount);
	}

  	/**
  	 * Purchase the business item if user has enough money
  	 */
  	public function buyBusinessItem(index: int) { //TODO: move this to its own PurchasBusinessItemsModel
  		var cost: int = bonusCost[index];
  	
  		if(bonusCount[index] == 0 && buyOrDisplayError("Money", cost)) {
			
	  		var currentTime: System.DateTime = System.DateTime.Now;
			var bonusEndDate: System.DateTime = currentTime.AddSeconds(BONUS_SECONDS_LENGTH);
			
	  		addBonus(index, bonusEndDate);
	  		
	  		gameStateManager.updateGlobalBonusMoney(index, bonusEndDate); //tell game manager to save the end time	  		
	  		var savedDate = System.DateTime.FromBinary(System.Convert.ToInt64(bonusEndDate.ToBinary().ToString()));
	  	}
  	}

	/**
	 * Retrieves the current bonus for a particular resource
	 * @param product the name of the resource to retrieve
	 */
	function getBonus() {
		return TileModel.Dot(bonusAmount, bonusCount);
	}

	/**
	 * Adds a bonus for a money resource
	 * @param index the bonus that was purchased
	 */
	function addBonus(index: double, endTime: System.DateTime) {
	
		var currentDate = System.DateTime.Now;
		var remainingTime: double = endTime.Subtract(currentDate).TotalSeconds;
		
		if(remainingTime > 0) { //the bonus has not yet expired
			bonusCount[index]++;
			bonusEndTime[index] = endTime.ToBinary();
			Invoke("removeBonus"+index, remainingTime);
			
			setBonusMenuTexts();
		}
	}
	
	function removeBonus(index: int) {
		bonusCount[index] = 0;
		setBonusMenuTexts();
	}
	
	function removeBonus0() {
		removeBonus(0);
	}
	
	function removeBonus1() {
		removeBonus(1);
	}
	
	function removeBonus2() {
		removeBonus(2);
	}
	
}