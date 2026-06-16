'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ──────────────────────────────────────────────
   All for One — Demo Showcase
   Demonstrates the design patterns, animations,
   and component architecture of the library.
   ────────────────────────────────────────────── */

export default function DemoPage() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  return (
    <div className={theme}>
      <main className="bg-gray-950 text-white min-h-screen">
        <ThemeToggle theme={theme} onToggle={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} />

        <HeroSection />
        <FeaturesSection />
        <AnimationDemos />
        <CarouselDemo />
        <TestimonialsSection />
        <PricingSection />
        <FooterSection />
      </main>
    </div>
  );
}

// ── Theme Toggle ──
function ThemeToggle({ theme, onToggle }: { theme: string; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="fixed top-6 right-6 z-50 p-3 rounded-full bg-gray-800/80 backdrop-blur-sm border border-gray-700 hover:border-indigo-500 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}

// ── Hero ──
function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const words = ['animations', 'transitions', 'carousels', 'footers', 'design systems', 'shaders'];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-gray-950 to-purple-950 animate-pulse" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(99,102,241,0.15),transparent_50%)]" />

      <div className="relative z-10 w-full px-6 md:px-16 lg:px-24 py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm mb-6">
            ✨ v0.1.0 — 57 Components · 8 Packages
          </span>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
            All for One.{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-orange-400 bg-clip-text text-transparent">
              Web Design Master
            </span>
          </h1>
          <p className="mt-6 text-xl text-gray-400 max-w-2xl">
            A production-grade component library with{' '}
            <span className="text-indigo-400 font-mono">{words[wordIndex]}</span>
            <span className="animate-pulse">|</span>
          </p>
          <div className="mt-10 flex gap-4 flex-wrap">
            <a href="#features" className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-medium transition-colors">
              Explore Components →
            </a>
            <a href="https://github.com/jundevx-rgb/all-for-one" className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl font-medium transition-colors border border-gray-700">
              View on GitHub
            </a>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl"
        >
          {[
            { value: '57+', label: 'Components' },
            { value: '8', label: 'Packages' },
            { value: 'TS', label: 'TypeScript' },
            { value: 'MIT', label: 'License' },
          ].map((stat) => (
            <div key={stat.label} className="p-4 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50">
              <div className="text-3xl font-bold">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ── Features ──
function FeaturesSection() {
  const features = [
    { icon: '✨', title: 'Animation System', desc: 'Reveal, scroll, parallax, mouse-follow, text, and loading animations — all GPU-accelerated with Framer Motion.' },
    { icon: '⚡', title: 'Page Transitions', desc: '5 page transitions, shared element animations, route transitions, and native View Transitions API support.' },
    { icon: '🛡️', title: 'Carousels', desc: 'Infinite, scroll-snap, physics-based, 3D, CoverFlow, parallax, testimonial, and product carousels.' },
    { icon: '🎨', title: 'Design System', desc: 'Complete token system — typography, colors, spacing, motion, radii, shadows, z-index, and theme engine.' },
    { icon: '📋', title: 'UI Components', desc: 'Button, Card, Modal, Navbar, Hero, Pricing, Testimonials, FeatureGrid, Newsletter, and Form.' },
    { icon: '🖼️', title: 'Shaders & Icons', desc: '4 canvas effects (gradient, particles, noise, waves) + 53 tree-shakeable SVG icons.' },
  ];

  return (
    <section id="features" className="py-32 px-6 md:px-16 lg:px-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-20"
      >
        <h2 className="text-4xl md:text-5xl font-bold">What's Inside</h2>
        <p className="mt-4 text-xl text-gray-400 max-w-2xl mx-auto">
          8 packages, 57 components — everything for modern web design
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="p-8 rounded-2xl bg-gray-800/40 border border-gray-700/50 hover:border-indigo-500/50 hover:bg-gray-800/60 transition-all group"
          >
            <div className="text-3xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-400">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ── Animation Demos ──
function AnimationDemos() {
  return (
    <section className="py-32 bg-gray-900/50 px-6 md:px-16 lg:px-24">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-20"
      >
        <h2 className="text-4xl md:text-5xl font-bold">Animation Showcase</h2>
        <p className="mt-4 text-xl text-gray-400">Fade up · Stagger · Scale · Slide</p>
      </motion.div>

      <div className="max-w-4xl mx-auto space-y-12">
        {/* Fade Up */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-8 rounded-2xl bg-gray-800/40 border border-gray-700/50"
        >
          <span className="text-xs text-indigo-400 font-mono">fade-up</span>
          <h3 className="text-2xl font-bold mt-2">Reveal on Scroll</h3>
          <p className="text-gray-400 mt-2">This element fades up and in when scrolled into view using Intersection Observer.</p>
        </motion.div>

        {/* Stagger */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          className="grid grid-cols-3 gap-4"
        >
          {['First', 'Second', 'Third'].map((item, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="p-6 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-center"
            >
              <span className="text-lg font-semibold">{item}</span>
              <p className="text-sm text-gray-400 mt-1">Staggered child {i + 1}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Scale + Slide */}
        <div className="grid grid-cols-2 gap-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-8 rounded-2xl bg-gray-800/40 border border-gray-700/50 text-center"
          >
            <span className="text-xs text-indigo-400 font-mono">scale</span>
            <h3 className="text-xl font-bold mt-2">Scale In</h3>
          </motion.div>
          <motion.div
            initial={{ x: -60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-8 rounded-2xl bg-gray-800/40 border border-gray-700/50 text-center"
          >
            <span className="text-xs text-indigo-400 font-mono">slide-left</span>
            <h3 className="text-xl font-bold mt-2">Slide From Left</h3>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── Carousel Demo ──
function CarouselDemo() {
  const items = [
    { title: 'Infinite Carousel', desc: 'Seamless loop with CSS animation' },
    { title: 'Scroll Snap', desc: 'Native CSS scroll-snap carousel' },
    { title: 'Physics Carousel', desc: 'Momentum-based with friction' },
    { title: '3D Carousel', desc: 'CSS preserve-3d ring layout' },
    { title: 'CoverFlow', desc: 'Apple-style 3D flow effect' },
    { title: 'Parallax Carousel', desc: 'Depth-based scaling' },
  ];

  return (
    <section className="py-32 px-6 md:px-16 lg:px-24">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold">Carousel Components</h2>
        <p className="mt-4 text-xl text-gray-400">Infinite · Physics · 3D · CoverFlow · Parallax</p>
      </motion.div>

      <div className="overflow-hidden max-w-5xl mx-auto">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="flex gap-6"
          style={{ width: 'max-content' }}
        >
          {[...items, ...items].map((item, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-72 p-8 rounded-2xl bg-gray-800/40 border border-gray-700/50 hover:border-indigo-500/50 transition-colors"
            >
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="text-gray-400 mt-2">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ── Testimonials ──
function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const testimonials = [
    { quote: "All for One cut our development time by 60%. The components are production-ready out of the box.", author: "Sarah Chen", role: "Lead Developer, TechFlow" },
    { quote: "The animation system is incredible. Finally, a library that gets motion design right.", author: "Marcus Rivera", role: "Creative Director, DesignLab" },
    { quote: "We rebuilt our entire marketing site using these components. Zero accessibility issues.", author: "Aiko Tanaka", role: "Frontend Lead, ShipFast" },
    { quote: "The design tokens system made theming across our SaaS trivial. Saved us months.", author: "David Park", role: "CTO, BaseStack" },
  ];

  return (
    <section className="py-32 bg-gray-900/50 px-6 md:px-16 lg:px-24">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-16">Loved by Developers</h2>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="p-10 rounded-2xl bg-gray-800/40 border border-gray-700/50"
          >
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400">★</span>
              ))}
            </div>
            <p className="text-2xl italic text-gray-200 leading-relaxed">&ldquo;{testimonials[active].quote}&rdquo;</p>
            <div className="mt-8 pt-6 border-t border-gray-700/50">
              <div className="font-semibold">{testimonials[active].author}</div>
              <div className="text-sm text-gray-400">{testimonials[active].role}</div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center gap-3 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-3 h-3 rounded-full transition-colors ${i === active ? 'bg-indigo-500' : 'bg-gray-600 hover:bg-gray-500'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Pricing ──
function PricingSection() {
  const plans = [
    { name: 'Community', price: '$0', desc: 'Free forever', features: ['All 57 components', '8 packages', 'TypeScript', 'MIT license', 'Community support'] },
    { name: 'Pro', price: '$0', desc: 'Also free', features: ['Everything in Community', 'Source access', 'Storybook docs', 'CI/CD', 'Priority docs'], highlight: true },
    { name: 'Enterprise', price: '$0', desc: 'Yes, still free', features: ['Everything in Pro', 'Self-hostable', 'Custom theming', 'No limits', 'MIT — do anything'] },
  ];

  return (
    <section className="py-32 px-6 md:px-16 lg:px-24">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-20"
      >
        <h2 className="text-4xl md:text-5xl font-bold">Open Source</h2>
        <p className="mt-4 text-xl text-gray-400">Free forever. MIT licensed.</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {plans.map((plan, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`p-8 rounded-2xl border transition-all ${
              plan.highlight
                ? 'bg-indigo-950/40 border-indigo-500/50 ring-1 ring-indigo-500/20'
                : 'bg-gray-800/40 border-gray-700/50'
            }`}
          >
            {plan.highlight && (
              <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-medium mb-4">
                Popular
              </span>
            )}
            <h3 className="text-2xl font-bold">{plan.name}</h3>
            <div className="mt-4">
              <span className="text-4xl font-bold">{plan.price}</span>
              <span className="text-gray-400">/forever</span>
            </div>
            <p className="text-sm text-gray-400 mt-2">{plan.desc}</p>
            <ul className="mt-8 space-y-3">
              {plan.features.map((f, j) => (
                <li key={j} className="flex items-start gap-3 text-sm text-gray-300">
                  <span className="text-green-400 mt-0.5">✓</span> {f}
                </li>
              ))}
            </ul>
            <a
              href="https://github.com/jundevx-rgb/all-for-one"
              className={`block mt-8 text-center py-3 rounded-xl font-medium transition-colors ${
                plan.highlight
                  ? 'bg-indigo-600 hover:bg-indigo-500'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              Get Started
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ── Footer ──
function FooterSection() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              All for One
            </h3>
            <p className="text-sm text-gray-400 mt-3 leading-relaxed">
              Production-grade web design component library.
            </p>
          </div>
          {[
            { title: 'Product', links: ['Components', 'Showcase', 'Releases'] },
            { title: 'Resources', links: ['Documentation', 'Storybook', 'GitHub'] },
            { title: 'Legal', links: ['MIT License', 'Privacy', 'Terms'] },
          ].map((col, i) => (
            <div key={i}>
              <h4 className="font-semibold mb-4">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link, j) => (
                  <li key={j}>
                    <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">© 2026 All for One. MIT Licensed.</p>
          <div className="flex gap-6">
            <a href="https://github.com/jundevx-rgb/all-for-one" className="text-gray-400 hover:text-white transition-colors text-sm">GitHub</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Twitter</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Discord</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
