# Low-Code Content Guide for qAI37

This guide explains how to update the **News** and **Team** pages without touching complex code.

---

## 📰 Updating the News Page

All news stories live in `content/news-posts.json`.

### How to Add a New Announcement
Open `content/news-posts.json` and add a new block at the **top of the array**:

```json
[
  {
    "type": "company",
    "title": "Your announcement headline here",
    "date": "September 15, 2026",
    "description": "One to two sentences summarizing the announcement.",
    "url": "/"
  },
  ...
]
```

### Fields:
- **`type`**: `"company"` for company news (shows cyan `COMPANY NEWS` kicker) or `"industry"` for outside news pointers (`INDUSTRY NEWS`).
- **`title`**: Headline of the post.
- **`date`**: Publication date string (e.g., `"August 24, 2026"`).
- **`description`**: 1-2 sentence description.
- **`url`**: Direct URL link. For `"company"` posts without a dedicated article yet, use an internal path like `"/"` — an external `qai37.com` URL will 404 until that domain is live. For `"industry"` posts, use the real external article URL.

---

## 👥 Updating the Team Roster

The team bios live in `app/team/page.tsx`. To edit a bio or add a new team member, simply update the `TEAM` array.

---

## 🚀 Publishing Updates to Live Site
Once you save the file:
1. Push to GitHub (`git add . && git commit -m "Update news" && git push`).
2. GitHub Pages will build and deploy automatically within ~60 seconds!
