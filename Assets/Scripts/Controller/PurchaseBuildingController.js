#pragma strict

/**
 * Response to user input when purchase building tile is hit or a button from the purhcase buliding menu is hit
 */
public class PurchaseBuildingController extends TileController  {

	@HideInInspector
	public var model : PurchaseBuildingModel;
	@HideInInspector
	public var view : PurchaseBuildingView;

	public function Start() {
		model = gameObject.GetComponent(PurchaseBuildingModel);
		view = FindObjectsOfType(PurchaseBuildingView)[0] as PurchaseBuildingView;
	}

	public function pressShowQuickMenu() {
		punchBuilding();
		quickMenuView.setButtonObjects(this);
		quickMenuView.showMenu(false);
		model.setQuickMenuText();
	}

	/**
     * User input has selected a Purchase Building tile
     * Sets up behaviour for buttons, sets menu text, and displays the menu for this tile
     */
	public function pressShowMenu() {
		quickMenuView.hideMenu();
		punchBuilding();
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
  	 * User has selected to buy a lemonade stand
  	 */
	public function pressBuyLemonadeStand() {
		view.hideMenu();
		model.buyLemonadeStand();
	}

	/**
  	 * User has selected to buy a juice factory
  	 */
	public function pressBuyJuiceFactory() {
		view.hideMenu();
		model.buyJuiceFactory();
	}

	/**
  	 * User has selected to buy a sugar factory
  	 */
	public function pressBuySugarFactory() {
		view.hideMenu();
		model.buySugarFactory();
	}

	/**
  	 * User has selected to buy a ice factory
  	 */
	public function pressBuyIceFactory() {
		view.hideMenu();
		model.buyIceFactory();
	}

	/**
  	 * User has selected to buy juice storage
  	 */
	public function pressBuyJuiceStorage() {
		view.hideMenu();
		model.buyJuiceStorage();
	}

	/**
  	 * User has selected to buy sugar storage
  	 */
	public function pressBuySugarStorage() {
		view.hideMenu();
		model.buySugarStorage();
	}

	/**
  	 * User has selected to buy ice storage
  	 */
	public function pressBuyIceStorage() {
		view.hideMenu();
		model.buyIceStorage();
	}

	/**
  	 * User has selected to buy money storage
  	 */
	public function pressBuyMoneyStorage() {
		view.hideMenu();
		model.buyMoneyStorage();
	}
}