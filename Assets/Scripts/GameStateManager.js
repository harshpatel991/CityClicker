#pragma strict
//[Alpha][Android/PC/Mac/Linux]Hey r/incremental_games, for the past few weeks I have been developing a city-sim style clicker game and 
// I wanted to know if there's any interest in continuing development.
import SimpleJSON;
import System.IO;

var myGuiText: GUIText;
var lastSaveGuiText: GUIText;

private var currentBuildingIndex: int = 0;
private var gameState: SimpleJSON.JSONNode;
private var productsManager: ProductManager;

var tutorialPrefab: GameObject;

function Start () {	
	productsManager = FindObjectsOfType(ProductManager)[0] as ProductManager;
	loadGame();
}

// ============ Load saved information from serialized JOSN

function loadGame() {
	var saveData: String = "{}";
	
	//try {  
//		if (File.Exists(Application.persistentDataPath + "/sav1.json")) {
//			saveData = File.ReadAllText( Application.persistentDataPath + "/sav1.json");
//		}
		
	if (PlayerPrefs.HasKey("Save Data")) {
		saveData = PlayerPrefs.GetString("Save Data");
	}
		
//	} catch(e:System.Exception) {
//		myGuiText.text += "\n" + e.ToString();
//	}
//	
	
	gameState = SimpleJSON.JSONNode.Parse(saveData);
	
	//display tutorial
	if (gameState["data"]["tutorialCompleted"] == null || (gameState["data"]["tutorialCompleted"] != null && gameState["data"]["tutorialCompleted"].AsBool == false)) {
		var tutorialController: TutorialController = Instantiate(tutorialPrefab).GetComponent(TutorialController) as TutorialController;
		tutorialController.showTutorial();
	}
	
	var currentDate = System.DateTime.Now;
	//load last save time
	if(gameState["saveTime"] != null) {
		var savedDateString: String = gameState["saveTime"];
		var savedDate = System.DateTime.FromBinary(System.Convert.ToInt64(savedDateString));
		
		var timeDifference: System.TimeSpan = currentDate.Subtract(savedDate);
		
		lastSaveGuiText.text = "Last Saved: " + savedDate.ToString() + " Time since last save: " + timeDifference;
	}
	
	//load products manager data
	if(gameState["data"]["global"]["money"]["current"] != null) {
		productsManager.setCurrent("Money", gameState["data"]["global"]["money"]["current"].AsInt);
	}
		
	if(gameState["data"]["global"]["money"]["capacity"] != null) {
		productsManager.setCapacity("Money", gameState["data"]["global"]["money"]["capacity"].AsInt);
	}
	
	for (var i: int = 0; i< 3; i++) {
		if(gameState["data"]["global"]["money"]["bonus"][i+""] != null) {		
			var bonusEndString: String = gameState["data"]["global"]["money"]["bonus"][i+""];
			var bonusEndDate:System.DateTime = System.DateTime.FromBinary(System.Convert.ToInt64(bonusEndString));
					
			productsManager.addBonus(i, bonusEndDate); //tell products manager to remove bonus in remainingTime
		}
	}
		
	//load buildings
	if(gameState["data"]["buildings"] != null) {
		//first create a mapping from position -> grass tile, used to delete the tile
		
		var grassTiles: Hashtable = new Hashtable();
		
		for (var grassTile: GameObject in GameObject.FindGameObjectsWithTag ("Tile")) {
			grassTiles.Add(grassTile.transform.position, grassTile);
		}
	
		for (var buildingData: System.Collections.Generic.KeyValuePair.<String, JSONNode> in gameState["data"]["buildings"]) {
			var tilePosition: Vector3 = loadExistingBuilding(buildingData.Key, buildingData.Value);
			Destroy(grassTiles[tilePosition]);
			currentBuildingIndex = Mathf.Max(currentBuildingIndex, int.Parse(buildingData.Key));
		}
	}
}

//Loading a building from file
//Returns position of the tile so that the grass tile at that position can be deleted
function loadExistingBuilding(index: String, buildingData: JSONNode) {

	var buildingSaveDateString: String	 = getBuildingSaveTime(index);
	var buildingSaveDate = System.DateTime.FromBinary(System.Convert.ToInt64(buildingSaveDateString));
	var timeDifference: long = System.DateTime.Now.Subtract(buildingSaveDate).TotalSeconds;
	
	var tileType: String = buildingData["type"];

	var position = getBuildingPosition(index);
	var rotation: Quaternion = getBuildingRotation(index);
	
	var money: float = getBuildingCurrentMoney(index);
	
	
	var upgradeLevel: int = getBuildingCurrentUpgradeLevel(index);
	
	var itemsOwnedCount: int[] = getBuildingItemsOwnedCount(index);
	var employeesOwnedCount: int[] = getBuildingEmployeesOwnedCount(index);

	TileFactory.createBuilding(tileType, index, position, rotation, money, upgradeLevel, itemsOwnedCount, employeesOwnedCount, timeDifference);
	
	return position;
}

// ============= Retrieves value of an existing building ============

//Retreives the next value of the index and increases index
function getNewBuildingIndex() {
	currentBuildingIndex ++;
	Debug.Log("Get new building index: " + currentBuildingIndex);
	return currentBuildingIndex + "";
}

//Retreives the saved position of the buildingIndex
function getBuildingPosition(buildingIndex: String) {
	return new Vector3(gameState["data"]["buildings"][buildingIndex]["position"]["x"].AsInt,
						0,
						gameState["data"]["buildings"][buildingIndex]["position"]["z"].AsInt);
}

//Retreives the saved rotation of the buildingIndex
function getBuildingRotation(buildingIndex: String) {
	return new Quaternion(gameState["data"]["buildings"][buildingIndex]["rotation"]["x"].AsFloat, 
							gameState["data"]["buildings"][buildingIndex]["rotation"]["y"].AsFloat,
							gameState["data"]["buildings"][buildingIndex]["rotation"]["z"].AsFloat, 
							gameState["data"]["buildings"][buildingIndex]["rotation"]["w"].AsFloat);
}

//Loads from saved info
function getBuildingCurrentMoney(buildingIndex: String) {
	return gameState["data"]["buildings"][buildingIndex]["currentMoney"].AsFloat;
}

//Loads from saved info
function getBuildingCurrentUpgradeLevel(buildingIndex: String) {
	return gameState["data"]["buildings"][buildingIndex]["currentUpgradeLevel"].AsInt;
}

//Loads from saved info
function getBuildingItemsOwnedCount(buildingIndex: String) {	
	var itemsOwnedCount: int[] = new int[3];
	var itemsOwnedCountJSONArray = gameState["data"]["buildings"][buildingIndex]["itemsOwnedCount"];
	for(var i: int = 0; i < itemsOwnedCount.Length; i++) {
		itemsOwnedCount[i] = itemsOwnedCountJSONArray[i].AsInt;
	}
		
	return itemsOwnedCount;
}

//Loads from saved info
function getBuildingEmployeesOwnedCount(buildingIndex: String) {	
	var employeesOwnedCount: int[] = new int[3];
	var employeesOwnedCountJSONArray = gameState["data"]["buildings"][buildingIndex]["employeesOwnedCount"].AsArray;
	for(var j: int = 0; j < employeesOwnedCount.Length; j++) {
		employeesOwnedCount[j] = employeesOwnedCountJSONArray[j].AsInt;
	}
	
	return employeesOwnedCount;
}

function getBuildingSaveTime(buildingIndex: String) {	
	return gameState["data"]["buildings"][buildingIndex]["buildingSaveTime"];
}

function getTutorialCompleted() {
	return gameState["data"]["tutorialCompleted"].AsBool;
}

//============= Update values of existing buildings ================

//Saves an updated value of global current money
function updateGlobalCurrentMoney(newValue: int) {
	gameState["data"]["global"]["money"]["current"].AsInt = newValue;
	saveGame();
}

//Saves an updated value of global capacity money
function updateGlobalCapacityMoney(newValue: int) {
	gameState["data"]["global"]["money"]["capacity"].AsInt = newValue;
	saveGame();
}

//Saves an updated value of global bonus
function updateGlobalBonusMoney(index: int, endDate: System.DateTime) {
	gameState["data"]["global"]["money"]["bonus"][index+""] = endDate.ToBinary().ToString();
	saveGame();
}

//Saves an updated value of a buildings position, updates money
function updatePosition(buildingIndex: String, newPosition: Vector3, currentMoney: int) {
	gameState["data"]["buildings"][buildingIndex]["position"]["x"].AsInt = newPosition.x;
	gameState["data"]["buildings"][buildingIndex]["position"]["z"].AsInt = newPosition.z;
	updateCurrentMoney(buildingIndex, currentMoney);
}

//Saves an updated value of a buildings rotation, updates money
function updateRotation(buildingIndex: String, newValue: Quaternion, currentMoney: int) {
	gameState["data"]["buildings"][buildingIndex]["rotation"]["x"].AsFloat = newValue.x;
	gameState["data"]["buildings"][buildingIndex]["rotation"]["y"].AsFloat = newValue.y;
	gameState["data"]["buildings"][buildingIndex]["rotation"]["z"].AsFloat = newValue.z;
	gameState["data"]["buildings"][buildingIndex]["rotation"]["w"].AsFloat = newValue.w;
	updateCurrentMoney(buildingIndex, currentMoney);
}

//Saves an updated value of a buildings money, updates money, updates building save time
function updateCurrentMoney(buildingIndex: String, newValue: int) {
	gameState["data"]["buildings"][buildingIndex]["currentMoney"].AsFloat = newValue;
	
	var saveTime = System.DateTime.Now;
	gameState["data"]["buildings"][buildingIndex]["buildingSaveTime"] = saveTime.ToBinary().ToString();
	
	saveGame();
}

//Saves an updated value of a buildings upgrade level, updates money of the building
function updateUpgradeLevel(buildingIndex: String, newValue: int, currentMoney: int) {
	gameState["data"]["buildings"][buildingIndex]["currentUpgradeLevel"].AsInt = newValue;
	updateCurrentMoney(buildingIndex, currentMoney);
}

//Saves an updated value of a buildings items owned, updates money
function updateBuildingItemsOwnedCount(buildingIndex: String, itemsOwnedCount: int[], currentMoney: int) {
	for(var i: int = 0; i < itemsOwnedCount.Length; i++) {
		gameState["data"]["buildings"][buildingIndex]["itemsOwnedCount"][i].AsInt =  itemsOwnedCount[i];
	}
	updateCurrentMoney(buildingIndex, currentMoney);
}

//Saves an updated value of a buildings employees owned, updates money
function updateEmployeesOwnedCount(buildingIndex: String, employeesOwnedCount: int[], currentMoney: int) {
	for(var j: int = 0; j < employeesOwnedCount.Length; j++) {
		gameState["data"]["buildings"][buildingIndex]["employeesOwnedCount"][j].AsInt = employeesOwnedCount[j];
	}
	updateCurrentMoney(buildingIndex, currentMoney);
}

function updateTutorial(done: boolean) {
	gameState["data"]["tutorialCompleted"].AsBool = true;
	saveGame();
}

//================== Save game state and buildings =============

//Creates new building with an existing index on board and saves it in game state
function createNewBuilding(index: String, tileType: String, position: Vector3, rotation: Quaternion) {
	Debug.Log("Creating new building. Building index: " + index + "rotation: " + rotation);
	TileFactory.createBuilding(tileType, index, position, rotation,  0, 0, new int[3], new int[3], 0);
	saveNewBuilding(tileType, index, position, rotation, 0, 0, new int[3], new int[3]);
}

//Save a newly created building
function saveNewBuilding(tileType: String, buildingIndex: String, position: Vector3, rotation: Quaternion, money: float, upgradeLevel: int, itemsOwnedCount: int[], employeesOwnedCount: int[]) {
	Debug.Log("Saving a newly created building. Building index: " + buildingIndex);
	gameState["data"]["buildings"][buildingIndex]["type"] = tileType;
	
	updatePosition(buildingIndex, position, 0);	
	updateRotation(buildingIndex, rotation, 0);
	updateCurrentMoney(buildingIndex, money);
	updateUpgradeLevel(buildingIndex, upgradeLevel, 0);
	updateBuildingItemsOwnedCount(buildingIndex, itemsOwnedCount, 0);
	updateEmployeesOwnedCount(buildingIndex, employeesOwnedCount, 0);
	
	saveGame();
}

//Writes game state to file
function saveGame() {  
    try { 
    	var saveTime = System.DateTime.Now;
    	gameState["saveTime"] = saveTime.ToBinary().ToString();
    	
//		var sr = File.CreateText(Application.persistentDataPath + "/sav1.json");
//		sr.WriteLine (gameState.ToString());
//		sr.Close();

		
		PlayerPrefs.SetString("Save Data", gameState.ToString());
		
				
		lastSaveGuiText.text = "Last Saved: " + saveTime.ToString();
	} catch(e:System.Exception) {
		lastSaveGuiText.text = "Save Failed\n" + e.ToString();
	}
}

function deleteSavedGame() {
	
}

function OnApplicationPause(pauseStatus: boolean) {
	if(pauseStatus) {
		saveGame();
		
		var productionTileModels : ProductionTileModel[] = FindObjectsOfType(ProductionTileModel) as ProductionTileModel[];
		
		for(productionTileModel in productionTileModels) {
			Debug.Log("About to pause, building" + productionTileModel.gameObject.name + " index: " + productionTileModel.getBuildingIndex() + " money: " + productionTileModel.getCurrentMoney());
			
			if(productionTileModel.getBuildingIndex() != "") {
				updateCurrentMoney(productionTileModel.getBuildingIndex(), productionTileModel.getCurrentMoney());
			}
		}
		
		Application.LoadLevel(0);
	}
}

function OnApplicationQuit() {
	saveGame();
}