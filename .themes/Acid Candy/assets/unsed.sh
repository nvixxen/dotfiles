#!/bin/sh
sed -i \
         -e 's/rgb(0%,0%,0%)/#282828/g' \
         -e 's/rgb(100%,100%,100%)/#a0a0a0/g' \
    -e 's/rgb(50%,0%,0%)/#282828/g' \
     -e 's/rgb(0%,50%,0%)/#dd7da5/g' \
 -e 's/rgb(0%,50.196078%,0%)/#dd7da5/g' \
     -e 's/rgb(50%,0%,50%)/#282828/g' \
 -e 's/rgb(50.196078%,0%,50.196078%)/#282828/g' \
     -e 's/rgb(0%,0%,50%)/#a0a0a0/g' \
	"$@"
