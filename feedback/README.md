# Feedback → .txt file (setup, ~5 minutes)

GitHub Pages only serves static files, so it can't write to a file by itself.
This small Google Apps Script receives the form and **appends each entry as one line to a .txt file in your Google Drive**.

## Steps

1. Go to <https://script.google.com> → **New project**.
2. Delete the sample code, paste everything from `Code.gs`, and click **Save**.
3. Select the function **testAppend** → **Run**. Approve the Google Drive permission.
   A file named `myRandomDataGenerator-feedback.txt` appears in your Drive with one test line.
4. Click **Deploy → New deployment** → type **Web app**:
   - *Execute as:* **Me**
   - *Who has access:* **Anyone**
   → **Deploy**, then copy the **Web app URL** (ends in `/exec`).
5. Open `index.html`, find this line near the top of the main script and paste the URL:

   ```js
   const FEEDBACK_URL = "https://script.google.com/macros/s/XXXXXXXX/exec";
   ```

6. Commit & push. Done — open the txt file in Drive any time to read feedback.

## Line format

```
[2026-11-17 14:03:22] Name: Maria Santos | Email: maria@example.com | Comment: Love the 10M option!
```

## Notes

- If you edit `Code.gs` later, use **Deploy → Manage deployments → Edit → New version** so the same URL keeps working.
- A hidden "honeypot" field quietly drops most spam bots.
- To keep the file inside a specific Drive folder, put that folder's ID in `FOLDER_ID`.
