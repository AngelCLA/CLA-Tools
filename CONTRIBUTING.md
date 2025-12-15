# 🤝 Guía de Contribución

¡Gracias por tu interés en contribuir a CLA Tools! Este documento proporciona pautas y mejores prácticas para contribuir al proyecto.

## 📋 Tabla de Contenidos

- [Código de Conducta](#-código-de-conducta)
- [¿Cómo Puedo Contribuir?](#-cómo-puedo-contribuir)
- [Reportar Bugs](#-reportar-bugs)
- [Sugerir Mejoras](#-sugerir-mejoras)
- [Configuración del Entorno](#-configuración-del-entorno)
- [Proceso de Desarrollo](#-proceso-de-desarrollo)
- [Estándares de Código](#-estándares-de-código)
- [Guía de Commits](#-guía-de-commits)
- [Pull Requests](#-pull-requests)
- [Revisión de Código](#-revisión-de-código)

---

## 📜 Código de Conducta

### Nuestro Compromiso

En el interés de fomentar un ambiente abierto y acogedor, nosotros como contribuyentes y mantenedores nos comprometemos a hacer de la participación en nuestro proyecto y nuestra comunidad una experiencia libre de acoso para todos.

### Nuestros Estándares

**Comportamientos que contribuyen a crear un ambiente positivo:**

- ✅ Uso de lenguaje acogedor e inclusivo
- ✅ Respeto a diferentes puntos de vista y experiencias
- ✅ Aceptación de críticas constructivas
- ✅ Enfoque en lo que es mejor para la comunidad
- ✅ Mostrar empatía hacia otros miembros

**Comportamientos inaceptables:**

- ❌ Uso de lenguaje o imágenes sexualizadas
- ❌ Comentarios insultantes o despectivos
- ❌ Acoso público o privado
- ❌ Publicar información privada de otros
- ❌ Conducta no profesional o inapropiada

---

## 💡 ¿Cómo Puedo Contribuir?

Hay muchas formas de contribuir a CLA Tools:

### 1. Reportar Bugs 🐛
Ayúdanos a mejorar reportando errores que encuentres.

### 2. Sugerir Nuevas Características ✨
Comparte ideas para nuevas herramientas o mejoras.

### 3. Mejorar Documentación 📚
Ayuda a hacer la documentación más clara y completa.

### 4. Escribir Código 💻
Implementa nuevas features o corrige bugs.

### 5. Revisar Pull Requests 👀
Ayuda revisando el código de otros contribuyentes.

### 6. Diseño y UX 🎨
Mejora la interfaz y experiencia de usuario.

---

## 🐛 Reportar Bugs

### Antes de Reportar

1. **Verifica** que estés usando la última versión
2. **Busca** en los [issues existentes](https://github.com/AngelCLA/cla-tools/issues) para evitar duplicados
3. **Reproduce** el bug en un entorno limpio

### Cómo Reportar un Bug

Crea un [nuevo issue](https://github.com/AngelCLA/cla-tools/issues/new) incluyendo:

**Título Descriptivo**
```
[BUG] Descripción breve del problema
```

**Información Requerida:**

```markdown
## Descripción del Bug
Una descripción clara y concisa del bug.

## Pasos para Reproducir
1. Ve a '...'
2. Haz clic en '...'
3. Desplázate hasta '...'
4. Observa el error

## Comportamiento Esperado
Qué esperabas que sucediera.

## Comportamiento Actual
Qué está sucediendo en realidad.

## Screenshots
Si es aplicable, agrega capturas de pantalla.

## Entorno
- OS: [ej. Windows 11, macOS 14]
- Navegador: [ej. Chrome 120, Firefox 121]
- Versión: [ej. 1.0.0]

## Contexto Adicional
Cualquier otra información relevante.
```

---

## ✨ Sugerir Mejoras

### Antes de Sugerir

1. **Verifica** que la feature no exista ya
2. **Busca** en issues existentes por sugerencias similares
3. **Considera** si encaja con los objetivos del proyecto

### Cómo Sugerir una Feature

Crea un [nuevo issue](https://github.com/AngelCLA/cla-tools/issues/new) con la etiqueta `enhancement`:

```markdown
## Título
[FEATURE] Nombre de la nueva funcionalidad

## Problema que Resuelve
¿Qué problema o necesidad aborda esta feature?

## Solución Propuesta
Descripción clara de lo que quieres que suceda.

## Alternativas Consideradas
Otras soluciones que has considerado.

## Mockups/Ejemplos
Si es aplicable, agrega mockups o ejemplos visuales.

## Impacto
- ¿A quién beneficia?
- ¿Qué tan importante es?
- ¿Hay urgencia?
```

---

## ⚙️ Configuración del Entorno

### Requisitos Previos

- **Node.js** 18.0 o superior
- **npm** 9.0 o superior (o **pnpm** 8.0+)
- **Git** 2.40 o superior
- Editor recomendado: **VS Code**

### Extensiones de VS Code Recomendadas

```json
{
  "recommendations": [
    "astro-build.astro-vscode",
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint"
  ]
}
```

### Setup Inicial

1. **Fork el repositorio**
   
   Haz clic en el botón "Fork" en GitHub.

2. **Clona tu fork**
   ```bash
   git clone https://github.com/TU_USUARIO/cla-tools.git
   cd cla-tools
   ```

3. **Agrega el repositorio original como upstream**
   ```bash
   git remote add upstream https://github.com/AngelCLA/cla-tools.git
   ```

4. **Instala dependencias**
   ```bash
   npm install
   ```

5. **Crea una rama para tu trabajo**
   ```bash
   git checkout -b feature/mi-nueva-feature
   ```

6. **Inicia el servidor de desarrollo**
   ```bash
   npm run dev
   ```

---

## 🔄 Proceso de Desarrollo

### Workflow de Git

1. **Mantén tu fork actualizado**
   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```

2. **Crea una rama para cada feature/fix**
   ```bash
   git checkout -b tipo/descripcion-breve
   ```
   
   Tipos de rama:
   - `feature/` - Nueva funcionalidad
   - `fix/` - Corrección de bugs
   - `docs/` - Cambios en documentación
   - `style/` - Cambios de estilo (formato, CSS)
   - `refactor/` - Refactorización de código
   - `test/` - Agregar o actualizar tests
   - `chore/` - Tareas de mantenimiento

3. **Haz commits atómicos y descriptivos**
   ```bash
   git add .
   git commit -m "Add: descripción del cambio"
   ```

4. **Push a tu fork**
   ```bash
   git push origin feature/mi-nueva-feature
   ```

5. **Abre un Pull Request**

---

## 📏 Estándares de Código

### TypeScript

```typescript
// ✅ Bueno: Tipos explícitos y nombres descriptivos
interface ToolCardProps {
  title: string;
  description: string;
  icon: string;
  href: string;
}

// ❌ Malo: Sin tipos, nombres vagos
const Card = (props: any) => {
  // ...
}
```

### Astro Components

```astro
---
// ✅ Bueno: Props tipados, imports organizados
interface Props {
  title: string;
  description?: string;
}

const { title, description = 'Default description' } = Astro.props;
---

<div class="container">
  <h2>{title}</h2>
  {description && <p>{description}</p>}
</div>
```

### Tailwind CSS

```html
<!-- ✅ Bueno: Clases ordenadas por categoría -->
<button 
  class="px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
>
  Click me
</button>

<!-- ❌ Malo: Clases desordenadas -->
<button class="text-white px-4 hover:bg-purple-700 bg-purple-600 rounded-lg py-2">
  Click me
</button>
```

### Orden de Clases Tailwind

1. Layout (display, position)
2. Spacing (margin, padding)
3. Sizing (width, height)
4. Typography
5. Visual (background, border, shadow)
6. Interactivity (hover, focus, active)
7. Transitions & animations

### JavaScript/TypeScript

```javascript
// ✅ Bueno: Funciones puras, constantes descriptivas
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

function validateFileSize(file: File): boolean {
  return file.size <= MAX_FILE_SIZE;
}

// ❌ Malo: Números mágicos, efectos secundarios
function check(f: any) {
  if (f.size > 10485760) {
    alert('Too big!');
  }
}
```

### Nombres de Archivos

- **Componentes**: `PascalCase.astro` (ej: `ToolCard.astro`)
- **Páginas**: `kebab-case.astro` (ej: `merge-pdf.astro`)
- **Scripts**: `kebab-case.js` (ej: `pdf-merger.js`)
- **Estilos**: `kebab-case.css` (ej: `global.css`)

---

## 📝 Guía de Commits

### Formato de Commit

```
Tipo: Descripción breve (máximo 50 caracteres)

[Cuerpo opcional: Explicación detallada del cambio]

[Footer opcional: Referencias a issues]
```

### Tipos de Commit

| Tipo | Descripción | Ejemplo |
|------|-------------|---------|
| `Add` | Nueva funcionalidad | `Add: drag and drop to PDF merger` |
| `Fix` | Corrección de bug | `Fix: thumbnail rendering in dark mode` |
| `Update` | Actualización de feature | `Update: improve PDF processing speed` |
| `Remove` | Eliminar código/archivo | `Remove: deprecated converter function` |
| `Refactor` | Refactorización | `Refactor: simplify merge logic` |
| `Style` | Formato, CSS | `Style: improve mobile responsiveness` |
| `Docs` | Documentación | `Docs: update README with new features` |
| `Test` | Tests | `Test: add unit tests for validator` |
| `Chore` | Mantenimiento | `Chore: update dependencies` |

### Ejemplos de Buenos Commits

```bash
# ✅ Específico y claro
git commit -m "Fix: PDF thumbnail not loading in Safari"

# ✅ Con contexto adicional
git commit -m "Add: keyboard shortcuts for PDF reordering

- Arrow keys to navigate thumbnails
- Delete key to remove selected PDF
- Ctrl/Cmd + Z for undo

Closes #42"

# ❌ Vago
git commit -m "fix stuff"

# ❌ Demasiado largo en el título
git commit -m "Fix the bug where PDF thumbnails were not loading properly in Safari browser on macOS"
```

---

## 🔀 Pull Requests

### Antes de Crear un PR

- ✅ Tu código compila sin errores
- ✅ Has probado los cambios localmente
- ✅ Has actualizado la documentación si es necesario
- ✅ Tus commits siguen la guía de commits
- ✅ Tu rama está actualizada con `main`

### Crear un Pull Request

1. **Título Descriptivo**
   ```
   [Tipo] Descripción breve del cambio
   ```
   Ejemplo: `[Feature] Add keyboard shortcuts to PDF merger`

2. **Descripción Completa**

```markdown
## Descripción
Explicación clara de qué hace este PR.

## Tipo de Cambio
- [ ] Bug fix (cambio que corrige un issue)
- [ ] Nueva feature (cambio que agrega funcionalidad)
- [ ] Breaking change (fix o feature que causa que funcionalidad existente no funcione como antes)
- [ ] Documentación

## ¿Cómo se ha Probado?
Describe las pruebas que ejecutaste.

## Checklist
- [ ] Mi código sigue el estilo del proyecto
- [ ] He realizado una auto-revisión de mi código
- [ ] He comentado mi código en áreas difíciles de entender
- [ ] He actualizado la documentación
- [ ] Mis cambios no generan nuevas advertencias
- [ ] He probado en diferentes navegadores

## Screenshots
Si es aplicable, agrega screenshots.

## Issues Relacionados
Closes #123
```

### Tamaño del PR

- **Ideal**: 200-400 líneas de código
- **Máximo recomendado**: 1000 líneas
- **Si es más grande**: Considera dividir en múltiples PRs

---

## 👀 Revisión de Código

### Para Autores

- **Responde rápidamente** a los comentarios
- **Sé receptivo** a las sugerencias
- **No lo tomes personal** - las revisiones mejoran el código
- **Actualiza el PR** según feedback

### Para Revisores

**Qué Revisar:**

- ✅ **Funcionalidad**: ¿El código hace lo que dice?
- ✅ **Legibilidad**: ¿Es fácil de entender?
- ✅ **Mantenibilidad**: ¿Será fácil de mantener?
- ✅ **Performance**: ¿Hay optimizaciones obvias?
- ✅ **Seguridad**: ¿Hay vulnerabilidades?
- ✅ **Tests**: ¿Hay cobertura adecuada?

**Cómo Dar Feedback:**

```markdown
# ✅ Constructivo y específico
"Considera usar `Array.map()` aquí en lugar de un loop for 
para hacer el código más declarativo y fácil de leer."

# ❌ Vago o negativo
"Este código está mal."
```

**Tipos de Comentarios:**

- 🔴 **Bloqueante**: Debe corregirse antes de merge
- 🟡 **Sugerencia**: Nice to have, no bloqueante
- 🟢 **Nitpick**: Opcional, estilo personal
- 💡 **Pregunta**: Necesito clarificación

---

## 🏗️ Estructura de Proyecto

### Agregar una Nueva Herramienta

1. **Crea el archivo de página**
   ```
   src/pages/tools/mi-herramienta.astro
   ```

2. **Crea el script si es necesario**
   ```
   src/assets/scripts/mi-herramienta.js
   ```

3. **Agrega la herramienta a ToolCards**
   ```typescript
   // src/components/ToolCards.astro
   {
     title: "Mi Herramienta",
     description: "Descripción breve",
     icon: "fa-icon-name",
     href: "/tools/mi-herramienta"
   }
   ```

4. **Actualiza la documentación**
   - README.md
   - CONTRIBUTING.md si aplica

---

## 🧪 Testing

### Testing Manual

Antes de enviar un PR, prueba en:

- ✅ Chrome (última versión)
- ✅ Firefox (última versión)
- ✅ Safari (si tienes macOS)
- ✅ Edge (última versión)
- ✅ Móvil (Chrome/Safari mobile)

### Checklist de Testing

**Funcionalidad:**
- [ ] La herramienta funciona como se espera
- [ ] Los casos edge están manejados
- [ ] Los errores muestran mensajes apropiados

**UI/UX:**
- [ ] Responsive en todos los tamaños de pantalla
- [ ] Funciona en modo oscuro
- [ ] Animaciones son fluidas
- [ ] Accesibilidad (navegación por teclado)

**Performance:**
- [ ] Carga rápida
- [ ] No hay memory leaks
- [ ] Archivos grandes se manejan bien

---

## 📚 Recursos Útiles

### Documentación Oficial

- [Astro Docs](https://docs.astro.build)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Guías de Estilo

- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html)

### Herramientas

- [Can I Use](https://caniuse.com/) - Compatibilidad de navegadores
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Performance audits
- [axe DevTools](https://www.deque.com/axe/devtools/) - Accesibilidad

---

## ❓ Preguntas Frecuentes

**P: ¿Cuánto tiempo toma que revisen mi PR?**  
R: Generalmente 2-5 días. Ten paciencia, todos somos voluntarios.

**P: ¿Puedo trabajar en múltiples features a la vez?**  
R: Sí, pero crea ramas separadas y PRs independientes para cada una.

**P: ¿Qué pasa si mi PR no es aceptado?**  
R: No te desanimes. Te daremos feedback sobre por qué y cómo mejorarlo.

**P: ¿Necesito firmar un CLA?**  
R: No, no requerimos CLA para contribuir.

**P: ¿Puedo contribuir si soy principiante?**  
R: ¡Absolutamente! Busca issues con la etiqueta `good-first-issue`.

---

## 🎉 ¡Gracias por Contribuir!

Tu tiempo y esfuerzo son muy valorados. Cada contribución, sin importar qué tan pequeña, hace que CLA Tools sea mejor para todos.

**¿Necesitas ayuda?**
- 💬 Abre un [issue](https://github.com/AngelCLA/cla-tools/issues)
- 📧 Envía un email a contact@clatools.com

---

<div align="center">

**Hecho con ❤️ por la comunidad de CLA Tools**

</div>
