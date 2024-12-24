import { supabase } from '../lib/supabase';

export class ProfileModal {
  private element: HTMLDivElement;

  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'profile-modal';
    this.render();
    this.attachListeners();
    document.body.appendChild(this.element);
  }

  async render(): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    const { data: profile } = await supabase.from('profiles')
      .select('*')
      .eq('id', user?.id)
      .single();

    this.element.innerHTML = `
      <div class="modal-content">
        <button class="close-button">×</button>
        <h2>Profile</h2>
        <div class="profile-info">
          <p><strong>Email:</strong> ${profile?.email || user?.email}</p>
          <p><strong>Member since:</strong> ${new Date(profile?.created_at).toLocaleDateString()}</p>
        </div>
        <button id="sign-out">Sign Out</button>
      </div>
    `;
  }

  private attachListeners(): void {
    this.element.querySelector('.close-button')?.addEventListener('click', () => {
      this.hide();
    });

    this.element.querySelector('#sign-out')?.addEventListener('click', async () => {
      try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        
        // Remove the modal from DOM before reload
        this.element.remove();
        
        // Clear any session data
        localStorage.clear();
        sessionStorage.clear();
        
        // Force a full page reload to reset the application state
        window.location.href = '/';
      } catch (error) {
        console.error('Error signing out:', error);
        alert('Failed to sign out. Please try again.');
      }
    });

    // Close modal when clicking outside
    this.element.addEventListener('click', (e) => {
      if (e.target === this.element) {
        this.hide();
      }
    });
  }

  show(): void {
    this.element.style.display = 'flex';
  }

  hide(): void {
    this.element.style.display = 'none';
  }
}