chrome.devtools.panels.create(
  'Inertia', // Title of the panel
  '', // Icon path (empty = no icon)
  './panel.html', // Path to the panel HTML
  panel => {
    panel.onShown.addListener(() => {
      // Optionally initialize panel UI here
    })

    panel.onHidden.addListener(() => {
      // Clean up UI state if needed
    })
  }
)
