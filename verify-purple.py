from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 1000})
    page.goto('http://127.0.0.1:5173/')
    page.wait_for_load_state('networkidle')
    page.wait_for_timeout(1200)
    page.screenshot(path='verify-calendar.png', full_page=True)
    cards = page.locator('.masonry-card')
    if cards.count(): cards.first.hover()
    page.wait_for_timeout(500)
    colors = page.locator('.color-overlay, .hero-facts, .story-card').evaluate_all("els => els.map(e => ({cls:e.className, bg:getComputedStyle(e).backgroundColor, image:getComputedStyle(e).backgroundImage}))")
    header_colors = page.locator('header a, header i').evaluate_all("els => els.map(e => ({tag:e.tagName, text:e.textContent.trim(), color:getComputedStyle(e).color, border:getComputedStyle(e).borderTopColor}))")
    print(colors)
    print(header_colors)
    print(page.locator('.section').evaluate_all("els => els.map(e => ({id:e.id, cls:e.className, rect:[e.getBoundingClientRect().top,e.getBoundingClientRect().height], opacity:getComputedStyle(e).opacity, display:getComputedStyle(e).display}))"))
    browser.close()
