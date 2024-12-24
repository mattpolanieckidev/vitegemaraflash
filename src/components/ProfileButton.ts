import { supabase } from '../lib/supabase';
import { ProfileModal } from './ProfileModal';

export class ProfileButton {
  private container: HTMLElement;
  private modal: ProfileModal | null = null;

  constructor(container: HTMLElement) {
    this.container = container;
    this.render();
    this.attachListeners();
  }

  private render(): void {
    const button = document.createElement('button');
    button.id = 'profile-button';
    button.innerHTML = '👤 Profile';
    button.className = 'profile-button';
    this.container.appendChild(button);
  }

  private attachListeners(): void {
    const button = this.container.querySelector('#profile-button') as HTMLButtonElement;
    button.addEventListener('click', () => {
      if (!this.modal) {
        this.modal = new ProfileModal();
      }
      this.modal.show();
    });
  }
}