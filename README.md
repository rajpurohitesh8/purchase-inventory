<<<<<<< HEAD
# Purchase-Inventory Management System

A modern, full-featured inventory management system built with React, designed specifically for Indian businesses with GST compliance and professional UI/UX.

## 🚀 Features

### 📦 **Product Management**
- Complete CRUD operations for products
- Indian GST compliance (0%, 5%, 12%, 18%, 28%)
- HSN code validation and management
- Low stock alerts and notifications
- Bulk operations (update, delete)
- CSV export functionality
- Advanced search and filtering

### 📁 **File Management**
- Drag & drop file upload
- Image preview with zoom and rotation controls
- File categorization and organization
- Download and share functionality
- Search and filter files
- Support for images, PDFs, documents

### 📊 **Dashboard & Analytics**
- Real-time business metrics
- Interactive charts and graphs
- Revenue and profit tracking
- Category-wise performance analysis
- Recent activity monitoring

### 🛒 **Order Management**
- Complete order lifecycle management
- Customer information tracking
- GST calculations and invoicing
- Order status tracking
- Payment method integration

### 🇮🇳 **Indian Business Ready**
- GST rate calculations
- HSN code management
- Indian state/city selection
- INR currency formatting
- Compliance-ready invoicing

## 🛠 Technology Stack

- **Frontend**: React 18, Framer Motion, Tailwind CSS
- **Icons**: Lucide React
- **Charts**: Chart.js, Recharts
- **Authentication**: Clerk
- **Database**: LocalStorage (can be upgraded to any backend)
- **Styling**: Modern gradient designs, responsive layout

## 📱 Screenshots

### Dashboard
![Dashboard](https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=Modern+Dashboard)

### Product Management
![Products](https://via.placeholder.com/800x400/059669/FFFFFF?text=Product+Management)

### File Upload
![Upload](https://via.placeholder.com/800x400/7C3AED/FFFFFF?text=File+Management)

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/Purchase-Inventory.git
   cd Purchase-Inventory
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Add your Clerk authentication keys:
   ```
   REACT_APP_CLERK_PUBLISHABLE_KEY=your_clerk_key_here
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 📖 Usage Guide

### Getting Started
1. **Sign Up/Login**: Create an account or login using Clerk authentication
2. **Dashboard**: View your business overview and key metrics
3. **Add Products**: Navigate to Products and start adding your inventory
4. **Upload Files**: Use the Upload section for product images and documents
5. **Manage Orders**: Track and manage customer orders

### Key Features Usage

#### Product Management
- Click "Add Product" to create new inventory items
- Fill in product details including GST and HSN codes
- Use bulk operations for multiple product updates
- Export data to CSV for external use

#### File Management
- Drag and drop files or click to browse
- Preview images with zoom and rotation
- Organize files by categories
- Share files with generated links

#### Dashboard Analytics
- Monitor real-time business metrics
- Track revenue and profit trends
- Analyze category performance
- View recent activities

## 🔧 Configuration

### Database Setup
The system uses LocalStorage by default. To upgrade to a backend database:

1. Replace the database service in `src/services/database.js`
2. Update API endpoints in service files
3. Configure your preferred database (MongoDB, PostgreSQL, etc.)

### Authentication
The project uses Clerk for authentication. Configure in your Clerk dashboard:
- Set up sign-in/sign-up flows
- Configure social logins if needed
- Customize authentication UI

## 🎨 Customization

### Styling
- Modify `tailwind.config.js` for theme customization
- Update color schemes in component files
- Customize animations in Framer Motion components

### Features
- Add new product categories in `src/data/categories.js`
- Extend GST rates in product forms
- Add new chart types in dashboard

## 📊 Database Schema

### Products
```javascript
{
  id: number,
  name: string,
  category: string,
  price: number,
  stock: number,
  status: 'Active' | 'Inactive',
  gst: number,
  hsn: string,
  minStock: number,
  supplier: string,
  location: string,
  createdAt: string
}
```

### Files
```javascript
{
  id: number,
  name: string,
  size: number,
  type: string,
  category: string,
  url: string,
  uploadDate: string,
  createdAt: string
}
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Netlify
1. Connect repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `build`

### Manual Deployment
```bash
npm run build
# Upload build folder to your hosting provider
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📧 Email: support@purchase-inventory.com
- 💬 Discord: [Join our community](https://discord.gg/purchase-inventory)
- 📖 Documentation: [Full docs](https://docs.purchase-inventory.com)

## 🙏 Acknowledgments

- React team for the amazing framework
- Clerk for authentication services
- Tailwind CSS for styling system
- Framer Motion for animations
- Lucide for beautiful icons

---

**Made with ❤️ for Indian businesses**

*Simplifying inventory management with modern technology*
=======
# Purchase-Inventory
A comprehensive inventory management system designed to track stock levels, manage orders, and streamline warehouse operations.
>>>>>>> 709fd960cea16692dd9e875524196ba3da55305a
