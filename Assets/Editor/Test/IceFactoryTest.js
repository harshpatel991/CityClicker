import NUnit.Framework;

@TestFixture
class IceFactoryTest
 {
     @Test
     function testMakeIceWithCapacity() {
     	var iceFactory: IceFactoryModel = new IceFactoryModel();
     	var productManager: ProductManager = new ProductManager();
     	productManager.Awake();//initialize
		iceFactory.productsManager = productManager;

		productManager.modifyValue("Ice", -5);
     	iceFactory.incrementProduct();
     	iceFactory.transferProduct();
        Assert.That(productManager.getCurrent("Ice") == -4);
     }
     
     @Test
     function testMakeIceWithoutCapacity() {
     	var iceFactory: IceFactoryModel = new IceFactoryModel();
     	var productManager: ProductManager = new ProductManager();
     	productManager.Awake();//initialize
		iceFactory.productsManager = productManager;

     	iceFactory.incrementProduct();
     	iceFactory.transferProduct();
        Assert.That(productManager.getCurrent("Ice") == 0);
     }
     
     @Test
     function testUpgrade() {
     	var iceFactory: IceFactoryModel = new IceFactoryModel();
     	var productManager: ProductManager = new ProductManager();
     	productManager.Awake();//initialize
		iceFactory.productsManager = productManager;

     	iceFactory.upgradeTile();
        Assert.That(iceFactory.currentUpgradeLevel == 1);
     }

 }