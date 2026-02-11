# Brendan Daly Portfolio Website

## Overview
A static HTML/CSS/JS portfolio website for Brendan Daly, Senior Solution Architect at NRI North America. Showcases expertise in data architecture, data engineering, Power BI, Databricks, Microsoft Fabric, AI implementation, and related fields.

## Project Architecture
- **Type**: Static website (no build step, no backend)
- **Languages**: HTML, CSS, JavaScript
- **Server**: Node.js static file server (`server.js`) for development
- **Deployment**: Static hosting from root directory

## Project Structure
- `index.html` - Main landing page
- `experience.html` - Work experience page
- `data-architecture.html`, `data-engineering.html`, etc. - Topic pages
- `databricks.html`, `fabric.html`, `openai.html`, `power-bi.html` - Technology pages
- `common.css` - Shared styles
- `common.js` - Shared scripts
- `server.js` - Development static file server (port 5000)
- `images/` - Image assets
- Various `.png`, `.jpg`, `.svg`, `.pdf` - Assets and documents

## Development
- Run `node server.js` to start the dev server on port 5000
- No build step required

## Recent Changes
- 2026-02-11: Set up Replit environment with static file server on port 5000
