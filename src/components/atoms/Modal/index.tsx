import { useTranslations } from 'next-intl';
import { useRef, useEffect, useCallback, type JSX } from 'react';
import Icon from '@/components/atoms/Icon';
import { Modal as ModalProps } from './types';
import './Modal.css';

const Modal = ({ id, title, children, open, handleCloseModal }: ModalProps): JSX.Element => {
  const t = useTranslations('common');

  const modal = useRef<HTMLDialogElement>(null);

  const openModal = useCallback(() => {
    modal.current?.showModal();
    document.body.setAttribute('style', 'overflow-y: hidden');
  }, [modal]);

  const closeModal = useCallback(() => {
    handleCloseModal();
    modal.current?.close();
    document.body.removeAttribute('style');
  }, [modal, handleCloseModal]);

  useEffect(() => {
    const closeKeyDownHandler = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      closeModal();
      document.removeEventListener('keydown', closeKeyDownHandler);
    };

    const clickHandler = (event: MouseEvent) => {
      const target = event.target as Node;

      if (!modal || !modal.current || !target) {
        return;
      }

      const inner = document.querySelector(`#${id}`);
      if (!inner || !(inner instanceof HTMLElement)) {
        return;
      }

      if (inner.contains(target)) {
        return;
      }

      const rect = inner.getBoundingClientRect();
      if (
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom &&
        event.clientX >= rect.left &&
        event.clientX <= rect.right
      ) {
        return;
      }

      closeModal();
      document.removeEventListener('click', clickHandler);
    };

    if (open) {
      document.addEventListener('keydown', closeKeyDownHandler);
      document.addEventListener('click', clickHandler);
    }

    return () => {
      document.removeEventListener('keydown', closeKeyDownHandler);
      document.removeEventListener('click', clickHandler);
    };
  });

  useEffect(() => {
    if (open) {
      openModal();
    }
    if (!open) {
      closeModal();
    }
  }, [open, openModal, closeModal]);

  return (
    <dialog className="modal" ref={modal} role="none">
      <div id={id} className="modal__inner">
        <div className="modal__header">
          <button
            className="modal__header__close-button"
            type="button"
            aria-label={t('closeWindow')}
            onClick={closeModal}
          >
            <Icon name="close" size="lg" />
          </button>
          {title && <div className="t-headline-3 modal__header__title">{title}</div>}
        </div>
        <div className="modal__content">{children}</div>
      </div>
    </dialog>
  );
};

export default Modal;
