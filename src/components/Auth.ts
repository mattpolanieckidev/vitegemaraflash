import { supabase } from '../lib/supabase';

export class Auth {
  private container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
    this.render();
    this.attachListeners();
  }

  private render(): void {
    this.container.innerHTML = `
      <div class="auth-container">
        <form id="auth-form">
          <input type="email" id="email" placeholder="Email" required>
          <input type="password" id="password" placeholder="Password" required>
          <button type="submit">Sign In / Sign Up</button>
        </form>
      </div>
    `;
  }

  private attachListeners(): void {
    const form = this.container.querySelector('#auth-form') as HTMLFormElement;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = (form.querySelector('#email') as HTMLInputElement).value;
      const password = (form.querySelector('#password') as HTMLInputElement).value;

      try {
        // Try to sign in
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (signInError) {
          // If sign in fails, try to sign up
          const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email,
            password
          });

          if (signUpError) throw signUpError;
        }

        window.location.reload();
      } catch (error) {
        console.error('Authentication error:', error);
        alert('Authentication failed. Please try again.');
      }
    });
  }
}