# LOCAL / SOCIAL

Social media management, SEO and digital presence services for Ottawa businesses.

**[Visit localsocial.ca](https://localsocial.ca/)**

## Development

Built with HTML, CSS and JavaScript. Requires Node.js 18 or newer; no dependencies to install.

```sh
npm run build
npm start
```

Open http://localhost:4173 to preview the site locally.

## Publishing

```sh
npm run build:pages
npm run check
```

GitHub Pages publishes the `docs/` directory from `main`. Commit and push the source and generated `docs/` files to deploy.

## Contact

The inquiry form supports Web3Forms delivery to Gmail. To activate:

1. Create a free form at https://web3forms.com with `contact.ottawaevents@gmail.com` and complete email verification.
2. Set `brand.web3formsAccessKey` in `content.mjs` to its public form access key (or supply `WEB3FORMS_ACCESS_KEY` at build time). Never use a Gmail password or private account API token.
3. Run `npm run build:pages` and `npm run check`, then publish the generated `docs/` files.
4. Submit a test inquiry on the live site and verify receipt in Gmail, including Spam, and that Reply targets the submitter.

Without a key, the form retains its download-only mode and does not send inquiries. With a key, successful API acceptance shows a confirmation; failures retain the details and offer a downloadable copy. Provider acceptance does not prove inbox delivery. The recipient is determined by the verified Web3Forms key; changing the displayed email alone does not change delivery.

[contact.ottawaevents@gmail.com](mailto:contact.ottawaevents@gmail.com)
