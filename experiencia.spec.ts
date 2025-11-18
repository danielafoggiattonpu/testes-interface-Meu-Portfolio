import { test, expect } from '@playwright/test';
import { locators } from './support/locators';
import {
  checkActiveNav,
  checkPageTitle,
  checkMinimumItems,
  scrollToElement,
  validateCardsHaveTitleAndText,
  acessarExperiencia,
  alternarTema,
  abrirMenuMobile,
  expectLinksClickable
} from './support/helpers';

test.describe('Página de Experiência', () => {

  test.beforeEach(async ({ page }) => {
    await acessarExperiencia(page);
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

  test('deve validar título e subtítulo da página', async ({ page }) => {
    await checkPageTitle(page, 'Minha Experiência');
    const subtitle = page.locator('.page-subtitle');
    await expect(subtitle).toContainText(/trajetória profissional/i);
  });

  test('deve validar estrutura da timeline', async ({ page }) => {
    const l = locators(page);
    await expect(l.timeline).toBeVisible();
    await checkMinimumItems(l.timelineItems, 2);

    // validar conteúdo interno
    const items = await l.timelineItems.all();

    for (const item of items) {
      const content = item.locator('.timeline-content');

      await expect(content.locator('h3')).toBeVisible();
      await expect(content.locator('.timeline-date')).toBeVisible();

      const lists = content.locator('ul');
      const ulCount = await lists.count();

      if (ulCount > 0) {
        expect(await lists.first().locator('li').count()).toBeGreaterThan(0);
      }
    }
  });

  test('deve validar a seção "Competências Aplicadas"', async ({ page }) => {
    const section = page.locator('.section-title', { hasText: 'Competências Aplicadas' });

    await scrollToElement(page, section);
    await expect(section).toBeVisible();

    const l = locators(page);
    const cards = l.experienceCards;

    await checkMinimumItems(cards, 6);

    await validateCardsHaveTitleAndText(cards);

  });



  test('deve validar o menu mobile', async ({ page }) => {
    await abrirMenuMobile(page);
  });

  test("Footer visível", async ({ page }) => {
    const loc = locators(page);

    await expect(loc.footer).toBeVisible();
    await expect(loc.footer).toContainText("Portfólio desenvolvido por mim");
  });
});
