#pragma strict
/**
 * Response to user input when a button on menu is hit
 */
public class LemonadeStandController extends ProductionTileController {
	

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
	 * User input has selected to buy a cash register
	 */
	function pressBuyCashRegister() {
		model.buyItem(3);
		model.setListItems(this);
	}

	/**
	 * User input has selected to buy a drink dispenser
	 */
	function pressBuyDrinkDispenser() {
		model.buyItem(4);
		model.setListItems(this);
	}

	/**
	 * User input has selected to buy a drink mixer
	 */
	function pressBuyDrinkMixer() {
		model.buyItem(5);
		model.setListItems(this);
	}

	/**
	 * User input has selected to buy atomosphere
	 */
	function pressBuyAtomosphere() {
		model.buyItem(6);
		model.setListItems(this);
	}
}