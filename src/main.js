import './style.css'
import { toPng } from 'html-to-image'

// ── State ──────────────────────────────────────────
const state = {
  theme: 'light',
  cardText: 'The best way to predict\nthe future is to create it.',
  cardAuthor: '',
  template: 'minimal-dark',
  activeTool: 'json',
  jsonOutput: '',
  base64Mode: 'encode',
  base64Output: '',
  urlMode: 'encode',
  urlOutput: '',
}

// ── Templates ──────────────────────────────────────
const templates = [
  { id: 'minimal-dark', name: 'Minimal Dark', colors: ['#1a1a2e', '#6366f1'] },
  { id: 'sunset', name: 'Sunset', colors: ['#f97316', '#ec4899'] },
  { id: 'ocean', name: 'Ocean', colors: ['#0ea5e9', '#0891b2'] },
  { id: 'clean', name: 'Clean White', colors: ['#ffffff', '#e5e7eb'] },
  { id: 'forest', name: 'Forest', colors: ['#166534', '#14532d'] },
  { id: 'midnight', name: 'Midnight', colors: ['#020617', '#6366f1'] },
  { id: 'pastel', name: 'Pastel', colors: ['#fce7f3', '#d1fae5'] },
]

// ── Toast ──────────────────────────────────────────
function showToast(msg) {
  const el = document.getElementById('toast')
  el.textContent = msg
  el.classList.add('show')
  clearTimeout(el._timeout)
  el._timeout = setTimeout(() => el.classList.remove('show'), 2000)
}

// ── Download Card ──────────────────────────────────
async function downloadCard() {
  const card = document.getElementById('card-preview')
  if (!card) return
  try {
    const dataUrl = await toPng(card, {
      quality: 1,
      pixelRatio: 2,
      backgroundColor: null,
    })
    const link = document.createElement('a')
    link.download = 'cardcraft-' + Date.now() + '.png'
    link.href = dataUrl
    link.click()
    showToast('Card downloaded! ✨')
  } catch (err) {
    console.error(err)
    showToast('Download failed. Try a different browser.')
  }
}

// ── Copy Card ──────────────────────────────────────
async function copyCard() {
  const card = document.getElementById('card-preview')
  if (!card) return
  try {
    const dataUrl = await toPng(card, { quality: 1, pixelRatio: 2 })
    const blob = await (await fetch(dataUrl)).blob()
    await navigator.clipboard.write([
      new ClipboardItem({ 'image/png': blob }),
    ])
    showToast('Copied to clipboard! 📋')
  } catch (err) {
    console.error(err)
    showToast('Copy failed. Try downloading instead.')
  }
}

// ── Dev Tools ──────────────────────────────────────
function formatJSON(input) {
  try {
    return JSON.stringify(JSON.parse(input), null, 2)
  } catch (e) {
    return 'Invalid JSON: ' + e.message
  }
}

function handleBase64(input, mode) {
  try {
    if (mode === 'encode') {
      const bytes = new TextEncoder().encode(input)
      const binStr = Array.from(bytes, (b) => String.fromCharCode(b)).join('')
      return btoa(binStr)
    } else {
      const binStr = atob(input.trim())
      const bytes = Uint8Array.from(binStr, (c) => c.charCodeAt(0))
      return new TextDecoder().decode(bytes)
    }
  } catch (e) {
    return 'Error: ' + e.message
  }
}

function handleURL(input, mode) {
  try {
    return mode === 'encode'
      ? encodeURIComponent(input)
      : decodeURIComponent(input)
  } catch (e) {
    return 'Error: ' + e.message
  }
}

// ── Render ─────────────────────────────────────────
function render() {
  const app = document.getElementById('app')
  const t = state.template

  app.innerHTML = `
  <!-- Header -->
  <header class="flex items-center justify-between px-6 py-4 border-b" style="border-color: var(--color-border);">
    <div class="flex items-center gap-3">
      <span class="text-2xl">✨</span>
      <span class="font-bold text-lg" style="color: var(--color-text);">CardCraft</span>
    </div>
    <div class="flex items-center gap-3">
      <button id="theme-toggle" class="btn-secondary text-sm !px-3 !py-2">
        ${state.theme === 'light' ? '🌙' : '☀️'}
      </button>
      <a href="#support" class="btn-primary text-sm !px-4 !py-2" style="background: #ffdd00; color: #000;">
        ☕ Support
      </a>
    </div>
  </header>

  <!-- Hero -->
  <section class="text-center px-6 pt-12 pb-4">
    <h1 class="text-4xl md:text-5xl font-bold tracking-tight" style="color: var(--color-text);">
      Beautiful Cards in Seconds
    </h1>
    <p class="mt-3 text-lg" style="color: var(--color-text-dim);">
      Create stunning social media graphics. No signup. Free to use.
    </p>
  </section>

  <!-- Card Generator -->
  <section class="max-w-6xl mx-auto px-4 py-8">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Left: Controls -->
      <div class="space-y-5">
        <div>
          <label class="block text-sm font-semibold mb-1.5" style="color: var(--color-text);">Your Text</label>
          <textarea id="card-text" rows="4" class="w-full" placeholder="Type something inspiring...">${escapeHTML(state.cardText)}</textarea>
        </div>
        <div>
          <label class="block text-sm font-semibold mb-1.5" style="color: var(--color-text);">Attribution (optional)</label>
          <input id="card-author" class="w-full" placeholder="@yourhandle" value="${escapeHTML(state.cardAuthor)}" />
        </div>
        <div>
          <label class="block text-sm font-semibold mb-2" style="color: var(--color-text);">Template</label>
          <div class="flex gap-3 flex-wrap" id="template-selector">
            ${templates.map(tmpl => `
              <button class="template-dot ${tmpl.id === t ? 'active' : ''}"
                      data-template="${tmpl.id}"
                      title="${tmpl.name}"
                      style="background: linear-gradient(135deg, ${tmpl.colors[0]}, ${tmpl.colors[1]});">
              </button>
            `).join('')}
          </div>
        </div>
        <div class="flex gap-3 pt-2">
          <button id="btn-download" class="btn-primary !px-6 !py-3 !text-base">
            ⬇ Download PNG
          </button>
          <button id="btn-copy" class="btn-secondary !px-6 !py-3 !text-base">
            📋 Copy
          </button>
        </div>
      </div>

      <!-- Right: Preview -->
      <div class="preview-container rounded-xl border" style="border-color: var(--color-border); background: var(--color-surface-alt);">
        <div id="card-preview" class="card-preview template-${t}">
          <p class="card-text">${escapeHTML(state.cardText).replace(/\n/g, '<br>')}</p>
          ${state.cardAuthor ? `<p class="card-author">— ${escapeHTML(state.cardAuthor)}</p>` : ''}
          <span class="card-watermark">Made with CardCraft</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Dev Tools -->
  <section class="max-w-4xl mx-auto px-4 py-12">
    <h2 class="text-2xl font-bold text-center mb-6" style="color: var(--color-text);">Free Developer Tools</h2>
    <div class="flex justify-center gap-2 mb-6 flex-wrap">
      <button class="tool-tab ${state.activeTool === 'json' ? 'active' : ''}" data-tool="json">JSON Formatter</button>
      <button class="tool-tab ${state.activeTool === 'base64' ? 'active' : ''}" data-tool="base64">Base64</button>
      <button class="tool-tab ${state.activeTool === 'url' ? 'active' : ''}" data-tool="url">URL Encode</button>
    </div>

    <!-- JSON Tool -->
    <div id="tool-json" class="space-y-3 ${state.activeTool === 'json' ? '' : 'hidden'}">
      <textarea id="json-input" rows="6" class="w-full" placeholder='Paste JSON here...'></textarea>
      <button id="btn-format-json" class="btn-primary">Format JSON</button>
      <pre id="json-output" class="output-area">${state.jsonOutput ? escapeHTML(state.jsonOutput) : 'Formatted JSON will appear here...'}</pre>
    </div>

    <!-- Base64 Tool -->
    <div id="tool-base64" class="space-y-3 ${state.activeTool === 'base64' ? '' : 'hidden'}">
      <div class="flex gap-3">
        <button id="btn-base64-encode" class="btn-primary ${state.base64Mode === 'encode' ? '' : '!opacity-50'}">Encode</button>
        <button id="btn-base64-decode" class="btn-primary ${state.base64Mode === 'decode' ? '' : '!opacity-50'}">Decode</button>
      </div>
      <textarea id="base64-input" rows="4" class="w-full" placeholder="${state.base64Mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 to decode...'}"></textarea>
      <button id="btn-process-base64" class="btn-primary">${state.base64Mode === 'encode' ? 'Encode' : 'Decode'}</button>
      <pre id="base64-output" class="output-area">${state.base64Output || 'Result will appear here...'}</pre>
    </div>

    <!-- URL Tool -->
    <div id="tool-url" class="space-y-3 ${state.activeTool === 'url' ? '' : 'hidden'}">
      <div class="flex gap-3">
        <button id="btn-url-encode" class="btn-primary ${state.urlMode === 'encode' ? '' : '!opacity-50'}">Encode</button>
        <button id="btn-url-decode" class="btn-primary ${state.urlMode === 'decode' ? '' : '!opacity-50'}">Decode</button>
      </div>
      <textarea id="url-input" rows="4" class="w-full" placeholder="${state.urlMode === 'encode' ? 'Enter URL or text to encode...' : 'Enter URL-encoded text to decode...'}"></textarea>
      <button id="btn-process-url" class="btn-primary">${state.urlMode === 'encode' ? 'Encode' : 'Decode'}</button>
      <pre id="url-output" class="output-area">${state.urlOutput || 'Result will appear here...'}</pre>
    </div>
  </section>

  <!-- Support -->
  <section id="support" class="max-w-2xl mx-auto px-4 py-12">
    <div class="support-card">
      <h2 class="text-2xl font-bold mb-3">Enjoy CardCraft?</h2>
      <p class="text-white/80 mb-5">
        If this tool saves you time or helps you create something beautiful,
        consider buying me a coffee to keep the tools free and ad-free.
      </p>
      <div class="flex flex-col items-center gap-3">
        <img src="./wxpay.jpg" alt="微信收款码" class="rounded-xl shadow-lg" style="width: 200px; height: 200px; object-fit: contain; background: white; padding: 8px;" />
        <p class="text-sm text-white/70">📱 微信扫码 · 请我喝杯咖啡</p>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="text-center py-8 px-4" style="color: var(--color-text-dim); font-size: 13px;">
    <p>Built with ✨ CardCraft — Free & Open Source</p>
  </footer>
  `

  bindEvents()
}

function bindEvents() {
  // Theme toggle
  document.getElementById('theme-toggle')?.addEventListener('click', () => {
    state.theme = state.theme === 'light' ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', state.theme)
    render()
  })

  // Card text input
  document.getElementById('card-text')?.addEventListener('input', (e) => {
    state.cardText = e.target.value
    updateCardPreview()
  })

  // Card author input
  document.getElementById('card-author')?.addEventListener('input', (e) => {
    state.cardAuthor = e.target.value
    updateCardPreview()
  })

  // Template selector
  document.querySelectorAll('[data-template]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.template = btn.dataset.template
      render()
    })
  })

  // Download
  document.getElementById('btn-download')?.addEventListener('click', downloadCard)

  // Copy
  document.getElementById('btn-copy')?.addEventListener('click', copyCard)

  // Tool switching
  document.querySelectorAll('[data-tool]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.activeTool = btn.dataset.tool
      render()
    })
  })

  // JSON
  document.getElementById('btn-format-json')?.addEventListener('click', () => {
    const input = document.getElementById('json-input').value
    state.jsonOutput = formatJSON(input)
    document.getElementById('json-output').textContent = state.jsonOutput
  })

  // Base64 mode toggle
  document.getElementById('btn-base64-encode')?.addEventListener('click', () => {
    state.base64Mode = 'encode'
    render()
  })
  document.getElementById('btn-base64-decode')?.addEventListener('click', () => {
    state.base64Mode = 'decode'
    render()
  })
  document.getElementById('btn-process-base64')?.addEventListener('click', () => {
    const input = document.getElementById('base64-input').value
    state.base64Output = handleBase64(input, state.base64Mode)
    document.getElementById('base64-output').textContent = state.base64Output
  })

  // URL mode toggle
  document.getElementById('btn-url-encode')?.addEventListener('click', () => {
    state.urlMode = 'encode'
    render()
  })
  document.getElementById('btn-url-decode')?.addEventListener('click', () => {
    state.urlMode = 'decode'
    render()
  })
  document.getElementById('btn-process-url')?.addEventListener('click', () => {
    const input = document.getElementById('url-input').value
    state.urlOutput = handleURL(input, state.urlMode)
    document.getElementById('url-output').textContent = state.urlOutput
  })
}

function updateCardPreview() {
  const preview = document.getElementById('card-preview')
  if (!preview) return
  const textEl = preview.querySelector('.card-text')
  const authorEl = preview.querySelector('.card-author')
  if (textEl) {
    textEl.innerHTML = escapeHTML(state.cardText).replace(/\n/g, '<br>') || 'Your text here...'
  }
  if (authorEl) {
    if (state.cardAuthor) {
      authorEl.innerHTML = '— ' + escapeHTML(state.cardAuthor)
      authorEl.style.display = ''
    } else {
      authorEl.style.display = 'none'
    }
  }
}

function escapeHTML(str) {
  const div = document.createElement('div')
  div.textContent = str
  return div.innerHTML
}

// ── Init ───────────────────────────────────────────
document.documentElement.setAttribute('data-theme', state.theme)
render()
