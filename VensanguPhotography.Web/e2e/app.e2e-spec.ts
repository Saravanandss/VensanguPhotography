import { VensanguPhotography.WebPage } from './app.po';

describe('vensangu-photography.web App', () => {
  let page: VensanguPhotography.WebPage;

  beforeEach(() => {
    page = new VensanguPhotography.WebPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
