#pragma strict

/**
 * Model for the Lemonade Stand
 * Defines the capacities of the factory and action of creating the resource
 */
public class HighTechModel extends ProductionTileModel {
       
    public function Awake() {
		
		upgradeCost = [29000,34000,39000,45000,51000,58000,67000,77000,90000]; //index 0 is the cost of the first upgrade
		upgradeCapacityValue = [5000 , 14000 , 28000 , 46000 , 71000 , 103000 , 141000 , 186000 , 235000 , 285000];
		
	 	itemNames = ["Cash Register", "Drink Dispenser", "Drink Mixer"];
	 	itemProductionIncrease = [50.0, 70.0, 95.0]; //increase in money per second
 		itemBaseCosts = [1800, 2200, 2800];
 		itemsOwnedCount = [0,0,0];
		itemPurchaseMethods = ["pressBuyCashRegister", "pressBuyDrinkDispenser", "pressBuyDrinkMixer"];
 									
 		employeeNames = ["Teenage Employee", "Normal Employee", "Pro Employee"];
 		employeeRateIncrease = [.1, .5, 1]; //how often the employee 'clicks' the button
 		employeeBaseCosts = [500, 1600, 2200];
 		employeesOwnedCount = [0,0,0];
 		employeePurchaseMethods = ["pressBuyTeenageEmployee", "pressBuyNormalEmployee", "pressBuyProEmployee"];

		super.Awake();
    }
}