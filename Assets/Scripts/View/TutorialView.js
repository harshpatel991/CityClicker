#pragma strict
public class TutorialView extends FullSizeMenuView {
	
	var textTutorial: SpriteText;
	
	function Awake() {
		grayBackgroundMenu = GameObject.Find("menu_gray_background").GetComponent(UIBistateInteractivePanel) as UIBistateInteractivePanel; //this needs to be found on awake since tutorial is spawned on game start
		super.Awake();
	}

	function setText(value: String) {
		textTutorial.Text = value;
	}

}