#pragma strict

public class PurchaseBusinessItemsController extends MonoBehaviour {

	@HideInInspector
	public var model : PurchaseBusinessItemModel;
	@HideInInspector
	public var view : PurchaseBusinessItemView;

	public function Start() {
		model = gameObject.GetComponent(PurchaseBusinessItemModel);
		view = FindObjectsOfType(PurchaseBusinessItemView)[0] as PurchaseBusinessItemView;
	}

	/**
	 * User has selected to show purchase business item menu
	 */
	function pressShowMenu() {
		view.setButtonObjects(this);
		model.setMenuTexts();
    	view.showMenu();
	}

	/**
     * User input has selected to close the menu
     */
  	public function pressHideMenu() {
		view.hideMenu();
	}

	/**
     * User input has selected to buy newspaper ad
     */
	public function pressBuyNewspaperAd() {
		model.buyNewspaperAd();
	}

	/**
     * User input has selected to buy billboard ad
     */
	public function pressBuyBillboardAd() {
		model.buyBillboardAd();
	}

	/**
     * User input has selected to buy tv ad
     */
	public function pressBuyTvAd() {
		model.buyTvAd();
	}


}