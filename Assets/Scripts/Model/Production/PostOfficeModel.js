#pragma strict

/**
 * Model for the Lemonade Stand
 * Defines the capacities of the factory and action of creating the resource
 */
public class PostOfficeModel extends ProductionTileModel {
       
    public function Awake() {
		
		upgradeCost = [3000,3750,4500,5250,6000,8000,10000,12500,15000]; //index 0 is the cost of the first upgrade
		upgradeCapacityValue = [300 , 900 , 1800 , 3200 , 5000 , 7000 , 9500 , 12500 , 16000 , 20000];
		
	 	itemNames = ["Cash Register", "Drink Dispenser", "Drink Mixer"];
	 	itemProductionIncrease = [25.0, 35.0, 45.0]; //increase in money per second
 		itemBaseCosts = [550, 700, 800];
 		itemsOwnedCount = [0,0,0];
		itemPurchaseMethods = ["pressBuyCashRegister", "pressBuyDrinkDispenser", "pressBuyDrinkMixer"];
 									
 		employeeNames = ["Teenage Employee", "Normal Employee", "Pro Employee"];
 		employeeRateIncrease = [.1, .5, 1]; //how often the employee 'clicks' the button
 		employeeBaseCosts = [350, 1150, 1850];
 		employeesOwnedCount = [0,0,0];
 		employeePurchaseMethods = ["pressBuyTeenageEmployee", "pressBuyNormalEmployee", "pressBuyProEmployee"];

		super.Awake();
		
    }
}