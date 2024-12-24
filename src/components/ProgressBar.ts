export class ProgressBar {
  private element: HTMLElement;

  constructor(element: HTMLElement) {
    this.element = element;
  }

  update(current: number, total: number): void {
    const progress = (current / total) * 100;
    this.element.style.width = `${progress}%`;
  }
}