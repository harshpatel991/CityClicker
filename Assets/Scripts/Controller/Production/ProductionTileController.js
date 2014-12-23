#pragma strict
/**
 * Response to user input when a production tile is hit or a button from the production tile menu is hit
 */
public class ProductionTileController extends TileController  {
	
	@HideInInspector
	public var model: ProductionTileModel;
	@HideInInspector
	public var view : ProductionMenuView;
	@HideInInspector
	var menuIsShowing = false; //flag for if the menu is showing, update the text

	public function Start() {
		model = gameObject.GetComponent(ProductionTileModel);
		view = FindObjectsOfType(ProductionMenuView)[0] as ProductionMenuView;
	}

	public function pressShowQuickMenu() {
		punchBuilding();
		quickMenuView.setButtonObjects(this);
		quickMenuView.showMenu(true);
		model.setQuickMenuText();
	}

    /**
     * User input has selected a Production tile
     * Sets up behaviour for buttons, sets list items, sets menu text and displays the menu for this tile
     */
	public function pressShowMenu() {
		quickMenuView.hideMenu();
		view.setButtonObjects(this);
		model.setMenuTexts(this);
    	view.showMenu();
    	menuIsShowing = true;
  	}

  	/**
     * User input has selected to close the menu
     */
  	public function pressHideMenu() {
		menuIsShowing = false;
		view.hideMenu();
	}

    /**
  	 * User has selected to upgrade the tile
  	 */
	public function pressUpgrade() {		
		model.upgradeTile();
	}

	/**
	 * User input has selected to icrement the product
	 */
	public function pressIncrementProduct() {
		model.incrementProduct(); 
	}

	/**
	 * User input has selected to transfer product to global storage
	 */
	public function pressTransferProduct() {
		model.transferProduct();
	}

	/**
	 * Runs every frame, will update text fields in menu if menu is shown //TODO: is this required anymore?
	 */
	function Update() {
		//if(menuIsShowing) {
		//	model.setMenuTexts();
		//}
	}
}