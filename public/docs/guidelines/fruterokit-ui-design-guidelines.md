# FruteroKit UI Design Guidelines

## Filosofía de Diseño

**FruteroKit** representa la identidad visual de **Frutero Club**, una comunidad de élite que transforma builders en "Hackers de Alto Impacto". Nuestro diseño refleja los valores fundamentales: **ejecutar > especular**, **simplicidad > complejidad**, y **comunidad > protagonismo**.

### Principios de Diseño

1. **Claridad**: Los elementos deben comunicar su propósito inmediatamente
2. **Accesibilidad**: Diseño inclusivo que funciona para todos
3. **Consistencia**: Patrones predecibles que construyen confianza
4. **Impacto**: Cada elemento debe servir al objetivo de transformación

---

## Sistema de Colores

### Paleta de Colores Primaria (OKLCH)

```css
/* Colores Base */
--primary: oklch(0.7652 0.1752 62.57);     /* Verde vibrante - CTA principal */
--secondary: oklch(0.6519 0.2118 22.71);   /* Naranja energético - Acentos */
--accent: oklch(0.7989 0.1902 126.36);     /* Verde menta - Destacados */

/* Colores Neutros */
--background: oklch(0.9895 0.009 78.28);   /* Casi blanco cálido */
--foreground: oklch(0.0969 0 0);           /* Negro rico */
--muted: oklch(0.274 0.006 286.033);       /* Gris oscuro */
--muted-foreground: oklch(0.3407 0 0);     /* Gris medio */

/* Funcionales */
--card: oklch(0.9851 0 0);                 /* Blanco puro para tarjetas */
--border: oklch(1 0 0 / 10%);              /* Bordes sutiles */
--destructive: oklch(0.704 0.191 22.216);  /* Rojo para alertas */
```

### Modo Oscuro
```css
/* Ajustes automáticos para tema oscuro */
--background: oklch(0.141 0.005 285.823);  /* Azul muy oscuro */
--foreground: oklch(0.985 0 0);            /* Casi blanco */
--card: oklch(0.21 0.006 285.885);         /* Azul gris oscuro */
```

### Uso de Colores

- **Primary (Verde)**: Botones CTA principales, enlaces importantes, éxito
- **Secondary (Naranja)**: Botones secundarios, destacados, energía
- **Accent (Verde Menta)**: Elementos decorativos, badges, highlights
- **Muted**: Texto secundario, placeholders, contenido de apoyo
- **Foreground**: Texto principal, títulos, contenido crítico

---

## Tipografía

### Jerarquía de Fuentes

```css
/* Fuentes principales */
--font-funnel: "Funnel Display";  /* Títulos y headlines */
--font-grotesk: "Space Grotesk";  /* Subtítulos y UI */
--font-sans: "Raleway";           /* Texto base */
--font-ledger: "Ledger";          /* Citas y elementos especiales */
```

### Escalas Tipográficas

```css
/* Títulos */
h1 { 
  font-family: var(--font-funnel);
  font-size: 3rem;           /* 48px */
  line-height: 1.2;
  font-weight: 600;
  letter-spacing: -0.02em;
}

h2 { 
  font-family: var(--font-funnel);
  font-size: 2.25rem;        /* 36px */
  line-height: 1.2;
  font-weight: 600;
  letter-spacing: -0.01em;
}

h3 { 
  font-family: var(--font-funnel);
  font-size: 1.875rem;       /* 30px */
  line-height: 1.3;
  font-weight: 500;
}

h4 { 
  font-family: var(--font-grotesk);
  font-size: 1.25rem;        /* 20px */
  line-height: 1.4;
  font-weight: 500;
}

/* Texto base */
body {
  font-family: var(--font-sans);
  font-size: 1rem;           /* 16px */
  line-height: 1.6;
  font-weight: 400;
}
```

### Convenciones de Uso

- **Funnel Display**: Exclusivamente para títulos principales (h1, h2, h3)
- **Space Grotesk**: Subtítulos, elementos de UI, navegación
- **Raleway**: Texto corrido, párrafos, descripciones
- **Ledger**: Citas, testimonios, elementos con personalidad

---

## Botones

### Variantes de Botones

#### Primary (Default)
```tsx
<Button variant="default" size="lg">
  Acción Principal
</Button>
```
- **Uso**: CTA principales, acciones más importantes
- **Estilo**: Fondo primary, texto blanco, rounded-full
- **Estados**: hover:scale-105, focus:ring-primary

#### Secondary
```tsx
<Button variant="secondary" size="lg">
  Acción Secundaria
</Button>
```
- **Uso**: Acciones secundarias, navegación
- **Estilo**: Fondo secondary, borde foreground 2px, texto blanco
- **Estados**: hover:bg-secondary/80

#### Outline
```tsx
<Button variant="outline" size="lg">
  Acción Terciaria
</Button>
```
- **Uso**: Acciones opcionales, cancel
- **Estilo**: Borde primary 2.5px, fondo transparente
- **Estados**: hover:bg-primary/50

### Tamaños de Botones

```css
/* Tamaños disponibles */
sm:   height: 36px, padding: 16px, text: 14px
default: height: 40px, padding: 24px, text: 16px
lg:   height: 48px, padding: 32px, text: 18px
xl:   height: 56px, padding: 40px, text: 20px, font-weight: 600
```

### Convenciones de Botones

- **Siempre rounded-full**: Bordes completamente redondeados
- **Transiciones suaves**: 300ms ease-in-out
- **Hover scale**: hover:scale-105 para botones importantes
- **Iconos**: Lucide React, tamaño proporcional al texto
- **Spacing**: ml-2 para iconos a la derecha

---

## Tarjetas (Cards)

### Estructura Base

```tsx
<Card className="bg-card border-2 rounded-xl shadow-sm">
  <CardHeader>
    <CardTitle>Título</CardTitle>
    <CardDescription>Descripción</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Contenido principal */}
  </CardContent>
  <CardFooter>
    {/* Acciones o información adicional */}
  </CardFooter>
</Card>
```

### Variantes de Tarjetas

#### Card Estándar
- **Borde**: 2px solid border
- **Fondo**: bg-card (blanco/gris oscuro)
- **Radius**: rounded-xl (12px)
- **Padding**: py-6 (24px vertical)
- **Gap**: gap-4 (16px entre elementos)

#### Card con Acento (Stats)
```tsx
<Card className="rounded-2xl border-2 px-2 py-6 text-center">
```
- **Uso**: Estadísticas, métricas destacadas
- **Radius**: rounded-2xl (16px)
- **Alineación**: text-center
- **Números**: font-funnel, text-primary, font-bold

#### Card Transparente
```tsx
<Card className="bg-transparent border-none shadow-none">
```
- **Uso**: Contenido que se integra con el fondo
- **Sin bordes ni sombras**
- **Mantiene estructura interna**

#### Card con Fondo Colorido
```tsx
<Card className="bg-muted text-background">
```
- **Uso**: Llamadas a la acción, destacados importantes
- **Contraste**: Texto claro sobre fondo oscuro
- **Inversión cromática**: text-background en lugar de text-foreground

---

## Decoraciones y Elementos Gráficos

### Underlines Decorativos (.subrayado)

```css
.subrayado {
  text-decoration: underline;
  text-decoration-color: var(--primary);
  text-decoration-thickness: 2px;
  text-underline-offset: 6px;
  transition: color 0.3s ease;
}

.subrayado:hover {
  color: var(--foreground);
}
```

**Uso**: Enlaces importantes, palabras clave, énfasis visual

### Underlines en Elementos

```tsx
{/* Underline simple */}
<span className="underline underline-offset-2 decoration-primary decoration-2">
  texto destacado
</span>

{/* Underline grueso */}
<span className="underline underline-offset-8 decoration-primary decoration-4">
  siguiente paso
</span>

{/* Underline con hover */}
<span className="underline underline-offset-4 decoration-secondary decoration-4">
  Hackea tu vida
</span>
```

### Elementos Rotados (Badges Dinámicos)

```tsx
{/* Rotación negativa */}
<span className="inline-block -rotate-2 transform rounded-lg bg-accent px-4 py-2">
  Builders
</span>

{/* Rotación positiva */}
<span className="inline-block rotate-2 transform rounded-lg bg-secondary px-4 py-2 text-white">
  Founders
</span>
```

**Uso**: Badges destacados, elementos lúdicos, romper la monotonía visual

### Iconos Circulares

```tsx
<div className="bg-background p-2 w-10 h-10 rounded-full ring-2 ring-muted">
  <Icon className="w-6 h-6" />
</div>
```

**Características**:
- **Container**: w-10 h-10 (40px)
- **Padding**: p-2 (8px)
- **Ring**: ring-2 ring-muted
- **Icono**: w-6 h-6 (24px)

---

## Layout y Espaciado

### Clases de Layout Globales

```css
/* Página completa */
.page {
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  align-items: center;
  padding-top: 0.5rem;
  padding-bottom: 2rem;
}

/* Container responsivo */
.container {
  display: flex;
  width: 100%;
  max-width: 48rem;        /* 768px */
  flex-direction: column;
  align-items: center;
  padding-left: 1rem;
  padding-right: 1rem;
}

/* Sección de contenido */
.section {
  width: 100%;
  max-width: 100%;
}

/* Breakpoints de container */
@media (min-width: 1024px) {
  .container {
    max-width: 80rem;      /* 1280px */
    padding-left: 2rem;
    padding-right: 2rem;
  }
}
```

### Sistema de Espaciado

```css
/* Espaciado vertical estándar */
gap-y-4:  16px  /* Entre elementos relacionados */
gap-y-6:  24px  /* Entre secciones menores */
gap-y-8:  32px  /* Entre secciones principales */
gap-y-12: 48px  /* Entre bloques de contenido */
gap-y-16: 64px  /* Entre secciones mayores */

/* Padding estándar */
px-4:     16px  /* Padding horizontal base */
px-6:     24px  /* Padding horizontal en cards */
py-6:     24px  /* Padding vertical en cards */
py-12:    48px  /* Padding vertical en secciones */
```

---

## Patrones de Componentes

### Hero Section Pattern

```tsx
<div className="w-full pt-12 pb-8 md:py-28 lg:py-20 min-h-[70svh]">
  <div className="container mx-auto space-y-8 md:space-y-16 lg:space-y-8 px-4 text-center">
    <div className="mx-auto max-w-4xl">
      <h1 className="text-4xl leading-tight font-semibold text-foreground md:text-5xl">
        Título con <span className="badge-rotado">elemento</span> destacado
      </h1>
    </div>
    
    <p className="text-muted-foreground text-2xl md:text-3xl lg:text-2xl">
      Subtítulo descriptivo
    </p>
    
    <div className="flex justify-center">
      <Button size="xl" className="hover:scale-105">
        CTA Principal
      </Button>
    </div>
  </div>
</div>
```

### Stats Grid Pattern

```tsx
<div className="md:max-w-xl grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6 lg:max-w-screen-md mx-auto">
  {stats.map((stat, index) => (
    <StatCard
      key={index}
      icon={stat.icon}
      number={stat.number}
      description={stat.description}
    />
  ))}
</div>
```

### Two-Column Content Pattern

```tsx
<section className="page container w-full gap-y-6 lg:grid lg:grid-cols-12 lg:px-20 xl:max-w-screen-lg py-12">
  <div className="py-4 md:flex md:flex-col md:items-center lg:col-span-7">
    {/* Contenido principal */}
  </div>
  <div className="w-full px-4 md:flex md:flex-col md:items-center lg:col-span-5 lg:px-0">
    {/* Contenido secundario */}
  </div>
</section>
```

---

## Iconografía

### Librería de Iconos

**Lucide React** es la librería principal. Iconos consistentes, modernos y optimizados.

```tsx
import { SparklesIcon, CoinsIcon, RocketIcon } from 'lucide-react'
```

### Convenciones de Iconos

#### Tamaños Estándar
```tsx
/* Iconos pequeños (inline) */
<Icon className="h-4 w-4" />

/* Iconos medianos (UI) */
<Icon className="h-5 w-5" />

/* Iconos grandes (destacados) */
<Icon className="h-6 w-6" />
```

#### Iconos en Botones
```tsx
<Button>
  Texto <Icon className="fill-background ml-2 h-5 w-5" />
</Button>
```

#### Iconos con Color
```tsx
/* Verde secundario */
<SparkleIcon className="text-secondary mr-2 h-4 w-4" />

/* Relleno de fondo */
<Icon className="fill-background" />
```

---

## Estados y Interacciones

### Hover States

```css
/* Botones principales */
.button-primary:hover {
  background-color: rgb(var(--primary) / 0.9);
  transform: scale(1.05);
  transition: all 300ms ease-in-out;
}

/* Enlaces */
.link:hover {
  color: var(--foreground);
  text-decoration-color: var(--primary);
}

/* Tarjetas interactivas */
.card-interactive:hover {
  box-shadow: 0 10px 25px -5px rgb(0 0 0 / 0.1);
  transform: translateY(-2px);
}
```

### Focus States

```css
/* Estados de focus accesibles */
.focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--ring);
  outline-offset: 2px;
}
```

### Transiciones

```css
/* Transición estándar */
transition: all 300ms ease-in-out;

/* Transición suave para colores */
transition: color 300ms ease;

/* Transición para transforms */
transition: transform 300ms ease-in-out;
```

---

## Animaciones

### Gradiente Animado

```css
@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animate-gradient {
  animation: gradient 15s ease infinite;
}
```

### Shimmer Effect

```css
@keyframes shimmer {
  0% { transform: translateX(-100%) skewX(-12deg); }
  100% { transform: translateX(200%) skewX(-12deg); }
}
```

---

## Guías de Implementación

### Para Desarrolladores

1. **Importar componentes base**: Usar siempre los componentes de `@/components/ui/`
2. **Aplicar clases consistentes**: Seguir los patrones establecidos
3. **Validar accesibilidad**: Verificar contraste y navegación por teclado
4. **Probar responsividad**: Validar en móvil, tablet y desktop

### Para Diseñadores

1. **Mantener jerarquía**: Respetar el sistema tipográfico
2. **Usar espaciado consistente**: Aplicar el sistema de spacing
3. **Conservar proporciones**: Mantener ratios y tamaños relativos
4. **Validar legibilidad**: Asegurar contraste mínimo AA (4.5:1)

### Para AI/LLMs

1. **Seguir patrones existentes**: Usar los componentes y clases documentados
2. **Mantener consistencia**: No inventar nuevos estilos sin justificación
3. **Priorizar accesibilidad**: Incluir atributos semánticos
4. **Validar responsividad**: Implementar breakpoints apropiados

---

## Checklist de Calidad

### ✅ Diseño
- [ ] Usa la paleta de colores establecida
- [ ] Respeta la jerarquía tipográfica
- [ ] Implementa espaciado consistente
- [ ] Incluye estados hover/focus
- [ ] Es responsive en todos los breakpoints

### ✅ Código
- [ ] Usa componentes de la UI library
- [ ] Aplica clases de Tailwind correctamente
- [ ] Incluye propiedades de accesibilidad
- [ ] Mantiene estructura semántica
- [ ] Optimiza para performance

### ✅ Marca
- [ ] Refleja la personalidad de Frutero Club
- [ ] Comunica profesionalismo y energía
- [ ] Mantiene consistencia con otros componentes
- [ ] Apoya los objetivos de conversión
- [ ] Es escalable y mantenible

---

## Ejemplos de Uso

### Creando un Nuevo Componente

```tsx
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { RocketIcon } from 'lucide-react'

export default function FeatureCard() {
  return (
    <Card className="rounded-2xl border-2 text-center hover:scale-105 transition-transform duration-300">
      <CardHeader>
        <div className="bg-background p-2 w-10 h-10 rounded-full ring-2 ring-muted mx-auto">
          <RocketIcon className="w-6 h-6 text-primary" />
        </div>
        <CardTitle className="font-funnel text-2xl">
          Nueva Feature
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">
          Descripción de la funcionalidad que destaca los beneficios.
        </p>
        <Button variant="secondary" size="lg" className="hover:scale-105">
          Explorar <RocketIcon className="ml-2 h-5 w-5" />
        </Button>
      </CardContent>
    </Card>
  )
}
```

---

**Versión**: 1.0  
**Última actualización**: 2025  
**Mantenido por**: Frutero Club Design Team

*Este documento está vivo y evoluciona con el producto. Contribuye a su mejora a través de feedback y propuestas de la comunidad.*