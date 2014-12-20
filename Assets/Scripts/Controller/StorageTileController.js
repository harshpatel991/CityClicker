#pragma strict
/**
 * Response to user input when a storage tile is hit or a button from the storage tile menu is hit
 */
public class StorageTileController extends TileController  {
	
	@HideInInspector
	public var model: StorageTileModel;
	@HideInInspector
	public var view : StorageMenuView;
	@HideInInspector
	var menuIsShowing = false; //flag for if the menu is showing, update the text

	public function Start() {
		model = gameObject.GetComponent(StorageTileModel);
		view = FindObjectsOfType(StorageMenuView)[0] as StorageMenuView;
	}

	public function pressShowQuickMenu() {
		punchBuilding();
		quickMenuView.setButtonObjects(this);
		quickMenuView.showMenu(false);
		model.setQuickMenuText();
	}

    /**
     * Sets behavior/text and displays the menu for this tile
     */
	public function pressShowMenu() {
		quickMenuView.hideMenu();
		view.setButtonObjects(this);
		model.setMenuTexts();
    	view.showMenu();
    	menuIsShowing = true;
  	}

  	/**
     * User input has selected to close the menu
     */
  	public function pressHideMenu() {
		view.hideMenu();
		menuIsShowing = false;
	}

    /**
  	 * User has selected to upgrade the tile
  	 */
	public function pressUpgrade() {		
		model.upgradeTile();
		model.setMenuTexts();
	}

	/**
	 * Runs every frame, will update text fields in menu if menu is shown
	 * TODO: Can remove this since there is no changing information in the storage tile view
	 */
	function Update() {
		if(menuIsShowing) {
			model.setMenuTexts();
		}
	}
}