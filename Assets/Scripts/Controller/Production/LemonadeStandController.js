#pragma strict
/**
 * Response to user input when a button on menu is hit
 */
public class LemonadeStandController extends ProductionTileController {
	
	/**
	 * User input has selected to buy a teenage employee
	 */
	function pressBuyTeenageEmployee() {
		model.buyEmployee(0);
		model.setListEmployees(this); //updates the view
	}

	/**
	 * User input has selected to buy a normal employee
	 */
	function pressBuyNormalEmployee() {
		model.buyEmployee(1);
		model.setListEmployees(this); //updates the view
	}

	/**
	 * User input has selected to buy a professional employee
	 */
	function pressBuyProEmployee() {
		model.buyEmployee(2);
		model.setListEmployees(this); //updates the view
	}

	/**
	 * User input has selected to buy a cash register
	 */
	function pressBuyCashRegister() {
		model.buyItem(0);
		model.setListItems(this); //updates the view
	}

	/**
	 * User input has selected to buy a drink dispenser
	 */
	function pressBuyDrinkDispenser() {
		model.buyItem(1);
		model.setListItems(this); //updates the view
	}

	/**
	 * User input has selected to buy a drink mixer
	 */
	function pressBuyDrinkMixer() {
		model.buyItem(2);
		model.setListItems(this); //updates the view
	}
}