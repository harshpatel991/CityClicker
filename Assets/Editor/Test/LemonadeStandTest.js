import NUnit.Framework;

@TestFixture
class LemonadeStandTest
 {
	private var STARTING_MONEY = 20000;	
	private var STARTING_JUICE = 0;
	private var STARTING_SUGAR = 0;
	private var STARTING_ICE = 0;
     @Test
     function testMakeLemonadeWithCapacity() {
     	var lemonadeStand: LemonadeStandModel = new LemonadeStandModel();
     	var productManager: ProductManager = new ProductManager();
     	productManager.Awake();//initialize
		lemonadeStand.productsManager = productManager;

     	lemonadeStand.makeLemonade(1, 2, 3, 4, 5);
        Assert.That(productManager.getCurrent("CupsSold") == 1);
        Assert.That(productManager.getCurrent("Money") == STARTING_MONEY+2);
        Assert.That(productManager.getCurrent("Juice") == STARTING_JUICE-3);
        Assert.That(productManager.getCurrent("Sugar") == STARTING_SUGAR-4);
        Assert.That(productManager.getCurrent("Ice") == STARTING_ICE-5);
     }
     
     @Test
     function testSellCupsWithCapacity() {
     	var lemonadeStand: LemonadeStandModel = new LemonadeStandModel();
     	var productManager: ProductManager = new ProductManager();
     	productManager.Awake();//initialize
		lemonadeStand.productsManager = productManager;

     	lemonadeStand.incrementProduct();
        Assert.That(productManager.getCurrent("CupsSold") == 0); //no cups should sell, have too much money in the bank
        Assert.That(productManager.getCurrent("Money") == STARTING_MONEY);
        Assert.That(productManager.getCurrent("Juice") == STARTING_JUICE);
        Assert.That(productManager.getCurrent("Sugar") == STARTING_SUGAR);
        Assert.That(productManager.getCurrent("Ice") == STARTING_ICE);
     }
     
     @Test
     function testSellCupsWithoutEnoughJuice() {
     	var lemonadeStand: LemonadeStandModel = new LemonadeStandModel();
     	var productManager: ProductManager = new ProductManager();
     	productManager.Awake();//initialize
		lemonadeStand.productsManager = productManager;

		productManager.modifyValue("Sugar", 100);
		productManager.modifyValue("Ice", 100);
     	lemonadeStand.incrementProduct();
        Assert.That(productManager.getCurrent("CupsSold") == 0);
        Assert.That(productManager.getCurrent("Money") == STARTING_MONEY);
        Assert.That(productManager.getCurrent("Juice") == STARTING_JUICE);
        Assert.That(productManager.getCurrent("Sugar") == STARTING_SUGAR+100);
        Assert.That(productManager.getCurrent("Ice") == STARTING_ICE+100);
     }
     
     @Test
     function testSellCupsWithoutEnoughSugar() {
     	var lemonadeStand: LemonadeStandModel = new LemonadeStandModel();
     	var productManager: ProductManager = new ProductManager();
     	productManager.Awake();//initialize
		lemonadeStand.productsManager = productManager;

		productManager.modifyValue("Ice", 100);
		productManager.modifyValue("Juice", 100);
     	lemonadeStand.incrementProduct();
        Assert.That(productManager.getCurrent("CupsSold") == 0);
        Assert.That(productManager.getCurrent("Money") == STARTING_MONEY);
        Assert.That(productManager.getCurrent("Juice") == STARTING_JUICE+100);
        Assert.That(productManager.getCurrent("Sugar") == STARTING_SUGAR);
        Assert.That(productManager.getCurrent("Ice") == STARTING_ICE+100);
     }
     
     @Test
     function testSellCupsWithoutEnoughIce() {
     	var lemonadeStand: LemonadeStandModel = new LemonadeStandModel();
     	var productManager: ProductManager = new ProductManager();
     	productManager.Awake();//initialize
		lemonadeStand.productsManager = productManager;

		productManager.modifyValue("Sugar", 100);
		productManager.modifyValue("Juice", 100);
     	lemonadeStand.incrementProduct();
        Assert.That(productManager.getCurrent("CupsSold") == 0);
        Assert.That(productManager.getCurrent("Money") == STARTING_MONEY);
        Assert.That(productManager.getCurrent("Juice") == STARTING_JUICE+100);
        Assert.That(productManager.getCurrent("Sugar") == STARTING_SUGAR+100);
        Assert.That(productManager.getCurrent("Ice") == STARTING_ICE);
     }
     
     
     @Test
     function testUpgrade() {
     	var lemonadeStand: LemonadeStandModel = new LemonadeStandModel();
     	var productManager: ProductManager = new ProductManager();
     	productManager.Awake();//initialize
		lemonadeStand.productsManager = productManager;

     	lemonadeStand.upgradeTile();
        Assert.That(lemonadeStand.currentUpgradeLevel == 1);
     }

 }