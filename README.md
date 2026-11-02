# ktmtech-np portfolio

A static portfolio site (plain HTML + CSS, no build step) for GitHub Pages.

## Publish

1. Create a repo named **`ktmtech-np.github.io`** under the `ktmtech-np` org. The site will live at
   `https://ktmtech-np.github.io`. (Any other repo name works too; the site is then at
   `https://ktmtech-np.github.io/<repo>/`.)
2. Push this folder:
   ```bash
   git init -b main
   git add .
   git commit -m "Portfolio site"
   git remote add origin https://github.com/ktmtech-np/ktmtech-np.github.io.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Build and deployment → Deploy from a branch → `main` / `(root)`**.

## Preview locally

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

## Edit

- Text and projects: `index.html` (one `<article class="project">` per project)
- Colors and layout: `style.css` (color tokens at the top)
- Images: `assets/img/`
