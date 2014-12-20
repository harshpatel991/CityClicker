#pragma strict

public class StartMenuController extends MonoBehaviour {

	/**
	 * Called when the play button is pressed
	 * Loads the main game level
	 */
	public function pressPlayButton() {
		Application.LoadLevel(1);
	}

}