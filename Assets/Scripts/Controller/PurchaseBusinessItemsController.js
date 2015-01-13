#pragma strict

public class PurchaseBusinessItemsController extends MonoBehaviour {

	@HideInInspector
	public var model : PurchaseBusinessItemModel;
	@HideInInspector
	public var view : PurchaseBusinessItemView;
	
	private var quickMenuView: QuickMenuView;
	private var productionMenuView: ProductionMenuView;
	private var productsManager: ProductManager;

	public function Start() {
		//model = gameObject.GetComponent(PurchaseBusinessItemModel);
		view = FindObjectsOfType(PurchaseBusinessItemView)[0] as PurchaseBusinessItemView;

		quickMenuView = FindObjectsOfType(QuickMenuView)[0] as QuickMenuView;
		productionMenuView = FindObjectsOfType(ProductionMenuView)[0] as ProductionMenuView;
		productsManager = FindObjectsOfType(ProductManager)[0] as ProductManager;
	}

	/**
	 * User has selected to show purchase business item menu
	 *
	 */
	function pressShowMenu() {
		view.setButtonObjects(this);
		productsManager.setBonusMenuTexts();
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
		productsManager.buyBusinessItem(0);
	}

	/**
     * User input has selected to buy billboard ad
     */
	public function pressBuyBillboardAd() {
		productsManager.buyBusinessItem(1);
	}

	/**
     * User input has selected to buy tv ad
     */
	public function pressBuyTvAd() {
		productsManager.buyBusinessItem(2);
	}
}