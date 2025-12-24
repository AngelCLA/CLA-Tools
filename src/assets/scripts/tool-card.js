document.querySelectorAll('.tool-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / 6;
      const y = (e.clientY - rect.top - rect.height / 2) / 6;

      card.style.setProperty('--x', `${x}px`);
      card.style.setProperty('--y', `${y}px`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--x', `0px`);
      card.style.setProperty('--y', `0px`);
    });
  });