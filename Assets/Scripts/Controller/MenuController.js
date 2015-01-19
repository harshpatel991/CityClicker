#pragma strict

public class MenuController extends MonoBehaviour {	
	protected var view : MenuView;
	
	private var menuViews: MenuView[]; 
	
	function Start() {
		menuViews = FindObjectsOfType(MenuView) as MenuView[];
	}
	
	function pressShowMenu() {
		for (menuView in menuViews) {
			menuView.hideMenu();
		}
	}

	/**
     * User input has selected to close the menu
     */
  	public function pressHideMenu() {
		view.hideMenu();
	}
	

}