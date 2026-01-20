import database from './database.js';

class ProductService {
  async saveProduct(productData) {
    try {
      const savedProduct = database.saveProduct(productData);
      return { success: true, product: savedProduct };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async updateProduct(productId, updates) {
    try {
      const updatedProduct = database.updateProduct(productId, updates);
      if (updatedProduct) {
        return { success: true, product: updatedProduct };
      }
      return { success: false, error: 'Product not found' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async deleteProduct(productId) {
    try {
      database.deleteProduct(productId);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  getProducts() {
    return database.getProducts();
  }

  searchProducts(query) {
    const products = this.getProducts();
    return products.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase()) ||
      (product.hsn && product.hsn.includes(query))
    );
  }

  getProductsByCategory(category) {
    const products = this.getProducts();
    return category === 'All' ? products : products.filter(product => product.category === category);
  }

  getProductsByStatus(status) {
    const products = this.getProducts();
    return status === 'All' ? products : products.filter(product => product.status === status);
  }

  getLowStockProducts() {
    const products = this.getProducts();
    return products.filter(product => product.stock <= (product.minStock || 10));
  }

  getProductStats() {
    const products = this.getProducts();
    return {
      total: products.length,
      active: products.filter(p => p.status === 'Active').length,
      lowStock: this.getLowStockProducts().length,
      totalValue: products.reduce((sum, p) => sum + (p.price * p.stock), 0)
    };
  }

  bulkUpdateProducts(productIds, updates) {
    try {
      database.bulkUpdateProducts(productIds, updates);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  exportToCSV(products) {
    const headers = ['Name', 'Category', 'Price (₹)', 'Stock', 'GST (%)', 'HSN Code', 'Status', 'Location'];
    const csvData = products.map(p => [
      p.name, p.category, p.price, p.stock, p.gst || '18', p.hsn || '', p.status, p.location || 'Mumbai'
    ]);
    
    const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'products_export.csv';
    a.click();
    URL.revokeObjectURL(url);
    return { success: true };
  }
}

export default new ProductService();