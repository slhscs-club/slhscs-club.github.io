from playwright.sync_api import sync_playwright


with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1280, "height": 900})
    page.goto("http://127.0.0.1:4173", wait_until="networkidle")
    page.wait_for_timeout(1000)
    print("TITLE:", page.title())
    print("H1:", page.locator("h1").first.inner_text())
    page.evaluate("""async () => {
        const step = Math.max(window.innerHeight * 0.8, 300);
        for (let y = 0; y < document.body.scrollHeight; y += step) {
            window.scrollTo(0, y);
            await new Promise(resolve => setTimeout(resolve, 500));
        }
        window.scrollTo(0, document.body.scrollHeight);
    }""")
    page.wait_for_timeout(5000)
    print("GALLERY CARDS:", page.locator(".masonry-card").count())
    print("GALLERY LOADING:", page.locator(".masonry-loading").count())
    print("GALLERY SIZE:", page.locator(".masonry").evaluate("el => ({ width: el.clientWidth, height: el.clientHeight })"))
    print("FIRST CARD:", page.locator(".masonry-card").first.evaluate("el => { const box = el.getBoundingClientRect(); const inner = el.querySelector('.masonry-card-inner'); return { width: box.width, height: box.height, transform: getComputedStyle(el).transform, opacity: getComputedStyle(el).opacity, background: getComputedStyle(inner).backgroundImage }; }"))
    assert page.locator(".masonry-card").count() > 0, "Gallery did not render"
    page.screenshot(path="playwright-after-scroll.png", full_page=True)
    page.locator(".masonry").screenshot(path="playwright-gallery.png")
    browser.close()
