import { test, expect } from "@playwright/test";
import { locators } from "./support/locators";
import { expectLinksClickable, expectMinCount, abrirMenuMobile, alternarTema } from "./support/helpers";

test.describe("Página Sobre Mim", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("https://portfoliodanielafoggiatto.netlify.app/");
  });

  test("Header visível com menu clicável", async ({ page }) => {
    const loc = locators(page);

    await expect(loc.header).toBeVisible();
    await expect(loc.logo).toContainText("Daniela Foggiatto");

    await expectLinksClickable(loc.navLinks);
  });

  test('deve validar o botão de tema (dark/light)', async ({ page }) => {
    await alternarTema(page);
  });

  test("Foto e texto principais aparecem", async ({ page }) => {
    const loc = locators(page);

    await expect(loc.profilePhoto).toBeVisible();
    await expect(loc.aboutParagraphs).toHaveCount(2);
  });

  test("Competências renderizam corretamente", async ({ page }) => {
    const loc = locators(page);

    await expect(loc.sectionTitles.nth(0)).toHaveText(/competências/i);
    await expect(loc.skillsCards).toHaveCount(12);
  });

  test("Soft Skills possuem ao menos 10 itens", async ({ page }) => {
    const loc = locators(page);

    await expect(loc.sectionTitles.nth(2)).toHaveText(/soft skills/i);
    await expectMinCount(loc.chips, 10);
  });

  test('Menu mobile deve abrir corretamente', async ({ page }) => {
    await abrirMenuMobile(page);
  });

  test("Footer visível", async ({ page }) => {
    const loc = locators(page);

    await expect(loc.footer).toBeVisible();
    await expect(loc.footer).toContainText("Portfólio desenvolvido por mim");
  });

});
