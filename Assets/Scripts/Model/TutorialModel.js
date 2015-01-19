#pragma strict
public class TutorialModel extends MonoBehaviour {
		
	var view: TutorialView;

	private var tutorialTexts = ["Hey there, you must be the new guy.\nThe company has appointed me to show you the ropes.", 
								"If you remember, your goal is to help our company make as much money as possible by creating buildings and selling products.",
								 "You can move around the city by touching and dragging on the map.", 
								 "To interact with a tile, tap on it.",
								 "To create a new building, you must first purchase land.",
								 "Once you've got a building, you'll have to buy some items to start making money.",
								 "Then start tapping on the building to make money.",
								 "Tapping can get exhausting. Hire employees to create money for you.\nEmployees will stop creating money once the capacity for that buliding is reached.",
								 "Employees will make money for you even when the app is closed.",
								 "But don't go and make too many money-making buildings or else you won't have anywhere to store it. Create banks to increase the amount of money you can store.",
								 "Good luck!"];
	private var currentTutorialScreen: int = 0;
	
	private var gameStateManager: GameStateManager;
	
	function Start() {
		view.setText(tutorialTexts[0] + " (" + (currentTutorialScreen+1) + "/" + tutorialTexts.Length + ")");
		gameStateManager = FindObjectsOfType(GameStateManager)[0] as GameStateManager;
	}
	
	function showNext() {
		currentTutorialScreen++;

		if(currentTutorialScreen >= tutorialTexts.Length) {
			gameStateManager.updateTutorial(true);
			view.hideMenu();
		} else {
			view.setText(tutorialTexts[currentTutorialScreen] + " (" + (currentTutorialScreen+1) + "/" + tutorialTexts.Length + ")");
		}
	}
	
	function skipTutorial() {
		gameStateManager.updateTutorial(true);
		view.hideMenu();
	}

}