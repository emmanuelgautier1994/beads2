Beads v2
v1 at https://github.com/emmanuelgautier1994/beads

# Broken deploy script
`npm run deploy` will deploy a slightly broken bundle to GitHub Pages.

The fix (manual for now) is:
1. Go to the GHP branch
```
git checkout gh-pages
```
2. Edit index.html
Add `/beads2/` at the beginning the URLs for the two CSS and one JS bundles.
3. Commit and push
4. Wait for GitHub Pages redeploy