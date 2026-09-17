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

The team names, titles, and bios live in `lib/team-data.ts`. Update the `TEAM` array for core members or `EXTENDED_TEAM` for extended members. The Team page, Contact page, and chat widget all use this shared roster, so title and bio changes appear together in the next deployment.

The chat widget recognizes first names, surnames, and full names, including questions such as "What is Michelle's title?" It does not identify visitors, so include the person's name when asking about their role. Other topic answers are maintained in `lib/chatbot-data.ts` and should be reviewed when changing the Mission or Wiki copy.

Run `npm test` to check chat answers against the current roster before publishing.

---

## 🚀 Publishing Updates to Live Site
Once you save the file:
1. Push to GitHub (`git add . && git commit -m "Update news" && git push`).
2. GitHub Pages will build and deploy automatically within ~60 seconds!
