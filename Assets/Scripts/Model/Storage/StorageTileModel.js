#pragma strict

/**
 * Base class for Lemonade Stand tile and Juice/Sugar/Ice factory tiles
 */
public class StorageTileModel extends TileModel {

 	@HideInInspector
 	var view: StorageMenuView;
 	@HideInInspector
	var productsManager : ProductManager;

	function Awake() {
		super.Awake();
		productsManager = FindObjectsOfType(ProductManager)[0] as ProductManager;
		view = FindObjectsOfType(StorageMenuView)[0] as StorageMenuView;
	}

	/**
  	 * Sets the text for the for the menu items
  	 */
	function setMenuTexts() {
		Debug.LogWarning("This should not be directly called."); //defined by children, abstract classes don't exist in Unity JS
	}

	//function incrementProduct() {
	//	Debug.LogWarning("This should not be directly called."); //defined by children, abstract classes don't exist in Unity JS
	//}
}