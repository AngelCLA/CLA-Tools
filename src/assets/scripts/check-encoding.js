import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

const checkDirectory = (dir) => {
  const files = readdirSync(dir);
  
  files.forEach(file => {
    const fullPath = join(dir, file);
    const stat = statSync(fullPath);
    
    if (stat.isDirectory()) {
      if (!file.startsWith('.') && file !== 'node_modules') {
        checkDirectory(fullPath);
      }
    } else if (['.js', '.astro', '.jsx', '.ts', '.tsx'].includes(extname(file))) {
      try {
        const content = readFileSync(fullPath, 'utf8');
        const problematic = content.match(/[^\x00-\x7F]/g);
        
        if (problematic) {
          const uniqueChars = [...new Set(problematic)];
          console.log(`✅ ${fullPath}: ${uniqueChars.join(', ')}`);
        }
      } catch (error) {
        console.error(`❌ Error leyendo ${fullPath}:`, error.message);
      }
    }
  });
};

console.log('Verificando encoding UTF-8...\n');
checkDirectory('./src');
console.log('\n✅ Verificación completada');