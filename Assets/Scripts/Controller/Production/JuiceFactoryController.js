#pragma strict
/**
 * Response to user input when a button on menu is hit
 */
public class JuiceFactoryController extends ProductionTileController {
	

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
	 * User input has selected to buy a juice squeezer
	 */
	function pressBuyJuiceSqueezer() {
		model.buyItem(3);
		model.setListItems(this);
	}

	/**
	 * User input has selected to buy a home juicer
	 */
	function pressBuyHomeJuicer() {
		model.buyItem(4);
		model.setListItems(this);
	}

	/**
	 * User input has selected to buy an industrial juicer
	 */
	function pressBuyIndustrialJuicer() {
		model.buyItem(5);
		model.setListItems(this);
	}
}