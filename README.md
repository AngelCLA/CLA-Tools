# 🛠️ CLA Tools

<div align="center">

![CLA Tools](https://img.shields.io/badge/CLA-Tools-purple?style=for-the-badge)
![Astro](https://img.shields.io/badge/Astro-4.0-FF5D01?style=for-the-badge&logo=astro)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)

**Plataforma gratuita de herramientas educativas para agilizar procesos académicos**

[Demo](https://tools.claangel.site) • [Reportar Bug](https://github.com/AngelCLA/cla-tools/issues) • [Solicitar Feature](https://github.com/AngelCLA/cla-tools/issues)

</div>

---

## 📋 Tabla de Contenidos

- [Acerca del Proyecto](#-acerca-del-proyecto)
- [Características](#-características)
- [Herramientas Disponibles](#-herramientas-disponibles)
- [Tecnologías](#-tecnologías)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Contribuir](#-contribuir)
- [Roadmap](#-roadmap)
- [Licencia](#-licencia)
- [Contacto](#-contacto)

---

## 🎯 Acerca del Proyecto

CLA Tools es una colección de herramientas web diseñadas específicamente para educadores y estudiantes. Cada herramienta está optimizada para funcionar directamente en el navegador, sin necesidad de instalaciones, registros o envío de datos a servidores externos.

### ¿Por qué CLA Tools?

- ✅ **Gratuito y de código abierto**
- 🔒 **Privacidad garantizada** - Procesamiento 100% local
- 🚀 **Rápido y eficiente** - Sin tiempos de espera
- 📱 **Responsive** - Funciona en todos los dispositivos
- 🌙 **Modo oscuro** - Mejor experiencia visual
- 🌐 **Sin registro** - Uso inmediato

---

## ✨ Características

- **Procesamiento Local**: Todos los archivos se procesan en tu navegador, garantizando privacidad total
- **Diseño Moderno**: Interfaz limpia y moderna con Tailwind CSS
- **Modo Oscuro**: Tema oscuro automático basado en preferencias del sistema
- **Responsive**: Diseño adaptable a móviles, tablets y escritorio
- **Accesible**: Diseño pensado en la accesibilidad web (WCAG)
- **SEO Optimizado**: Meta tags, Open Graph, Schema.org y más
- **PWA Ready**: Preparado para convertirse en Progressive Web App

---

## 🔧 Herramientas Disponibles

### 📄 DOCX a GIFT
Convierte documentos de Word al formato GIFT para importar preguntas en Moodle de manera sencilla.

**Características:**
- Conversión instantánea
- Soporte para múltiples tipos de preguntas
- Preserva formato y estructura

### 📋 Texto a HTML
Transforma texto con formato a código HTML limpio conservando estilos y estructura.

**Características:**
- Conversión en tiempo real
- Código HTML optimizado
- Preserva negrita, cursiva y listas

### 📑 Unir PDFs
Combina múltiples archivos PDF en uno solo de forma rápida y visual.

**Características:**
- Vista previa de miniaturas
- Reordenar páginas con drag & drop
- Vista de lista y cuadrícula
- Sin límite de archivos
- Procesamiento rápido

### 📝 Formularios *(Próximamente)*
Portal de formularios institucionales para gestión académica.

---

## 💻 Tecnologías

Este proyecto está construido con tecnologías modernas:

| Tecnología | Uso |
|------------|-----|
| [Astro](https://astro.build) | Framework principal |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Tailwind CSS](https://tailwindcss.com) | Estilos y diseño |
| [PDF.js](https://mozilla.github.io/pdf.js/) | Manipulación de PDFs |
| [PDF-lib](https://pdf-lib.js.org/) | Generación de PDFs |
| [SortableJS](https://sortablejs.github.io/Sortable/) | Drag & drop |
| [Font Awesome](https://fontawesome.com) | Iconos |

---

## 🚀 Instalación

### Prerrequisitos

- Node.js 18 o superior
- npm o pnpm

### Pasos

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/AngelCLA/cla-tools.git
   cd cla-tools
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   # o
   pnpm install
   ```

3. **Configura el sitio** (opcional)
   
   Edita `astro.config.mjs` y cambia la URL del sitio:
   ```javascript
   export default defineConfig({
     site: 'https://tools.claangel.site',
     // ...
   })
   ```

4. **Inicia el servidor de desarrollo**
   ```bash
   npm run dev
   ```

5. **Abre tu navegador**
   
   Visita `http://localhost:4321`

---

## 📦 Uso

### Comandos Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia servidor de desarrollo en `localhost:4321` |
| `npm run build` | Genera build de producción en `./dist/` |
| `npm run preview` | Previsualiza el build localmente |
| `npm run astro` | Ejecuta comandos de Astro CLI |

### Despliegue

El proyecto está listo para desplegarse en:

- **Vercel**: Conecta tu repositorio y despliega automáticamente
- **Netlify**: Drag & drop o integración con Git
- **GitHub Pages**: Configuración incluida
- **Cloudflare Pages**: Compatible con builds de Astro

```bash
# Build de producción
npm run build

# El resultado estará en ./dist/
```

---

## 📁 Estructura del Proyecto

```
cla-tools/
├── public/              # Archivos estáticos
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── assets/         # Assets (imágenes, scripts)
│   │   ├── scripts/    # JavaScript para herramientas
│   │   └── Logo.svg
│   ├── components/     # Componentes Astro
│   │   ├── AboutSection.astro
│   │   ├── ContactSection.astro
│   │   ├── Footer.astro
│   │   ├── Navbar.astro
│   │   ├── ToolCards.astro
│   │   └── Welcome.astro
│   ├── layouts/        # Layouts
│   │   └── Layout.astro
│   ├── pages/          # Páginas del sitio
│   │   ├── index.astro
│   │   └── tools/
│   │       ├── docx-gift.astro
│   │       ├── merge-pdf.astro
│   │       └── text-html.astro
│   └── styles/         # Estilos globales
│       └── global.css
├── astro.config.mjs    # Configuración de Astro
├── tailwind.config.mjs # Configuración de Tailwind
├── tsconfig.json       # Configuración de TypeScript
└── package.json
```

---

## 🤝 Contribuir

Las contribuciones son lo que hace que la comunidad de código abierto sea un lugar increíble para aprender, inspirar y crear. **Cualquier contribución que hagas será muy apreciada**.

### Cómo Contribuir

1. **Fork el proyecto**
2. **Crea tu rama de feature**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit tus cambios**
   ```bash
   git commit -m 'Add: Amazing feature'
   ```
4. **Push a la rama**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Abre un Pull Request**

### Guías de Contribución

- **Código**: Sigue las convenciones de TypeScript y las mejores prácticas de Astro
- **Commits**: Usa mensajes descriptivos (ej: "Add: nueva herramienta X", "Fix: error en Y")
- **Testing**: Prueba tus cambios antes de enviar el PR
- **Documentación**: Actualiza el README si es necesario

---

## 🗺️ Roadmap

- [x] Herramienta DOCX a GIFT
- [x] Herramienta Texto a HTML  
- [x] Herramienta Unir PDFs
- [x] Modo oscuro
- [x] Optimización SEO
- [ ] Sistema de formularios
- [ ] Herramienta: Convertir imágenes
- [ ] Herramienta: Generar QR codes
- [ ] PWA (Progressive Web App)
- [ ] Internacionalización (i18n)
- [ ] Tests automatizados

Ver [issues abiertos](https://github.com/AngelCLA/cla-tools/issues) para una lista completa de características propuestas y problemas conocidos.

---

## 📄 Licencia

Distribuido bajo la Licencia MIT. Ver `LICENSE` para más información.

---

## 📧 Contacto

**CLA Tools** - [@AngelCLA](https://github.com/AngelCLA)

- Email: claangeldev@gmail.com
- GitHub: [https://github.com/AngelCLA/cla-tools](https://github.com/AngelCLA/cla-tools)
- Issues: [https://github.com/AngelCLA/cla-tools/issues](https://github.com/AngelCLA/cla-tools/issues)

---

## 🙏 Agradecimientos

- [Astro](https://astro.build) - Por el increíble framework
- [Tailwind CSS](https://tailwindcss.com) - Por hacer el CSS divertido
- [Font Awesome](https://fontawesome.com) - Por los iconos
- [PDF.js](https://mozilla.github.io/pdf.js/) - Por el manejo de PDFs

---

<div align="center">

**⭐ Si este proyecto te resulta útil, considera darle una estrella en GitHub**

Hecho con ❤️ por [AngelCLA](https://github.com/AngelCLA)

</div>
