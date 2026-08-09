from playwright.sync_api import sync_playwright

routes = ["/", "/about", "/calendar", "/competitions", "/opportunities", "/resources", "/gallery", "/join"]

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    page.on("console", lambda msg: print("CONSOLE", msg.type, msg.text))
    page.on("pageerror", lambda err: print("PAGEERROR", err))
    page.on("requestfailed", lambda req: print("FAILED", req.url, req.failure))
    for route in routes:
        response = page.goto("http://127.0.0.1:4173" + route, wait_until="networkidle")
        page.wait_for_timeout(1000)
        print("ROUTE", route, "STATUS", response.status if response else None,
              "TITLE", page.title(), "H1", page.locator("h1").first.inner_text() if page.locator("h1").count() else "<none>",
              "NAV", page.locator("nav a").count(), "MASONRY", page.locator(".masonry-card").count(),
              "LOADING", page.locator(".masonry-loading").count())
        if page.locator("h1").first.inner_text() == "500":
            print(page.locator("body").inner_text())
    mobile = browser.new_page(viewport={"width": 390, "height": 844})
    mobile.goto("http://127.0.0.1:4173", wait_until="networkidle")
    mobile.wait_for_timeout(500)
    print("MOBILE VIEWPORT", mobile.evaluate("() => ({ width: innerWidth, media: matchMedia('(max-width: 768px)').matches, burger: getComputedStyle(document.querySelector('.burger-btn')).display })"))
    mobile.locator(".burger-btn").click(force=True)
    print("MOBILE NAV", mobile.locator("nav a").count(), "VISIBLE", mobile.locator("nav a:visible").count())
    mobile.close()
    browser.close()
