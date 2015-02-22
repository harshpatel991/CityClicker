#pragma strict
/**
 * Model for an empty tile that is owned by the player and can be used to buy a building
 */
public class PurchaseBuildingModel extends TileModel {

	private var baseCost = [149, 299, 999, 2499, 5999, 14999, 24999, 74999, 999]; // Base price of buildings: [1-8], bank

  	@HideInInspector
  	var view: PurchaseBuildingView;
  	@HideInInspector
	var productsManager : ProductManager;
	
	function Awake() {
		super.Awake();
		productsManager = FindObjectsOfType(ProductManager)[0] as ProductManager;
		view = FindObjectsOfType(PurchaseBuildingView)[0] as PurchaseBuildingView;
	}
	
    function setQuickMenuText() {  
    	quickMenuView.setInfoButtonText("Buy Building");
    	quickMenuView.setTitleText(tileName);
    }

	/**
	 * Creates array and sends appropriate costs to set text in the menu
	 */
  	public function setMenuTexts() {
  		var currentCosts = new int[baseCost.length];
  		
		currentCosts[0] = purchaseCost(baseCost[0], productsManager.getNumberBuildingsOwned("LemonadeStand"));
		currentCosts[1] = purchaseCost(baseCost[1], productsManager.getNumberBuildingsOwned("MiniMart"));
		currentCosts[2] = purchaseCost(baseCost[2], productsManager.getNumberBuildingsOwned("FastFood"));
		currentCosts[3] = purchaseCost(baseCost[3], productsManager.getNumberBuildingsOwned("PostOffice"));
		currentCosts[4] = purchaseCost(baseCost[4], productsManager.getNumberBuildingsOwned("FancyRestaurant"));
		currentCosts[5] = purchaseCost(baseCost[5], productsManager.getNumberBuildingsOwned("Hospital"));
		currentCosts[6] = purchaseCost(baseCost[6], productsManager.getNumberBuildingsOwned("HighTechCompany"));
		currentCosts[7] = purchaseCost(baseCost[7], productsManager.getNumberBuildingsOwned("PowerPlant"));
		currentCosts[8] = purchaseCost(baseCost[8], productsManager.getNumberBuildingsOwned("Bank"));
		
  		view.setButtonText(currentCosts);
  	}

  	/**
  	 * Purchase a lemonade stand if user has enough money
  	 * Replace the current gameobject with the lemonade stand tile
  	 */
  	public function buyLemonadeStand() {
  		var cost = purchaseCost(baseCost[0], productsManager.getNumberBuildingsOwned("LemonadeStand"));
  		
  		if(productsManager.buyOrDisplayError("Money", cost)) {
  			gameStateManager.createNewBuilding(buildingIndex, "LemonadeStand", this.transform.position, this.transform.rotation);
  			view.hideMenu();
  			Destroy(this.gameObject);
		}
  	}
  	
  	/**
  	 * Purchase a minimart if user has enough money
  	 * Replace the current gameobject with the tile
  	 */
  	public function buyMiniMart() {
  		var cost = purchaseCost(baseCost[1], productsManager.getNumberBuildingsOwned("MiniMart"));
  		
  		if(productsManager.buyOrDisplayError("Money", cost)) {
  			gameStateManager.createNewBuilding(buildingIndex, "MiniMart", this.transform.position, this.transform.rotation);
  			view.hideMenu();
  			Destroy(this.gameObject);
		}
  	}

  	/**
  	 * Purchase a fast food building if user has enough money
  	 * Replace the current gameobject with the tile
  	 */
  	public function buyFastFood() {
  		var cost = purchaseCost(baseCost[2], productsManager.getNumberBuildingsOwned("FastFood"));
  		
  		if(productsManager.buyOrDisplayError("Money", cost)) {
  			gameStateManager.createNewBuilding(buildingIndex, "FastFood", this.transform.position, this.transform.rotation);
  			view.hideMenu();
  			Destroy(this.gameObject);
		}
  	}

  	/**
  	 * Purchase a post office if user has enough money
  	 * Replace the current gameobject with the tile
  	 */
  	public function buyPostOffice() {
  		var cost = purchaseCost(baseCost[3], productsManager.getNumberBuildingsOwned("PostOffice"));
  		
  		if(productsManager.buyOrDisplayError("Money", cost)) {
  			gameStateManager.createNewBuilding(buildingIndex, "PostOffice", this.transform.position, this.transform.rotation);
  			view.hideMenu();
  			Destroy(this.gameObject);
		}
  	}

  	/**
  	 * Purchase a fancy restaurant if user has enough money
  	 * Replace the current gameobject with the tile
  	 */
  	public function buyFancyRestaurant() {
  		var cost = purchaseCost(baseCost[4], productsManager.getNumberBuildingsOwned("FancyRestaurant"));
  		
  		if(productsManager.buyOrDisplayError("Money", cost)) {
  			gameStateManager.createNewBuilding(buildingIndex, "FancyRestaurant", this.transform.position, this.transform.rotation);
  			view.hideMenu();
  			Destroy(this.gameObject);
		}
  	}

  	/**
  	 * Purchase a hospital if user has enough money
  	 * Replace the current gameobject with the tile
  	 */
  	public function buyHospital() {
  		var cost = purchaseCost(baseCost[5], productsManager.getNumberBuildingsOwned("Hospital"));
  		
  		if(productsManager.buyOrDisplayError("Money", cost)) {
  			gameStateManager.createNewBuilding(buildingIndex, "Hospital", this.transform.position, this.transform.rotation);
  			view.hideMenu();
  			Destroy(this.gameObject);
		}
  	}

  	/**
  	 * Purchase a high tech company if user has enough money
  	 * Replace the current gameobject with the tile
  	 */
  	public function buyHighTechCompany() {
  		var cost = purchaseCost(baseCost[6], productsManager.getNumberBuildingsOwned("HighTechCompany"));
  		
  		if(productsManager.buyOrDisplayError("Money", cost)) {
  			gameStateManager.createNewBuilding(buildingIndex, "HighTechCompany", this.transform.position, this.transform.rotation);
  			view.hideMenu();
  			Destroy(this.gameObject);
		}
  	}

  	/**
  	 * Purchase a power plant if user has enough money
  	 * Replace the current gameobject with the tile
  	 */
  	public function buyPowerPlant() {
  		var cost = purchaseCost(baseCost[7], productsManager.getNumberBuildingsOwned("PowerPlant"));
  		
  		if(productsManager.buyOrDisplayError("Money", cost)) {
  			gameStateManager.createNewBuilding(buildingIndex, "PowerPlant", this.transform.position, this.transform.rotation);
  			view.hideMenu();
  			Destroy(this.gameObject);
		}
  	}
  	
  	/**
  	 * Purchase a bank if user has enough money
  	 * Replace the current gameobject with the tile
  	 */
  	public function buyBank() {
  		var cost = purchaseCost(baseCost[8], productsManager.getNumberBuildingsOwned("Bank"));

  		if(productsManager.buyOrDisplayError("Money", cost)) {
	  		productsManager.addCapacity("Money", 100);
  			gameStateManager.createNewBuilding(buildingIndex, "Bank", this.transform.position, this.transform.rotation);
  			view.hideMenu();
  			Destroy(this.gameObject);
		}
  	}

  	public function purchaseCost(baseCost: int, numberOwned: int) {
  		return baseCost + Mathf.Pow(1.1, numberOwned);
  	}

}
