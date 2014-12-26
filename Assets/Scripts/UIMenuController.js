#pragma strict

/**
 * Defines functions called by tab buttons on menus
 */

public var productionView : ProductionMenuView;
public var purchaseBuildingsView: PurchaseBuildingView;
public var storageView : StorageMenuView;



/**
 * User input reiceived on storage stats tab
 */
function pressStorageStatsTab() {
	storageView.showStats();
}

/**
 * User input reiceived on storage items tab
 */
function pressStorageItemsTab() {
	storageView.showItems();
}

/**
 * User input reiceived on purchase bulidings production tab
 */
function pressPurchaseProductionTab() {
	purchaseBuildingsView.showProduction();
}

/**
 * User input reiceived on purchase buildings storage tab
 */
function pressPurchaseStorageTab() {
	purchaseBuildingsView.showStorage();
}

