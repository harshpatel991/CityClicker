#pragma strict

/**
 * Model for the Lemonade Stand
 * Defines the capacities of the factory and action of creating the resource
 */
public class FancyRestaurantModel extends ProductionTileModel {
       
    public function Awake() {
		
		upgradeCost = [6750,7500,8750,10000,10550,11750,13000,15000,17000]; //index 0 is the cost of the first upgrade
		upgradeCapacityValue = [850 , 2400 , 4900 , 8400 , 12900 , 18400 , 24150 , 30150 , 36400 , 42900];
		
	 	itemNames = ["Cash Register", "Drink Dispenser", "Drink Mixer"];
	 	itemProductionIncrease = [30.0, 35.0, 50.0]; //increase in money per second
 		itemBaseCosts = [900, 1050, 1300];
 		itemsOwnedCount = [0,0,0];
		itemPurchaseMethods = ["pressBuyCashRegister", "pressBuyDrinkDispenser", "pressBuyDrinkMixer"];
 									
 		employeeNames = ["Teenage Employee", "Normal Employee", "Pro Employee"];
 		employeeRateIncrease = [.1, .5, 1]; //how often the employee 'clicks' the button
 		employeeBaseCosts = [400, 1300, 2000];
 		employeesOwnedCount = [0,0,0];
 		employeePurchaseMethods = ["pressBuyTeenageEmployee", "pressBuyNormalEmployee", "pressBuyProEmployee"];

		super.Awake();
    }
}