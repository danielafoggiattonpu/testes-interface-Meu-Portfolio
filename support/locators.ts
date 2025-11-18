import { Page } from "@playwright/test";

export const locators = (page: Page) => ({

    // --- HEADER ---
    header: page.locator('header.header'),
    logo: page.locator('h1.logo'),
    navMenu: page.locator('#navMenu'),
    navLinks: page.locator('.nav a'),
    themeToggle: page.locator('#themeToggle'),
    mobileBtn: page.locator('#mobileBtn'),

    // --- NAV BUTTONS ---
    sobreMimBtn: page.getByRole('link', { name: 'Sobre Mim' }),
    experienciaBtn: page.getByRole('link', { name: 'Experiência' }),
    portfolioBtn: page.getByRole('link', { name: 'Portfólio' }),
    certificacoesBtn: page.getByRole('link', { name: 'Certificações' }),
    linkedinBtn: page.getByRole('link', { name: 'Linkedin - Posts Profissionais' }),
    contatoBtn: page.getByRole('link', { name: 'Contato' }),

    // --- TÍTULOS ---
    pageTitle: page.locator('.page-title'),
    pageSubtitle: page.locator('.page-subtitle'),
    subtitle: page.locator('.subtitle'),

    // --- SOBRE MIM ---
    profilePhoto: page.locator('.profile-photo'),
    aboutParagraphs: page.locator('.about-text p'),
    sectionTitles: page.locator('.section-title'),

    // --- COMPETÊNCIAS ---
    skillsCards: page.locator('.skill-card'),
    skillsIcons: page.locator('.skill-card .icon'),
    skillCards: page.locator('.skill-card'), // compat.

    // --- SOFT SKILLS ---
    chips: page.locator('.chips .chip'),

    // --- EXPERIÊNCIA ---
    timeline: page.locator('.timeline'),
    timelineItems: page.locator('.timeline-item'),
    timelineDots: page.locator('.timeline-dot'),
    timelineContent: page.locator('.timeline-content'),
    experienceCards: page.locator('.exp-card'),

    // --- CARDS EXPERIÊNCIA ---
    expCards: page.locator('.exp-card'),
    expCardTitle: page.locator('.exp-card h3'),
    expCardIcon: page.locator('.exp-card .exp-icon'),
    expCardText: page.locator('.exp-card p'),

    // --- CERTIFICAÇÕES ---
    certsContainer: page.locator('#certsContainer'),
    certCards: page.locator('.cert-card'),
    certTitles: page.locator('.cert-card h3'),
    certButtons: page.locator('.cert-btn-outline'),
    certLinks: page.locator('.cert-card a'),

    // --- LINKEDIN POSTS ---
    linkedinGrid: page.locator('.linkedin-grid'),
    linkedinCards: page.locator('.linkedin-card'),
    linkedinImages: page.locator('.linkedin-card img'),
    linkedinLinks: page.locator('.linkedin-card a'),
    linkedinHover: page.locator('.linkedin-hover'),

    // --- CONTATO ---
    contactGrid: page.locator('.contact-grid'),
    contactCards: page.locator('.contact-card'),
    contactLinks: page.locator('.contact-card-link'),
    contactIcons: page.locator('.contact-card .icon'),
    contactTitles: page.locator('.contact-card h3'),
    contactTexts: page.locator('.contact-card p'),
    copyButtons: page.locator('.copy-btn'),

    // --- FOOTER / BADGE ---
    badgeDev: page.locator('.badge-dev'),
    footer: page.locator('.footer'),
});

// compatibilidade com imports antigos
export const siteLocators = locators;
