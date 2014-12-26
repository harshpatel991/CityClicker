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

    public var myName: String;

    public function Start() {
    	quickMenuView = FindObjectsOfType(QuickMenuView)[0] as QuickMenuView;
    }

    function setQuickMenuText() {
    	quickMenuView.setTitleText(myName + " (Level: " + currentUpgradeLevel + ")");
    }

  	/**
  	 * Upgrades the tile if player has enough money and meets level requirements
  	 */
  	public function upgradeTile() {
  		currentUpgradeLevel += 1;
  	}
  	
  	public static function Dot(increaseAmm: float[], itemCount: int[]) {
  		var total: float = 0.0;
  		for(var listIndex: int = 0; listIndex< increaseAmm.length; listIndex++) {
  			total += (increaseAmm[listIndex] * itemCount[listIndex]);
  		}
  		
  		return total;
  	}
}