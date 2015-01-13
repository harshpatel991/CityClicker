//#pragma strict
//
//public class PurchaseBusinessItemModel extends MonoBehaviour {
//
//
//
//  	private var NEWSPAPER_AD_SPAWN_TIME_DECREASE = .2;
//  	private var BILLBOARD_AD_SPAWN_TIME_DECREASE = .3;
//  	private var TV_AD_SPAWN_TIME_DECREASE = .4;
//
//  	//TODO: keep an array of arrays to keep when each bonus should end
//
//  	@HideInInspector
//  	var view: PurchaseBusinessItemView;
//  	@HideInInspector
//	var productsManager : ProductManager;
//	@HideInInspector
//	var passiveAISpawner: PassiveAISpawner;
//
//	function Start() {
//		productsManager = FindObjectsOfType(ProductManager)[0] as ProductManager;
//		view = FindObjectsOfType(PurchaseBusinessItemView)[0] as PurchaseBusinessItemView;
//		passiveAISpawner = FindObjectsOfType(PassiveAISpawner)[0] as PassiveAISpawner;
//		//TODO: read owned from file
//	}
//
//	/**
//	 * Sets appropriate cost text in the menu
//	 */
//  	public function setMenuTexts() {
//
//  	}
//
//  	/**
//  	 * Buy a newpaper ad
//  	 * Increases the pedestrians spawned
//  	 * Adds bonus to money
//  	 */
//  	public function buyNewspaperAd() {
//// 	  	buyBusinessItem(newspaperAdCost, 0, NEWSPAPER_AD_SPAWN_TIME_DECREASE);
//  	}
//  		
//  	/**
//  	 * Buy a billboard ad
//  	 * Increases the pedestrians spawned
//  	 * Adds bonus to money
//  	 */
//  	public function buyBillboardAd() {
// 	  	buyBusinessItem(billboardAdCost, 1, BILLBOARD_AD_SPAWN_TIME_DECREASE);
//  	}
//
//  	/**
//  	 * Buy a tv ad
//  	 * Increases the pedestrians spawned
//  	 * Adds bonus to money
//  	 */
//  	public function buyTvAd() {
//	  	buyBusinessItem(tvAdCost, 2, TV_AD_SPAWN_TIME_DECREASE);
//  	}
//	  	
//
//}
