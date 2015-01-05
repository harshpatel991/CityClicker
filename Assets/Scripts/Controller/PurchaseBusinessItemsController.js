#pragma strict

public class PurchaseBusinessItemsController extends MonoBehaviour {

	@HideInInspector
	public var model : PurchaseBusinessItemModel;
	@HideInInspector
	public var view : PurchaseBusinessItemView;
	
	private var quickMenuView: QuickMenuView;
	private var productionMenuView: ProductionMenuView;

	public function Start() {
		model = gameObject.GetComponent(PurchaseBusinessItemModel);
		view = FindObjectsOfType(PurchaseBusinessItemView)[0] as PurchaseBusinessItemView;

		quickMenuView = FindObjectsOfType(QuickMenuView)[0] as QuickMenuView;
		productionMenuView = FindObjectsOfType(ProductionMenuView)[0] as ProductionMenuView;
	}

	/**
	 * User has selected to show purchase business item menu
	 *
	 */
	function pressShowMenu() {
		view.setButtonObjects(this);
		model.setMenuTexts();
		quickMenuView.hideMenu();
		productionMenuView.hideMenu();
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