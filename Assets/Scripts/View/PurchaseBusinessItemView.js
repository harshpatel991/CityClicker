#pragma strict

//public var titleText: SpriteText;

public var buttonClose: UIActionBtn;

private var buttonBuyNewspaperAd: UIListButton;
private var buttonBuyBillboardAd: UIListButton;
private var buttonBuyTvAd: UIListButton;
public var buttonBuy = [buttonBuyNewspaperAd, buttonBuyBillboardAd, buttonBuyTvAd];

private var textBuyNewspaperAd: SpriteText;
private var textBuyBillboarAd: SpriteText;
private var textBuyTvAd: SpriteText;
public var textBuy = [textBuyNewspaperAd, textBuyBillboarAd,  textBuyTvAd];

private var textStatsNewspaperAd: SpriteText;
private var textStatsBillboardAd: SpriteText;
private var textStatsTvAd: SpriteText;
public var textStats = [textStatsNewspaperAd, textStatsBillboardAd, textStatsTvAd];

public class PurchaseBusinessItemView extends FullSizeMenuView {

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
	 * Displays the menu starting with production tab
	 */
	function showMenu() {
		super.showMenu();
	}

	/**
	 * Sets button text for each of the buy buttons
	 */
	function setButtonText(buttonTexts : String[]) {
		for(var buttonIndex : int = 0; buttonIndex < buttonTexts.length; buttonIndex++) {
			textBuy[buttonIndex].Text = buttonTexts[buttonIndex];
		}
	}
}