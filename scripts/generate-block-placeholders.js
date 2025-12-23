/**
 * Generate placeholder SVGs for block previews
 * Run: node scripts/generate-block-placeholders.js
 */

const fs = require('fs');
const path = require('path');

const blocks = [
  { id: 'hero', name: 'Hero con Imagen', icon: '🎯' },
  { id: 'heroVideo', name: 'Hero con Video', icon: '🎬' },
  { id: 'testimonials', name: 'Testimonios', icon: '💬' },
  { id: 'videoTestimonials', name: 'Video Testimonios', icon: '📹' },
  { id: 'successStories', name: 'Historias de Exito', icon: '⭐' },
  { id: 'beforeAfter', name: 'Antes y Despues', icon: '🔄' },
  { id: 'reviews', name: 'Reviews', icon: '⭐' },
  { id: 'certifications', name: 'Certificaciones', icon: '🏅' },
  { id: 'pressLogos', name: 'Logos de Prensa', icon: '📰' },
  { id: 'stats', name: 'Estadisticas', icon: '📊' },
  { id: 'guarantee', name: 'Garantia', icon: '✅' },
  { id: 'guaranteeNew', name: 'Garantia Nueva', icon: '🛡️' },
  { id: 'effectiveness', name: 'Efectividad', icon: '📈' },
  { id: 'products', name: 'Productos', icon: '📦' },
  { id: 'productComparison', name: 'Comparacion', icon: '⚖️' },
  { id: 'formulas', name: 'Formulas', icon: '🧪' },
  { id: 'activos', name: 'Activos', icon: '💊' },
  { id: 'ingredients', name: 'Ingredientes', icon: '🌿' },
  { id: 'problem', name: 'Problema', icon: '❓' },
  { id: 'whyChoose', name: 'Por que Elegirnos', icon: '💡' },
  { id: 'benefits', name: 'Beneficios', icon: '✨' },
  { id: 'howItWorks', name: 'Como Funciona', icon: '⚙️' },
  { id: 'howItWorksNew', name: 'Como Funciona Nuevo', icon: '📱' },
  { id: 'faq', name: 'FAQ', icon: '❔' },
  { id: 'finalCta', name: 'CTA Final', icon: '🎯' },
  { id: 'finalCtaNew', name: 'CTA Final Nuevo', icon: '🚀' },
  { id: 'ctaTimer', name: 'CTA Timer', icon: '⏰' },
  { id: 'footerNew', name: 'Footer', icon: '📋' },
];

const outputDir = path.join(__dirname, '../public/images/block-previews');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function generateSVG(block) {
  return `<svg width="400" height="250" viewBox="0 0 400 250" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="250" fill="#1a1a1a"/>
  <rect x="20" y="20" width="360" height="210" rx="8" stroke="#333" stroke-width="2"/>
  <text x="200" y="110" text-anchor="middle" fill="#555" font-family="system-ui" font-size="40">${block.icon}</text>
  <text x="200" y="150" text-anchor="middle" fill="#888" font-family="system-ui" font-size="14" font-weight="600">${block.name}</text>
  <text x="200" y="175" text-anchor="middle" fill="#444" font-family="monospace" font-size="12">${block.id}</text>
</svg>`;
}

let count = 0;
for (const block of blocks) {
  const svg = generateSVG(block);
  const filename = `${block.id}.svg`;
  fs.writeFileSync(path.join(outputDir, filename), svg);
  count++;
}

console.log(`✅ Generated ${count} placeholder SVGs in ${outputDir}`);
