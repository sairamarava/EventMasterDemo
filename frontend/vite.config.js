// vite.config.js 
import { defineConfig } from 'vite'; 
import react from '@vitejs/plugin-react'; 

export default defineConfig({ 
  plugins: [react()], 
  base: '/my-vite-react-app/', // Adjust based on your deployment needs 
}); 