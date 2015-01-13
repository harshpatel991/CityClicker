#pragma strict

/**
 * Manages all the global resources used in the game including cups sold, money, juice, sugar, and ice.
 * Resrouces created in each of the factories are not transfered to the product manager until user decides to transfer resource
 * Keeps track of each resources capacity and current value.
 * Updates the LemonadeBusinessHUDView if a resource's current value is changed.
 */
public class ProductManager extends MonoBehaviour {
 	private var hudView : HUDView;
 	private var purchaseBusinessItemsView: PurchaseBusinessItemView;
 	private var passiveAISpawner: PassiveAISpawner;

	private var capacity: Hashtable;
	private var current: Hashtable;
	
	private var bonusCount: int[] = [0, 0, 0];
	private var bonusAmount: float[] = [0.05, 0.1, 0.2];
	private var bonusCost: int[] = [100, 200, 500];
	private var bonusSpawnRateDecrease: float[] = [.05, .1, .2];
	private var bonusEndTime: long[] = [0l, 0l, 0l];
	
	private var BONUS_SECONDS_LENGTH = 20;
	
	private var buildingsOwned: Hashtable;
	
	private var STARTING_MONEY_CAPACITY = 280000.0;
	private var STARTING_MONEY = 200000.0; 
	
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
		
	}
	
	function Start() {
		hudView = gameObject.GetComponent("HUDView") as HUDView; 
		hudView.updateTextMoney(getCurrent("Money"), getCapacity("Money"));
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
	function modifyValue(product: String, value: int) {
		var currentValue: double = getCurrent(product);
		
		if(value > 0) { //if the value is being added, add a bonus, rounding down
			current[product] = Mathf.Floor(currentValue + value + (getBonus() * value));
		} else { //otherwise subtract
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
	function setCapacity(product: String, value: int) {
		capacity[product] = value;
	}

	/**
	 * Retrieves the remaining capaicity in the globally shared resrouce
 	 * @param product Name of the product to retrieve
	 */
	function getRemainingCapacity(product: String) {
		return getCapacity(product) - getCurrent(product);
	}
	
	function setBonusMenuTexts() {
		var buttonTexts: String[] = new String[3]; 
		
		for (var i: int = 0; i< buttonTexts.Length; i++) {
			if(bonusCount[i] > 0) {
				buttonTexts[i] = "Ends: " + System.DateTime.FromBinary(bonusEndTime[i]).ToString();
			} else {
	  			buttonTexts[i] = "Buy - " + bonusCost[i];
  			}
  		}
  		
		purchaseBusinessItemsView.setButtonText(buttonTexts);
		hudView.updateTextBonus(getBonus());
		passiveAISpawner.setSpawnRate(bonusCount);
	}

  	/**
  	 * Purchase the business item if user has enough money
  	 */
  	public function buyBusinessItem(index: int) {
  		var cost: int = bonusCost[index];
  	
  		if(getCurrent("Money") >= cost && bonusCount[index] == 0) {
			modifyValue("Money", -1*cost);
			
	  		var currentTime: System.DateTime = System.DateTime.Now;
			var bonusEndDate: System.DateTime = currentTime.AddSeconds(BONUS_SECONDS_LENGTH);
			
	  		addBonus(index, bonusEndDate);
	  		//passiveAISpawner.decreaseSpawnTime(spawnTimeDecrease); //TODO: solve this
	  		
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