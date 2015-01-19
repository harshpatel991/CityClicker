#pragma strict

/**
 * Model for the Lemonade Stand
 * Defines the capacities of the factory and action of creating the resource
 */
public class FastFoodModel extends ProductionTileModel {
       
    public function Awake() {
		
		upgradeCost = [1500,2000,2750,3500,4500,5500,6750,8000,9500]; //index 0 is the cost of the first upgrade
		upgradeCapacityValue = [100 , 350 , 775 , 1475 , 2475 , 3975 , 5975 , 8475 , 11475 , 14975];
		
	 	itemNames = ["Cash Register", "Drink Dispenser", "Drink Mixer"];
	 	itemProductionIncrease = [10.0, 20.0, 30.0]; //increase in money per second
 		itemBaseCosts = [400, 500, 600];
 		itemsOwnedCount = [0,0,0];
		itemPurchaseMethods = ["pressBuyCashRegister", "pressBuyDrinkDispenser", "pressBuyDrinkMixer"];
 									
 		employeeNames = ["Teenage Employee", "Normal Employee", "Pro Employee"];
 		employeeRateIncrease = [.1, .5, 1]; //how often the employee 'clicks' the button
 		employeeBaseCosts = [300, 1100, 1800];
 		employeesOwnedCount = [0,0,0];
 		employeePurchaseMethods = ["pressBuyTeenageEmployee", "pressBuyNormalEmployee", "pressBuyProEmployee"];

		super.Awake();
    }
}