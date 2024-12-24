import { Flashcard, flashcards } from '../data/flashcards';
import { shuffle } from '../utils/shuffle';
import { FlashcardDisplay } from '../components/FlashcardDisplay';
import { ProgressBar } from '../components/ProgressBar';

interface FlashcardElements {
  flashcard: HTMLElement;
  showTranslation: HTMLButtonElement;
  nextCard: HTMLButtonElement;
  progressBar: HTMLElement;
}

export class FlashcardApp {
  private flashcards: Flashcard[];
  private currentIndex: number = 0;
  private display: FlashcardDisplay;
  private progressBar: ProgressBar;
  private elements: FlashcardElements;

  constructor(elements: FlashcardElements) {
    this.elements = elements;
    this.flashcards = [...flashcards];
    shuffle(this.flashcards);

    this.display = new FlashcardDisplay(this.elements.flashcard);
    this.progressBar = new ProgressBar(this.elements.progressBar);

    this.initializeEventListeners();
    this.updateFlashcard();
  }

  private initializeEventListeners(): void {
    this.elements.showTranslation.addEventListener('click', () => this.showTranslation());
    this.elements.nextCard.addEventListener('click', () => this.nextFlashcard());
  }

  private updateFlashcard(): void {
    this.display.showInitial(this.flashcards[this.currentIndex]);
    this.elements.showTranslation.disabled = false;
    this.elements.nextCard.disabled = false;
  }

  private showTranslation(): void {
    this.display.showComplete(this.flashcards[this.currentIndex]);
    this.elements.showTranslation.disabled = true;
  }

  private nextFlashcard(): void {
    this.currentIndex++;
    if (this.currentIndex < this.flashcards.length) {
      this.updateFlashcard();
      this.progressBar.update(this.currentIndex, this.flashcards.length);
    } else {
      this.display.showCompletion();
      this.progressBar.update(this.currentIndex, this.flashcards.length);
      this.elements.showTranslation.disabled = true;
      this.elements.nextCard.disabled = true;
      setTimeout(() => {
        alert('You have completed all the flashcards!');
      }, 100);
    }
  }
}