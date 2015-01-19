#pragma strict

//TODO: move this as a controller for the production view

/**
 * Defines functions called by tab buttons on menus
 */

public var productionView : ProductionMenuView;
public var purchaseBuildingsView: PurchaseBuildingView;


/**
 * User input reiceived on purchase bulidings production tab
 */
function pressPurchaseProductionTab() {
	purchaseBuildingsView.showProduction();
}

/**
 * User input reiceived on purchase buildings storage tab
 */
function pressPurchaseBankTab() {
	purchaseBuildingsView.showBank();
}

