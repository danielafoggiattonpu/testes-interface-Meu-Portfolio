import { test, expect } from "@playwright/test";
import { locators } from "./support/locators";
import {
    navegarParaLinkedin,
    validarEstruturaDosCardsLinkedin,
    clicarTodosOsCardsLinkedin,
    expectLinksClickable,
    abrirMenuMobile, alternarTema
} from "./support/helpers";

test.describe("Página de LinkedIn – Testes UI", () => {

    test.beforeEach(async ({ page }) => {
        await navegarParaLinkedin(page);
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

    test("Validar título e layout principal", async ({ page }) => {
        const l = locators(page);

        await expect(l.pageTitle).toHaveText(/Posts Profissionais/i);
        await expect(l.linkedinGrid).toBeVisible();
    });

    test("Validar estrutura completa dos cards", async ({ page }) => {
        await validarEstruturaDosCardsLinkedin(page);
    });

    test("Validar se todos os links dos cards levam ao LinkedIn", async ({ page }) => {
        await clicarTodosOsCardsLinkedin(page);
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
