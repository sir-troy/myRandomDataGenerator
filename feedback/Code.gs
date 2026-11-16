/**
 * myRandomDataGenerator — feedback receiver (Google Apps Script)
 *
 * Every submission from the website's feedback form is APPENDED as one line
 * to a plain .txt file in your Google Drive:
 *
 *   [2026-11-17 14:03:22] Name: Maria Santos | Email: maria@example.com | Comment: Love it!
 *
 * Setup steps are in feedback/README.md.
 */

const FILE_NAME = 'myRandomDataGenerator-feedback.txt'; // the txt file in your Drive
const FOLDER_ID = ''; // optional: a Drive folder ID to keep the file in (blank = My Drive)

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000); // one write at a time so lines never overlap
  try {
    let d = {};
    try { d = JSON.parse(e.postData.contents); } catch (_) { d = e.parameter || {}; }

    if (d.website) return json_({ ok: true });           // spam trap (hidden field)
    const clean = (s, max) => String(s || '').replace(/[\r\n\t]+/g, ' ').trim().slice(0, max);
    const name = clean(d.name, 120), email = clean(d.email, 200), comment = clean(d.comment, 5000);
    if (!name || !email || !comment) return json_({ ok: false, error: 'missing fields' });

    const ts = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss');
    const line = '[' + ts + '] Name: ' + name + ' | Email: ' + email + ' | Comment: ' + comment + '\n';

    const file = getFile_();
    file.setContent(file.getBlob().getDataAsString('UTF-8') + line);
    return json_({ ok: true });
  } finally {
    lock.releaseLock();
  }
}

function doGet() { return json_({ ok: true, service: 'myRandomDataGenerator feedback' }); }

function getFile_() {
  const folder = FOLDER_ID ? DriveApp.getFolderById(FOLDER_ID) : DriveApp.getRootFolder();
  const it = folder.getFilesByName(FILE_NAME);
  return it.hasNext() ? it.next() : folder.createFile(FILE_NAME, '', MimeType.PLAIN_TEXT);
}

function json_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}

/** Run once from the editor to test and to grant Drive permission. */
function testAppend() {
  doPost({ postData: { contents: JSON.stringify({ name: 'Test', email: 'test@example.com', comment: 'Hello from the editor' }) } });
}
