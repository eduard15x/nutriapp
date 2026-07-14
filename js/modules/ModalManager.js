class ModalManager {
  constructor() {
    this.modals = new Map();
    this.currentModal = null;
    this.initializeModals();
    this.attachEventListeners();
  }

  initializeModals() {
    const modalElements = document.querySelectorAll('[id$="-modal"]');
    modalElements.forEach(modal => {
      const modalId = modal.id.replace('-modal', '');
      this.modals.set(modalId, modal);
    });
  }

  attachEventListeners() {
    document.addEventListener('click', (e) => {
      const openButton = e.target.closest('[data-modal]');
      if (openButton) {
        const modalId = openButton.dataset.modal;
        this.open(modalId);
      }

      const closeButton = e.target.closest('[data-modal-close]');
      if (closeButton) {
        const modalId = closeButton.dataset.modalClose;
        this.close(modalId);
      }

      if (e.target.classList.contains('modal')) {
        this.closeAll();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeAll();
      }
    });
  }

  open(modalId) {
    const modal = this.modals.get(modalId);
    if (!modal) {
      console.error(`ModalManager - Modal not found: ${modalId}`);
      return;
    }

    this.closeAll();
    modal.classList.add('active');
    this.currentModal = modalId;
    document.body.style.overflow = 'hidden';

    const event = new CustomEvent('modalOpened', { detail: { modalId } });
    document.dispatchEvent(event);
  }

  close(modalId) {
    const modal = this.modals.get(modalId);
    if (!modal) return;

    modal.classList.remove('active');
    if (this.currentModal === modalId) {
      this.currentModal = null;
      document.body.style.overflow = '';
    }

    const event = new CustomEvent('modalClosed', { detail: { modalId } });
    document.dispatchEvent(event);
  }

  closeAll() {
    this.modals.forEach((modal) => {
      modal.classList.remove('active');
    });
    this.currentModal = null;
    document.body.style.overflow = '';
  }

  setContent(modalId, content) {
    const modal = this.modals.get(modalId);
    if (!modal) return;

    const contentArea = modal.querySelector('.modal-content');
    if (contentArea) {
      const header = contentArea.querySelector('.modal-header');
      if (header) {
        contentArea.innerHTML = header.outerHTML + content;
      } else {
        contentArea.innerHTML = content;
      }
    }
  }

  getModal(modalId) {
    return this.modals.get(modalId);
  }
}

const modalManager = new ModalManager();
