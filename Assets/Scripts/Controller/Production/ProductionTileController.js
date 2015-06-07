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
	public var confirmationView: ConfirmationBoxView;
	@HideInInspector
	var menuIsShowing = false; //flag for if the menu is showing, update the text

	public function Start() {
		super.Start();
		model = gameObject.GetComponent(ProductionTileModel);
		view = FindObjectsOfType(ProductionMenuView)[0] as ProductionMenuView;
		confirmationView = FindObjectsOfType(ConfirmationBoxView)[0] as ConfirmationBoxView;	

	}

	public function pressShowQuickMenu() {
		super.pressShowQuickMenu();
		model.setQuickMenuText();
		quickMenuView.showMenu(true);
		pressIncrementProduct();
	}

   /*
  	 * Pressed to see items and upgrades on quick menu view
  	 */
	public function pressShowMenu() {
		openMenu();
		pressStatsTab();
		
  	}
  	
	public function pressShowMenuItems() {
		openMenu();
		pressItemsTab();
  	}
  	
	public function pressShowMenuEmployees() {
		openMenu();
		pressEmployeesTab();
  	}
  	
  	private function openMenu() {
  		quickMenuView.hideMenu();
		
		view.setButtonObjects(this);
		model.setTitleText();
		
		
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
		model.setStatsTexts(); //updates the view
	}
	
    /**
  	 * User has selected to buy a manager
  	 */
	public function pressBuyManager() {		
		model.buyManager();
		model.setStatsTexts(); //updates the view
	}

	/**
	 * User input has selected to icrement the product
	 */
	public function pressIncrementProduct() {
		model.manualIncrement(); 
		model.updateProgressBar();
	}

	/**
	 * User input has selected to transfer product to global storage
	 */
	public function pressTransferProduct() {
		model.transferProduct();
	}
	
	/**
	 * User input reiceived on production stats tab
	 */
	function pressStatsTab() {
		model.setStatsTexts();
		view.showStats();
	}

	/**
	 * User input reiceived on production items tab
	 */
	function pressItemsTab() {
		model.setListItems(this);
		view.showItems();
	}
	
	function pressEmployeesTab() {
		model.setListEmployees(this);
		view.showEmployees();
	}

	/**
	 * Runs every frame, will update text fields in menu if menu is shown
	 */
	function Update() {
		if(menuIsShowing) {
			model.setStatsTexts();
		}
	}
	
	function showConfirmationBox() {
		confirmationView.setButtonObjects(this);
		//view.hideMenu();//hide production menu
		view.temporaryHideMenu();
		confirmationView.showMenu();
		
	}
	
  	/**
  	 * User input has selected to purchase the item/employee
  	 */
  	public function pressAgree() {
  		pressHideConfirmationMenu(); //close confirmation menu
  		view.showMenu(); //show our menu
		model.callOnConfrimationBoxAccept(model.paramOnConfirmationBoxAccept); //purchase item and show proper production tab
		
		model.setListItems(this);
		model.setListEmployees(this);
	}

	/**
  	 * User input has selected to not purchase the lot
  	 */
	public function pressCancel() {
		confirmationView.temporaryHideMenu();
		view.showMenu();
	}

	/**
  	 * User input has selected to close the confirmation menu
  	 */
	public function pressHideConfirmationMenu() {
		confirmationView.temporaryHideMenu();
		view.showMenu();
	}
}