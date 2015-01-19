#pragma strict

public class PurchaseBusinessItemsController extends MenuController {
	
	private var quickMenuView: QuickMenuView;
	private var productionMenuView: ProductionMenuView;
	private var productsManager: ProductManager;

	public function Start() {
		super.Start();
		view = FindObjectsOfType(PurchaseBusinessItemView)[0] as PurchaseBusinessItemView;
		productsManager = FindObjectsOfType(ProductManager)[0] as ProductManager;
	}

	/**
	 * User has selected to show purchase business item menu
	 *
	 */
	function pressShowMenu() {
		view.setButtonObjects(this);
		productsManager.setBonusMenuTexts();
		super.pressShowMenu();
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