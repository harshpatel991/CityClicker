#pragma strict

//public var titleText: SpriteText;

public var purchaseProductionPanel : UIBistateInteractivePanel;
public var purchaseStoragePanel : UIBistateInteractivePanel;

public var buttonClose: UIActionBtn;

private var buttonBuyLemonadeStand: UIListButton;
private var buttonBuyJuiceFactory: UIListButton;
private var buttonBuySugarFactory: UIListButton;
private var buttonBuyIceFactory: UIListButton;
private var buttonBuyJuiceStorage: UIListButton;
private var buttonBuySugarStorage: UIListButton;
private var buttonBuyIceStorage: UIListButton;
private var buttonBuyMoneyStorage: UIListButton;
public var buttonBuy = [buttonBuyLemonadeStand, buttonBuyJuiceFactory, buttonBuySugarFactory, buttonBuyIceFactory, buttonBuyJuiceStorage, buttonBuySugarStorage, buttonBuyIceStorage, buttonBuyMoneyStorage];

private var textBuyLemonadeStand: SpriteText;
private var textBuyJuiceFactory: SpriteText;
private var textBuySugarFactory: SpriteText;
private var textBuyIceFactory: SpriteText;
private var textBuyJuiceStorage: SpriteText;
private var textBuySugarStorage: SpriteText;
private var textBuyIceStorage: SpriteText;
private var textBuyMoneyStorage: SpriteText;
public var textBuy = [textBuyLemonadeStand,  textBuyJuiceFactory,  textBuySugarFactory,  textBuyIceFactory,  textBuyJuiceStorage,  textBuySugarStorage,  textBuyIceStorage, textBuyMoneyStorage];

private var textStatsLemonadeStand: SpriteText;
private var textStatsJuiceFactory: SpriteText;
private var textStatsSugarFactory: SpriteText;
private var textStatsIceFactory: SpriteText;
private var textStatsJuiceStorage: SpriteText;
private var textStatsSugarStorage: SpriteText;
private var textStatsIceStorage: SpriteText;
private var textStatsMoneyStorage: SpriteText;
public var textStats = [textStatsLemonadeStand , textStatsJuiceFactory , textStatsSugarFactory , textStatsIceFactory , textStatsJuiceStorage , textStatsSugarStorage , textStatsIceStorage, textStatsMoneyStorage];

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
			textBuy[buttonIndex].Text = "Buy - " + buttonTexts[buttonIndex];
		}
	}
}