import { useEffect, useMemo, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { MapPin, Clock, Mail, ChevronDown, Menu, X } from 'lucide-react'

function InstagramIcon({ size = 18 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

// Gallery images from Unsplash - nightclub & party vibes
const GALLERY_IMAGES = [
  'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&q=80',
  'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=600&q=80',
  'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&q=80',
  'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=600&q=80',
]

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
}

function Particles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: 4 + Math.random() * 8,
        delay: Math.random() * 5,
        size: 1 + Math.random() * 3,
      })),
    []
  )

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-accent/30"
          style={{
            left: p.x + '%',
            top: p.y + '%',
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -120, -240],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  )
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#about', label: 'Nosotros' },
    { href: '#events', label: 'Eventos' },
    { href: '#gallery', label: 'Galería' },
    { href: '#location', label: 'Ubicación' },
    { href: '#contact', label: 'Contacto' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-dark/80 backdrop-blur-xl border-b border-white/5 shadow-2xl'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#hero"
          className="font-heading text-xl font-bold tracking-[0.2em] text-white hover:text-accent transition-colors"
        >
          LATERAL
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-white/60 hover:text-white transition-colors tracking-wider uppercase"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://www.instagram.com/discotecalateral/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 hover:text-accent transition-colors"
            aria-label="Instagram"
          >
            <InstagramIcon size={18} />
          </a>
        </div>

        <button
          className="md:hidden text-white/80"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dark/95 backdrop-blur-xl border-b border-white/5 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-lg text-white/70 hover:text-white transition-colors tracking-wider uppercase"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

function HeroSection() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 800], [0, 300])
  const opacity = useTransform(scrollY, [0, 500], [1, 0])
  const scale = useTransform(scrollY, [0, 800], [1, 1.2])

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0" style={{ y, scale }}>
        <img
          src="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1920&q=80"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-dark/60 via-dark/40 to-dark" />
        <div className="absolute inset-0 bg-linear-to-r from-accent/10 via-transparent to-accent-hot/10" />
      </div>

      <div className="absolute inset-0 z-1 overflow-hidden pointer-events-none" aria-hidden="true">
        <motion.div
          className="absolute w-125 h-125 rounded-full bg-accent/20 blur-[120px] -top-40 -left-40"
          animate={{ x: [0, 50, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-100 h-100 rounded-full bg-accent-hot/15 blur-[100px] -bottom-20 -right-20"
          animate={{ x: [0, -40, 0], y: [0, -20, 0], scale: [1, 0.9, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <motion.div className="relative z-10 text-center flex flex-col max-w-4xl" style={{ opacity }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center  items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8"
        >
          
          <MapPin size={14} className="text-accent" />
          <span className="text-xs tracking-[0.25em] uppercase text-white/70">
            Ciutadella de Menorca
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-heading text-center text-5xl md:text-7xl lg:text-9xl font-extrabold mb-6"
        >
          LATERAL
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-lg md:text-xl text-white/50 max-w-xl mx-auto mb-10 font-light"
        >
          Donde cada noche es una experiencia única
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#events"
            className="group relative px-8 py-3.5 bg-accent text-white font-medium rounded-full overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]"
          >
            <span className="relative z-10">Próximos Eventos</span>
            <div className="absolute inset-0 bg-linear-to-r from-accent to-accent-hot opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
          <a
            href="#contact"
            className="px-8 py-3.5 border border-white/20 text-white font-medium rounded-full hover:bg-white/5 hover:border-white/30 transition-all"
          >
            Reservar
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-white/30">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={16} className="text-white/30" />
        </motion.div>
      </motion.div>
    </section>
  )
}

function SectionWrapper({ children, className = '', id }) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={stagger}
      className={`relative py-24 md:py-32 ${className}`}
    >
      {children}
    </motion.section>
  )
}

function AboutSection() {
  return (
    <SectionWrapper id="about" className="overflow-hidden">
      <div className="absolute top-1/2 left-0 w-150 h-150 rounded-full bg-accent/5 blur-[150px] -translate-y-1/2 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.span variants={fadeUp} className="text-xs tracking-[0.3em] uppercase text-accent font-medium">
              Sobre Nosotros
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="font-heading text-4xl md:text-5xl font-bold text-white mt-4 mb-6 leading-tight">
              La esencia de la noche<br />
              <span className="text-white/40">en Menorca</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-white/50 leading-relaxed mb-4">
              Lateral es el punto de encuentro de la noche en Ciutadella. Un espacio donde
              la música, la luz y la energía se fusionan para crear experiencias inolvidables.
            </motion.p>
            <motion.p variants={fadeUp} custom={3} className="text-white/50 leading-relaxed">
              Desde nuestras sesiones de house y techno hasta las noches más exclusivas,
              situados en el corazón del Passeig es Pla de Sant Joan, somos el destino
              preferido de quienes buscan la mejor música de la isla.
            </motion.p>
            <motion.div variants={fadeUp} custom={4} className="grid grid-cols-3 gap-6 mt-10 pt-10 border-t border-white/5">
              {[
                { num: '10+', label: 'Años de fiesta' },
                { num: '200+', label: 'Eventos al año' },
                { num: '∞', label: 'Noches memorables' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-heading text-3xl font-bold text-accent">{stat.num}</div>
                  <div className="text-white/40 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div variants={fadeUp} custom={2} className="relative">
            <div className="relative rounded-2xl overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1545128485-c400e7702796?w=700&q=80"
                alt="Interior de Lateral"
                loading="lazy"
                className="w-full aspect-4/5 object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-dark via-transparent to-transparent" />
            </div>
            <div className="absolute -inset-4 bg-accent/10 rounded-3xl blur-3xl -z-10" />
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  )
}

function EventsSection() {
  return (
    <SectionWrapper id="events">
      <div className="max-w-7xl mx-auto px-6">
        <motion.span variants={fadeUp} className="text-xs tracking-[0.3em] uppercase text-accent font-medium">
          Agenda
        </motion.span>
        <motion.h2 variants={fadeUp} custom={1} className="font-heading text-4xl md:text-5xl font-bold text-white mt-4 mb-12 leading-tight">
          Próximos Eventos
        </motion.h2>

        <div className="flex flex-col gap-4">
          <iframe className='h-100' src="https://www.fourvenues.com/iframe/lateral-discoteca/events" frameBorder="0"></iframe>
        </div>
      </div>
    </SectionWrapper>
  )
}

function GallerySection() {
  return (
    <SectionWrapper id="gallery">
      <div className="absolute top-1/2 right-0 w-150 h-150 rounded-full bg-accent-hot/5 blur-[150px] -translate-y-1/2 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6">
        <motion.span variants={fadeUp} className="text-xs tracking-[0.3em] uppercase text-accent font-medium">
          Galería
        </motion.span>
        <motion.h2 variants={fadeUp} custom={1} className="font-heading text-4xl md:text-5xl font-bold text-white mt-4 mb-4 leading-tight">
          Momentos Lateral
        </motion.h2>
        <motion.p variants={fadeUp} custom={2} className="text-white/50 mb-12">
          Directamente desde nuestro{' '}
          <a
            href="https://www.instagram.com/discotecalateral/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent-hot transition-colors underline underline-offset-4"
          >
            @discotecalateral
          </a>
        </motion.p>

        <motion.div variants={stagger} className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {GALLERY_IMAGES.map((imageUrl, i) => (
            <motion.a
              key={i}
              variants={fadeUp}
              custom={i}
              href="https://www.instagram.com/discotecalateral/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-xl overflow-hidden bg-dark-card border border-white/5 hover:border-accent/30 transition-all duration-500"
            >
              <img
                src={imageUrl}
                alt={`Galería Lateral ${i + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-linear-to-t from-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-4">
                <span className="flex items-center gap-2 text-white text-sm font-medium bg-dark/60 backdrop-blur-sm px-4 py-2 rounded-full">
                  <InstagramIcon size={14} />
                  Ver en Instagram
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  )
}

function LocationSection() {
  return (
    <SectionWrapper id="location" className="overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.span variants={fadeUp} className="text-xs tracking-[0.3em] uppercase text-accent font-medium">
              Ubicación
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="font-heading text-4xl md:text-5xl font-bold text-white mt-4 mb-8 leading-tight">
              Encuéntranos
            </motion.h2>

            <motion.address variants={fadeUp} custom={2} className="not-italic space-y-1 text-white/50 mb-8">
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-accent shrink-0" />
                <span>Passeig es Pla de Sant Joan, 9</span>
              </div>
              <div className="pl-7">07760 Ciutadella de Menorca</div>
              <div className="pl-7">Illes Balears, España</div>
            </motion.address>

            <motion.div variants={fadeUp} custom={3} className="space-y-2 mb-10">
              <div className="flex items-center gap-3 text-white/70">
                <Clock size={16} className="text-accent shrink-0" />
                <h3 className="font-medium text-white">Horario</h3>
              </div>
              <p className="text-white/50 pl-7">Viernes y Sábado: 23:30 — 06:00</p>
              <p className="text-white/50 pl-7">Domingos y festivos: Consultar</p>
            </motion.div>

            <motion.a
              variants={fadeUp}
              custom={4}
              href="https://maps.google.com/?q=Passeig+es+Pla+de+Sant+Joan+9+Ciutadella+Menorca"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white font-medium rounded-full hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] transition-all"
            >
              <MapPin size={16} />
              Cómo llegar
            </motion.a>
          </div>

          <motion.div variants={fadeUp} custom={2} className="relative rounded-2xl overflow-hidden aspect-square bg-dark-card border border-white/5">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3070.5!2d3.8369!3d39.9989!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12be1c8a5a5a5a5a%3A0x0!2sPasseig%20es%20Pla%20de%20Sant%20Joan%2C%209%2C%20Ciutadella!5e0!3m2!1ses!2ses!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de Lateral"
            />
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  )
}

function ContactSection() {
  return (
    <SectionWrapper id="contact" className="text-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 rounded-full bg-accent/10 blur-[200px]" />
      </div>

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <motion.span variants={fadeUp} className="text-xs tracking-[0.3em] uppercase text-accent font-medium">
          Contacto
        </motion.span>
        <motion.h2 variants={fadeUp} custom={1} className="font-heading text-5xl md:text-7xl font-extrabold text-white mt-4 mb-6 leading-tight">
          ¿Listo para vivir<br />
          <span className="text-shimmer">la noche?</span>
        </motion.h2>
        <motion.p variants={fadeUp} custom={2} className="text-white/50 text-lg mb-10">
          Reservas, eventos privados y colaboraciones
        </motion.p>

        <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://www.instagram.com/discotecalateral/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-accent text-white font-semibold rounded-full overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(168,85,247,0.5)]"
          >
            <span className="relative z-10 flex items-center gap-3">
              <InstagramIcon size={20} />
              Síguenos en Instagram
            </span>
            <div className="absolute inset-0 bg-linear-to-r from-accent to-accent-hot opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
          <a
            href="mailto:info@discotecalateral.com"
            className="inline-flex items-center gap-3 px-8 py-4 border border-white/20 text-white font-semibold rounded-full hover:bg-white/5 hover:border-white/30 transition-all"
          >
            <Mail size={20} />
            Escríbenos
          </a>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}

function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-dark-light/50">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <span className="font-heading text-2xl font-bold tracking-[0.2em] text-white">
              LATERAL
            </span>
            <p className="text-white/30 text-sm mt-1">Ciutadella de Menorca</p>
          </div>

          <div className="flex flex-wrap gap-6 text-sm">
            {[
              { label: 'Nosotros', href: '#about' },
              { label: 'Eventos', href: '#events' },
              { label: 'Galería', href: '#gallery' },
              { label: 'Ubicación', href: '#location' },
            ].map((link) => (
              <a key={link.label} href={link.href} className="text-white/40 hover:text-white transition-colors">
                {link.label}
              </a>
            ))}
          </div>

          <a
            href="https://www.instagram.com/discotecalateral/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-accent transition-colors"
            aria-label="Instagram"
          >
            <InstagramIcon size={22} />
          </a>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 text-center">
          <p className="text-white/20 text-sm">
            &copy; 2026 Lateral Discoteca. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

function App() {
  return (
    <div className="noise">
      <Particles />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <EventsSection />
      <GallerySection />
      <LocationSection />
      <ContactSection />
      <Footer />
    </div>
  )
}

export default App
