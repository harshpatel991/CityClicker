#pragma strict
/**
 * Response to user input when for sale tile is hit or a button from the for sale menu is hit
 */
public class ForSaleController extends TileController {
	
	@HideInInspector
	public var model: ForSaleModel;
	@HideInInspector
	public var view : ConfirmationBoxView;

	public function Start() {
		super.Start();
		model = gameObject.GetComponent(ForSaleModel);
		view = FindObjectsOfType(ConfirmationBoxView)[0] as ConfirmationBoxView;
	}

	public function pressShowQuickMenu() {
		super.pressShowQuickMenu();
		quickMenuView.showMenu(false);
		model.setQuickMenuText();
	}

	/**
	 * User input has selected a ForSale tile
	 */
	public function pressShowMenu() {
		quickMenuView.hideMenu();
		view.setButtonObjects(this);
		model.setMenuTexts();
    	view.showMenu();
  	}

  	/**
  	 * User input has selected to purchase the lot
  	 */
  	public function pressAgree() {
		pressHideConfirmationMenu();
		model.buyLot(); //this will destroy the controller, cannot perform any actions after this
	}

	/**
  	 * User input has selected to not purchase the lot
  	 */
	public function pressCancel() {
		view.hideMenu();
	}

	/**
  	 * User input has selected to close the menu
  	 */
	public function pressHideConfirmationMenu() {
		view.hideMenu();
	}
}