1. alias {alias}=“{command}”
2. funcsave x

OR

1.  Create a file in ~/.config/fish/functions
2.  Paste the following into the file:

`function pacin --wraps='sudo pacman -S' --description 'alias pacin=sudo pacman -S'

`sudo pacman -S $argv;`

`end``

3. Change the alias name and the corresponding command to whatever you choose.
4. Save the file as the alias name. (I.E. {pacin])
