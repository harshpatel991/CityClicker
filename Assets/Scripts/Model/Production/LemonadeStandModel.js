#pragma strict

/**
 * Model for the Lemonade Stand
 * Defines the capacities of the factory and action of creating the resource
 */
public class LemonadeStandModel extends ProductionTileModel {
       
    public function Awake() {
						
		upgradeCost = [180,200,250,300,375,500,1000,1750,4000]; //index 0 is the cost of the first upgrade
		upgradeCapacityValue = [10 , 30 , 60 , 110 , 210 , 410 , 710 , 1310 , 2410 , 4910];
		
	 	itemNames = ["Cash Register", "Drink Dispenser", "Drink Mixer"];
	 	itemProductionIncrease = [1.0, 2.0, 5.0]; //increase in money per second
 		itemBaseCosts = [125, 200, 350];
 		itemsOwnedCount = [0,0,0];
		itemPurchaseMethods = ["pressBuyCashRegister", "pressBuyDrinkDispenser", "pressBuyDrinkMixer"];
 									
 		employeeNames = ["Teenage Employee", "Normal Employee", "Pro Employee"];
 		employeeRateIncrease = [.1, .5, 1]; //how often the employee 'clicks' the button
 		employeeBaseCosts = [200, 900, 1500];
 		employeesOwnedCount = [0,0,0];
 		employeePurchaseMethods = ["pressBuyTeenageEmployee", "pressBuyNormalEmployee", "pressBuyProEmployee"];

		super.Awake();
    }
    
}