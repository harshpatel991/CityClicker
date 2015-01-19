#pragma strict

/**
 * Model for the Lemonade Stand
 * Defines the capacities of the factory and action of creating the resource
 */
public class PowerPlantModel extends ProductionTileModel {
       
    public function Awake() {
		
		upgradeCost = [80000,86000,90000,97000,110000,120000,130000,145000,159000]; //index 0 is the cost of the first upgrade
		upgradeCapacityValue = [20000 , 49000 , 89000 , 141000 , 206000 , 276000 , 348000 , 422000 , 498000 , 576000];
		
	 	itemNames = ["Cash Register", "Drink Dispenser", "Drink Mixer"];
	 	itemProductionIncrease = [80.0, 95.0, 125.0]; //increase in money per second
 		itemBaseCosts = [3000, 3500, 4000];
 		itemsOwnedCount = [0,0,0];
		itemPurchaseMethods = ["pressBuyCashRegister", "pressBuyDrinkDispenser", "pressBuyDrinkMixer"];
 									
 		employeeNames = ["Teenage Employee", "Normal Employee", "Pro Employee"];
 		employeeRateIncrease = [.1, .5, 1]; //how often the employee 'clicks' the button
 		employeeBaseCosts = [650, 1700, 2500];
 		employeesOwnedCount = [0,0,0];
 		employeePurchaseMethods = ["pressBuyTeenageEmployee", "pressBuyNormalEmployee", "pressBuyProEmployee"];

		super.Awake();
    }
}