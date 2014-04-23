github-label-copy
=================

Utility to copy the available issue labels from one Github repo to another.

```
Usage:
  index.js [OPTIONS] [ARGS]

Options: 
  -c, --configFile [PATH]Github config file path (Default is ~/.githubconfig)
  -u, --srcUser STRING   User name
      --destUser STRING  Destination user name when source/dest differ
  -s, --srcRepo STRING   Source repository
  -d, --destRepo STRING  Destination repository
  -h, --help             Display help and usage details
```

** Setup **
  * Go to your Github `Preferences -> Applications -> Personal Access Tokens`
  * Generate a token, be sure to save its value.
  * Ensure `repo` is selected as a scope.
  * Save this in a file in your home directory.
    * /home/youruser/.githubconfig for linux
    * C:\Users\youruser\_githubconfig on Windows
    * Note the . vs the _
  * Save this key in a JSON formatted file that looks like this

  ```json
    {
        "personalAccessToken": "15753ef81c66dd7fb75a27e0946cea677fbc192a"
    }
  ```

  * Yeah that's an old code don't think you can go impersonating me.
  * At some point I'll upgrade to using the actual Github client and support all
  of the various OAuth methods.
