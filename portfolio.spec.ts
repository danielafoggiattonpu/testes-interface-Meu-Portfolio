import { test, expect } from "@playwright/test";
import { locators } from "./support/locators";
import {
  validarHeader,
  validarTitulo,
  validarQuantidade,
  acessarPortfolio, checkActiveNav, 
  expectLinksClickable,
  abrirMenuMobile, alternarTema
} from "./support/helpers";

test.describe("Página de Experiência", () => {

  test.beforeEach(async ({ page }) => {
    await acessarPortfolio(page);
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

    test("Validar título e subtítulo da página", async ({ page }) => {
      await expect(page.locator("h2.page-title")).toHaveText("Portfólio");

      await expect(
        page.locator(".subtitle")
      ).toContainText("Projetos focados em automação de testes");
    });

    test("Validar quantidade total de cards", async ({ page }) => {
      const cards = page.locator(".project-card");
      await expect(cards).toHaveCount(20); // ajuste se mudar
    });

    test("Validar estrutura de cada card", async ({ page }) => {
      const cards = page.locator(".project-card");

      const total = await cards.count();

      for (let i = 0; i < total; i++) {
        const card = cards.nth(i);

        await expect(card.locator("h3")).toBeVisible();
        await expect(card.locator("p.description")).toBeVisible();
        await expect(card.locator(".buttons")).toBeVisible();

        const codeBtn = card.locator(".code-btn");
        await expect(codeBtn).toBeVisible();

        const demoBtn = card.locator(".demo-btn");
        await expect(demoBtn).toBeVisible();
      }
    });

    test("Validar botões 'Ver Código' possuem links válidos", async ({ page }) => {
      const buttons = page.locator(".code-btn");
      const total = await buttons.count();

      for (let i = 0; i < total; i++) {
        const btn = buttons.nth(i);
        const href = await btn.getAttribute("href");
        expect(href).toContain("https://github.com/");
      }
    });

    test("Validar clique no botão Demo abre modal/snippet (se aplicável)", async ({ page }) => {
      const demoBtn = page.locator(".demo-btn").first();

      await demoBtn.click();

      const modal = page.locator(".snippet-modal");
      if (await modal.count()) {
        await expect(modal).toBeVisible();
      }
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
