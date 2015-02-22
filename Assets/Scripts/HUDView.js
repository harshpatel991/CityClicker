#pragma strict

/**
 * Controlls the view of the UI text elements displayed on main game screen
 * Only instance one per game
 */
public class HUDView extends MonoBehaviour {
	public var textMoney: SpriteText;
	public var textBonus: SpriteText;

	function updateTextMoney(currentMoney: int, capacityMoney: int) {
		textMoney.Text = "$" + currentMoney + "/" + capacityMoney;
	}
	
	function updateTextBonus(bonusValue: float) {
		if(bonusValue > 0) {
			textBonus.Text = "Bonus: " + (bonusValue * 100) + "%";
		}
		else
			textBonus.Text = "";
	}

}