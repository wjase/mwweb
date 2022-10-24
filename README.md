Melissa Wraxall. com

# adding images

 1. Copy image into img folder for correct page eg lamella
 2. Make sure file name ends in ```_lg```
 3. Run script to scale images. (See below)
 4. Update gallery.yml with info on file. Note: Make sure hyphens and all new details line up exactly with previous details, leaving 2 spaces of indent. Copy a section as below, from the beginning of the line.

    - img: img/heliograph_sm.jpg
        alt: |
        Heliograph
        Oil on paper, framed
        40 cm x 52.5 cm

 5. Run node server and check that it looks ok.



# scaling images

Use following script in the terminal to scale images replacing lamella with new title

    python script\updateImages.py docs\pages\<name of folder>\img



# publishing changes

Use Source Control in Actvity Bar

(see link below if you don't know what the actvity bar is)

https://code.visualstudio.com/docs/getstarted/userinterface

In this panel you'll see a list of proposed changes to existing files. 

1. If there are any changes that you don't want to publish, then select them in this window and click the revert icon. (backwards arrow) Note: reverting a change to an existing file will not delete it.

2. Write description of changes in message text box.

3. Click tick icon to commit changes

4. Click the Views and more Actions icon (three dots) and click push.

# Tech Info

Uses javascript to render markdown files under /pages into html.
Code to do this is in app.js which is loaded by index.html.
The js code also handles loading small images while loadingthe bigger versions in the background to speed page load times.

Requires:

node/npm
gulp
python 3

## Starting the server

run ```npm start```

## updating the javascript

To update the 3rd party js files type:
```npm update```

If any vulnerabilities are flagged run ```npm audit fix```

to copy the files into the vendor folders:

```gulp```

