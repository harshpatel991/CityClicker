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
		model.buyLemonadeStand();
	}

	/**
  	 * User has selected to buy a juice factory
  	 */
	public function pressBuyMiniMart() {
		model.buyMiniMart();
	}

	/**
  	 * User has selected to buy a sugar factory
  	 */
	public function pressBuyFastFood() {
		model.buyFastFood();
	}

	/**
  	 * User has selected to buy a ice factory
  	 */
	public function pressBuyPostOffice() {
		model.buyPostOffice();
	}

	/**
  	 * User has selected to buy juice storage
  	 */
	public function pressBuyFancyRestaurant() {
		model.buyFancyRestaurant();
	}

	/**
  	 * User has selected to buy sugar storage
  	 */
	public function pressBuyHospital() {
		model.buyHospital();
	}

	/**
  	 * User has selected to buy ice storage
  	 */
	public function pressBuyHighTechCompany() {
		model.buyHighTechCompany();
	}

	/**
  	 * User has selected to buy money storage
  	 */
	public function pressBuyPowerPlant() {
		model.buyPowerPlant();
	}
	
	/**
  	 * User has selected to buy bank
  	 */
	public function pressBuyBank() {
		model.buyBank();
	}
}