#pragma strict

public class PurchaseBusinessItemModel extends MonoBehaviour {

  	private var newspaperAdCost = 500;
  	private var billboardAdCost = 750;
  	private var tvAdCost = 1500;

  	private var NEWSPAPER_AD_BONUS = .1;
  	private var BILLBOARD_AD_BONUS = .2;
  	private var TV_AD_BONUS = .5;

  	private var NEWSPAPER_AD_SPAWN_TIME_DECREASE = .2;
  	private var BILLBOARD_AD_SPAWN_TIME_DECREASE = .3;
  	private var TV_AD_SPAWN_TIME_DECREASE = .4;

  	private var owned = [0,0,0]; //how many of each is currently owned 
  	//TODO: keep an array of arrays to keep when each bonus should end

  	@HideInInspector
  	var view: PurchaseBusinessItemView;
  	@HideInInspector
	var productsManager : ProductManager;
	@HideInInspector
	var passiveAISpawner: PassiveAISpawner;

	function Start() {
		productsManager = FindObjectsOfType(ProductManager)[0] as ProductManager;
		view = FindObjectsOfType(PurchaseBusinessItemView)[0] as PurchaseBusinessItemView;
		passiveAISpawner = FindObjectsOfType(PassiveAISpawner)[0] as PassiveAISpawner;
		//TODO: read owned from file
	}

	/**
	 * Sets appropriate cost text in the menu
	 */
  	public function setMenuTexts() {
  		var costs = new int[3];
  		costs[0] = newspaperAdCost;
  		costs[1] = billboardAdCost;
  		costs[2] = tvAdCost;
  		view.setButtonText(costs);
  	}

  	/**
  	 * Buy a newpaper ad
  	 * Increases the pedestrians spawned
  	 * Adds bonus to money
  	 */
  	public function buyNewspaperAd() {
 	  	buyBusinessItem(newspaperAdCost, 0, NEWSPAPER_AD_BONUS, NEWSPAPER_AD_SPAWN_TIME_DECREASE);
  	}
  		
  	/**
  	 * Buy a billboard ad
  	 * Increases the pedestrians spawned
  	 * Adds bonus to money
  	 */
  	public function buyBillboardAd() {
 	  	buyBusinessItem(billboardAdCost, 1, BILLBOARD_AD_BONUS, BILLBOARD_AD_SPAWN_TIME_DECREASE);
  	}

  	/**
  	 * Buy a tv ad
  	 * Increases the pedestrians spawned
  	 * Adds bonus to money
  	 */
  	public function buyTvAd() {
	  	buyBusinessItem(tvAdCost, 2, TV_AD_BONUS, TV_AD_SPAWN_TIME_DECREASE);
  	}
	  	
  	/**
  	 * Purchase the business item if user has enough money
  	 */
  	public function buyBusinessItem(cost: int, index: int, bonus: double, spawnTimeDecrease: double) {
  		if(productsManager.getCurrent("Money") >= cost) {
			productsManager.modifyValue("Money", -1*cost);

	  		owned[index] ++;
	  		productsManager.addBonus("Money", bonus);
	  		passiveAISpawner.decreaseSpawnTime(spawnTimeDecrease);
	  	}
  	}
}
