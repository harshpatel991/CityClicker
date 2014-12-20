#pragma strict

/**
 * Defines all user controlable tiles
 */
public class TileModel extends MonoBehaviour
{
 	@HideInInspector
 	var MAX_UPGRADE_LEVEL = 9; // starting with 0
 	@HideInInspector
    var currentUpgradeLevel: int = 0; //range of (0, 9)
    @HideInInspector
    var quickMenuView: QuickMenuView;

    public var myName: String;

    public function Start() {
    	quickMenuView = FindObjectsOfType(QuickMenuView)[0] as QuickMenuView;
    }

    function setQuickMenuText() {
    	Debug.Log(myName);
    	Debug.Log(currentUpgradeLevel);
    	quickMenuView.setTitleText(myName + " (Level: " + currentUpgradeLevel + ")");
    }

  	/**
  	 * Upgrades the tile if player has enough money and meets level requirements
  	 */
  	public function upgradeTile() {
  		currentUpgradeLevel += 1;
  	}
}