# myRandomDataGenerator

Create realistic sample data as a CSV file — up to **10,000,000 rows** — right in the browser.
Pick columns and data types, set rules (Unique / Required / Key), choose how clean or messy the data should be, preview, and download.

## Folder structure

```
myRandomDataGenerator/
├── index.html            ← the whole app (no build step)
├── data/                 ← base files: update these any time
│   ├── first_names.txt   ← used by First name, Full name, Email, Username
│   ├── last_names.txt    ← used by Last name, Full name, Email, Username
│   ├── cities.txt  countries.txt  streets.txt  companies.txt
│   ├── job_titles.txt  departments.txt  products.txt  email_domains.txt  words.txt
│   ├── payment_methods.txt   ← example of an extra file → becomes a new data type
│   ├── ticket_categories.txt ← example of an extra file → becomes a new data type
│   └── manifest.json     ← fallback list of files (see below)
└── feedback/
    ├── Code.gs           ← Google Apps Script that appends feedback to a .txt
    └── README.md         ← 5-minute setup
```

## Updating the base files

- **One value per line.** Blank lines and lines starting with `#` are ignored.
- **Edit an existing file** (e.g. add names to `first_names.txt`) → the matching data types use the new values.
- **Add a new file** (e.g. `insurance_plans.txt`) → it appears automatically in the *Data type* dropdown under
  **From your data folder** as “Insurance plans”.
- On `*.github.io`, the site reads the folder listing through the GitHub API, so new files are picked up with no extra step.
  `manifest.json` is only a backup (used if the API is unavailable, or when running on another host) —
  if you add files, you can also add their names there.
- If the folder can't be reached at all, the site still works using built-in lists.
- To check which files loaded, open the site with `#library` at the end of the address
  (e.g. `https://<your-username>.github.io/myRandomDataGenerator/#library`). This panel is hidden from regular visitors.

## Deploying on GitHub Pages

1. Create a repository named **`myRandomDataGenerator`** and upload everything in this folder to its root.
2. **Settings → Pages →** Source: *Deploy from a branch*, Branch: `main` / root → Save.
3. The site will be at `https://<your-username>.github.io/myRandomDataGenerator/`.

## Testing locally

Browsers block reading the `data` folder from a `file://` page, so run a tiny local server:

```bash
cd myRandomDataGenerator
python -m http.server 8000      # then open http://localhost:8000
```

## Config (top of the main script in index.html)

| Setting | What it does |
|---|---|
| `FEEDBACK_URL` | Your Apps Script Web App URL (see `feedback/README.md`) |
| `DATA_FOLDER` | Folder the base files are read from (default `data/`) |
| `GITHUB_REPO` | Only needed if auto-detection fails, e.g. `"owner/repo"` |

## Privacy

Generated data is created entirely in the visitor's browser. Nothing is uploaded, and no cookies or browser storage are used.
Only the feedback form sends data (name, email, comment) — to your own Google Drive.
