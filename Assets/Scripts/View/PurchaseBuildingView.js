#pragma strict

//public var titleText: SpriteText;

public var purchaseProductionPanel : UIBistateInteractivePanel;
public var purchaseStoragePanel : UIBistateInteractivePanel;

public var buttonClose: UIActionBtn;

private var buttonBuyLemonadeStand: UIListButton;
private var buttonBuyMiniMart: UIListButton;
private var buttonBuyFastFood: UIListButton;
private var buttonBuyPostOffice: UIListButton;
private var buttonBuyFancyRestaurant: UIListButton;
private var buttonBuyHospital: UIListButton;
private var buttonBuyHighTechCompany: UIListButton;
private var buttonBuyPowerPlant: UIListButton;
public var buttonBuy = [buttonBuyLemonadeStand, buttonBuyMiniMart, buttonBuyFastFood, buttonBuyPostOffice, buttonBuyFancyRestaurant, buttonBuyHospital, buttonBuyHighTechCompany, buttonBuyPowerPlant];

private var textBuyLemonadeStand: SpriteText;
private var textBuyMiniMart: SpriteText;
private var textBuyFastFood: SpriteText;
private var textBuyPostOffice: SpriteText;
private var textBuyFancyRestaurant: SpriteText;
private var textBuyHospital: SpriteText;
private var textBuyHighTechCompany: SpriteText;
private var textBuyPowerPlant: SpriteText;
public var textBuy = [textBuyLemonadeStand, textBuyMiniMart, textBuyFastFood, textBuyPostOffice, textBuyFancyRestaurant, textBuyHospital, textBuyHighTechCompany, textBuyPowerPlant];

private var textStatsLemonadeStand: SpriteText;
private var textStatsMiniMart: SpriteText;
private var textStatsFastFood: SpriteText;
private var textStatsPostOffice: SpriteText;
private var textStatsFancyRestaurant: SpriteText;
private var textStatsHospital: SpriteText;
private var textStatsHighTechCompany: SpriteText;
private var textStatsPowerPlant: SpriteText;
public var textStats = [textStatsLemonadeStand, textStatsMiniMart, textStatsFastFood, textStatsPostOffice, textStatsFancyRestaurant, textStatsHospital, textStatsHighTechCompany, textStatsPowerPlant];

public class PurchaseBuildingView extends FullSizeMenuView {

	function setTitleText(newTitleText: String) {
		titleText.Text = newTitleText;
	}

	/**
	 * Sets the controllers the buttons should respond to when hit
	 */
	function setButtonObjects(object: MonoBehaviour) {
		buttonClose.scriptWithMethodToInvoke = object;

		for (var button in buttonBuy) {
			button.scriptWithMethodToInvoke = object;
		}
	}

	/** 
	 * Displays the production tab
	 */
	function showProduction() {
		purchaseStoragePanel.Hide();
		purchaseProductionPanel.Reveal();
	}

	/** 
	 * Displays the storage tab
	 */
	function showStorage() {
		purchaseProductionPanel.Hide();
		purchaseStoragePanel.Reveal();
	}

	/**
	 * Displays the menu starting with production tab
	 */
	function showMenu() {
		showProduction();
		super.showMenu();
	}

	/**
	 * Sets button text for each of the buy buttons
	 */
	function setButtonText(buttonTexts : int[]) {
		for(var buttonIndex : int = 0; buttonIndex < buttonTexts.length; buttonIndex++) {
			Debug.Log("Index:" + buttonIndex);
			textBuy[buttonIndex].Text = "Buy - " + buttonTexts[buttonIndex];
		}
	}
}