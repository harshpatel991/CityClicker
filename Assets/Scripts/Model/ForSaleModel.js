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

	/**
	 * Sets appropriate text in the menu
	 */
	public function setMenuTexts() {
		view.setTitleText("Purchase Lot");
		view.setAgreeText("Buy - $" + LOT_PURCHASE_COST);
	}

	/**
	 * Purchase the lot if user has enough money.
	 * Replace the current gameobject with the purchase building lot
	 */
	public function buyLot() {
		if(productsManager.getCurrent("Money") >= LOT_PURCHASE_COST) {
			productsManager.modifyValue("Money", -1*LOT_PURCHASE_COST);
			gameStateManager.createNewBuilding(gameStateManager.getNewBuildingIndex(), "PurchasedLot", this.transform.position, this.transform.rotation);
  			Destroy(this.gameObject);
		}
	}
}