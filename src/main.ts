import './styles/base.css';
import './styles/components.css';
import './styles/auth.css';
import './styles/profile.css';
import './styles/dark-mode.css';

import { createFlashcardApp } from './app/createFlashcardApp';
import { Auth } from './components/Auth';
import { supabase } from './lib/supabase';

async function init() {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    // Show auth form if not logged in
    new Auth(document.getElementById('app') as HTMLElement);
  } else {
    // Show flashcards if logged in
    createFlashcardApp();
  }
}

document.addEventListener('DOMContentLoaded', init);