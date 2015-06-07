#pragma strict
/**
 * Response to user input when a button on menu is hit
 */
public class LemonadeStandController extends ProductionTileController {
	
	/**
	 * User input has selected to buy a teenage employee
	 */
	function pressBuyTeenageEmployee() {
		model.buyEmployee(0); //sets the function and index references up
		super.showConfirmationBox();
	}

	/**
	 * User input has selected to buy a normal employee
	 */
	function pressBuyNormalEmployee() {
		model.buyEmployee(1);
		super.showConfirmationBox();
	}

	/**
	 * User input has selected to buy a professional employee
	 */
	function pressBuyProEmployee() {
		model.buyEmployee(2);
		super.showConfirmationBox();
	}

	/**
	 * User input has selected to buy a cash register
	 */
	function pressBuyCashRegister() {
		model.buyItem(0);
		super.showConfirmationBox();
	}

	/**
	 * User input has selected to buy a drink dispenser
	 */
	function pressBuyDrinkDispenser() {
		model.buyItem(1);
		super.showConfirmationBox();
	}

	/**
	 * User input has selected to buy a drink mixer
	 */
	function pressBuyDrinkMixer() {
		model.buyItem(2);
		super.showConfirmationBox();
	}
}