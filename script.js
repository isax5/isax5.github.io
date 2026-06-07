// Bilingual content (EN / ES)
const translations = {
  en: {
    "nav.projects": "Projects",
    "nav.lifestyle": "Life Style",
    "nav.contact": "Contact",
    "nav.support": "Support",
    "hero.eyebrow": "Hello, I'm",
    "hero.lead": "Software developer and endurance athlete. I build apps that help people, and I spend my free time running, diving, and racing triathlons.",
    "hero.about": "I'm a Computer Engineer (Ingeniero Civil Informático) and mobile app developer with over {years} years of experience building iOS and Android apps — currently as a Mobile Application Developer at Caja Los Andes. I work mainly with React Native and Flutter, along with .NET MAUI and Swift, plus Azure (AZ-900 certified). Outside of code, I'm an endurance athlete and a certified SDI Open Water diver.",
    "hero.cta1": "See my projects",
    "hero.cta2": "Get in touch",
    "projects.title": "Projects",
    "projects.sub": "Things I've designed, built, and shipped.",
    "tag.web": "Web App",
    "tag.mobile": "Mobile App",
    "tag.app": "App",
    "proj.aaaf": "A mobile app I built — a friendly space to ask questions and connect with the Adventist community.",
    "proj.quinoa": "A plant-based recipes and lifestyle mobile app.",
    "proj.hymnal": "A mobile app I built — a digital hymnal you can browse anywhere.",
    "proj.gym": "A mobile app I built — a workout companion to plan and track gym sessions.",
    "life.title": "Life Style",
    "life.sub": "When I'm not coding, I'm moving.",
    "life.running": "Running",
    "life.triathlon": "Triathlon",
    "life.diving": "Diving",
    "cap.half": "Half Marathon",
    "cap.halfcc": "Concepción Half Marathon",
    "cap.pucon": "Pucón Triathlon",
    "cap.renaico": "Renaico Triathlon",
    "contact.title": "Contact",
    "contact.sub": "Want to collaborate or just say hi?",
    "support.title": "Support My Work",
    "support.sub": "If my projects help you, a small contribution keeps them going.",
    "support.paypal": "Donate with PayPal",
    "support.patreon": "Become a Patron",
    "support.back": "← Back to home"
  },
  es: {
    "nav.projects": "Proyectos",
    "nav.lifestyle": "Estilo de vida",
    "nav.contact": "Contacto",
    "nav.support": "Apoyo",
    "hero.eyebrow": "Hola, soy",
    "hero.lead": "Desarrollador de software y atleta de resistencia. Creo aplicaciones que ayudan a las personas, y en mi tiempo libre corro, buceo y compito en triatlones.",
    "hero.about": "Soy Ingeniero Civil Informático y desarrollador de aplicaciones móviles con más de {years} años de experiencia creando apps iOS y Android — actualmente como Mobile Application Developer en Caja Los Andes. Trabajo principalmente con React Native y Flutter, además de .NET MAUI y Swift, y Azure (certificado AZ-900). Fuera del código, soy atleta de resistencia y buzo certificado SDI Open Water.",
    "hero.cta1": "Ver mis proyectos",
    "hero.cta2": "Contáctame",
    "projects.title": "Proyectos",
    "projects.sub": "Cosas que he diseñado, construido y publicado.",
    "tag.web": "App Web",
    "tag.mobile": "App Móvil",
    "tag.app": "App",
    "proj.aaaf": "Una app móvil que creé — un espacio amigable para hacer preguntas y conectar con la comunidad adventista.",
    "proj.quinoa": "Una app móvil de recetas y estilo de vida basado en plantas.",
    "proj.hymnal": "Una app móvil que creé — un himnario digital que puedes consultar donde sea.",
    "proj.gym": "Una app móvil que creé — un compañero de entrenamiento para planificar y registrar tus rutinas.",
    "life.title": "Estilo de vida",
    "life.sub": "Cuando no estoy programando, estoy en movimiento.",
    "life.running": "Running",
    "life.triathlon": "Triatlón",
    "life.diving": "Buceo",
    "cap.half": "Media maratón",
    "cap.halfcc": "Media maratón Concepción",
    "cap.pucon": "Triatlón Pucón",
    "cap.renaico": "Triatlón Renaico",
    "contact.title": "Contacto",
    "contact.sub": "¿Quieres colaborar o simplemente saludar?",
    "support.title": "Apoya mi trabajo",
    "support.sub": "Si mis proyectos te ayudan, una pequeña contribución los mantiene en marcha.",
    "support.paypal": "Donar con PayPal",
    "support.patreon": "Hazte mecenas",
    "support.back": "← Volver al inicio"
  }
};

const EXPERIENCE_START_YEAR = 2016;

function applyLanguage(lang) {
  const years = new Date().getFullYear() - EXPERIENCE_START_YEAR;
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang][key]) {
      el.textContent = translations[lang][key].replace("{years}", years);
    }
  });
  document.querySelectorAll("#lang-toggle [data-lang]").forEach((s) => {
    s.classList.toggle("active", s.getAttribute("data-lang") === lang);
  });
  try { localStorage.setItem("lang", lang); } catch (e) {}
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();

  let lang = "en";
  try {
    lang = localStorage.getItem("lang") || "en";
  } catch (e) {}
  applyLanguage(lang);

  document.getElementById("lang-toggle").addEventListener("click", () => {
    const next = document.documentElement.lang === "en" ? "es" : "en";
    applyLanguage(next);
  });
});
