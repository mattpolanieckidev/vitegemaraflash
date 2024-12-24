export class FlashcardDisplay {
  private element: HTMLElement;

  constructor(element: HTMLElement) {
    this.element = element;
  }

  showInitial(flashcard: { phrase: string }): void {
    this.element.innerHTML = `
      <div class="phrase">
        <strong>Word:</strong> ${flashcard.phrase}
      </div>
    `;
  }

  showComplete(flashcard: { phrase: string; translation: string; description: string }): void {
    this.element.innerHTML = `
      <div class="phrase">
        <strong>Word:</strong> ${flashcard.phrase}
      </div>
      <div class="translation">
        <strong>Translation:</strong> ${flashcard.translation}
      </div>
      <div class="description">
        <strong>Description:</strong> ${flashcard.description}
      </div>
    `;
  }

  showCompletion(): void {
    this.element.innerHTML = `
      <div class="completion">
        <span style="font-size: 2rem">✓</span>
        <p>All cards completed!</p>
      </div>
    `;
  }
}