import database from './database.js';

class FileService {
  constructor() {
    this.baseURL = '/api/files/';
  }

  async uploadFile(file, category) {
    try {
      // Simulate file upload
      const fileData = {
        name: file.name,
        size: file.size,
        type: file.type,
        category: category,
        url: this.generateFileURL(file),
        preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null
      };

      const savedFile = database.saveFile(fileData);
      return { success: true, file: savedFile };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  generateFileURL(file) {
    if (file.type.startsWith('image/')) {
      return URL.createObjectURL(file);
    }
    return `${this.baseURL}${file.name}`;
  }

  async downloadFile(file) {
    try {
      const link = document.createElement('a');
      link.href = file.url;
      link.download = file.name;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async deleteFile(fileId) {
    try {
      database.deleteFile(fileId);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  getFiles() {
    return database.getFiles();
  }

  searchFiles(query) {
    const files = this.getFiles();
    return files.filter(file => 
      file.name.toLowerCase().includes(query.toLowerCase()) ||
      file.category.toLowerCase().includes(query.toLowerCase())
    );
  }

  getFilesByCategory(category) {
    const files = this.getFiles();
    return category === 'all' ? files : files.filter(file => file.category === category);
  }
}

export default new FileService();