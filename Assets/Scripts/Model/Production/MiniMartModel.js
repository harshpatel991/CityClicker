#pragma strict

/**
 * Model for the Lemonade Stand
 * Defines the capacities of the factory and action of creating the resource
 */
public class MiniMartModel extends ProductionTileModel {
       
    public function Awake() {
		
		upgradeCost = [250, 500, 1000, 1500, 2000, 2700, 3200, 4000, 5000]; //index 0 is the cost of the first upgrade
		upgradeCapacityValue = [10, 50, 250, 500, 1000, 1500, 3500, 5000, 10000, 17500];
		
	 	itemNames = ["Cash Register", "Drink Dispenser", "Drink Mixer"];
	 	itemProductionIncrease = [1.0, 150.0, 200.0]; //increase in money per second
 		itemBaseCosts = [500, 750, 1500];
 		itemsOwnedCount = [0,0,0];
		itemPurchaseMethods = ["pressBuyCashRegister", "pressBuyDrinkDispenser", "pressBuyDrinkMixer"];
 									
 		employeeNames = ["Teenage Employee", "Normal Employee", "Pro Employee"];
 		employeeRateIncrease = [.1, 1, .5]; //how often the employee 'clicks' the button
 		employeeBaseCosts = [100, 500, 10000];
 		employeesOwnedCount = [0,0,0];
 		employeePurchaseMethods = ["pressBuyTeenageEmployee", "pressBuyNormalEmployee", "pressBuyProEmployee"];

		super.Awake();
    }
}