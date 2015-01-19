#pragma strict

@HideInInspector
var menu : UIBistateInteractivePanel;

@HideInInspector
var tileTouchController : TileTouchController; // needed for disabling input

@HideInInspector
var cameraMovement: CameraMovement; // needed for disabling input
var titleText: SpriteText;


public class MenuView extends MonoBehaviour {

	function Awake() {
		Debug.Log("Menu awake " + this.gameObject);
		menu = gameObject.GetComponent(UIBistateInteractivePanel);
		tileTouchController = FindObjectsOfType(TileTouchController)[0] as TileTouchController;
		cameraMovement = FindObjectsOfType(CameraMovement)[0] as CameraMovement;
	}
	
	function setTitleText(newTitleText: String) {
		titleText.Text = newTitleText;
	}

	/**
	 * Displays the menu and disables input to main camera
	 */
	function showMenu() {
		menu.Reveal();
	}

	/**
	 * Hides the menu and enables input to main camera
	 */
	function hideMenu() {
		menu.Hide();
		tileTouchController.enableInput();
		cameraMovement.enableInput();
	}
	
	public function setButtonObjects(setObject: MonoBehaviour) {
		Debug.LogWarning("Should not be directly called");
	}

}