import { test, expect } from "@playwright/test";
import {
    navegarParaContato,
    validarEstruturaContato,
    validarCardsContato,
    testarBotoesCopiar,
    expectLinksClickable,
    abrirMenuMobile, 
    alternarTema
} from "./support/helpers";
import { locators } from "./support/locators";

test.describe("Página de Contato – Testes UI", () => {

    test.beforeEach(async ({ page }) => {
        await navegarParaContato(page);
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

    test("Validar título e layout inicial", async ({ page }) => {
        await validarEstruturaContato(page);
    });

    test("Validar estrutura completa dos cards de contato", async ({ page }) => {
        await validarCardsContato(page);
    });

    test("Validar botões de copiar", async ({ page }) => {
        await testarBotoesCopiar(page);
    });

    test("Validar links externos de contato", async ({ page }) => {
        const l = locators(page);

        const hrefs = await l.contactLinks.evaluateAll(links =>
            links.map(a => a.getAttribute("href"))
        );

        // WhatsApp
        expect(hrefs[0]).toMatch(/wa\.me/);

        // Email
        expect(hrefs[1]).toMatch(/mailto:/);

        // LinkedIn
        expect(hrefs[2]).toMatch(/linkedin\.com/);

        // GitHub
        expect(hrefs[3]).toMatch(/github\.com/);
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
