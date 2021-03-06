#pragma strict

/**
 * Model for a tile that can be purchased by the user
 */
public class ForSaleModel extends TileModel {
	var LOT_PURCHASE_COST: int = 150;
	var purchasedLot : GameObject;

	@HideInInspector
	var view : ConfirmationBoxView;
	var productsManager : ProductManager;

	function Awake() {
		super.Awake();
		productsManager = FindObjectsOfType(ProductManager)[0] as ProductManager;
		view = FindObjectsOfType(ConfirmationBoxView)[0] as ConfirmationBoxView;
	}
	
	public function setQuickMenuText() {
		quickMenuView.setInfoButtonText("Buy\nLot");
		quickMenuView.setTitleText(tileName);
	}

	/**
	 * Sets appropriate text in the menu
	 */
	public function setMenuTexts() {
		view.setTitleText("Purchase Lot");
		view.setAgreeText(LOT_PURCHASE_COST  + " #");
	}

	/**
	 * Purchase the lot if user has enough money.
	 * Replace the current gameobject with the purchase building lot
	 */
	public function buyLot() {
		
		if(productsManager.buyOrDisplayError("Money", LOT_PURCHASE_COST)) {
			gameStateManager.createNewBuilding(gameStateManager.getNewBuildingIndex(), "PurchasedLot", this.transform.position, this.transform.rotation);
  			Destroy(this.gameObject);
		}
	}
}