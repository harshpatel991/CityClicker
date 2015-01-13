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
		super.Start();
		model = gameObject.GetComponent(PurchaseBuildingModel);
		view = FindObjectsOfType(PurchaseBuildingView)[0] as PurchaseBuildingView;
	}

	public function pressShowQuickMenu() {
		super.pressShowQuickMenu();
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
	public function pressBuyMiniMart() {
		view.hideMenu();
		model.buyMiniMart();
	}

	/**
  	 * User has selected to buy a sugar factory
  	 */
	public function pressBuyFastFood() {
		view.hideMenu();
		model.buyFastFood();
	}

	/**
  	 * User has selected to buy a ice factory
  	 */
	public function pressBuyPostOffice() {
		view.hideMenu();
		model.buyPostOffice();
	}

	/**
  	 * User has selected to buy juice storage
  	 */
	public function pressBuyFancyRestaurant() {
		view.hideMenu();
		model.buyFancyRestaurant();
	}

	/**
  	 * User has selected to buy sugar storage
  	 */
	public function pressBuyHospital() {
		view.hideMenu();
		model.buyHospital();
	}

	/**
  	 * User has selected to buy ice storage
  	 */
	public function pressBuyHighTechCompany() {
		view.hideMenu();
		model.buyHighTechCompany();
	}

	/**
  	 * User has selected to buy money storage
  	 */
	public function pressBuyPowerPlant() {
		view.hideMenu();
		model.buyPowerPlant();
	}
}