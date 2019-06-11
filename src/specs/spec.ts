describe("Check full page", function () {
  it("should hideAfterFirstScroll", function () {
    browser.url("https://www.treatwell.co.uk/places/treatment-classic-facials/offer-type-local/in-london-uk/");

    (browser as any).checkFullPageScreen('Full page', { hideAfterFirstScroll: [ browser.$('[class*=StickyCollapse--container--]') ] });
  });
});
