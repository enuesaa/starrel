import requests
from bs4 import BeautifulSoup

resp = requests.get("", timeout=5)
soup = BeautifulSoup(resp.text, "html.parser")
og_tags = {}

for tag in soup.find_all("meta"):
    prop = tag.get("property")
    if prop and prop.startswith("og:"):
        og_tags[prop] = tag.get("content")
print(og_tags)
