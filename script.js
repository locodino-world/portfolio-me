// Basic interactive behavior: sidebar toggle, theme toggle, project slider, contact form submit (EmailJS example)

document.addEventListener('DOMContentLoaded', ()=>{
    // year
    document.getElementById('year').textContent = new Date().getFullYear();
  
    // hamburger open/close
    const hamburger = document.getElementById('hamburger');
    const sidebar = document.getElementById('sidebar');
    hamburger.addEventListener('click', ()=> sidebar.classList.toggle('open'));
  
    // theme toggle (dark/light)
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', ()=>{
      document.documentElement.classList.toggle('light');
      themeToggle.textContent = document.documentElement.classList.contains('light') ? 'Light' : 'Dark';
    });
  
    // project sliders
    document.querySelectorAll('.project-card').forEach(card=>{
      const slides = card.querySelector('.slides');
      const imgs = Array.from(slides.children);
      let idx = 0;
      const prev = card.querySelector('.slide-prev');
      const next = card.querySelector('.slide-next');
  
      function update(){
        slides.style.transform = `translateX(-${idx * 100}%)`;
      }
      prev && prev.addEventListener('click', ()=>{ idx = (idx -1 + imgs.length) % imgs.length; update(); });
      next && next.addEventListener('click', ()=>{ idx = (idx +1) % imgs.length; update(); });
  
      // auto-play
      setInterval(()=>{ idx = (idx +1) % imgs.length; update(); }, 6000 + Math.random()*2000);
    });
  
    // contact form: simple email submission using EmailJS (client-side)
    const form = document.getElementById('contactForm');
    const status = document.getElementById('formStatus');
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      status.textContent = 'Sending message — please wait...';
  
      
      // <script src="https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js"></script>
       emailjs.init('kIjsaUcslWokxuaB5');
       emailjs.sendForm('service_wej50zp','template_0dwtw2f', form)
         .then(()=>{ status.textContent='Message sent — I will reply soon!'; form.reset(); })
         .catch(err=>{ status.textContent='Error sending message. Try again later.'; console.error(err); });
  
      // Temporary fallback: open mailto with populated subject (keeps UX working without EmailJS)
      const data = new FormData(form);
      const name = encodeURIComponent(data.get('name'));
      const email = encodeURIComponent(data.get('email'));
      const projectType = encodeURIComponent(data.get('projectType'));
      const budget = encodeURIComponent(data.get('budget'));
      const message = encodeURIComponent(data.get('message'));
      const subject = `Portfolio inquiry from ${name} — ${projectType}`;
      const body = `Name: ${name}%0AEmail: ${email}%0AType: ${projectType}%0ABudget: ${budget}%0A%0AMessage:%0A${message}`;
  
      window.location.href = `mailto:youremail@example.com?subject=${subject}&body=${body}`;
      status.textContent = 'Opening your email client...';
    });
  
    // smooth scroll for nav links
    document.querySelectorAll('.nav-link').forEach(a=>{
      a.addEventListener('click', (e)=>{
        e.preventDefault();
        const id = a.getAttribute('href').slice(1);
        document.getElementById(id).scrollIntoView({behavior:'smooth'});
        // close sidebar on mobile
        if(window.innerWidth < 980) sidebar.classList.remove('open');
      });
    });
  });
  