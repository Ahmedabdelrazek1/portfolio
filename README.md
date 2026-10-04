# Ahmed Abdelrazek — AI Engineer

A complete, responsive portfolio based on Ahmed's supplied CV. Built with HTML, CSS, and JavaScript. No installation, paid services, API keys, or build step are required.

## Publish on GitHub Pages

1. Create a **public** GitHub repository named `portfolio` (or any name you prefer).
2. Add the contents of this folder to the repository, including `dist/` and the hidden `.github/workflows/pages.yml` file. Push to the `main` branch.
3. In the repository, open **Settings → Pages**. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Open **Actions → Deploy portfolio to GitHub Pages → Run workflow**, or push a change to `main`.
5. When the workflow finishes, **Settings → Pages** and the workflow's `github-pages` environment show the live URL.

For the account linked in the CV, a repository called `portfolio` would use `https://Ahmedabdelrazek1.github.io/portfolio/` once it has actually been deployed. This is an example address, not a claim that a GitHub deployment already exists.

For a root portfolio address, name the repository `Ahmedabdelrazek1.github.io`. The same workflow works for either repository type. Relative asset paths support GitHub Pages subdirectories.

If using Git in a terminal:

```bash
git init
git add .
git commit -m "Create AI engineering portfolio"
git branch -M main
git remote add origin https://github.com/Ahmedabdelrazek1/portfolio.git
git push -u origin main
```

Use GitHub's normal authentication. Never add a personal access token to the website or commit credentials.

GitHub's official workflow reference: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages

## Local preview

Open `dist/index.html` directly, or serve the folder:

```bash
python3 -m http.server 8000 --directory dist
```

Open `http://localhost:8000`. Project filters, details, and navigation work without a backend. The copy-email button uses the clipboard when supported and falls back to selecting the email for manual copying.

## Editing

- **Website copy, roles, credentials, links:** `dist/index.html`
- **Colors, type, layout, and responsive rules:** `dist/styles.css`
- **Project detail content and interactions:** `dist/app.js`
- **Portrait:** `dist/assets/ahmed-portrait.jpg`
- **Downloadable CV:** `dist/assets/ahmed-abdelrazek-cv.pdf`
- **GitHub deployment:** `.github/workflows/pages.yml`

The project illustrations are conceptual technical overviews, not screenshots of running products. The portfolio links to the GitHub profile supplied in the CV. No project repository URLs were invented. Add individual repository links in the project detail objects in `app.js` when available.

The displayed email address in the CV is used consistently. The PDF's hidden mail link points to a different address, so the displayed address was treated as authoritative. Dates, project metrics, degrees, and credentials follow the supplied CV.

The contact area opens an email client and provides a copy-email button; it does not pretend to send a form submission. Hosting requires only static file serving.

## Accessibility and privacy

Includes semantic landmarks, a skip link, keyboard-friendly filters and project dialogs, visible focus styles, reduced-motion support, responsive navigation, and alternative text for the portrait. All assets are local; there are no analytics, trackers, cookies, remote fonts, or external script dependencies.

## Files for other hosts

Upload the contents of `dist/` to any static host. `.openai/hosting.json` belongs to the Sites deployment and is not required by GitHub Pages.
