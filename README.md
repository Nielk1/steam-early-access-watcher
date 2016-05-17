# steam-early-access-watcher
Steam Early Access information from http://steamcommunity.com/groups/earlyaccesswatcher

# Viewing
http://nielk1.github.io/steam-early-access-watcher/

# User Script (Tampermonkey / Greasemonkey)
https://raw.githubusercontent.com/nielk1/steam-early-access-watcher/gh-pages/early_access_watcher.user.js

# Editing
JSON creation tool: http://nielk1.github.io/steam-early-access-watcher/create.html
This tool allows for the creation of JSON data fragments for /scripts/games.js

/scripts/games.js format:
```json
var early_access_watcher_games = [
  {
    "game": "Name",
    "developer": [
      "Developer 1",
      "Developer 2"
    ],
    "appid": 123456,
    "hiatus": true,
    "abandoned": false,
    "updated": 1458501240000
  },
  {...},
  {...},
  {...},
  {
    "game": "Name",
    "developer": [
      "Developer 1",
      "Developer 2"
    ],
    "appid": 123456,
    "hiatus": true,
    "abandoned": false,
    "updated": 1458501240000
  }
]
```

Edit the file and be sure to preserve JSON formatting.
https://github.com/Nielk1/steam-early-access-watcher/blob/gh-pages/scripts/games.js
