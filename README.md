# 🚀 Hemanth B - Professional Portfolio

[![Portfolio Status](https://img.shields.io/badge/Status-Live-brightgreen)](https://hemanth2208.github.io/portfolio)
[![Version](https://img.shields.io/badge/Version-2.0.0-blue)](https://github.com/HEMANTH2208/portfolio)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)
[![Lighthouse Score](https://img.shields.io/badge/Lighthouse-95%2B-green)](https://hemanth2208.github.io/portfolio)

> A cutting-edge, cyberpunk-themed professional portfolio showcasing expertise in Data Science, AI, and Machine Learning with advanced animations and an intelligent admin panel.

## ✨ Features

### 🎨 **Unique Design & Animations**
- **Cyberpunk Dark Theme** with neon accents and futuristic aesthetics
- **Advanced CSS Animations** including neural networks, quantum dots, and morphing shapes
- **Liquid Morphing Backgrounds** with dynamic color transitions
- **3D Hover Effects** and magnetic button interactions
- **Custom Cursor** with smooth following effects
- **Particle Explosion** effects on interactions
- **Holographic Card** effects for projects and certificates

### 🔧 **Advanced Admin Panel**
- **Secure Authentication** with attempt limiting
- **Real-time Content Management** for projects, skills, and certificates
- **Certificate Management** with PDF/image upload support
- **Project Management** with GitHub integration
- **Analytics Dashboard** with performance metrics
- **Live Preview** of changes before publishing
- **Responsive Admin Interface** optimized for all devices

### 📱 **Modern Web Technologies**
- **Progressive Web App (PWA)** with offline support
- **Service Worker** for caching and background sync
- **Responsive Design** optimized for all screen sizes
- **Accessibility Compliant** with WCAG 2.1 guidelines
- **SEO Optimized** with structured data and meta tags
- **Performance Optimized** with lazy loading and code splitting

### 🎯 **Interactive Features**
- **Certificate Viewer** with zoom and download functionality
- **Project Gallery** with detailed modal views
- **Contact Form** with validation and notifications
- **Smooth Scrolling** with parallax effects
- **Loading Animations** with progress indicators
- **Easter Eggs** including Konami code activation

## 🛠️ Technology Stack

### Frontend
- **HTML5** - Semantic markup with accessibility features
- **CSS3** - Advanced animations, Grid, Flexbox, Custom Properties
- **Vanilla JavaScript** - ES6+, Modules, Classes, Async/Await
- **Font Awesome** - Icon library
- **Google Fonts** - Poppins font family

### Backend & Data
- **JSON** - Data storage for projects and certificates
- **Local Storage** - Client-side data persistence
- **Service Worker** - Offline functionality and caching

### Development Tools
- **ESLint** - Code linting and quality assurance
- **Prettier** - Code formatting
- **Lighthouse** - Performance and accessibility auditing
- **HTML Validator** - Markup validation

## 🚀 Quick Start

### Prerequisites
- Node.js (v16.0.0 or higher)
- Git
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/HEMANTH2208/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Admin Panel Access
- Navigate to the portfolio and click the "Admin" button in the navigation
- **Password**: `admin123`
- Access all management features from the dashboard

## 📁 Project Structure

```
portfolio/
├── 📄 index.html                 # Main HTML file
├── 📄 sw.js                      # Service Worker
├── 📄 manifest.json              # PWA Manifest
├── 📁 assets/
│   ├── 📁 css/
│   │   └── 📄 styles.css          # Main stylesheet (3000+ lines)
│   ├── 📁 js/
│   │   ├── 📄 script.js           # Main JavaScript
│   │   ├── 📄 admin.js            # Admin panel functionality
│   │   ├── 📄 certificates.js    # Certificate management
│   │   └── 📄 projects.js         # Project management
│   ├── 📁 images/
│   │   ├── 📁 projects/           # Project screenshots
│   │   ├── 📁 certificates/       # Certificate files
│   │   └── 📁 gallery/            # Additional images
│   └── 📁 data/
│       ├── 📄 projects.json       # Project data
│       └── 📄 certificates.json   # Certificate data
├── 📁 config/
│   ├── 📄 deployment.config.js    # Deployment configuration
│   ├── 📄 eslint.config.js        # ESLint configuration
│   └── 📄 prettier.config.js      # Prettier configuration
└── 📁 docs/
    ├── 📄 DEPLOYMENT.md            # Deployment guide
    └── 📄 SETUP.md                 # Setup instructions
```

## 🎨 Customization

### Adding New Projects
1. **Via Admin Panel** (Recommended)
   - Login to admin panel
   - Navigate to Projects tab
   - Click "Add Project"
   - Fill in project details and URLs

2. **Via JSON File**
   ```json
   {
     "project-id": {
       "name": "Project Name",
       "description": "Project description",
       "technologies": ["Tech1", "Tech2"],
       "demoUrl": "https://demo.com",
       "codeUrl": "https://github.com/user/repo"
     }
   }
   ```

### Adding Certificates
1. **Upload Certificate Files**
   - Place PDF/image files in `assets/images/certificates/`
   - Update certificate data via admin panel

2. **Configure Certificate Data**
   ```json
   {
     "cert-id": {
       "name": "Certificate Name",
       "issuer": "Issuing Organization",
       "file": "assets/images/certificates/cert.pdf"
     }
   }
   ```

### Customizing Theme
- Modify CSS custom properties in `assets/css/styles.css`
- Update color scheme variables
- Adjust animation timings and effects

## 🚀 Deployment

### GitHub Pages (Recommended)
```bash
npm run deploy:github
```

### Netlify
```bash
npm run deploy:netlify
```

### Vercel
```bash
npm run deploy:vercel
```

### Manual Deployment
1. Build the project: `npm run build`
2. Upload files to your hosting provider
3. Configure domain and SSL

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3.5s

## 🔧 Development

### Available Scripts
- `npm start` - Start production server
- `npm run dev` - Start development server with live reload
- `npm run build` - Build optimized version
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run lighthouse` - Run Lighthouse audit
- `npm run validate` - Validate HTML

### Code Quality
- ESLint configuration for JavaScript
- Prettier for consistent formatting
- HTML validation for markup quality
- Lighthouse auditing for performance

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Hemanth B**
- 🎓 Fellow at NxtWave's CCBP 4.0 Academy
- 🔬 Aspiring Data Scientist | AI & ML Enthusiast
- 📧 Email: [bhemanth2221@gmail.com](mailto:bhemanth2221@gmail.com)
- 💼 LinkedIn: [linkedin.com/in/hemanthb22](https://linkedin.com/in/hemanthb22)
- 🐙 GitHub: [github.com/HEMANTH2208](https://github.com/HEMANTH2208)
- 📍 Location: Sriperumbudur, Chennai, 602105

## 🙏 Acknowledgments

- **NxtWave CCBP 4.0 Academy** for the learning opportunity
- **Open Source Community** for inspiration and resources
- **Modern Web Technologies** that made this portfolio possible

## 📈 Roadmap

- [ ] **AI Chatbot Integration** for visitor interaction
- [ ] **Blog Section** with markdown support
- [ ] **Multi-language Support** (Tamil, Hindi)
- [ ] **Advanced Analytics** with visitor tracking
- [ ] **3D Animations** with Three.js integration
- [ ] **Voice Navigation** for accessibility
- [ ] **AR Business Card** feature

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

Made with ❤️ and lots of ☕ by [Hemanth B](https://github.com/HEMANTH2208)

</div>