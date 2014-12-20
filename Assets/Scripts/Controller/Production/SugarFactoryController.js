#pragma strict
/**
 * Response to user input when a production tile is hit or a button from the production tile menu is hit
 */
public class SugarFactoryController extends ProductionTileController {

	/**
	 * User input has selected to buy a teenage employee
	 */
	function pressBuyTeenageEmployee() {
		model.buyItem(0);
		model.setListItems(this); //updates the view
	}

	/**
	 * User input has selected to buy a normal employee
	 */
	function pressBuyNormalEmployee() {
		model.buyItem(1);
		model.setListItems(this);
	}

	/**
	 * User input has selected to buy a professional employee
	 */
	function pressBuyProEmployee() {
		model.buyItem(2);
		model.setListItems(this);
	}

	/**
	 * User input has selected to buy a rolling pin
	 */
	function pressBuyRollingPin() {
		model.buyItem(3);
		model.setListItems(this);
	}

	/**
	 * User input has selected to buy a cane crusher
	 */
	function pressBuyCaneCrusher() {
		model.buyItem(4);
		model.setListItems(this);
	}

	/**
	 * User input has selected to buy an industrian cane crusher
	 */
	function pressBuyIndustrialCaneCrusher() {
		model.buyItem(5);
		model.setListItems(this);
	}
}