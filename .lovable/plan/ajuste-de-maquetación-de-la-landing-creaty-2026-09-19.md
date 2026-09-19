# Ajuste de maquetación de la landing Creaty

## Objetivo
Reequilibrar toda la página sin modificar textos, colores, tipografías, tamaños, imágenes, mockups ni funcionalidad.

## Cambios
- Limitar el contenedor compartido a 1280 px y mantener márgenes laterales consistentes en móvil, tablet y escritorio.
- Hacer que navbar, títulos, tarjetas, mockups, botones y footer compartan exactamente los mismos bordes.
- Cambiar todos los encabezados de sección a una estructura vertical: etiqueta, título y subtítulo debajo; nunca en dos columnas.
- Mantener títulos amplios y equilibrados, subtítulos de hasta 760 px, y centrar únicamente el hero y el CTA final.
- Uniformar grillas a 16 px de separación en móvil y 24 px en escritorio, con tarjetas de igual altura y relleno consistente.
- Reequilibrar la tarjeta “Con Creaty” para eliminar el hueco desproporcionado sin alterar su contenido.
- Uniformar espacios verticales entre secciones, encabezados, contenidos y CTAs, eliminando alturas innecesarias.
- Revisar el modal y cada sección en 390, 768, 1440 y 1920 px para comprobar alineación, cortes, desbordes y scroll horizontal.

## Detalles técnicos
- Ajustar únicamente `src/styles.css` y las clases de maquetación en `src/components/Landing.tsx`.
- Conservar intactos los tokens visuales, la escala tipográfica, el contenido y la lógica existente.
