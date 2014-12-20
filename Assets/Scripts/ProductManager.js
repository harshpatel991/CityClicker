#pragma strict

/**
 * Manages all the global resources used in the game including cups sold, money, juice, sugar, and ice.
 * Resrouces created in each of the factories are not transfered to the product manager until user decides to transfer resource
 * Keeps track of each resources capacity and current value.
 * Updates the LemonadeBusinessHUDView if a resource's current value is changed.
 */
public class ProductManager extends MonoBehaviour {
 	private var hudView : LemonadeBusinessHUDView;

	private var capacity: Hashtable;
	private var current: Hashtable;
	private var bonus: Hashtable; //decimal percentage bounus to add to any prodcut that is earned


	private var STARTING_MONEY_CAPACITY = 20000.0;
	private var STARTING_MONEY = 20000.0; 


	/**
	 * Called before the start of any other script's Start()
	 * Initializes capacity and current hashtables
	 */
	function Awake() {

		capacity = new Hashtable();
		current = new Hashtable();
		bonus = new Hashtable();

		capacity.Add("Money", STARTING_MONEY_CAPACITY); //TODO: load these from a saved file
		capacity.Add("Juice", 0.0);
		capacity.Add("Sugar", 0.0);
		capacity.Add("Ice", 0.0);

		current.Add("Money", STARTING_MONEY);
		current.Add("Juice", 0.0);
		current.Add("Sugar", 0.0);
		current.Add("Ice", 0.0);
		current.Add("CupsSold", 0.0);

		bonus.Add("Money", 0.0);
		bonus.Add("Juice", 0.0);
		bonus.Add("Sugar", 0.0);
		bonus.Add("Ice", 0.0);
		bonus.Add("CupsSold", 0.0);
	}
	
	function Start() {
		hudView = gameObject.GetComponent("LemonadeBusinessHUDView") as LemonadeBusinessHUDView; 
		hudView.updateTextMoney(getCurrent("Money"), getCapacity("Money")); 
		hudView.updateTextJuice(getCurrent("Juice"), getCapacity("Juice"));
		hudView.updateTextSugar(getCurrent("Sugar"), getCapacity("Sugar"));
		hudView.updateTextIce(getCurrent("Ice"), getCapacity("Ice"));
	}

	/**
	 * Retrieves the current globally shared amount of product
	 * @param product Name of the product to retrieve
	 */ 
	function getCurrent(product: String) {
		return parseFloat(current[product].ToString());
	}
		
	/**
	 * Modifies the resource by the value specified and updates the HUD
	 * @param product Either "Money", "Juice", "Sugar", "Ice", or "SupSold"
	 * @param value Amount to increase the product
	 */
	function modifyValue(product: String, value: int) {
		var currentValue: double = getCurrent(product);
		current[product] = currentValue + value + (getBonus(product) * value);

		if(hudView != null) {
			if(product == "Money") {
				hudView.updateTextMoney(getCurrent(product), capacity["Money"]);
			} else if (product == "Juice") {
				hudView.updateTextJuice(getCurrent(product), capacity["Juice"]);
			} else if (product == "Sugar") {
				hudView.updateTextSugar(getCurrent(product), capacity["Sugar"]);
			} else if (product == "Ice") {
				hudView.updateTextIce(getCurrent(product), capacity["Ice"]);
			} else if (product == "CupsSold") {
				hudView.updateTextCups(current["CupsSold"]);
			} else {
				Debug.LogWarning("Modify value called with an invalid key: " + product);
			}

			if(bonus[product] != 0) {
				//TODO: tell view to play an animation that tells player a bounus was added
			}
		}
	}

	/**
	 * Retrieves the global capacity of the shared product
	 * @param product Name of the product to retrieve
	 */
	function getCapacity(product: String) {
		return parseInt(capacity[product].ToString());
	}

	/**
	 * Sets the capacity value of a product
	 * @param product Name of the resouce capacity to change 
	 */
	function setCapacity(product: String, value: int) {
		capacity[product] = value;
	}

	/**
	 * Retrieves the remaining capaicity in the globally shared resrouce
 	 * @param product Name of the product to retrieve
	 */
	function getRemainingCapacity(product: String) {
		return getCapacity(product) - getCurrent(product);
	}

	/**
	 * Retrieves the current bonus for a particular resource
	 * @param product the name of the resource to retrieve
	 */
	function getBonus(product: String) {
		return parseFloat(bonus[product].ToString());
	}

	/**
	 * Adds a bonus for a particular resource
	 * @param product the name of the resource to retrieve
	 * @param value the value to add to resrouce bonus
	 */
	function addBonus(product: String, value: double) {
		bonus[product] = getBonus(product) + value;
	}
}