# Document Verification System - Pondok Pesantren Lirboyo

A modern, responsive document verification system built with React frontend and PHP backend for Pondok Pesantren Lirboyo Kediri.

## 🚀 Quick Start

### 1. Environment Setup
```bash
# Copy environment file
cp .env.example .env

# Edit .env file dengan database credentials Anda
nano .env
```

### 2. Database Setup
```bash
# Jalankan setup database (buka di browser)
http://localhost/backend/setup.php

# Atau manual via MySQL
mysql -u root -p < backend/database/schema.sql
mysql -u root -p < backend/database/seed.sql
```

### 3. Frontend Setup
```bash
npm install
npm run dev
```

### 4. Default Login
- Username: `admin`
- Password: `admin123`

## 🚀 Features

### User Features
- **Document Verification**: Verify document authenticity by entering document number
- **Document Viewing**: View original document images (JPG format)
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional interface with smooth animations

### Admin Features
- **Document Management**: Add new documents to the system
- **Multi-Signer Selection**: Choose multiple signers with searchable dropdown
- **File Upload**: Upload document images (JPG/PNG format)
- **Real-time Validation**: Form validation with user feedback

### Technical Features
- **Secure Backend**: PHP-based REST API with input validation
- **Database Integration**: MySQL database with proper relationships
- **File Management**: Secure file upload and storage system
- **CORS Support**: Cross-origin resource sharing for frontend integration

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Vite** for build tooling

### Backend
- **PHP 7.4+** with PDO
- **MySQL 5.7+** database
- **RESTful API** architecture
- **JSON** data format

## 📋 Prerequisites

### For Development
- Node.js 16+ and npm
- PHP 7.4+ with PDO extension
- MySQL 5.7+ or MariaDB
- Web server (Apache/Nginx) or local development server

### For Production
- Web hosting with PHP 7.4+ support
- MySQL database access
- File upload permissions
- HTTPS recommended

## 🚀 Installation

### 1. Clone Repository
```bash
git clone <repository-url>
cd document-verification-system
```

### 2. Environment Configuration
```bash
# Copy environment template
cp .env.example .env

# Edit database configuration
DB_HOST=localhost
DB_NAME=document_verification
DB_USER=your_username
DB_PASS=your_password
```

### 3. Frontend Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### 4. Backend Setup

#### Automatic Setup (Recommended)
```bash
# Buka di browser untuk setup otomatis
http://localhost/backend/setup.php
```

#### Database Configuration
1. Manual database setup:
```sql
mysql -u root -p
CREATE DATABASE document_verification;
exit

# Import schema dan seed data
mysql -u root -p document_verification < backend/database/schema.sql
mysql -u root -p document_verification < backend/database/seed.sql
```

2. Database akan otomatis menggunakan konfigurasi dari `.env` file

#### File Permissions
```bash
# Set proper permissions for upload directory
chmod 755 backend/uploads/
chmod 644 backend/uploads/.htaccess
```

#### Web Server Configuration
- Upload all `backend/` files to your web hosting
- Ensure `uploads/` directory is writable
- Configure virtual host to point to backend directory

### 5. Testing
```bash
# Test API endpoints
http://localhost/backend/test/test_api.php

# Test frontend
http://localhost:5173
```

## 🔧 Configuration
### Environment Variables
```bash
# API Configuration
VITE_API_BASE_URL=http://localhost/backend/api

# Database Configuration
DB_HOST=localhost
DB_NAME=document_verification
DB_USER=root
DB_PASS=

# Upload Configuration
MAX_FILE_SIZE=10485760
ALLOWED_EXTENSIONS=jpg,jpeg,png,pdf,doc,docx
```

### Production Configuration
```bash
# Update .env untuk production
VITE_API_BASE_URL=https://yourdomain.com/backend/api
DB_HOST=your-production-host
DB_NAME=your-production-database
DB_USER=your-production-user
DB_PASS=your-secure-password
```

## 📊 Database Schema

### Tables Structure

#### `documents`
- `id` (INT, PRIMARY KEY, AUTO_INCREMENT)
- `nomor_dokumen` (VARCHAR(50), UNIQUE)
- `judul` (TEXT)
- `file_jpg` (VARCHAR(255))
- `created_at` (TIMESTAMP)

#### `document_files`
- `id` (INT, PRIMARY KEY, AUTO_INCREMENT)
- `document_id` (INT, FOREIGN KEY)
- `file_name` (VARCHAR(255))
- `file_path` (VARCHAR(255))
- `file_type` (VARCHAR(100))
- `uploaded_at` (TIMESTAMP)

#### `signers`
- `id` (INT, PRIMARY KEY, AUTO_INCREMENT)
- `nama` (VARCHAR(100))
- `jabatan` (VARCHAR(100))
- `bio` (TEXT)
- `photo` (VARCHAR(255))
- `links_json` (JSON)

#### `document_signers`
- `id` (INT, PRIMARY KEY, AUTO_INCREMENT)
- `document_id` (INT, FOREIGN KEY)
- `signer_id` (INT, FOREIGN KEY)
- `jabatan` (VARCHAR(100))

#### `users`
- `id` (INT, PRIMARY KEY, AUTO_INCREMENT)
- `username` (VARCHAR(50), UNIQUE)
- `password` (VARCHAR(255))
- `email` (VARCHAR(100))

## 🔌 API Endpoints

### Authentication
```
POST /api/login.php
```

### Document Verification
```
GET /api/verify.php?nomor_dokumen={document_number}
```

### Get All Signers
```
GET /api/signers.php
GET /api/get_signer.php?id={signer_id}
GET /api/get_signer.php?name={signer_name}
```

### Document Management
```
POST /api/create_document.php
GET /api/get_documents.php
POST /api/update_document.php
DELETE /api/delete_document.php
```

### Signer Management
```
POST /api/create_signer.php
POST /api/update_signer.php
DELETE /api/delete_signer.php
```

### File Operations
```
GET /api/download.php?file={filename}
```

## 🧪 Mock Data

System includes comprehensive mock data for development:

```typescript
// Initialize mock data
import { initMockData } from './src/utils/mockData';
initMockData();

// Debug localStorage
import { debugLocalStorage } from './src/utils/mockData';
debugLocalStorage();
```

### Mock Data Features
- 5 sample signers dengan bio lengkap
- 5 sample documents dengan multiple files
- LocalStorage integration untuk offline development
- Automatic data merging dengan API data

## 🔧 Development Tools

### Database Setup Script
```bash
# Automatic database setup
http://localhost/backend/setup.php
```

### API Testing
```bash
# Test all API endpoints
http://localhost/backend/test/test_api.php
```

### Mock Data Management
```javascript
// Clear all mock data
import { clearAllLocalStorageData } from './src/utils/mockData';
clearAllLocalStorageData();

// Check storage size
import { getLocalStorageSize } from './src/utils/mockData';
console.log('Storage size:', getLocalStorageSize());
```

## 🚀 Deployment

### Environment Setup
```bash
# Production .env
VITE_API_BASE_URL=https://yourdomain.com/backend/api
DB_HOST=your-production-host
DB_NAME=your-production-database
DB_USER=your-production-user
DB_PASS=your-secure-password
```

### Build & Deploy
```bash
# Build frontend
npm run build

# Upload dist/ ke web hosting
# Upload backend/ ke web hosting
# Jalankan setup.php di production
```

## 🐛 Troubleshooting

### Database Connection Issues
```bash
# Check .env configuration
cat .env

# Test database connection
php -r "
require 'backend/config/database.php';
\$db = new Database();
\$conn = \$db->getConnection();
echo \$conn ? 'Connected' : 'Failed';
"
```

### API Issues
```bash
# Test API endpoints
curl http://localhost/backend/api/signers.php

# Check error logs
tail -f backend/api/error_log
```

### Frontend Issues
```bash
# Check environment variables
echo $VITE_API_BASE_URL

# Clear localStorage
localStorage.clear()
```

## 📝 Default Accounts

### Admin Account
- Username: `admin`
- Password: `admin123`
- Email: `admin@lirboyo.net`

### Sekretaris Account  
- Username: `sekretaris`
- Password: `admin123`
- Email: `sekretaris@lirboyo.net`

**⚠️ Ganti password default setelah setup!**
Content-Type: multipart/form-data

Fields:
- nomor_dokumen: string
- judul: string
- signers: array of signer IDs
- file: image file (JPG/PNG)
```

### Get Document Image
```
GET /api/uploads/{filename}
```

## 🎨 Design System

### Color Palette
- **Primary Green**: #22c55e
- **Secondary Emerald**: #10b981
- **Accent Orange**: #f97316
- **Success**: #16a34a
- **Error**: #dc2626
- **Warning**: #ca8a04

### Typography
- **Headings**: Inter font family, 120% line height
- **Body Text**: Inter font family, 150% line height
- **Font Weights**: Regular (400), Medium (500), Bold (700)

### Spacing System
- Based on 8px grid system
- Consistent margins and padding
- Responsive breakpoints: 640px, 768px, 1024px, 1280px

## 🔒 Security Features

### Input Validation
- Server-side validation for all inputs
- File type and size restrictions
- SQL injection prevention with prepared statements
- XSS protection with output escaping

### File Upload Security
- Restricted file types (JPG, PNG only)
- File size limits (10MB maximum)
- Secure file naming and storage
- Directory traversal prevention

### Database Security
- Prepared statements for all queries
- Proper error handling without information disclosure
- Database connection security

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Features
- Fluid layouts with CSS Grid and Flexbox
- Responsive typography scaling
- Touch-friendly interface elements
- Optimized images and assets

## 🚀 Deployment

### Frontend Deployment
1. Build the project: `npm run build`
2. Upload `dist/` contents to your web server
3. Configure web server for SPA routing

### Backend Deployment
1. Upload all `backend/` files to your hosting
2. Create MySQL database and import schema
3. Configure database connection
4. Set proper file permissions
5. Test API endpoints

### Production Checklist
- [ ] Database connection configured
- [ ] File upload directory writable
- [ ] HTTPS enabled
- [ ] Error reporting disabled in production
- [ ] API endpoints accessible
- [ ] CORS headers configured
- [ ] File size limits set appropriately

## 🧪 Testing

### Manual Testing
1. **Document Verification**
   - Test with valid document numbers
   - Test with invalid document numbers
   - Verify error handling

2. **Admin Panel**
   - Test document creation
   - Test file upload functionality
   - Test signer selection

3. **Responsive Design**
   - Test on different screen sizes
   - Verify mobile usability
   - Check touch interactions

## 🐛 Troubleshooting

### Common Issues

#### "Database connection failed"
- Check database credentials in `config/database.php`
- Verify database server is running
- Ensure database exists and is accessible

#### "File upload failed"
- Check directory permissions (755 for directories, 644 for files)
- Verify PHP upload settings (`upload_max_filesize`, `post_max_size`)
- Ensure sufficient disk space

#### "CORS errors"
- Configure proper CORS headers in PHP files
- Check API endpoint URLs
- Verify server configuration

#### "Images not displaying"
- Check file paths and URLs
- Verify upload directory permissions
- Ensure files were uploaded successfully

## 📞 Support

For technical support or questions:
- Create an issue in the repository
- Check the troubleshooting section
- Review the API documentation

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Pondok Pesantren Lirboyo Kediri
- React and PHP communities
- Contributors and testers

---

**Version**: 1.0.0  
**Last Updated**: January 2025  
**Maintained by**: Development Team