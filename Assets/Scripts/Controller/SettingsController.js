#pragma strict

public class SettingsController extends MenuController {
	
	function Start() {
		super.Start();
		view = FindObjectsOfType(SettingsView)[0] as SettingsView;
	}
	
	function pressShowMenu() {
		super.pressShowMenu();
    	view.showMenu();
	}
	
	function pressSound() {
		
	}
	
	function pressMainMenu() {
		Application.LoadLevel(0);
	}
	
	function pressDeleteSaveFile() {
		PlayerPrefs.DeleteKey("Save Data");
		Application.LoadLevel(0);
	}

}