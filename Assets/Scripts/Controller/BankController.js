#pragma strict
/**
 * Response to user input when a production tile is hit or a button from the production tile menu is hit
 */
public class BankController extends TileController  {
	
	@HideInInspector
	public var model: BankModel;
	@HideInInspector
	public var view : ProductionMenuView;
	@HideInInspector
	var menuIsShowing = false; //flag for if the menu is showing, update the text

	public function Start() {
		super.Start();
		model = gameObject.GetComponent(BankModel);
		view = FindObjectsOfType(ProductionMenuView)[0] as ProductionMenuView;
	}

	public function pressShowQuickMenu() {
		super.pressShowQuickMenu();
		model.setQuickMenuText();
		quickMenuView.showMenu(false);
	}

    /**
     * User input has selected a Production tile
     * Sets up behaviour for buttons, sets list items, sets menu text and displays the menu for this tile
     */
	public function pressShowMenu() { //TODO: this for bank
		quickMenuView.hideMenu();
		
		view.setButtonObjects(this);
		model.setTitleText();
		pressStatsTab();
		
    	view.showMenuAsBank();
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
		model.setStatsTexts(); //updates the view
	}
	
	/**
	 * User input reiceived on production stats tab
	 */
	function pressStatsTab() {
		model.setStatsTexts();
		view.showStats();
	}

	/**
	 * Runs every frame, will update text fields in menu if menu is shown
	 */
	function Update() {
		if(menuIsShowing) {
			model.setStatsTexts();
		}
	}
}