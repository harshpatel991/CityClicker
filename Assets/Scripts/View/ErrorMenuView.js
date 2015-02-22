#pragma strict

var errorText: SpriteText;
private var ERROR_DISPLAY_TIME: float = 1.2;

public class ErrorMenuView extends MonoBehaviour{

	function Start() {
		this.gameObject.renderer.material.color.a = 0;
	}
	

	/** 
	 * Sets the text of the agree button
	 * @param newAgreeText The new text to be displayed on the button
	 */
	function displayErrorText(newErrorText: String) {	
		errorText.Text = newErrorText;
		this.gameObject.transform.position.y = -8;
		
		iTween.StopByName(errorText.gameObject, "fadeAway"); 	
		iTween.ColorTo(errorText.gameObject, iTween.Hash( "name", "fadein",
												"Color",  Color.white,
												"time", .3, 
												"oncomplete", "hideMenu")); //from transparent to its normal color
												
								
	}
	
	/**
	 * Hides the menu and enables input to main camera
	 */
	function hideMenu() {		
		iTween.ColorTo(errorText.gameObject, iTween.Hash( "name", "fadeAway", 
												"delay", ERROR_DISPLAY_TIME,
												"a",  0, 
												"time", .3)); //to transparent
												
	}
	
}