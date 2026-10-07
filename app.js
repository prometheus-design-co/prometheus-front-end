const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu(){ navigation.classList.remove('is-open'); menuToggle.setAttribute('aria-expanded', 'false'); }
menuToggle.addEventListener('click', () => { const open = menuToggle.getAttribute('aria-expanded') !== 'true'; menuToggle.setAttribute('aria-expanded', String(open)); navigation.classList.toggle('is-open', open); });
navigation.addEventListener('click', e => { if(e.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', e => { if(e.key === 'Escape' && navigation.classList.contains('is-open')){ closeMenu(); menuToggle.focus(); } });
document.addEventListener('click', e => { if(!e.target.closest('.site-header')) closeMenu(); });
window.matchMedia('(min-width:651px)').addEventListener('change',closeMenu);
document.querySelector('#year').textContent = new Date().getFullYear();
const privacy = document.querySelector('#privacy-dialog');
document.querySelector('#privacy-open').addEventListener('click', () => privacy.showModal());
document.querySelectorAll('.dialog-close,.dialog-done').forEach(button => button.addEventListener('click', () => privacy.close()));
privacy.addEventListener('click', e => { if(e.target === privacy){ const r = privacy.getBoundingClientRect(); if(e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) privacy.close(); } });

// Progressive enhancement: content remains readable without JavaScript.
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
let observer;
function setupReveals(){
  if(observer) observer.disconnect();
  const items = document.querySelectorAll('.reveal');
  if(motionPreference.matches || !('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.remove('will-reveal'));
    return;
  }
  observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){ entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    });
  }, {threshold:0.08,rootMargin:'0px 0px -25px 0px'});
  items.forEach(el => {
    if(el.getBoundingClientRect().top < window.innerHeight) return;
    el.classList.add('will-reveal');
    if(el.parentElement.matches('.service-grid,.work-grid,.process-grid')){
      const siblings = Array.from(el.parentElement.children);
      el.style.setProperty('--delay', `${(siblings.indexOf(el) % (window.innerWidth > 800 ? 3 : 2)) * 85}ms`);
    }
    observer.observe(el);
  });
}
setupReveals();
motionPreference.addEventListener('change',setupReveals);
// Anchor destinations are revealed immediately, including keyboard navigation.
function revealDestination(){
  const id = decodeURIComponent(location.hash.slice(1));
  const section = document.getElementById(id);
  if(section){ section.classList.add('is-visible'); section.querySelectorAll('.reveal').forEach(el=>el.classList.add('is-visible')); }
}
window.addEventListener('hashchange',revealDestination);
revealDestination();
document.addEventListener('focusin',e=>{ e.target.closest('.reveal')?.classList.add('is-visible'); });
const form = document.querySelector('#contact-form');
const message = document.querySelector('#message');
const status = document.querySelector('#form-status');
document.querySelectorAll('[data-service]').forEach(card => card.addEventListener('click', () => {
  if(!message.value.trim()) message.value = `I’d like help with: ${card.dataset.service}.\n\n`;
}));
const config = window.PROMETHEUS_CONFIG || {};
const email = typeof config.contactEmail === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.contactEmail) ? config.contactEmail : '';
const contactLinks = document.querySelector('#contact-links');
if(email){
  const link = document.createElement('a'); link.href = `mailto:${email}`; link.textContent = email; contactLinks.append(link);
  document.querySelector('#form-note').textContent = 'This opens an email draft. Review it and press Send in your email app.';
  document.querySelector('#privacy-content').replaceChildren();
  ['This website does not use analytics or tracking cookies. All fonts and brand assets are served locally.', 'The contact form prepares an email in your email app. Your details are only shared with Prometheus when you send that email. The website does not store form entries.'].forEach(text=>{ const p=document.createElement('p'); p.textContent=text; document.querySelector('#privacy-content').append(p); });
}
(config.socialLinks || []).forEach(social => {
  try { const url = new URL(social.url); if(url.protocol !== 'https:') return;
    const link = document.createElement('a'); link.textContent = social.label; link.href = url.href; link.target = '_blank'; link.rel = 'noopener noreferrer'; contactLinks.append(link);
  } catch { /* Ignore invalid configuration rather than generating a broken link. */ }
});
form.addEventListener('submit', e => {
  e.preventDefault();
  if(!form.reportValidity()) return;
  if(!email){ status.textContent = 'This is a local preview. Your message has not been sent. The contact email needs to be connected before this form can accept inquiries.'; status.focus(); return; }
  const data = new FormData(form);
  const body = `Name: ${data.get('name')}\nEmail: ${data.get('email')}\nBusiness: ${data.get('business') || 'Not provided'}\n\n${data.get('message')}`;
  const href = `mailto:${email}?subject=${encodeURIComponent('Let’s talk about my business')}&body=${encodeURIComponent(body)}`;
  window.location.href = href;
  status.textContent = 'Your email draft is ready to open. Please review it and send it in your email app. If no draft appears, email us directly using the address below.';
  status.focus();
});

form.querySelector('[type=submit]').disabled = false;


// Scroll-linked parallax. No scroll interception; only transform-based painting.
const mythHero = document.querySelector('.myth-hero');
if(mythHero){
  const layers = [...mythHero.querySelectorAll('[data-depth]')];
  const titleLayer = mythHero.querySelector('.myth-title');
  let frame = 0;
  let active = true;
  function paintHero(){
    frame = 0;
    if(motionPreference.matches){
      layers.forEach(layer => layer.style.removeProperty('--layer-y'));
      titleLayer.style.removeProperty('--title-opacity');
      return;
    }
    const rect = mythHero.getBoundingClientRect();
    const travel = Math.max(0, Math.min(window.scrollY, rect.height));
    const small = window.innerWidth <= 650 ? 0.6 : 1;
    layers.forEach(layer => layer.style.setProperty('--layer-y', `${(travel * Number(layer.dataset.depth) * small).toFixed(2)}px`));
    titleLayer.style.setProperty('--title-opacity', String(Math.max(0, 1 - travel / (rect.height * 0.75))));
  }
  function queueHero(){ if(!frame && active) frame = requestAnimationFrame(paintHero); }
  window.addEventListener('scroll',queueHero,{passive:true});
  window.addEventListener('resize',queueHero,{passive:true});
  motionPreference.addEventListener('change',()=>{if(frame) cancelAnimationFrame(frame);frame=0;paintHero();});
  if('IntersectionObserver' in window){
    const heroObserver = new IntersectionObserver(([entry])=>{active=entry.isIntersecting;if(active)queueHero();});
    heroObserver.observe(mythHero);
  }
  paintHero();
}

// Change navigation contrast when the dark foreground reaches the sticky header.
const siteHeader = document.querySelector('.site-header');
if (siteHeader && mythHero) {
  let headerFrame = 0;
  function updateHeaderTheme() {
    headerFrame = 0;
    const heroBounds = mythHero.getBoundingClientRect();
    siteHeader.classList.toggle('is-dark', heroBounds.top + heroBounds.height * 0.72 <= siteHeader.offsetHeight);
  }
  function queueHeaderTheme() {
    if (!headerFrame) headerFrame = requestAnimationFrame(updateHeaderTheme);
  }
  window.addEventListener('scroll', queueHeaderTheme, { passive: true });
  window.addEventListener('resize', queueHeaderTheme, { passive: true });
  window.addEventListener('pageshow', queueHeaderTheme);
  updateHeaderTheme();
}
