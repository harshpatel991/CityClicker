#pragma strict

/**
 * Model for the Lemonade Stand
 * Defines the capacities of the factory and action of creating the resource
 */
public class HospitalModel extends ProductionTileModel {
       
    public function Awake() {
		
		upgradeCost = [17000,19500,22000,25500,29000,33750,39000,45500,50000]; //index 0 is the cost of the first upgrade
		upgradeCapacityValue = [2500 , 7000 , 14000 , 23000 , 34500 , 47500 , 61500 , 77500 , 95000 , 113000];
		
	 	itemNames = ["Cash Register", "Drink Dispenser", "Drink Mixer"];
	 	itemProductionIncrease = [45.0, 55.0, 70.0]; //increase in money per second
 		itemBaseCosts = [1300, 1500, 1800];
 		itemsOwnedCount = [0,0,0];
		itemPurchaseMethods = ["pressBuyCashRegister", "pressBuyDrinkDispenser", "pressBuyDrinkMixer"];
 									
 		employeeNames = ["Teenage Employee", "Normal Employee", "Pro Employee"];
 		employeeRateIncrease = [.1, .5, 1]; //how often the employee 'clicks' the button
 		employeeBaseCosts = [450, 1500, 2100];
 		employeesOwnedCount = [0,0,0];
 		employeePurchaseMethods = ["pressBuyTeenageEmployee", "pressBuyNormalEmployee", "pressBuyProEmployee"];

		super.Awake();
    }
}