# FruteroKit Layout Structure Guidelines

## Arquitectura de Layout

**FruteroKit** utiliza un sistema de layout estructurado y predecible que garantiza consistencia visual y facilita el mantenimiento. La arquitectura sigue una jerarquía clara: **PageWrapper** → **Main** → **Page** → **Container** → **Section**.

### Principios de Layout

1. **Estructura Predecible**: Cada página sigue el mismo patrón de composición
2. **Responsividad Móvil-Primero**: Diseño optimizado desde móvil hacia desktop
3. **Flexibilidad Controlada**: Sistema flexible pero con límites claros
4. **Consistencia Visual**: Espaciado y proporciones uniformes en toda la aplicación

---

## Componente PageWrapper

### Estructura Base

```tsx
// src/components/layout/page-wrapper.tsx
const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-96px)] top-[96px] flex w-full flex-col items-center overflow-x-hidden">
        {children}
      </main>
      <Footer />
    </>
  )
}
```

### Características del PageWrapper

- **Navbar Fijo**: Altura de 96px (h-24), siempre visible
- **Main Container**: 
  - Altura mínima calculada: `calc(100vh - 96px)`
  - Centrado horizontal: `items-center`
  - Prevención de scroll horizontal: `overflow-x-hidden`
  - Layout vertical: `flex-col`
- **Footer**: Posicionado al final del contenido

### Constantes de Layout

```tsx
const NAVBAR_HEIGHT = '96px' // 6rem / h-24 tw
```

---

## Componente Navbar

### Estructura del Navbar

```tsx
<header className="top-0 h-24 w-full bg-background">
  <div className="mx-auto flex h-full w-full max-w-3xl items-center justify-between p-4 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-5 lg:px-8">
    {/* Logo */}
    <Link className="flex w-36 items-center" href="/">
      <Image src="/images/logos/frutero.svg" alt="Frutero logo" />
    </Link>
    
    {/* Navegación Central */}
    <div className="z-10 col-span-3 flex items-center justify-center">
      <nav className="hidden gap-4 lg:flex">
        {/* Menu items */}
      </nav>
    </div>
    
    {/* CTA Button */}
    <div className="hidden lg:flex lg:justify-end">
      <AuthButton>Únete</AuthButton>
    </div>
    
    {/* Mobile Menu */}
    <MobileMenu />
  </div>
</header>
```

### Características del Navbar

- **Altura Fija**: 96px (h-24) en todas las resoluciones
- **Fondo**: bg-background (blanco/oscuro según tema)
- **Container Responsivo**:
  - Mobile/Tablet: `max-w-3xl` (768px)
  - Desktop: `max-w-7xl` (1280px) con grid de 5 columnas
- **Layout Responsivo**:
  - Mobile: Flexbox con justify-between
  - Desktop: CSS Grid con 5 columnas (1-3-1 distribution)

### Navegación Responsiva

```tsx
// Desktop Navigation
<nav className="hidden gap-4 lg:flex">
  {MENU_ITEMS.map((item) => (
    <Link className="px-4 py-2 font-funnel text-xl font-medium">
      {item.displayText}
    </Link>
  ))}
</nav>

// Mobile Navigation
<MobileMenu menuItems={MENU_ITEMS} pathname={pathname} />
```

---

## Componente Footer

### Estructura del Footer

```tsx
<footer className="w-full bg-background">
  <div className="mx-auto max-w-7xl p-4 md:flex md:items-center md:justify-between md:px-6 md:py-6 lg:px-8">
    {/* Social Links */}
    <div className="flex items-center justify-center gap-x-8 md:order-2">
      {navigation.map((item) => (
        <a href={item.href} target="_blank">
          <item.icon className="h-6 w-6 hover:text-primary" />
        </a>
      ))}
    </div>
    
    {/* Logos and Copyright */}
    <div className="flex items-center justify-center gap-x-3 md:order-1">
      <Image src="/images/logos/kukulcan-logo-color.png" className="w-12" />
      <Image src="/images/logos/frutero.svg" className="w-28" />
      <p>&copy; 2025</p>
    </div>
  </div>
</footer>
```

### Características del Footer

- **Ancho Completo**: `w-full` con container interno centrado
- **Container**: `max-w-7xl` (1280px) centrado
- **Layout Responsivo**:
  - Mobile: Stack vertical
  - Desktop: Flexbox con justify-between
- **Orden Visual**: `md:order-1` y `md:order-2` para reorganizar en desktop

---

## Sistema de Clases de Layout

### Jerarquía de Clases

```css
/* Nivel 1: Página Completa */
.page {
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  align-items: center;
  padding-top: 0.5rem;    /* 8px */
  padding-bottom: 2rem;   /* 32px */
}

/* Nivel 2: Container Responsivo */
.container {
  display: flex;
  width: 100%;
  max-width: 48rem;       /* 768px */
  flex-direction: column;
  align-items: center;
  padding-left: 1rem;     /* 16px */
  padding-right: 1rem;    /* 16px */
}

/* Nivel 3: Sección de Contenido */
.section {
  width: 100%;
}
```

### Breakpoints de Container

```css
/* Mobile First - Base */
.container {
  max-width: 48rem;       /* 768px */
  padding: 0 1rem;        /* 16px */
}

/* Large Desktop */
@media (min-width: 1024px) {
  .container {
    max-width: 80rem;     /* 1280px */
    padding: 0 2rem;      /* 32px */
  }
}
```

---

## Patrones de Uso

### Patrón 1: Página con Sección Simple

```tsx
export default function SimplePage() {
  return (
    <PageWrapper>
      <div className="page py-12">
        <div className="container gap-y-8">
          <h1>Título de la Página</h1>
          <p>Contenido principal</p>
        </div>
      </div>
    </PageWrapper>
  )
}
```

### Patrón 2: Página con Múltiples Secciones

```tsx
export default function MultiSectionPage() {
  return (
    <PageWrapper>
      <HeroSection />           {/* Sección sin .page */}
      <section className="page py-12">
        <div className="container gap-y-8">
          {/* Contenido de sección */}
        </div>
      </section>
      <section className="page py-12">
        <div className="container gap-y-8">
          {/* Contenido de sección */}
        </div>
      </section>
    </PageWrapper>
  )
}
```

### Patrón 3: Sección Hero Personalizada

```tsx
export default function HeroSection() {
  return (
    <div className="w-full pt-12 pb-8 md:py-28 lg:py-20 min-h-[70svh]">
      <div className="container mx-auto space-y-8 md:space-y-16 lg:space-y-8 px-4 text-center">
        <div className="mx-auto max-w-4xl">
          <h1>Hero Title</h1>
        </div>
        <p>Hero subtitle</p>
        <Button>CTA</Button>
      </div>
    </div>
  )
}
```

### Patrón 4: Layout de Dos Columnas

```tsx
export default function TwoColumnSection() {
  return (
    <section className="page container w-full gap-y-6 lg:grid lg:grid-cols-12 lg:px-20 xl:max-w-screen-lg py-12">
      <div className="py-4 md:flex md:flex-col md:items-center lg:col-span-7">
        {/* Columna principal (58%) */}
      </div>
      <div className="w-full px-4 md:flex md:flex-col md:items-center lg:col-span-5 lg:px-0">
        {/* Columna secundaria (42%) */}
      </div>
    </section>
  )
}
```

---

## Espaciado y Proporciones

### Sistema de Espaciado Vertical

```css
/* Entre elementos pequeños */
gap-y-2:  8px
gap-y-4:  16px

/* Entre elementos relacionados */
gap-y-6:  24px
gap-y-8:  32px

/* Entre secciones */
gap-y-12: 48px
gap-y-16: 64px

/* Entre bloques principales */
gap-y-20: 80px
gap-y-24: 96px
```

### Padding de Secciones

```css
/* Padding vertical estándar */
py-6:     24px  /* Secciones pequeñas */
py-8:     32px  /* Secciones medianas */
py-12:    48px  /* Secciones estándar */
py-16:    64px  /* Secciones importantes */
py-20:    80px  /* Secciones destacadas */
py-28:    112px /* Hero sections */
```

### Máximos Anchos Responsivos

```css
/* Contenido de texto */
max-w-2xl:     672px   /* Párrafos largos */
max-w-3xl:     768px   /* Contenido estándar */
max-w-4xl:     896px   /* Títulos hero */

/* Contenido de aplicación */
max-w-screen-sm:  640px
max-w-screen-md:  768px
max-w-screen-lg:  1024px
max-w-screen-xl:  1280px
```

---

## Composición Responsiva

### Mobile First Approach

```tsx
// Ejemplo de componente responsivo
<div className="w-full px-4 md:flex md:flex-col md:items-center lg:col-span-5 lg:px-0">
  <Card className="bg-muted text-background md:max-w-md md:w-full py-8">
    {/* Contenido de la tarjeta */}
  </Card>
</div>
```

### Breakpoints del Sistema

```css
/* sm: */   @media (min-width: 640px)
/* md: */   @media (min-width: 768px)
/* lg: */   @media (min-width: 1024px)
/* xl: */   @media (min-width: 1280px)
/* 2xl: */  @media (min-width: 1536px)
```

### Patrones Responsivos Comunes

#### Grid Responsivo
```css
/* 2 columnas en mobile, 3 en desktop */
grid-cols-2 md:grid-cols-3

/* 1 columna en mobile, 12 columnas en desktop */
lg:grid lg:grid-cols-12
```

#### Flexbox Responsivo
```css
/* Stack en mobile, flex en desktop */
flex-col md:flex-row

/* Centrado en mobile, justificado en desktop */
justify-center md:justify-between
```

#### Spacing Responsivo
```css
/* Espaciado que aumenta con el viewport */
space-y-8 md:space-y-16 lg:space-y-8

/* Padding que se adapta */
px-4 sm:px-6 lg:px-8
```

---

## Grid System

### Layout de 12 Columnas

```tsx
// Sistema de grid para layouts complejos
<section className="lg:grid lg:grid-cols-12 lg:gap-8">
  <div className="lg:col-span-8">
    {/* Contenido principal (67%) */}
  </div>
  <div className="lg:col-span-4">
    {/* Contenido secundario (33%) */}
  </div>
</section>
```

### Distribuciones Comunes

```css
/* 50/50 */
lg:col-span-6 + lg:col-span-6

/* 67/33 */
lg:col-span-8 + lg:col-span-4

/* 58/42 */
lg:col-span-7 + lg:col-span-5

/* 75/25 */
lg:col-span-9 + lg:col-span-3
```

---

## Mejores Prácticas

### Do ✅

1. **Usar PageWrapper**: Siempre envolver el contenido de página en PageWrapper
2. **Seguir la jerarquía**: page → container → section/content
3. **Aplicar mobile-first**: Diseñar desde móvil hacia desktop
4. **Mantener consistencia**: Usar las clases de layout establecidas
5. **Respetar el spacing**: Seguir el sistema de espaciado vertical
6. **Centrar contenido**: Usar container para centrar y limitar ancho

### Don't ❌

1. **No saltarse PageWrapper**: Evitar crear layouts directos sin la estructura
2. **No crear anchos fijos**: Usar max-width en lugar de width fijo
3. **No ignorar responsive**: Siempre considerar todos los breakpoints
4. **No usar padding horizontal excesivo**: Respetar el sistema de padding
5. **No crear layouts únicos**: Usar los patrones establecidos
6. **No omitir overflow-x-hidden**: Prevenir scroll horizontal no deseado

### Checklist de Layout

#### ✅ Estructura
- [ ] Usa PageWrapper como contenedor principal
- [ ] Aplica .page para secciones completas
- [ ] Usa .container para centrar contenido
- [ ] Respeta la jerarquía de clases

#### ✅ Responsividad
- [ ] Funciona en mobile (320px+)
- [ ] Se adapta en tablet (768px+)
- [ ] Se optimiza en desktop (1024px+)
- [ ] Usa breakpoints consistentes

#### ✅ Espaciado
- [ ] Aplica padding vertical apropiado
- [ ] Usa gap-y para espaciado entre elementos
- [ ] Respeta los máximos anchos
- [ ] Mantiene proporciones visuales

#### ✅ Navegación
- [ ] Navbar siempre visible y funcional
- [ ] Footer en la posición correcta
- [ ] Mobile menu funciona correctamente
- [ ] Enlaces tienen estados hover/focus

---

## Ejemplos de Implementación

### Página Landing Completa

```tsx
import PageWrapper from '@/components/layout/page-wrapper'
import HeroSection from '@/components/landing/hero-section'
import StatsSection from '@/components/landing/stats-section'
import ValueProposition from '@/components/landing/value-proposition'

export default function LandingPage() {
  return (
    <PageWrapper>
      <HeroSection />
      <ValueProposition />
      <StatsSection />
    </PageWrapper>
  )
}
```

### Página de Contenido Simple

```tsx
import PageWrapper from '@/components/layout/page-wrapper'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default function ContentPage() {
  return (
    <PageWrapper>
      <div className="page py-12">
        <div className="container gap-y-8">
          <div className="text-center">
            <h1>Título de la Página</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Descripción de la página que explica el contenido principal.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Tarjeta 1</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Contenido de la primera tarjeta.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Tarjeta 2</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Contenido de la segunda tarjeta.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
```

### Sección Hero Personalizada

```tsx
import { Button } from '@/components/ui/button'
import { SparklesIcon } from 'lucide-react'

export default function CustomHeroSection() {
  return (
    <div className="w-full pt-12 pb-8 md:py-28 lg:py-20 min-h-[80svh] bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto space-y-8 md:space-y-16 lg:space-y-8 px-4 text-center">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl leading-tight font-semibold text-foreground md:text-6xl lg:text-7xl">
            Tu{' '}
            <span className="inline-block -rotate-2 transform rounded-lg bg-accent px-4 py-2 text-foreground">
              futuro
            </span>
            <br />
            comienza{' '}
            <span className="inline-block rotate-2 transform rounded-lg bg-secondary px-4 py-2 text-white">
              aquí
            </span>
          </h1>
        </div>

        <p className="text-muted-foreground text-xl md:text-2xl lg:text-xl font-medium max-w-3xl mx-auto">
          Únete a la comunidad que está transformando el panorama tecnológico latinoamericano
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="xl"
            className="lg:px-14 lg:py-6 text-2xl font-medium transition duration-300 ease-in-out hover:scale-105"
          >
            Comenzar ahora <SparklesIcon className="fill-background ml-2 h-5 w-5" />
          </Button>
          
          <Button
            variant="outline"
            size="xl"
            className="lg:px-14 lg:py-6 text-2xl font-medium transition duration-300 ease-in-out hover:scale-105"
          >
            Conocer más
          </Button>
        </div>

        <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-accent rounded-full"></div>
            <span>100+ Miembros activos</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-secondary rounded-full"></div>
            <span>$100k+ En premios</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span>15+ Países</span>
          </div>
        </div>
      </div>
    </div>
  )
}
```

---

**Versión**: 1.0  
**Última actualización**: 2025  
**Mantenido por**: Frutero Club Design Team

*Esta documentación evoluciona con el sistema. Contribuye con mejoras y actualizaciones basadas en casos de uso reales.*