function ipdn --wraps='ip link set wlp0s20f3 down' --description 'alias ipdn=ip link set wlp0s20f3 down'
  ip link set wlp0s20f3 down $argv; 
end
