import { Locator, expect, Page } from "@playwright/test";
import { locators } from './locators';

// --- EXPECT HELPERS ---
export async function expectVisible(locator: Locator) {
  await expect(locator).toBeVisible();
}

export async function expectCount(locator: Locator, count: number) {
  await expect(locator).toHaveCount(count);
}

export async function expectMinCount(locator: Locator, min: number) {
  const c = await locator.count();
  expect(c).toBeGreaterThanOrEqual(min);
}

export async function expectLinksClickable(locator: Locator) {
  const total = await locator.count();
  for (let i = 0; i < total; i++) {
    const item = locator.nth(i);
    await expect(item).toBeVisible();
    await expect(item).toBeEnabled();
  }
}

export async function expectMinTextLength(locator: Locator, length = 10) {
  const texts = await locator.allTextContents();
  texts.forEach(t => expect(t.trim().length).toBeGreaterThan(length));
}

// --- ACTIVE NAV ---
export async function checkActiveNav(page: Page, active: string) {
  const link = page.getByRole('link', { name: active });
  await expect(link).toHaveClass(/active/);
}

// --- TITLES ---
export async function checkPageTitle(page: Page, title: string) {
  const l = locators(page);
  await expect(l.pageTitle).toHaveText(title);
}

// --- GENERIC COUNT ---
export async function checkMinimumItems(locator: Locator, minimum: number) {
  const total = await locator.count();
  expect(total).toBeGreaterThanOrEqual(minimum);
}

// --- SCROLL ---
export async function scrollToElement(page: Page, locator: Locator) {
  await locator.scrollIntoViewIfNeeded();
}

// --- VALIDAR CARDS COM TÍTULO E TEXTO ---
export async function validateCardsHaveTitleAndText(locator: Locator) {
  const cards = await locator.all();
  for (const card of cards) {
    await expect(card.locator('h3')).toBeVisible();
    await expect(card.locator('p')).toBeVisible();
  }
}

// --- EXPERIÊNCIA PAGE ---
export async function acessarExperiencia(page: Page) {
  await page.goto("https://portfoliodanielafoggiatto.netlify.app/experiencia");
  await page.waitForLoadState('networkidle');
}

// --- PORTFÓLIO PAGE ---
export async function acessarPortfolio(page: Page) {
  await page.goto("https://portfoliodanielafoggiatto.netlify.app/");
  await page.waitForLoadState('networkidle');

  const l = locators(page);
  await l.portfolioBtn.click();

  await expect(l.pageTitle).toBeVisible();
}

// --- HEADER ---
export async function validarHeader(page: Page) {
  const l = locators(page);

  await expect(l.navMenu).toBeVisible();
  //await expect(l.mobileBtn).toBeVisible();
  await expect(l.themeToggle).toBeVisible();
}

// --- VALIDAR TÍTULO ---
export async function validarTitulo(page: Page, titulo: string) {
  const l = locators(page);
  await expect(l.pageTitle).toHaveText(titulo);
}

// --- CLICAR NO MENU ---
export async function clicarBotaoMenu(page: Page, botao: Locator) {
  await botao.click();
}

// --- QUANTIDADE ---
export async function validarQuantidade(locator: Locator, minimo: number) {
  const count = await locator.count();
  expect(count).toBeGreaterThanOrEqual(minimo);
}

// --- CERTIFICAÇÕES ---
export async function acessarCertificacoes(page: Page) {
  await page.goto("https://portfoliodanielafoggiatto.netlify.app/certificacoes");
  await page.waitForLoadState('networkidle');
  const l = locators(page);
  await expect(l.pageTitle).toBeVisible();
}

export async function validarLinksCertificados(page: Page) {
  const l = locators(page);
  const total = await l.certCards.count();

  for (let i = 0; i < total; i++) {
    const link = l.certLinks.nth(i);
    const href = await link.getAttribute('href');

    expect(href).toBeTruthy();
    expect(href).toContain('linkedin.com');
  }
}

// --- THEME TOGGLE ---
export async function alternarTema(page: Page) {
  const html = page.locator('html');
  const l = locators(page);

  // estado inicial (3 checks)
  const initialHasDark = await html.evaluate(el => el.classList.contains('dark'));
  const initialDataTheme = await html.getAttribute('data-theme');
  const initialBg = await html.evaluate(el => getComputedStyle(el).getPropertyValue('--bg').trim());

  // aciona o toggle
  await l.themeToggle.click();

  // aguarda até que qualquer um dos sinais mude
  await expect.poll(async () => {
    const hasDark = await html.evaluate(el => el.classList.contains('dark'));
    const dataTheme = await html.getAttribute('data-theme');
    const bg = await html.evaluate(el => getComputedStyle(el).getPropertyValue('--bg').trim());

    // true se algo mudou
    return hasDark !== initialHasDark
      || dataTheme !== initialDataTheme
      || bg !== initialBg;
  }, { timeout: 5000 }).toBe(true);

  // verificação final: pelo menos UMA mudança detectada
  const finalHasDark = await html.evaluate(el => el.classList.contains('dark'));
  const finalDataTheme = await html.getAttribute('data-theme');
  const finalBg = await html.evaluate(el => getComputedStyle(el).getPropertyValue('--bg').trim());

  const changed = finalHasDark !== initialHasDark
    || finalDataTheme !== initialDataTheme
    || finalBg !== initialBg;

  expect(changed).toBe(true);
}

// --- MENU MOBILE ---
export async function abrirMenuMobile(page: Page) {
  await page.setViewportSize({ width: 480, height: 800 });
  await locators(page).mobileBtn.click();
  await expect(locators(page).navMenu).toBeVisible();
}

// --- LINKEDIN PAGE ---
export async function navegarParaLinkedin(page: Page) {
  await page.goto("https://portfoliodanielafoggiatto.netlify.app/");
  await page.waitForLoadState('networkidle');
  const l = locators(page);
  await l.linkedinBtn.click();
  await expect(l.pageTitle).toBeVisible();
}

export async function validarEstruturaDosCardsLinkedin(page: Page) {
  const l = locators(page);

  await expect(l.linkedinGrid).toBeVisible();
  await expect(l.linkedinCards).toHaveCount(8);

  for (let i = 0; i < 6; i++) {
    await expect(l.linkedinCards.nth(i)).toBeVisible();
    await expect(l.linkedinImages.nth(i)).toBeVisible();
    await expect(l.linkedinLinks.nth(i)).toHaveAttribute('href', /linkedin\.com/);
  }
}

export async function clicarTodosOsCardsLinkedin(page: Page) {
  const l = locators(page);
  const count = await l.linkedinCards.count();

  for (let i = 0; i < count; i++) {
    const href = await l.linkedinLinks.nth(i).getAttribute('href');
    expect(href).toMatch(/linkedin\.com/);
  }
}

// --- CONTATO ---
export async function navegarParaContato(page: Page) {
  await page.goto("https://portfoliodanielafoggiatto.netlify.app/contato");
  await page.waitForLoadState('networkidle');
}

export async function validarEstruturaContato(page: Page) {
  const headings = page.locator('h2');
  await expect(headings).toBeVisible();
  await expect(headings).toHaveText(/Contato/i);
}

export async function validarCardsContato(page: Page) {
  const l = locators(page);

  const count = await l.contactCards.count();
  for (let i = 0; i < count; i++) {
    await expect(l.contactCards.nth(i)).toBeVisible();
    await expect(l.contactLinks.nth(i)).toBeVisible();
    await expect(l.contactIcons.nth(i)).toBeVisible();
    await expect(l.contactTitles.nth(i)).toBeVisible();
    await expect(l.contactTexts.nth(i)).toBeVisible();
  }
}

export async function testarBotoesCopiar(page: Page) {
  const l = locators(page);
  const count = await l.copyButtons.count();

  expect(count).toBe(4);

  for (let i = 0; i < count; i++) {
    await expect(l.copyButtons.nth(i)).toBeVisible();
    await l.copyButtons.nth(i).click();
  }
}
