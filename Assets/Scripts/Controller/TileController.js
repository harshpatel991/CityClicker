#pragma strict
/**
 * Response to user input when a tile is hit
 */
public class TileController extends MonoBehaviour {

 	var tileBuliding : GameObject;
 	private var buildingStartPosition: Vector3;
 	protected var quickMenuView : QuickMenuView;
 	
 	public function Start() {
		quickMenuView = FindObjectsOfType(QuickMenuView)[0] as QuickMenuView;
		buildingStartPosition = tileBuliding.transform.position;
	}

	/**
     * Sets behavior/text and displays the menu for this tile
     */
	function pressShowMenu() {

	}

	/**
     * Sets behavior/text and displays the menu for this tile
     */
	function pressShowQuickMenu() {
		iTween.StopByName(tileBuliding, "punchPosition"); 		    
    	yield WaitForSeconds(0.01);
		
		tileBuliding.transform.position = buildingStartPosition;
		
		punchBuilding();
		quickMenuView.setButtonObjects(this);

	}

	function pressHideQuickMenu() {
		quickMenuView.hideMenu();
	};

	function punchBuilding() {
		iTween.PunchPosition(tileBuliding, iTween.Hash("name", "punchPosition",
													"z",  .7,
													"time", .7));
	}
}