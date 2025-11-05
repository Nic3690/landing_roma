import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    nome: '',
    azienda: '',
    cognome: '',
    sitoWeb: '',
    messaggio: '',
    email: '',
    telefono: '',
    contattoPreferito: 'email'
  });

  useEffect(() => {
    // Initialize Rome Skyline Animation
    const initSkylineAnimation = () => {
      const canvas = document.getElementById('skylineCanvas');
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      
      // Configuration
      const PIXEL_SIZE = 3;
      const section = canvas.closest('.intro-section');
      const CANVAS_WIDTH = section ? section.offsetWidth : 1200;
      const CANVAS_HEIGHT = 150;

      canvas.width = CANVAS_WIDTH;
      canvas.height = CANVAS_HEIGHT;
      
      let currentColumn = 0;
      let animationId = null;
      
      // Generate skyline data
      const width = Math.floor(CANVAS_WIDTH / PIXEL_SIZE);
      const height = Math.floor(CANVAS_HEIGHT / PIXEL_SIZE);
      const skylineData = [];
      
      // Initialize array
      for (let x = 0; x < width; x++) {
        skylineData[x] = [];
        for (let y = 0; y < height; y++) {
          skylineData[x][y] = 0;
        }
      }
      
      // Create Rome skyline profile
      const baseline = height - 8;
      const profile = [];
      
      for (let x = 0; x < width; x++) {
        let y = baseline;
        
        // Create simplified Rome skyline
        const section = Math.floor(x / 40);
        
        switch(section) {
          case 0: // Small dome
            if (x > 5 && x < 15) {
              const center = 10;
              const radius = 4;
              const dx = Math.abs(x - center);
              if (dx <= radius) {
                y = baseline - Math.floor(Math.sqrt(radius * radius - dx * dx) * 1.2);
              }
            }
            break;
          case 1: // Buildings
            if (x > 45 && x < 55) y = baseline - 6;
            if (x > 55 && x < 65) y = baseline - 8;
            break;
          case 2: // Colosseum shape
            if (x > 80 && x < 120) {
              const relX = x - 80;
              const archHeight = 12;
              const wave = Math.sin((relX / 40) * Math.PI) * 3;
              y = baseline - archHeight + Math.floor(wave);
            }
            break;
          case 3: // St. Peter's dome
            if (x > 140 && x < 160) {
              const center = 150;
              const radius = 8;
              const dx = Math.abs(x - center);
              if (dx <= radius) {
                y = baseline - Math.floor(Math.sqrt(radius * radius - dx * dx) * 1.5);
                if (x === center) y -= 2;
              }
            }
            break;
          case 4: // More buildings
            if (x > 180 && x < 190) y = baseline - 5;
            if (x > 190 && x < 200) y = baseline - 7;
            break;
          case 5: // Another dome
            if (x > 210 && x < 225) {
              const center = 217;
              const radius = 5;
              const dx = Math.abs(x - center);
              if (dx <= radius) {
                y = baseline - Math.floor(Math.sqrt(radius * radius - dx * dx) * 1.3);
              }
            }
            break;
          case 6: // Final buildings
            if (x > 240 && x < 250) y = baseline - 4;
            if (x > 250 && x < 260) y = baseline - 6;
            if (x > 270 && x < 280) y = baseline - 5;
            break;
          case 7: // Small structures
            if (x > 290 && x < 300) y = baseline - 3;
            if (x > 310 && x < 320) y = baseline - 4;
            break;
          case 8: // End buildings
            if (x > 330 && x < 340) y = baseline - 5;
            if (x > 350 && x < 360) y = baseline - 3;
            break;
          case 9: // Final small dome
            if (x > 370 && x < 380) {
              const center = 375;
              const radius = 3;
              const dx = Math.abs(x - center);
              if (dx <= radius) {
                y = baseline - Math.floor(Math.sqrt(radius * radius - dx * dx) * 1.2);
              }
            }
            break;
          default:
            // Keep baseline for other sections
            break;
        }
        
        profile[x] = y;
      }
      
      // Convert profile to connected pixels
      for (let x = 0; x < width - 1; x++) {
        const currentY = profile[x];
        const nextY = profile[x + 1];
        
        skylineData[x][currentY] = 1;
        
        if (currentY !== nextY) {
          const minY = Math.min(currentY, nextY);
          const maxY = Math.max(currentY, nextY);
          for (let y = minY; y <= maxY; y++) {
            skylineData[x][y] = 1;
          }
        }
      }
      
      // Drawing functions
      function drawPixel(x, y, color = '#CCCCCC') {
        ctx.fillStyle = color;
        ctx.fillRect(x * PIXEL_SIZE, y * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
      }
      
      function drawSkyline() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let x = 0; x < Math.min(currentColumn, skylineData.length); x++) {
          for (let y = 0; y < skylineData[x].length; y++) {
            if (skylineData[x][y] === 1) {
              drawPixel(x, y, '#CCCCCC');
            }
          }
        }
      }
      
      function animate() {
        if (currentColumn < skylineData.length) {
          currentColumn += 2;
          drawSkyline();
          animationId = requestAnimationFrame(animate);
        } else {
          // Reset and loop
          currentColumn = 0;
          setTimeout(() => {
            animationId = requestAnimationFrame(animate);
          }, 1000); // 1 second pause before restarting
        }
      }
      
      // Start animation after a delay
      setTimeout(() => {
        animate();
      }, 500);
      
      return () => {
        if (animationId) {
          cancelAnimationFrame(animationId);
        }
      };
    };
    
    initSkylineAnimation();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <a href="/" className="logo">
            <img src="logo.png" alt="Virgo" />
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-wrapper">
          <div className="hero-content">
            <div className="hero-label">Digital Experience - Virgo Roma</div>
            <h1 className="hero-title">
              Costruiamo il tuo spazio digitale.
            </h1>
            <p className="hero-subtitle">
              Dalla progettazione alla messa online:<br/>
              sviluppiamo esperienze digitali complete,<br/>
              pensate per far crescere la tua attività.
            </p>
            <a href="#contact" className="cta-button">
              Contattaci senza impegno
            </a>
          </div>
          <div className="hero-image">
            <img src="hero.png" alt="Digital Experience" />
          </div>
        </div>
      </section>

      {/* Intro Section with Rome Skyline */}
      <section className="intro-section">
        <div className="intro-container">
          <h2 className="intro-title">Virgo arriva a Roma. Il web, come deve essere.</h2>
          <p className="intro-text">
            Virgo Roma è la nuova sede dedicata allo sviluppo digitale.<br/>
            Siti web ad alte prestazioni, e-commerce scalabili e software personalizzati: ogni progetto è<br/>
            pensato per unire estetica, funzionalità e risultati concreti.<br/>
            Seguiamo ogni fase con la cura tipica del metodo Virgo: analisi, progettazione, performance.
          </p>
          <div className="skyline-container">
            <canvas id="skylineCanvas"></canvas>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services">
        <div className="services-container">
          <div className="services-header">
            <h2>Strategia. Design. Performance.</h2>
          </div>
          
          <div className="services-grid">
            <div className="service-card">
              <h3>Sviluppo Siti Web</h3>
              <div className="service-image">
                <img src="service-web.jpg" alt="Sviluppo Siti Web" />
              </div>
              <p>
                Design, strategia e codice si fondono per creare esperienze 
                digitali che comunicano valore. Ogni sito è costruito da zero, 
                ottimizzato per la velocità e pensato per crescere con il tuo 
                brand.
              </p>
            </div>

            <div className="service-card">
              <h3>Sviluppo Ecommerce</h3>
              <div className="service-image">
                <img src="service-ecommerce.jpg" alt="Sviluppo Ecommerce" />
              </div>
              <p>
                Progettiamo piattaforme di vendita online performanti, 
                facili da gestire e integrate con sistemi di pagamento e 
                logistica. Dalla UX al checkout, tutto è ottimizzato per vendere.
              </p>
            </div>

            <div className="service-card">
              <h3>Software Custom</h3>
              <div className="service-image">
                <img src="service-software.jpg" alt="Software Custom" />
              </div>
              <p>
                Realizziamo soluzioni su misura per la gestione interna 
                della tua azienda. Gestionali, portali e applicazioni web 
                costruiti intorno ai tuoi processi, per rendere il lavoro 
                più efficiente e connesso.
              </p>
            </div>
          </div>
          
          <div className="services-cta">
            <a href="#contact" className="cta-button">Raccontaci la tua idea</a>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="portfolio">
        <div className="portfolio-container">
          <h2>Abbiamo dato forma alle loro idee.</h2>
          <p className="portfolio-subtitle">
            Ogni progetto è un'esperienza digitale unica, costruita intorno agli obiettivi del brand.
          </p>
          
          <div className="portfolio-grid">
            <div className="portfolio-item">
              <div className="portfolio-placeholder"></div>
            </div>
            <div className="portfolio-item">
              <div className="portfolio-placeholder"></div>
            </div>
            <div className="portfolio-item">
              <div className="portfolio-placeholder"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process">
        <div className="process-container">
          <h2>Un metodo. Una visione. Un solo obiettivo: risultati.</h2>
          
          <div className="process-grid">
            <div className="process-step">
              <div className="step-number">1</div>
              <h3>Analisi</h3>
              <p>Comprendiamo<br/>esigenze e obiettivi<br/>del cliente.</p>
            </div>

            <div className="process-step">
              <div className="step-number">2</div>
              <h3>Design</h3>
              <p>traduciamo la strategia in<br/>un'interfaccia chiara ed<br/>elegante.</p>
            </div>

            <div className="process-step">
              <div className="step-number">3</div>
              <h3>Performance</h3>
              <p>ottimizziamo tecnologia e<br/>contenuti per garantire<br/>risultati misurabili.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <div className="about-container">
          <div className="about-content">
            <h2>La qualità Virgo,<br/>con il cuore a Roma.</h2>
            <p>
              Virgo Roma nasce per offrire alle imprese del territorio un<br/>
              partner tecnologico capace di coniugare innovazione, estetica e<br/>
              concretezza. Un team locale che porta avanti la filosofia Virgo: creare<br/>
              esperienze digitali che funzionano, senza compromessi.
            </p>
            <button className="cta-button-outline">Raccontaci la tua idea</button>
          </div>
          <div className="about-image">
            {/* Placeholder per immagine */}
            <div className="image-placeholder"></div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact" id="contact">
        <div className="contact-container">
          <h2>Hai un progetto? Costruiamolo insieme.</h2>
          <p className="contact-subtitle">
            Raccontaci la tua idea. Che sia un sito, un e-commerce o un software su misura,<br/>
            ti accompagneremo in ogni fase — dall'analisi alla messa online.
          </p>
          
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nome">Nome</label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  placeholder="Inserisci qui il tuo nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="azienda">Azienda</label>
                <input
                  type="text"
                  id="azienda"
                  name="azienda"
                  placeholder="Se hai un'azienda inseriscila qui"
                  value={formData.azienda}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="cognome">Cognome</label>
                <input
                  type="text"
                  id="cognome"
                  name="cognome"
                  placeholder="Inserisci qui il tuo cognome"
                  value={formData.cognome}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="sitoWeb">Sito Web</label>
                <input
                  type="url"
                  id="sitoWeb"
                  name="sitoWeb"
                  placeholder="Se hai un sito web inseriscilo qui"
                  value={formData.sitoWeb}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div className="form-group full-width">
              <label htmlFor="messaggio">Di cosa hai bisogno?</label>
              <textarea
                id="messaggio"
                name="messaggio"
                placeholder="Raccontaci qualcosa delle tue idee"
                value={formData.messaggio}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group full-width">
              <label>Come preferisci essere ricontattato?</label>
              <div className="contact-options">
                <label className="contact-option">
                  <input
                    type="radio"
                    name="contattoPreferito"
                    value="email"
                    checked={formData.contattoPreferito === 'email'}
                    onChange={handleInputChange}
                  />
                  <span>Email</span>
                </label>
                <label className="contact-option">
                  <input
                    type="radio"
                    name="contattoPreferito"
                    value="telefono"
                    checked={formData.contattoPreferito === 'telefono'}
                    onChange={handleInputChange}
                  />
                  <span>Telefono</span>
                </label>
              </div>
            </div>
            
            {formData.contattoPreferito === 'email' ? (
              <div className="form-group full-width">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Inserisci qui la tua email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            ) : (
              <div className="form-group full-width">
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  placeholder="Inserisci qui il tuo numero"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  required
                />
              </div>
            )}
            
            <button type="submit" className="submit-btn">Invia</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-brand">virgo</div>
          
          <div className="footer-links">
            <a href="/privacy" className="footer-link">Privacy Policy</a>
            <a href="/cookies" className="footer-link">Cookie Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;