document.documentElement.classList.add('js');

const filters = document.querySelectorAll('.filter');
const dossiers = document.querySelectorAll('.dossier');
const rosterCount = document.querySelector('.roster-count');

function setFilter(filter) {
  let visible = 0;

  filters.forEach((button) => {
    const active = button.dataset.filter === filter;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });

  dossiers.forEach((dossier) => {
    const matches = filter === 'all' || dossier.dataset.coalition === filter;
    dossier.classList.toggle('is-hidden', !matches);
    if (matches) visible += 1;
  });

  rosterCount.textContent = `${String(visible).padStart(2, '0')} / 06 active`;
}

filters.forEach((button) => {
  button.addEventListener('click', () => setFilter(button.dataset.filter));
});

dossiers.forEach((dossier) => {
  const select = () => {
    dossiers.forEach((item) => item.classList.remove('selected'));
    dossier.classList.add('selected');
    dossiers.forEach((item) => item.removeAttribute('aria-label'));
    dossier.setAttribute('aria-label', `${dossier.querySelector('h3').textContent}, selected pilot`);
  };

  dossier.addEventListener('click', select);
  dossier.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      select();
    }
  });
});
