#pragma strict
/**
 * Model for an empty tile that is owned by the player and can be used to buy a building
 */
public class PurchaseBuildingModel extends TileModel {
 	//Gameobjects used to replace the current tile with the building tile
  	var lemonadeStand : GameObject;
  	var miniMart : GameObject;
  	var fastFood: GameObject;
  	var postOffice: GameObject;
  	var fancyRestaurant: GameObject;
  	var hospital: GameObject;
  	var highTechCompany: GameObject;
  	var powerPlant: GameObject;
  	
  	var bank: GameObject;

	private var baseCost = [100, 200, 350, 600, 750, 900, 1500, 3000, 1000]; // Base price of buildings: [1-8], bank

  	@HideInInspector
  	var view: PurchaseBuildingView;
  	@HideInInspector
	var productsManager : ProductManager;

	function Start() {
		super.Start();
		productsManager = FindObjectsOfType(ProductManager)[0] as ProductManager;
		view = FindObjectsOfType(PurchaseBuildingView)[0] as PurchaseBuildingView;
		//TODO: set owned variable by reading from a file
	}

	/**
	 * Creates array and sends appropriate costs to set text in the menu
	 */
  	public function setMenuTexts() {
  		var currentCosts = new int[baseCost.length-1	];
  		
		currentCosts[0] = purchaseCost(baseCost[0], productsManager.getNumberBuildingsOwned("LemonadeStand"));
		currentCosts[1] = purchaseCost(baseCost[1], productsManager.getNumberBuildingsOwned("MiniMart"));
		currentCosts[2] = purchaseCost(baseCost[2], productsManager.getNumberBuildingsOwned("FastFood"));
		currentCosts[3] = purchaseCost(baseCost[3], productsManager.getNumberBuildingsOwned("PostOffice"));
		currentCosts[4] = purchaseCost(baseCost[4], productsManager.getNumberBuildingsOwned("FancyRestaurant"));
		currentCosts[5] = purchaseCost(baseCost[5], productsManager.getNumberBuildingsOwned("Hospital"));
		currentCosts[6] = purchaseCost(baseCost[6], productsManager.getNumberBuildingsOwned("HighTechCompany"));
		currentCosts[7] = purchaseCost(baseCost[7], productsManager.getNumberBuildingsOwned("PowerPlant"));
		
  		view.setButtonText(currentCosts);
  	}

  	/**
  	 * Purchase a lemonade stand if user has enough money
  	 * Replace the current gameobject with the lemonade stand tile
  	 */
  	public function buyLemonadeStand() {
  		buyAndReplaceBuilding(lemonadeStand, purchaseCost(baseCost[0], productsManager.getNumberBuildingsOwned("LemonadeStand")));
  	}

  	/**
  	 * Purchase a minimart if user has enough money
  	 * Replace the current gameobject with the tile
  	 */
  	public function buyMiniMart() {
  		buyAndReplaceBuilding(miniMart, purchaseCost(baseCost[1], productsManager.getNumberBuildingsOwned("MiniMart")));
  	}

  	/**
  	 * Purchase a fast food building if user has enough money
  	 * Replace the current gameobject with the tile
  	 */
  	public function buyFastFood() {
  		buyAndReplaceBuilding(fastFood, purchaseCost(baseCost[2], productsManager.getNumberBuildingsOwned("FastFood")));
  	}

  	/**
  	 * Purchase a post office if user has enough money
  	 * Replace the current gameobject with the tile
  	 */
  	public function buyPostOffice() {
  		buyAndReplaceBuilding(postOffice, purchaseCost(baseCost[3], productsManager.getNumberBuildingsOwned("PostOffice")));
  	}

  	/**
  	 * Purchase a fancy restaurant if user has enough money
  	 * Replace the current gameobject with the tile
  	 */
  	public function buyFancyRestaurant() {
  		buyAndReplaceBuilding(fancyRestaurant, purchaseCost(baseCost[4], productsManager.getNumberBuildingsOwned("FancyRestaurant")));
  	}

  	/**
  	 * Purchase a hospital if user has enough money
  	 * Replace the current gameobject with the tile
  	 */
  	public function buyHospital() {
  		buyAndReplaceBuilding(hospital, purchaseCost(baseCost[5], productsManager.getNumberBuildingsOwned("Hospital")));
  	}

  	/**
  	 * Purchase a high tech company if user has enough money
  	 * Replace the current gameobject with the tile
  	 */
  	public function buyHighTechCompany() {
  		buyAndReplaceBuilding(highTechCompany, purchaseCost(baseCost[6], productsManager.getNumberBuildingsOwned("HighTechCompany")));
  	}

  	/**
  	 * Purchase a power plant if user has enough money
  	 * Replace the current gameobject with the tile
  	 */
  	public function buyPowerPlant() {
  		buyAndReplaceBuilding(powerPlant, purchaseCost(baseCost[7], productsManager.getNumberBuildingsOwned("PowerPlant")));
  	}
  	
  	/**
  	 * Purchase a bank if user has enough money
  	 * Replace the current gameobject with the tile
  	 */
  	public function buyBank() {
  		buyAndReplaceBuilding(bank, purchaseCost(baseCost[8], productsManager.getNumberBuildingsOwned("Bank")));
  	}

  	/**
  	 * Purchase the building if user has enough money
  	 * Replace the current gameobject with the new building
  	 * @param newBuilding The building to be constructed
  	 * @param the cost of the new building
  	 */
  	public function buyAndReplaceBuilding(newBuilding: GameObject, cost: int) {
  		if(productsManager.getCurrent("Money") >= cost) {
			Instantiate(newBuilding, this.transform.position, this.transform.rotation);
			productsManager.modifyValue("Money", -1*cost);
  			Destroy(this.gameObject);
		}
  	}
  	
  	public function purchaseCost(baseCost: int, numberOwned: int) {
  		return baseCost + Mathf.Pow(1.1, numberOwned);
  	}

}
