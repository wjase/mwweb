Melissa Wraxall. com

# adding images

 1. Copy image into img folder for correct page eg lamella
 2. Make sure file name ends in ```_lg```
 3. Run script to scale images. (See below)
 4. Update gallery.yml with info on file.

    - img: img/heliograph_sm.jpg
        alt: |
        Heliograph
        Oil on paper, framed
        40 cm x 52.5 cm

 5. Run node server and check that it looks ok.



# scaling images

Use following script to scale images replacing lamella with new title

    python script\updateImages.py docs\pages\lamella\img