#pragma strict

/**
 * Model for the Lemonade Stand
 * Defines the capacities of the factory and action of creating the resource
 */
public class LemonadeStandModel extends ProductionTileModel {
       
    public function Start() {
		super.Start();
		
		upgradeCost = [250, 500, 1000, 1500, 2000, 2700, 3200, 4000, 5000]; //index 0 is the cost of the first upgrade
		
	 	itemNames = ["Cash Register", "Drink Dispenser", "Drink Mixer"];
	 	itemProductionIncrease = [10, 150, 200]; //increase in money per second
 		itemCosts = [500, 750, 1500];
 		itemsOwnedCount = [0,0,0]; // TODO: load this from file
		itemPurchaseMethods = ["pressBuyCashRegister", "pressBuyDrinkDispenser", "pressBuyDrinkMixer"];
 									
 		employeeNames = ["Teenage Employee", "Normal Employee", "Pro Employee"];
 		employeeRateIncrease = [5, 1, .5]; //how often the employee 'clicks' the button
 		employeeCosts = [100, 500, 10000];
 		employeesOwnedCount = [0,0,0];//TODO: load this from file
 		employeePurchaseMethods = ["pressBuyTeenageEmployee", "pressBuyNormalEmployee", "pressBuyProEmployee"];

		//TODO: Read numberOwned from a saved file	
    }
}

