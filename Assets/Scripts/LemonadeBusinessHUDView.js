#pragma strict

/**
 * Controlls the view of the UI text elements displayed on main game screen
 * Only instance one per game
 */
public class LemonadeBusinessHUDView extends MonoBehaviour {
	public var textCups : SpriteText;
	public var textMoney: SpriteText;
	public var textJuice: SpriteText;
	public var textSugar: SpriteText;
	public var textIce: SpriteText;

	function updateTextMoney(currentMoney, capacityMoney) {
		textMoney.Text = "$" + currentMoney + "/" + capacityMoney;
	}
	
	function updateTextJuice(currentJuice, capacityJuice) {
		textJuice.Text = "Juice: " + currentJuice + "/" + capacityJuice;
	}
	
	function updateTextSugar(currentSugar, capacitySugar) {
		textSugar.Text = "Sugar: " + currentSugar + "/" + capacitySugar;
	}
	
	function updateTextIce (currentIce, capacityIce) {
		textIce.Text = "Ice: " + currentIce + "/" + capacityIce;
	}
	
	function updateTextCups (currentCups) {
		textCups.Text = "Cups Sold: " + currentCups;
	}	
}