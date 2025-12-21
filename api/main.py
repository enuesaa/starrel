from db import repos
from db import models

bookmark = models.Bookmark(id='a', type='favorite', url='https://example.com')
repos.upsert_bookmark(bookmark)

bookmarks = repos.list_bookmarks()
print(bookmarks)
