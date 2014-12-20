import NUnit.Framework;

@TestFixture
class SugarFactoryTest
 {
 	private var STARTING_MONEY = 20000;	
	private var STARTING_JUICE = 0;
	private var STARTING_SUGAR = 0;
	private var STARTING_ICE = 0;

     @Test
     function testMakeSugarWithCapacity() {
     	var sugarFactory: SugarFactoryModel = new SugarFactoryModel();
     	var productManager: ProductManager = new ProductManager();
     	productManager.Awake();//initialize
		sugarFactory.productsManager = productManager;
		productManager.setCapacity("Sugar", 1);

     	sugarFactory.incrementProduct();
     	sugarFactory.transferProduct();
        Assert.That(productManager.getCurrent("Sugar") == STARTING_SUGAR + 1);
     }
     
     @Test
     function testMakeSugarWithoutCapacity() {
     	var sugarFactory: SugarFactoryModel = new SugarFactoryModel();
     	var productManager: ProductManager = new ProductManager();
     	productManager.Awake();//initialize
		sugarFactory.productsManager = productManager;
		productManager.setCapacity("Sugar", 0);

     	sugarFactory.incrementProduct();
     	sugarFactory.transferProduct();
        Assert.That(productManager.getCurrent("Sugar") == STARTING_SUGAR);
     }
     
     @Test
     function testUpgrade() {
     	var sugarFactory: SugarFactoryModel = new SugarFactoryModel();
     	var productManager: ProductManager = new ProductManager();
     	productManager.Awake();//initialize
		sugarFactory.productsManager = productManager;

     	sugarFactory.upgradeTile();
        Assert.That(sugarFactory.currentUpgradeLevel == 1);
     }

 }