const initCertificationModal = () => {
  const modal = document.getElementById(''certModal'');
  if (!modal) {
    return;
  }

  const triggers = Array.from(document.querySelectorAll('[data-cert-trigger]'));
  if (!triggers.length) {
    return;
  }

  const frame = modal.querySelector('.cert-modal__frame');
  const placeholder = modal.querySelector('[data-cert-placeholder]');
  const title = modal.querySelector('#certModalTitle');
  const closeButtons = modal.querySelectorAll('[data-cert-close]');
  const defaultPlaceholderText = placeholder ? placeholder.textContent : 'Add your diploma PDF path to the certification item to preview it here.';

  const resetModal = () => {
    if (frame) {
      frame.setAttribute('hidden', '');
      frame.removeAttribute('src');
    }
    if (placeholder) {
      placeholder.textContent = defaultPlaceholderText;
      placeholder.removeAttribute('hidden');
    }
  };

  const openModal = (trigger) => {
    const src = (trigger.dataset.certSrc || '').trim();
    const label = trigger.dataset.certLabel || 'Certification';

    if (title) {
      title.textContent = label;
    }

    if (src && src !== '#') {
      if (placeholder) {
        placeholder.setAttribute('hidden', '');
      }
      if (frame) {
        frame.setAttribute('src', src);
        frame.removeAttribute('hidden');
      }
    } else {
      if (frame) {
        frame.setAttribute('hidden', '');
        frame.removeAttribute('src');
      }
      if (placeholder) {
        placeholder.textContent = `Add your diploma PDF path for ${label} to preview it here.`;
        placeholder.removeAttribute('hidden');
      }
    }

    if (typeof modal.showModal === 'function') {
      modal.showModal();
    } else {
      modal.setAttribute('open', '');
    }
  };

  const closeModal = () => {
    resetModal();
    if (typeof modal.close === 'function') {
      modal.close();
    } else {
      modal.removeAttribute('open');
    }
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => openModal(trigger));
  });

  closeButtons.forEach((button) => {
    button.addEventListener('click', closeModal);
  });

  modal.addEventListener('cancel', (event) => {
    event.preventDefault();
    closeModal();
  });

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  resetModal();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCertificationModal, { once: true });
} else {
  initCertificationModal();
}
