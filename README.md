# Vasu Bhut - Portfolio Website

A modern, responsive portfolio website showcasing my work as a Software Development Engineer, Cloud/DevOps Engineer, and LLM/ML Engineer. Built with React, TypeScript, and modern web technologies.

## 🚀 Live Demo

Visit the live site: [vasubhut.com](https://www.vasubhut.com)

## ✨ Features

- **Dynamic Role Switching**: Interactive hero section with auto-rotating role descriptions (SDE, Cloud, LLM)
- **Project Showcase**: Categorized projects with live demos, GitHub links, and Play Store downloads
- **Skills Visualization**: Comprehensive display of technical skills across multiple domains
- **Experience Timeline**: Professional work history with detailed accomplishments
- **Contact Form**: Integrated contact form with email functionality
- **Responsive Design**: Mobile-first approach with seamless experience across all devices
- **Smooth Animations**: Framer Motion animations for enhanced user experience
- **Particle Background**: Interactive particle effects for visual appeal
- **Dark Theme**: Modern dark theme with gradient accents

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animation library
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **React Router** - Client-side routing

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **Nodemailer** - Email functionality
- **Express Validator** - Input validation
- **Express Rate Limit** - API rate limiting
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing

### Development Tools
- **ESLint** - Code linting
- **TypeScript ESLint** - TypeScript-specific linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 📁 Project Structure

```
├── src/
│   ├── components/          # React components
│   │   ├── Hero.tsx        # Hero section with role switching
│   │   ├── Projects.tsx    # Project showcase
│   │   ├── Skills.tsx      # Skills display
│   │   ├── Experience.tsx  # Work experience
│   │   ├── Contact.tsx     # Contact form
│   │   ├── Footer.tsx      # Footer section
│   │   ├── Navbar.tsx      # Navigation bar
│   │   └── ui/             # Reusable UI components
│   ├── pages/              # Page components
│   │   └── Index.tsx       # Main page
│   ├── lib/                # Utility functions
│   └── App.tsx             # Root component
├── public/
│   └── assets/             # Images and static files
├── server/                 # Backend server files
└── package.json            # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/vasubhut/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:8080`

### Building for Production

```bash
npm run build
```

The build output will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 📧 Contact Form Setup

To enable the contact form functionality:

1. Set up environment variables for email configuration
2. Configure Nodemailer with your email service credentials
3. Update the backend API endpoint in the Contact component

## 🎨 Customization

### Colors and Theme

The theme is configured in `tailwind.config.js`. Modify the color palette to match your preferences:

```js
theme: {
  extend: {
    colors: {
      primary: { ... },
      secondary: { ... },
      // Add your custom colors
    }
  }
}
```

### Content

Update the following files to customize content:
- `src/components/Hero.tsx` - Personal information and role descriptions
- `src/components/Projects.tsx` - Project details and links
- `src/components/Skills.tsx` - Technical skills
- `src/components/Experience.tsx` - Work experience
- `src/components/Footer.tsx` - Footer information

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints for:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🔒 Security Features

- Helmet.js for security headers
- CORS configuration
- Rate limiting on API endpoints
- Input validation and sanitization
- XSS protection

## 📊 Performance

- Lazy loading for images
- Code splitting
- Optimized bundle size
- Fast page load times
- Lighthouse score: 95+

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

**Vasu Bhut**

- Website: [vasubhut.com](https://vasubhut.com)
- GitHub: [@vaisu-bhut](https://github.com/vaisu-bhut)
- LinkedIn: [vasubhut](https://linkedin.com/in/vasubhut)
- Email: bhut.v@northeastern.edu

## 🙏 Acknowledgments

- Design inspiration from modern portfolio trends
- Icons from Lucide React
- UI components from Radix UI
- Animation library from Framer Motion

---

⭐ Star this repo if you find it helpful!