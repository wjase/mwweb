$scriptPath = split-path -parent $MyInvocation.MyCommand.Definition

function imr()   { $scriptPath + "\updateImages.py" }