#pragma strict

/**
 * Defines all user controlable tiles
 */
public class TileModel extends MonoBehaviour
{
 	@HideInInspector
 	var MAX_UPGRADE_LEVEL = 9; // starting with 0
    protected var currentUpgradeLevel: int = 0; //range of (0, 9) //TODO: read from file
    @HideInInspector
    var quickMenuView: QuickMenuView;
    
    protected var errorMenuView: ErrorMenuView;
    
    protected var gameStateManager: GameStateManager;

    public var tileName: String;
    protected var buildingIndex: String = "";
    
    public function Awake() {
    	quickMenuView = FindObjectsOfType(QuickMenuView)[0] as QuickMenuView;
    	gameStateManager = FindObjectsOfType(GameStateManager)[0] as GameStateManager;
    	errorMenuView = FindObjectsOfType(ErrorMenuView)[0] as ErrorMenuView;
    }
    
    
	function Initialize(index: String) {
    	buildingIndex = index;
    }
    
    function getBuildingIndex() {
    	return buildingIndex;
    }

    function setQuickMenuText() {    
    	quickMenuView.setTitleText(tileName + " (Level: " + (currentUpgradeLevel+1) + ")");
    }

  	/**
  	 * Upgrades the tile if player has enough money and meets level requirements
  	 */
  	public function upgradeTile() {
  		currentUpgradeLevel += 1;
  		
  		//gameStateManager.saveGame();
  		
  	}
  	
  	public static function Dot(increaseAmm: float[], itemCount: int[]) {
  		var total: float = 0.0;
  		for(var listIndex: int = 0; listIndex< increaseAmm.length; listIndex++) {
  			total += (increaseAmm[listIndex] * itemCount[listIndex]);
  		}
  		
  		return total;
  	}
}