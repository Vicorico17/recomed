'use strict';

// Progressive enhancement: navigation and contact links work without JavaScript.
const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#nav-links');
document.documentElement.classList.add('js');
menuToggle.hidden = false;
function closeMenu() {
  menuToggle.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
}
menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('is-open', open);
});
navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuToggle.focus();
  }
});
window.matchMedia('(min-width: 761px)').addEventListener('change', closeMenu);

const examples = {
  dermatologie: {
    name: 'Dr. Mara Ionescu', initials: 'MI', specialty: 'Dermatologie',
    reason: 'Explică pe înțelesul pacientului pașii unei consultații dermatologice și oferă timp pentru întrebări.',
    tags: ['Explicații clare', 'Comunicare atentă'],
  },
  cardiologie: {
    name: 'Dr. Radu Marinescu', initials: 'RM', specialty: 'Cardiologie',
    reason: 'Prezintă clar cum se desfășoară consultația și discută cu răbdare întrebările pacientului.',
    tags: ['Dialog deschis', 'Pași bine explicați'],
  },
  ortopedie: {
    name: 'Dr. Elena Dumitrescu', initials: 'ED', specialty: 'Ortopedie',
    reason: 'Acordă atenție întrebărilor pacientului și explică într-un limbaj accesibil etapele consultației.',
    tags: ['Limbaj accesibil', 'Timp pentru întrebări'],
  },
};
const specialty = document.querySelector('#specialty');
specialty.disabled = false;
specialty.addEventListener('change', () => {
  const example = examples[specialty.value];
  if (!example) return;
  document.querySelector('#demo-name').textContent = example.name;
  document.querySelector('#demo-initials').textContent = example.initials;
  document.querySelector('#demo-specialty').textContent = `${example.specialty} · București`;
  document.querySelector('#demo-reason').textContent = example.reason;
  document.querySelector('#demo-tags').replaceChildren(...example.tags.map((text) => {
    const tag = document.createElement('span');
    tag.textContent = text;
    return tag;
  }));
});

const form = document.querySelector('#pilot-form');
const result = document.querySelector('#email-result');
const preview = document.querySelector('#message-preview');
const copyStatus = document.querySelector('#copy-status');
form.querySelector('button').disabled = false;
form.addEventListener('input', () => {
  result.hidden = true;
  document.querySelector('#email-link').href = 'mailto:hello@recomed.health';
  preview.value = '';
  copyStatus.textContent = '';
});
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const nameInput = form.elements.namedItem('name');
  const name = nameInput.value.trim();
  nameInput.setCustomValidity(name ? '' : 'Te rugăm să introduci numele tău.');
  if (!form.reportValidity()) return;
  const role = form.elements.namedItem('role').value;
  const email = form.elements.namedItem('email').value.trim();
  const subject = role === 'Pacient interesat de lansare' ? 'Noutăți despre lansarea Recomed' : 'Pilot Recomed — cerere de participare';
  const message = `Bună ziua,\n\nMă numesc ${name}.\nRol: ${role}\nEmail de contact: ${email}\n\n${role === 'Pacient interesat de lansare' ? 'Aș dori să aflu când se lansează Recomed pentru pacienți.' : 'Aș dori să discutăm despre participarea la pilotul Recomed.'}\n\nMulțumesc!`;
  preview.value = message;
  document.querySelector('#email-link').href = `mailto:hello@recomed.health?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
  result.hidden = false;
  document.querySelector('#email-link').focus();
});
form.elements.namedItem('name').addEventListener('input', (event) => event.target.setCustomValidity(''));
document.querySelector('#copy-message').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(preview.value);
    copyStatus.textContent = 'Mesaj copiat. Îl poți trimite la hello@recomed.health.';
  } catch {
    preview.focus();
    preview.select();
    copyStatus.textContent = 'Copierea automată nu este disponibilă. Copiază manual textul selectat.';
  }
});
