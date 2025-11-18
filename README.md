
# Testes de Interface — Meu Portfólio

Automação de testes de interface para o meu portfólio pessoal, com foco em **Playwright E2E** para validar páginas importantes (certificados, contato, experiência, LinkedIn etc).

---

## 🔍 Visão Geral

Este repositório contém testes ponta a ponta (E2E) que verificam a usabilidade e a consistência visual do meu site/portfólio. O objetivo é garantir que os elementos-chave da interface funcionem corretamente (navegação, tema, conteúdo das páginas, formulários, timeline, etc).

---

## 🛠️ Tecnologias

- Playwright  
- TypeScript  
- Node.js  
- Browsers suportados: Chrome (Desktop)  

---

## 📁 Estrutura do Projeto

```

/
├── certificados.spec.ts         # Testes da página de certificados
├── contato.spec.ts               # Testes da página de contato
├── experiencia.spec.ts            # Testes da página de experiência
├── linkedin.spec.ts               # Testes da página do LinkedIn
├── sobre-mim.spec.ts               # (outras páginas, se houver)
├── playwright.config.ts            # Configuração do Playwright
└── support/                         # Helpers e locators
├── helpers.ts
└── locators.ts

````

- Cada página tem seu próprio arquivo de teste — isso facilita a manutenção e o isolamento.  
- A pasta `support` centraliza funções reutilizáveis e seletores (locators).

---

## 🚀 Como Usar / Executar os Testes

1. Clone o repositório:  
   ```bash
   git clone https://github.com/danielafoggiattonpu/testes-interface-Meu-Portfolio.git
   cd testes-interface-Meu-Portfolio


2. Instale as dependências:

   ```bash
   npm install
   ```

3. Execute os testes:

   ```bash
   npx playwright test
   ```

4. (Opcional) Gere um relatório de teste:

   ```bash
   npx playwright show-report
   ```

---

## ⚙️ Configuração de Workers

No `playwright.config.ts`, cada página está configurada como um projeto separado, com `workers: 1`:

```ts
projects: [
  {
    name: 'certificados',
    testMatch: /certificados\.spec\.ts$/,
    workers: 1,
    use: devices['Desktop Chrome'],
  },
  {
    name: 'contato',
    testMatch: /contato\.spec\.ts$/,
    workers: 1,
    use: devices['Desktop Chrome'],
  },
  {
    name: 'experiencia',
    testMatch: /experiencia\.spec\.ts$/,
    workers: 1,
    use: devices['Desktop Chrome'],
  },
  {
    name: 'linkedin',
    testMatch: /linkedin\.spec\.ts$/,
    workers: 1,
    use: devices['Desktop Chrome'],
  },
  // … outros projetos/pages se houver
];
```

Isso garante isolamento total entre cada suite de testes e evita interferência de estado.

---

## ✅ O Que é Validado nos Testes

Alguns dos principais cenários cobertos:

* Verificar se o **header** está visível e se os links de navegação funcionam.
* Validar alternância de **tema (dark/light)**.
* Checar o título e subtítulo de cada página para garantir coerência.
* Validar a **estrutura da timeline** (por exemplo, na página de experiência): quantidade mínima de itens, visibilidade, layout.

---

## 🤝 Como Contribuir

Contribuições são bem-vindas! Aqui está como colaborar:

1. Abra uma **issue** para sugerir melhorias ou relatar bugs.
2. Faça um **fork** do repositório e crie uma branch para sua feature/correção:

   ```bash
   git checkout -b minha-feature
   ```
3. Escreva/atualize os testes ou o código de suporte conforme necessário.
4. Abra um **pull request** explicando suas mudanças.

---

## 📄 Licença

Este repositório está licenciado sob a [MIT License](LICENSE) (ou outra licença, se você tiver definido).

---

## 👤 Autor

**Daniela Foggiatto**

* LinkedIn: *https://www.linkedin.com/in/daniela-foggiatto-a1287b2a4/?profileId=ACoAAEl0pu4BFPrbsOph29s1hzmx95ZW2FvpunM*

---

