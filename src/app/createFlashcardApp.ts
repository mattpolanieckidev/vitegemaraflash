import { FlashcardApp } from './FlashcardApp';
import { ProfileButton } from '../components/ProfileButton';

export function createFlashcardApp(): void {
  const elements = {
    flashcard: document.getElementById('flashcard'),
    showTranslation: document.getElementById('show-translation') as HTMLButtonElement,
    nextCard: document.getElementById('next-card') as HTMLButtonElement,
    progressBar: document.getElementById('progress-bar')
  };

  // Validate that all required elements exist
  for (const [key, element] of Object.entries(elements)) {
    if (!element) {
      throw new Error(`Required element #${key} not found`);
    }
  }

  // Initialize the profile button
  const appContainer = document.getElementById('app');
  if (appContainer) {
    new ProfileButton(appContainer);
  }

  new FlashcardApp(elements);
}