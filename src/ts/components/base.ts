import { HTMLElementNotFoundError } from '../errors';

export default class {
  protected getComponentElements(selectors: Array<string>): never | Array<HTMLElement> {
    return selectors.map((selector: string) => {
      const maybeHTMLElement: HTMLElement | null = document.querySelector(`${selector}`);
      if (!(maybeHTMLElement instanceof HTMLElement)) {
        throw new HTMLElementNotFoundError(`Probably you put wrong selector, but must be ${selector}`);
      }
      return maybeHTMLElement;
    });
  }
}