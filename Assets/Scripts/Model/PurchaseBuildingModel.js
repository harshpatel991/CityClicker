#pragma strict
/**
 * Model for an empty tile that is owned by the player and can be used to buy a building
 */
public class PurchaseBuildingModel extends TileModel {
 	//Gameobjects used to replace the current tile with the building tile
  	var lemonadeStand : GameObject;
  	var juiceFactory : GameObject;
  	var sugarFactory: GameObject;
  	var iceFactory: GameObject;
  	var juiceStorage: GameObject;
  	var sugarStorage: GameObject;
  	var iceStorage: GameObject;
  	var moneyStorage: GameObject;

  	//Price of buildings goes up the more you own of each
  	private var lemonadeStandCost = [100, 250, 500, 1000, 3000];
  	private var juiceFactoryCost = [101, 251, 501, 1001, 30101];
  	private var sugarFactoryCost = [102, 252, 502, 1002, 3002];
  	private var iceFactoryCost = [103, 253, 503, 1003, 3003];
  	private var juiceStorageCost = [104, 254, 504, 1004, 3004];
  	private var sugarStorageCost = [105, 255, 505, 1005, 3005];
  	private var iceStorageCost = [106, 256, 506, 1006, 3006];
  	private var moneyStorageCost = [107, 257, 507, 1007, 3007];

  	private var owned = [1, 1, 1, 1, 1, 1, 1, 1]; //How many of each is currently owned 

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
	 * Sets appropriate cost text in the menu
	 */
  	public function setMenuTexts() {
  		var currentCosts = new int[8];
  		currentCosts[0] = (lemonadeStandCost[owned[0]]);
  		currentCosts[1] = (juiceFactoryCost[owned[1]]);
  		currentCosts[2] = (sugarFactoryCost[owned[2]]);
  		currentCosts[3] = (iceFactoryCost[owned[3]]);
  		currentCosts[4] = (juiceStorageCost[owned[4]]);
  		currentCosts[5] = (sugarStorageCost[owned[5]]);
  		currentCosts[6] = (iceStorageCost[owned[6]]);
  		currentCosts[7] = (moneyStorageCost[owned[7]]);
  		view.setButtonText(currentCosts);
  	}

  	/**
  	 * Purchase a lemonade stand if user has enough money
  	 * Replace the current gameobject with the lemonade stand tile
  	 */
  	public function buyLemonadeStand() {
  		buyAndReplaceBuilding(lemonadeStand, lemonadeStandCost[owned[0]]);
  	}

  	/**
  	 * Purchase a juice factory if user has enough money
  	 * Replace the current gameobject with the juice factory tile
  	 */
  	public function buyJuiceFactory() {
  		buyAndReplaceBuilding(juiceFactory, juiceFactoryCost[owned[1]]);
  	}

  	/**
  	 * Purchase a sugar factory if user has enough money
  	 * Replace the current gameobject with the sugar factory tile
  	 */
  	public function buySugarFactory() {
  		buyAndReplaceBuilding(sugarFactory, sugarFactoryCost[owned[2]]);
  	}

  	/**
  	 * Purchase a ice factory if user has enough money
  	 * Replace the current gameobject with the ice factory tile
  	 */
  	public function buyIceFactory() {
  		buyAndReplaceBuilding(iceFactory, iceFactoryCost[owned[3]]);
  	}

  	/**
  	 * Purchase a juice storage if user has enough money
  	 * Replace the current gameobject with the juice storage tile
  	 */
  	public function buyJuiceStorage() {
  		buyAndReplaceBuilding(juiceStorage, juiceStorageCost[owned[4]]);
  	}

  	/**
  	 * Purchase a sugar storage if user has enough money
  	 * Replace the current gameobject with the sugar storagetile
  	 */
  	public function buySugarStorage() {
  		buyAndReplaceBuilding(sugarStorage, sugarStorageCost[owned[5]]);
  	}

  	/**
  	 * Purchase a ice storageif user has enough money
  	 * Replace the current gameobject with the ice storage tile
  	 */
  	public function buyIceStorage() {
  		buyAndReplaceBuilding(iceStorage, iceStorageCost[owned[6]]);
  	}

  	/**
  	 * Purchase a money storage if user has enough money
  	 * Replace the current gameobject with the money storage tile
  	 */
  	public function buyMoneyStorage() {
  		buyAndReplaceBuilding(moneyStorage, moneyStorageCost[owned[7]]);
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

}
