#pragma strict
 
public class TileFactory extends MonoBehaviour {
	protected static var instance: TileFactory; // Needed

 	//Gameobjects used to replace the current tile with the building tile
  	var lemonadeStandPrefab : GameObject;
  	var miniMartPrefab : GameObject;
  	var fastFoodPrefab: GameObject;
  	var postOfficePrefab: GameObject;
  	var fancyRestaurantPrefab: GameObject;
  	var hospitalPrefab: GameObject;
  	var highTechCompanyPrefab: GameObject;
  	var powerPlantPrefab: GameObject;
  	
  	var bankPrefab: GameObject;
  	
  	var purchasedLot: GameObject;

	public function Awake() {
		instance = this;
	}
	
	public static function createBuilding(tileType: String, index: String, position: Vector3, rotation: Quaternion, money: float, upgradeLevel: int, itemsOwnedCount: int[], employeesOwnedCount: int[], timeDifference: long) {
		switch(tileType) {
			case "LemonadeStand":
				createLemonadeStand(index, position, rotation, money, upgradeLevel, itemsOwnedCount, employeesOwnedCount, timeDifference);
				break;
			case "MiniMart":
				createMiniMart(index, position, rotation, money, upgradeLevel, itemsOwnedCount, employeesOwnedCount, timeDifference);
				break;
			case "FastFood":
				createFastFood(index, position, rotation, money, upgradeLevel, itemsOwnedCount, employeesOwnedCount, timeDifference);
				break;
			case "PostOffice":
				createPostOffice(index, position, rotation, money, upgradeLevel, itemsOwnedCount, employeesOwnedCount, timeDifference);
				break;
			case "FancyRestaurant":
				createFancyRestaurant(index, position, rotation, money, upgradeLevel, itemsOwnedCount, employeesOwnedCount, timeDifference);
				break;
			case "Hospital":
				createHospital(index, position, rotation, money, upgradeLevel, itemsOwnedCount, employeesOwnedCount, timeDifference);
				break;
			case "HighTechCompany":
				createHighTechCompany(index, position, rotation, money, upgradeLevel, itemsOwnedCount, employeesOwnedCount, timeDifference);
				break;
			case "PowerPlant":
				createPowerPlant(index, position, rotation, money, upgradeLevel, itemsOwnedCount, employeesOwnedCount, timeDifference);
				break;
			case "PurchasedLot":
				createPurchasedLot(index, position, rotation);
				break;
			default:
				Debug.LogWarning(tileType + " is not a valid building type.");
				return;
		}
	}
	
	public static function createAndInitializeProductionBuilding(building: GameObject, index: String, position: Vector3, rotation: Quaternion, money: float,
														upgradeLevel: int, itemsOwnedCount: int[], employeesOwnedCount: int[], timeDifference: long) {
		var tile = Instantiate(building, position, rotation);
		var productionTileModel = tile.GetComponent(ProductionTileModel) as ProductionTileModel;
		productionTileModel.Initialize(index, money, upgradeLevel, itemsOwnedCount, employeesOwnedCount, timeDifference);
		return tile;
	}
	
	public static function createLemonadeStand(index: String, position: Vector3, rotation: Quaternion, money: float, upgradeLevel: int, itemsOwnedCount: int[], employeesOwnedCount: int[], timeDifference: long) {
		return createAndInitializeProductionBuilding(instance.lemonadeStandPrefab, index, position, rotation, money, upgradeLevel, itemsOwnedCount, employeesOwnedCount, timeDifference);
	}

	public static function createMiniMart(index: String, position: Vector3, rotation: Quaternion, money: float, upgradeLevel: int, itemsOwnedCount: int[], employeesOwnedCount: int[], timeDifference: long) {
		return createAndInitializeProductionBuilding(instance.miniMartPrefab, index, position, rotation, money, upgradeLevel, itemsOwnedCount, employeesOwnedCount, timeDifference);
	}
	
	public static function createFastFood(index: String, position: Vector3, rotation: Quaternion, money: float, upgradeLevel: int, itemsOwnedCount: int[], employeesOwnedCount: int[], timeDifference: long) {
		return createAndInitializeProductionBuilding(instance.fastFoodPrefab, index, position, rotation, money, upgradeLevel, itemsOwnedCount, employeesOwnedCount, timeDifference);
	}

	public static function createPostOffice(index: String, position: Vector3, rotation: Quaternion, money: float, upgradeLevel: int, itemsOwnedCount: int[], employeesOwnedCount: int[], timeDifference: long) {
		return createAndInitializeProductionBuilding(instance.postOfficePrefab, index, position, rotation, money, upgradeLevel, itemsOwnedCount, employeesOwnedCount, timeDifference);
	}

	public static function createFancyRestaurant(index: String, position: Vector3, rotation: Quaternion, money: float, upgradeLevel: int, itemsOwnedCount: int[], employeesOwnedCount: int[], timeDifference: long) {
		return createAndInitializeProductionBuilding(instance.fancyRestaurantPrefab, index, position, rotation, money, upgradeLevel, itemsOwnedCount, employeesOwnedCount, timeDifference);
	}

	public static function createHospital(index: String, position: Vector3, rotation: Quaternion, money: float, upgradeLevel: int, itemsOwnedCount: int[], employeesOwnedCount: int[], timeDifference: long) {
		return createAndInitializeProductionBuilding(instance.hospitalPrefab, index, position, rotation, money, upgradeLevel, itemsOwnedCount, employeesOwnedCount, timeDifference);
	}
	
	public static function createHighTechCompany(index: String, position: Vector3, rotation: Quaternion, money: float, upgradeLevel: int, itemsOwnedCount: int[], employeesOwnedCount: int[], timeDifference: long) {
		return createAndInitializeProductionBuilding(instance.highTechCompanyPrefab, index, position, rotation, money, upgradeLevel, itemsOwnedCount, employeesOwnedCount, timeDifference);
	}
	
	public static function createPowerPlant(index: String, position: Vector3, rotation: Quaternion, money: float, upgradeLevel: int, itemsOwnedCount: int[], employeesOwnedCount: int[], timeDifference: long) {
		return createAndInitializeProductionBuilding(instance.powerPlantPrefab, index, position, rotation, money, upgradeLevel, itemsOwnedCount, employeesOwnedCount, timeDifference);
	}

	public static function createBank(index: String, position: Vector3, rotation: Quaternion, money: float, upgradeLevel: int, itemsOwnedCount: int[], employeesOwnedCount: int[], timeDifference: long) {
		return createAndInitializeProductionBuilding(instance.bankPrefab, index, position, rotation, money, upgradeLevel, itemsOwnedCount, employeesOwnedCount, timeDifference);
	}
	
	public static function createPurchasedLot(index: String, position: Vector3, rotation: Quaternion) {
		var tile = Instantiate(instance.purchasedLot, position, rotation);
		
		var tileModel = tile.GetComponent(TileModel) as TileModel;
		tileModel.Initialize(index);
		return tile;
	}
}