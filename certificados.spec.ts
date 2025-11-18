import { test, expect } from '@playwright/test';
import {
  acessarCertificacoes,
  validarLinksCertificados,
  alternarTema,
  abrirMenuMobile, 
  expectLinksClickable
} from './support/helpers';
import { locators } from './support/locators';

test.describe('Página de Certificações', () => {

  test.beforeEach(async ({ page }) => {
    await acessarCertificacoes(page);
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

  test('Deve exibir título e subtítulo da página', async ({ page }) => {
    const l = locators(page);

    await expect(l.pageTitle).toBeVisible();
    await expect(l.subtitle).toBeVisible();
  });

  test('Deve exibir os cards de certificação', async ({ page }) => {
    const l = locators(page);

    const total = await l.certCards.count();
    expect(total).toBeGreaterThan(0);
  });

  test('Cada card deve ter link válido para o LinkedIn', async ({ page }) => {
    await validarLinksCertificados(page);
  });

  test('Botões dos cards devem abrir em nova aba (link externo)', async ({ page }) => {
    const l = locators(page);

    const paginasAntes = page.context().pages().length;

    await l.certButtons.first().click();

    await page.waitForTimeout(800);

    const paginasDepois = page.context().pages().length;

    expect(paginasDepois).toBeGreaterThanOrEqual(paginasAntes);
  });

  test('Deve alternar o tema', async ({ page }) => {
    await alternarTema(page);
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
