import requests
import bs4

from pydantic import BaseModel

class Page(BaseModel):
    title: str
    description: str|None
    image: str|None

def get_pageinfo(url: str) -> Page:
    resp = requests.get(url, timeout=5)
    soup = bs4.BeautifulSoup(resp.text, features="html.parser")

    page = Page(title="", description=None, image=None)

    title_tag = soup.find('title')
    if title_tag:
        page.title = title_tag.get_text()

    og_title_tag = soup.find('meta', property='og:title')
    if og_title_tag:
        val = og_title_tag.get('content')
        if val is not None:
            page.title = str(val)

    og_image_tag = soup.find("meta", property="og:image")
    if og_image_tag:
        val = og_image_tag.get('content')
        if val is not None:
            page.image = str(val)

    og_description_tag = soup.find("meta", property="og:description")
    if og_description_tag:
        val = og_description_tag.get('content')
        if val is not None:
            page.description = str(val)
    return page
