#pragma strict

/**
 * Base class for Lemonade Stand tile and Juice/Sugar/Ice factory tiles
 */
public class ProductionTileModel extends TileModel {

 	@HideInInspector
 	var view: ProductionMenuView;
 	@HideInInspector
	var productsManager : ProductManager;

	var listItemPrefab : GameObject;

	var incrementParticles: GameObject;

	function Start() {
		super.Start();
		productsManager = FindObjectsOfType(ProductManager)[0] as ProductManager;
		view = FindObjectsOfType(ProductionMenuView)[0] as ProductionMenuView;
	}

	/**
  	 * Sets the text for the for the menu items
  	 */
	function setMenuTexts() {
		Debug.LogWarning("This should not be directly called."); //defined by children, abstract classes don't exist in Unity JS
	}

	/**
  	 * Creates the resource if capacity exists
  	 */
	function incrementProduct() {
		Debug.LogWarning("This should not be directly called."); //defined by children, abstract classes don't exist in Unity JS
	}

	/**
  	 * Transfers the accumulated product to global prodcut manager
  	 */
	function transferProduct() {
		Debug.LogWarning("This should not be directly called."); //defined by children, abstract classes don't exist in Unity JS
	}

	/**
  	 * Adds items to the list of items that can be purchased for this tile
  	 */
	function addListItems(productionTileController: ProductionTileController, itemNames: String[], itemProductionIncrease: int[], itemCosts:int[], methodsToCall: String[], numberItemsOwned: int[]) {
		
		//Add all list items to scroll list and hook wire one up
  		for(var listItemIndex: int = 0; listItemIndex < itemNames.Length; listItemIndex++) {
  			var listItem = Instantiate(listItemPrefab);
  			var listItemView : ListItemView = listItem.GetComponent(ListItemView) as ListItemView;
  			listItemView.setTextItemName(itemNames[listItemIndex]);
  			listItemView.setTextStats("+" + (itemProductionIncrease[listItemIndex]*60)+ "/minute");
  			listItemView.setButtonBuyObject(productionTileController);
  			listItemView.setButtonBuyMethod(methodsToCall[listItemIndex]);
  			listItemView.setTextBuy("Buy - " + getItemCost(listItemIndex, itemCosts, numberItemsOwned));
  			view.productionItemsList.AddItem(listItem);
  		}
	}

	/**
	 * Determines the cost of the item as determined by the type of item 
	 */
	public function getItemCost(itemIndex: int, itemCosts: int[], numberItemsOwned: int[]) {
		return (itemCosts[itemIndex] * Mathf.Pow(1.3, numberItemsOwned[itemIndex]));
	}

	function setListItems(productionTileController: ProductionTileController) {
		Debug.LogWarning("This should not be directly called."); //defined by children, abstract classes don't exist in Unity JS
	}


	/**
  	 * Buy an item for the production tile model
  	 */
	function buyItem(index: int) {
		Debug.LogWarning("This should not be directly called."); //defined by children, abstract classes don't exist in Unity JS
	}
}