#pragma strict
public class TutorialController extends MonoBehaviour {
	
	var model: TutorialModel;
	var view: TutorialView;
	
	function showTutorial() {
		view.showMenu();
	}
	
	function pressNext() {
		model.showNext();
	}
	
	function pressSkip() {
		view.hideMenu();
		model.skipTutorial();
	}
	

}