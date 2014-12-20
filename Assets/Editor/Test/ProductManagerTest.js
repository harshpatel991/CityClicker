import NUnit.Framework;

@TestFixture
class ProductManagerTest
 {
	private var STARTING_MONEY = 20000;	
	private var STARTING_JUICE = 0;
	private var STARTING_SUGAR = 0;
	private var STARTING_ICE = 0;

     @Test
     function testRemainingCapacityMoney() {
     	var productManager: ProductManager = new ProductManager();
     	productManager.Awake();//initialize

        Assert.That(productManager.getRemainingCapacity("Money") == 0);
     }

	@Test
     function testRemainingCapacityJuice() {
     	var productManager: ProductManager = new ProductManager();
     	productManager.Awake();//initialize

        Assert.That(productManager.getRemainingCapacity("Juice") == 0);
     }
     
     @Test
     function testRemainingCapacitySugar() {
     	var productManager: ProductManager = new ProductManager();
     	productManager.Awake();//initialize

        Assert.That(productManager.getRemainingCapacity("Sugar") == 0);
     }
     
     @Test
     function testRemainingCapacityIce() {
     	var productManager: ProductManager = new ProductManager();
     	productManager.Awake();//initialize

        Assert.That(productManager.getRemainingCapacity("Ice") == 0);
     }
     
     @Test
     function testChangeCurrentMoney() {
     	var productManager: ProductManager = new ProductManager();
     	productManager.Awake();//initialize

     	productManager.modifyValue("Money", -5);
     	Assert.That(productManager.getCurrent("Money") == STARTING_MONEY-5);
     }
     
     @Test
     function testChangeCurrentJuice() {
     	var productManager: ProductManager = new ProductManager();
     	productManager.Awake();//initialize

     	productManager.modifyValue("Juice", -5);
     	Assert.That(productManager.getCurrent("Juice") == STARTING_JUICE-5);
     }
     
     @Test
     function testChangeCurrentSugar() {
     	var productManager: ProductManager = new ProductManager();
     	productManager.Awake();//initialize

     	productManager.modifyValue("Sugar", -5);
     	Assert.That(productManager.getCurrent("Sugar") == STARTING_SUGAR-5);
     }
     
     @Test
     function testChangeCurrentIce() {
     	var productManager: ProductManager = new ProductManager();
     	productManager.Awake();//initialize

     	productManager.modifyValue("Ice", -5);
     	Assert.That(productManager.getCurrent("Ice") == STARTING_ICE-5);
     }
     
     @Test
     function testChangeCupsSold() {
     	var productManager: ProductManager = new ProductManager();
     	productManager.Awake();//initialize

     	productManager.modifyValue("CupsSold", 5);
     	Assert.That(productManager.getCurrent("CupsSold") == 5);
     }

}

