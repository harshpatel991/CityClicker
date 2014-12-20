#pragma strict
/**
 * Response to user input when a tile is hit
 */
public class TileController extends MonoBehaviour{

 	var tileBuliding : GameObject;
 	var quickMenuView : QuickMenuView;

	/**
     * Sets behavior/text and displays the menu for this tile
     */
	function pressShowMenu() {

	}

	/**
     * Sets behavior/text and displays the menu for this tile
     */
	function pressShowQuickMenu() {

	}

	function pressHideQuickMenu() {
		quickMenuView.hideMenu();
	};

	function punchBuilding() {
		iTween.PunchScale(tileBuliding, Vector3(.3, .3, 0), .4);
	}



}