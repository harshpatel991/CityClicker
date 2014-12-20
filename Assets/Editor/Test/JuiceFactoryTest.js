import NUnit.Framework;

@TestFixture
class JuiceFactoryTest
 {
     @Test
     function testMakeJuiceWithCapacity() {
     	var juiceFactory: JuiceFactoryModel = new JuiceFactoryModel();
     	var productManager: ProductManager = new ProductManager();
		productManager.Awake();//initialize
		juiceFactory.productsManager = productManager;

		productManager.modifyValue("Juice", -5);
     	juiceFactory.incrementProduct();
     	juiceFactory.transferProduct();
        Assert.That(productManager.getCurrent("Juice") == -4);
     }
     
      @Test
     function testMakeJuiceWithOutCapacity() {
     	var juiceFactory: JuiceFactoryModel = new JuiceFactoryModel();
     	var productManager: ProductManager = new ProductManager();
     	productManager.Awake();//initialize
		juiceFactory.productsManager = productManager;

     	juiceFactory.incrementProduct();
     	juiceFactory.transferProduct();
        Assert.That(productManager.getCurrent("Juice") == 0);
     }
     
     
     @Test
     function testUpgrade() {
     	var juiceFactory: JuiceFactoryModel = new JuiceFactoryModel();
     	var productManager: ProductManager = new ProductManager();
     	productManager.Awake();//initialize
		juiceFactory.productsManager = productManager;

     	juiceFactory.upgradeTile();
        Assert.That(juiceFactory.currentUpgradeLevel == 1);
     }

 }