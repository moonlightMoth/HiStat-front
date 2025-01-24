import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'



// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

<<<<<<< HEAD
=======

>>>>>>> f2e8a7ba06c757ba241fb9ebb91870741c90586d
  define: { _global: ({}), },

  base:'./'
})
