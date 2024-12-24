import { Flashcard, flashcards } from './data/flashcards';
import { shuffle } from './utils/shuffle';
import { FlashcardDisplay } from './components/FlashcardDisplay';
import { ProgressBar } from './components/ProgressBar';

export class FlashcardApp {
  private flashcards: Flashcard[];
  private currentIndex: number = 0;
  private display: FlashcardDisplay;
  private progressBar: ProgressBar;
  private showTranslationButton: HTMLButtonElement;
  private nextCardButton: HTMLButtonElement;

  constructor() {
    this.flashcards = [...flashcards];
    shuffle(this.flashcards);

    this.display = new FlashcardDisplay(
      document.getElementById('flashcard') as HTMLElement
    );
    this.progressBar = new ProgressBar(
      document.getElementById('progress-bar') as HTMLElement
    );
    this.showTranslationButton = document.getElementById(
      'show-translation'
    ) as HTMLButtonElement;
    this.nextCardButton = document.getElementById(
      'next-card'
    ) as HTMLButtonElement;

    this.initializeEventListeners();
    this.updateFlashcard();
  }

  private initializeEventListeners(): void {
    this.showTranslationButton.addEventListener('click', () => this.showTranslation());
    this.nextCardButton.addEventListener('click', () => this.nextFlashcard());
  }

  private updateFlashcard(): void {
    this.display.showInitial(this.flashcards[this.currentIndex]);
    this.showTranslationButton.disabled = false;
    this.nextCardButton.disabled = false;
  }

  private showTranslation(): void {
    this.display.showComplete(this.flashcards[this.currentIndex]);
    this.showTranslationButton.disabled = true;
  }

  private nextFlashcard(): void {
    this.currentIndex++;
    if (this.currentIndex < this.flashcards.length) {
      this.updateFlashcard();
      this.progressBar.update(this.currentIndex, this.flashcards.length);
    } else {
      this.display.showCompletion();
      this.progressBar.update(this.currentIndex, this.flashcards.length);
      alert('You have completed all the flashcards!');
      this.showTranslationButton.disabled = true;
    }
  }
}