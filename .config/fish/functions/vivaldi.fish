function vivaldi --wraps='vivaldi-stable &; disown' --description 'alias vivaldi=vivaldi-stable &; disown'
  vivaldi-stable &; disown $argv; 
end
