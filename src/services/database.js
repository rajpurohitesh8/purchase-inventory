class DatabaseService {
  constructor() {
    this.dbName = 'PI_GLOBAL_DB';
    this.initializeDB();
  }

  initializeDB() {
    if (!localStorage.getItem(this.dbName)) {
      const initialData = {
        files: [
          {
            id: 1,
            name: 'sample-product.jpg',
            size: 2048576,
            type: 'image/jpeg',
            category: 'products',
            uploadDate: '2024-01-15',
            url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop',
            createdAt: new Date().toISOString()
          },
          {
            id: 2,
            name: 'invoice-template.pdf',
            size: 1536000,
            type: 'application/pdf',
            category: 'documents',
            uploadDate: '2024-01-14',
            url: '/api/files/invoice-template.pdf',
            createdAt: new Date().toISOString()
          }
        ],
        products: [
          {
            id: 1,
            name: 'Wireless Headphones',
            category: 'Electronics',
            price: 2999,
            stock: 50,
            status: 'Active',
            gst: 18,
            hsn: '85183000',
            minStock: 10,
            supplier: 'Tech Supplies Ltd',
            location: 'Mumbai',
            createdAt: new Date().toISOString()
          },
          {
            id: 2,
            name: 'Cotton T-Shirt',
            category: 'Clothing & Textiles',
            price: 599,
            stock: 5,
            status: 'Active',
            gst: 12,
            hsn: '61091000',
            minStock: 15,
            supplier: 'Fashion Hub',
            location: 'Delhi',
            createdAt: new Date().toISOString()
          }
        ],
        orders: [],
        settings: {
          nextFileId: 3,
          nextProductId: 3,
          nextOrderId: 1
        }
      };
      localStorage.setItem(this.dbName, JSON.stringify(initialData));
    }
  }

  getData() {
    return JSON.parse(localStorage.getItem(this.dbName));
  }

  saveData(data) {
    localStorage.setItem(this.dbName, JSON.stringify(data));
  }

  saveFile(fileData) {
    const db = this.getData();
    const newFile = {
      id: db.settings.nextFileId++,
      ...fileData,
      uploadDate: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString()
    };
    db.files.push(newFile);
    this.saveData(db);
    return newFile;
  }

  getFiles() {
    return this.getData().files;
  }

  deleteFile(fileId) {
    const db = this.getData();
    db.files = db.files.filter(file => file.id !== fileId);
    this.saveData(db);
    return true;
  }

  saveProduct(productData) {
    const db = this.getData();
    const newProduct = {
      id: db.settings.nextProductId++,
      ...productData,
      createdAt: new Date().toISOString()
    };
    db.products.push(newProduct);
    this.saveData(db);
    return newProduct;
  }

  getProducts() {
    return this.getData().products;
  }

  updateProduct(productId, updates) {
    const db = this.getData();
    const productIndex = db.products.findIndex(product => product.id === productId);
    if (productIndex !== -1) {
      db.products[productIndex] = { ...db.products[productIndex], ...updates };
      this.saveData(db);
      return db.products[productIndex];
    }
    return null;
  }

  deleteProduct(productId) {
    const db = this.getData();
    db.products = db.products.filter(product => product.id !== productId);
    this.saveData(db);
    return true;
  }

  bulkUpdateProducts(productIds, updates) {
    const db = this.getData();
    db.products = db.products.map(product => 
      productIds.includes(product.id) ? { ...product, ...updates } : product
    );
    this.saveData(db);
    return true;
  }
}

export default new DatabaseService();