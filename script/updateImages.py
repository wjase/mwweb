import os
import sys
import subprocess
import re

def resize(filename,suffix,width,height):
    """
    docstring
    """
    parts = os.path.splitext(filename)
    fileNameBase = parts[0]
    extension = parts[1]
    if re.search(r'_(md|sm)$',fileNameBase) is not None :
        return
    newFile = re.sub(r'_(\d+w|lg)$','',fileNameBase)+suffix+extension
    if not os.path.exists(newFile):
        cmd = 'magick %s -resize %dx%d %s' % (filename, width, height, newFile)
        print(cmd)
        subprocess.call(["magick", filename, "-resize", '%dx%d'%(width,height), newFile ])


directory = os.path.join(os.getcwd(), sys.argv[1])
for filename in os.listdir(directory):

    if filename.endswith(".jpg") or filename.endswith(".png"):
        if "_lg" in filename:
            filename = os.path.join(directory, filename)
            resize(filename,"_sm",300,300)
            resize(filename,"_md",600,600)
        
    else:
        continue

