# Competency Pages Documentation

This document provides guidance on extending and maintaining the tab-based competency pages for the portfolio website.

## Overview

The competency pages use a consistent tab-based navigation pattern that allows users to explore different subtopics within each main competency area without page reloads. This approach provides a smooth, interactive experience while maintaining excellent performance and accessibility.

## Architecture

Each competency page follows this structure:

```
competency-name.html
├── HTML Structure
│   ├── Header with navigation
│   ├── Page title and subtitle
│   ├── Tab navigation container
│   │   ├── Tab buttons
│   │   └── Tab content panels
│   └── Footer
├── CSS Styling
│   ├── Design tokens (CSS custom properties)
│   ├── Responsive design
│   ├── Accessibility features
│   └── Tab-specific styling
└── JavaScript Functionality
    ├── Tab switching logic
    ├── Keyboard navigation
    ├── URL hash support
    └── Theme management
```

## Adding a New Competency Page

### 1. Create the HTML File

Copy one of the existing competency pages (e.g., `data-modeling.html`) and rename it:

```bash
cp data-modeling.html new-competency.html
```

### 2. Update Page Metadata

Update the following in the `<head>` section:

```html
<title>New Competency - Brendan Daly | Data & Analytics Leader</title>
<meta name="description" content="Description of the new competency">
```

### 3. Update Navigation

In the dropdown menu, add your new competency:

```html
<div class="dropdown-menu" role="menu">
  <!-- ... existing items ... -->
  <a href="new-competency.html" role="menuitem">New Competency</a>
</div>
```

### 4. Update Page Content

Replace the page title, subtitle, and tab content:

```html
<h1 class="page-title">New Competency</h1>
<p class="page-subtitle">Description of the new competency...</p>
```

### 5. Configure Tab Navigation

Update the `aria-label` and tab configurations:

```html
<div class="tab-navigation" role="tablist" aria-label="New Competency Areas">
```

## Adding New Subtopics (Tabs)

### 1. Add Tab Button

Add a new button to the `.tab-buttons` container:

```html
<button class="tab-button" 
        role="tab" 
        aria-selected="false" 
        aria-controls="new-subtopic-panel" 
        id="new-subtopic-tab"
        data-tab="new-subtopic">
  <i class="fas fa-icon-name" aria-hidden="true"></i>
  New Subtopic
</button>
```

### 2. Add Tab Panel

Add a corresponding panel to the `.tab-content` container:

```html
<div class="tab-panel" 
     role="tabpanel" 
     aria-labelledby="new-subtopic-tab" 
     id="new-subtopic-panel">
  <h2 class="section-title">New Subtopic</h2>
  <div class="section-content">
    <!-- Your content here -->
  </div>
</div>
```

### 3. Update JavaScript

Add the new tab ID to the `validTabs` array in the `handleUrlHash()` function:

```javascript
function handleUrlHash() {
  const hash = window.location.hash.substring(1);
  const validTabs = ['existing-tab-1', 'existing-tab-2', 'new-subtopic']; // Add here
  
  // ... rest of function
}
```

## Content Patterns

### Standard Content Elements

Use these standardized elements for consistent styling:

```html
<!-- Section title with underline -->
<h2 class="section-title">Section Title</h2>

<!-- Regular content -->
<div class="section-content">
  <p>Content paragraph...</p>
</div>

<!-- Highlighted information box -->
<div class="highlight-box">
  <h4>Highlight Title</h4>
  <p>Important information...</p>
</div>

<!-- Feature list with checkmarks -->
<ul class="feature-list">
  <li><strong>Feature Name:</strong> Description</li>
  <li>Simple feature item</li>
</ul>
```

### Grid Layouts

For card-based layouts, use the appropriate grid class:

```html
<!-- For tools/frameworks (Data Visualization, Data Strategy) -->
<div class="tool-grid">
  <div class="tool-card">
    <h4>Tool Name</h4>
    <p>Tool description...</p>
  </div>
</div>

<!-- For frameworks (Data Strategy) -->
<div class="framework-grid">
  <div class="framework-card">
    <h4>Framework Name</h4>
    <p>Framework description...</p>
  </div>
</div>
```

## Accessibility Guidelines

### ARIA Labels and Roles

Always include proper ARIA attributes:

```html
<!-- Tab navigation -->
<div class="tab-navigation" role="tablist" aria-label="Descriptive Label">

<!-- Tab buttons -->
<button class="tab-button" 
        role="tab" 
        aria-selected="true|false" 
        aria-controls="panel-id"
        id="tab-id">

<!-- Tab panels -->
<div class="tab-panel" 
     role="tabpanel" 
     aria-labelledby="tab-id" 
     id="panel-id">
```

### Keyboard Navigation

The JavaScript handles keyboard navigation automatically:
- Arrow keys move between tabs
- Enter/Space activates tabs
- Home/End jump to first/last tabs

### Focus Management

Ensure proper focus indicators are maintained:

```css
*:focus {
  outline: 2px solid hsl(var(--primary));
  outline-offset: 2px;
}
```

## Responsive Design

### Breakpoints

The design uses one main breakpoint:

```css
@media (max-width: 768px) {
  /* Mobile styles */
}
```

### Mobile Considerations

- Navigation is hidden on mobile
- Tab buttons become horizontally scrollable
- Grid layouts become single column
- Reduced padding and font sizes

## Theme Support

### CSS Custom Properties

The design uses CSS custom properties for theming:

```css
:root {
  --primary: 222.2 47.4% 11.2%;
  --background: 0 0% 100%;
  /* ... other properties */
}

.dark {
  --primary: 210 40% 98%;
  --background: 222.2 84% 4.9%;
  /* ... dark theme overrides */
}
```

### Theme Toggle

Theme state is managed automatically by the JavaScript and persisted in localStorage.

## Best Practices

### Content Guidelines

1. **Consistency**: Use the same content patterns across all pages
2. **Clarity**: Write clear, professional descriptions
3. **Structure**: Organize content logically within each tab
4. **Length**: Keep content scannable with appropriate use of lists and highlights

### Performance

1. **Inline Styles**: Keep CSS inline for performance (no external requests)
2. **Optimized Images**: Use appropriate formats and sizes
3. **Minimal JavaScript**: Keep JavaScript focused and lightweight

### Maintenance

1. **Regular Updates**: Keep content current and relevant
2. **Link Validation**: Ensure all internal links work correctly
3. **Testing**: Test across different devices and browsers
4. **Accessibility**: Regularly test with screen readers and keyboard navigation

## Testing Checklist

When adding new competency pages or subtopics:

- [ ] All tabs are accessible via keyboard navigation
- [ ] URL hash linking works for each tab
- [ ] Content is readable in both light and dark themes
- [ ] Mobile layout works correctly with horizontal scrolling tabs
- [ ] All ARIA labels are present and descriptive
- [ ] Links in navigation dropdown work correctly
- [ ] Content follows established patterns and styling
- [ ] Page loads quickly without external dependencies

## File Organization

Keep files organized in the root directory:

```
/
├── index.html
├── data-modeling.html
├── data-visualization.html
├── data-strategy.html
├── [other-competency].html
├── about.html
├── contact.html
└── [other-files]
```

## Support and Maintenance

For questions or issues with the competency pages:

1. Review this documentation
2. Check existing pages for examples
3. Validate HTML, CSS, and accessibility
4. Test across different browsers and devices

This pattern is designed to be easily extensible while maintaining consistency, performance, and accessibility across all competency pages.