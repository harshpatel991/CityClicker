#pragma strict

/**
 * Model for the Lemonade Stand
 * Defines the capacities of the factory and action of creating the resource
 */
public class MiniMartModel extends ProductionTileModel {
       
    public function Awake() {
		
		upgradeCost = [350,425,500,600,800,1500,3000,5000,8000]; //index 0 is the cost of the first upgrade
		upgradeCapacityValue = [25 , 75 , 155 , 275 , 475 , 775 , 1375 , 2375 , 3875 , 5875];
		
	 	itemNames = ["Cash Register", "Drink Dispenser", "Drink Mixer"];
	 	itemProductionIncrease = [5.0, 10.0, 15.0]; //increase in money per second
 		itemBaseCosts = [200, 250, 400];
 		itemsOwnedCount = [0,0,0];
		itemPurchaseMethods = ["pressBuyCashRegister", "pressBuyDrinkDispenser", "pressBuyDrinkMixer"];
 									
 		employeeNames = ["Teenage Employee", "Normal Employee", "Pro Employee"];
 		employeeRateIncrease = [.1, .5, 1]; //how often the employee 'clicks' the button
 		employeeBaseCosts = [250, 1000, 1600];
 		employeesOwnedCount = [0,0,0];
 		employeePurchaseMethods = ["pressBuyTeenageEmployee", "pressBuyNormalEmployee", "pressBuyProEmployee"];

		super.Awake();
    }
}