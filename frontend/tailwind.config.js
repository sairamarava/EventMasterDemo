// tailwind.config.js
import daisyui from 'daisyui';

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Premium vibrant color palette for college events
        primary: '#FF6B6B', // Vibrant coral-red
        secondary: '#4ECDC4', // Bright teal
        accent: '#45B7D1', // Electric blue
        neutral: '#2C3E50', // Dark blue-gray
        'base-100': '#FFFFFF', // Pure white
        'base-200': '#F8FAFC', // Ultra light gray
        'base-300': '#E2E8F0', // Light gray
        
        // Extended vibrant palette
        'electric-purple': '#8B5CF6', // Electric purple
        'neon-green': '#00F5A0', // Neon green
        'sunset-orange': '#FF8A65', // Sunset orange
        'cyber-pink': '#FF1493', // Cyber pink
        'golden-yellow': '#FFD700', // Golden yellow
        'ocean-blue': '#0077BE', // Ocean blue
        'lime-green': '#32CD32', // Lime green
        'hot-pink': '#FF69B4', // Hot pink
        'electric-blue': '#00BFFF', // Electric blue
        'violet': '#9966CC', // Violet
        
        // Gradient colors
        'gradient-start': '#FF6B6B',
        'gradient-mid': '#4ECDC4',
        'gradient-end': '#45B7D1',
        
        // Status colors - vibrant versions
        success: '#00F5A0', // Neon green
        warning: '#FFD700', // Golden yellow
        error: '#FF1493', // Cyber pink
        info: '#00BFFF', // Electric blue
        
        // Card and component colors
        'card-dark': '#1A202C', // Dark card background
        'card-light': '#FFFFFF', // Light card background
        'card-gradient': 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%)',
        
        // Text colors
        'text-primary': '#1A202C', // Dark text
        'text-secondary': '#4A5568', // Medium text
        'text-muted': '#718096', // Muted text
        'text-bright': '#FFFFFF', // Bright text for dark backgrounds
        
        // Border colors
        'border-light': '#E2E8F0', // Light border
        'border-bright': '#4ECDC4', // Bright border
        'border-neon': '#00F5A0', // Neon border
        
        // Background variations
        'bg-gradient-1': 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 50%, #45B7D1 100%)',
        'bg-gradient-2': 'linear-gradient(45deg, #8B5CF6 0%, #00F5A0 100%)',
        'bg-gradient-3': 'linear-gradient(180deg, #FF8A65 0%, #FF1493 100%)',
      },
      fontFamily: {
        'sans': ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
        'display': ['Montserrat', 'Poppins', 'system-ui', 'sans-serif'],
        'heading': ['Nunito', 'Poppins', 'system-ui', 'sans-serif'],
        'body': ['Open Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-down': 'slideDown 0.4s ease-out',
        'slide-left': 'slideLeft 0.4s ease-out',
        'slide-right': 'slideRight 0.4s ease-out',
        'bounce-in': 'bounceIn 0.6s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
        'rainbow': 'rainbow 3s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '50%': { transform: 'scale(1.05)', opacity: '0.8' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(255, 107, 107, 0.5)' },
          '100%': { boxShadow: '0 0 30px rgba(78, 205, 196, 0.8)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        rainbow: {
          '0%': { background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)' },
          '25%': { background: 'linear-gradient(45deg, #4ECDC4, #45B7D1)' },
          '50%': { background: 'linear-gradient(45deg, #45B7D1, #8B5CF6)' },
          '75%': { background: 'linear-gradient(45deg, #8B5CF6, #00F5A0)' },
          '100%': { background: 'linear-gradient(45deg, #00F5A0, #FF6B6B)' },
        },
      },
      boxShadow: {
        'neon': '0 0 20px rgba(0, 245, 160, 0.5)',
        'neon-pink': '0 0 20px rgba(255, 20, 147, 0.5)',
        'neon-blue': '0 0 20px rgba(0, 191, 255, 0.5)',
        'glow-primary': '0 0 30px rgba(255, 107, 107, 0.6)',
        'glow-secondary': '0 0 30px rgba(78, 205, 196, 0.6)',
        'premium': '0 10px 40px rgba(0, 0, 0, 0.1)',
        'premium-lg': '0 20px 60px rgba(0, 0, 0, 0.15)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%)',
        'gradient-secondary': 'linear-gradient(45deg, #8B5CF6 0%, #00F5A0 100%)',
        'gradient-accent': 'linear-gradient(180deg, #FF8A65 0%, #FF1493 100%)',
        'gradient-rainbow': 'linear-gradient(45deg, #FF6B6B, #4ECDC4, #45B7D1, #8B5CF6, #00F5A0)',
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
        '108': '27rem',
        '120': '30rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        premium: {
          "primary": "#FF6B6B",
          "secondary": "#4ECDC4",
          "accent": "#45B7D1",
          "neutral": "#2C3E50",
          "base-100": "#FFFFFF",
          "base-200": "#F8FAFC",
          "base-300": "#E2E8F0",
          "info": "#00BFFF",
          "success": "#00F5A0",
          "warning": "#FFD700",
          "error": "#FF1493",
        },
      },
      {
        vibrant: {
          "primary": "#8B5CF6",
          "secondary": "#00F5A0",
          "accent": "#FF8A65",
          "neutral": "#1A202C",
          "base-100": "#FFFFFF",
          "base-200": "#F8FAFC",
          "base-300": "#E2E8F0",
          "info": "#00BFFF",
          "success": "#32CD32",
          "warning": "#FFD700",
          "error": "#FF1493",
        },
      },
      {
        neon: {
          "primary": "#00F5A0",
          "secondary": "#FF1493",
          "accent": "#00BFFF",
          "neutral": "#0F172A",
          "base-100": "#FFFFFF",
          "base-200": "#F1F5F9",
          "base-300": "#E2E8F0",
          "info": "#0EA5E9",
          "success": "#22C55E",
          "warning": "#EAB308",
          "error": "#EF4444",
        },
      },
    ],
  },
};

