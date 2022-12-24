function ipup --wraps='ip link set wlp0s20f3 up' --wraps='sudo ip link set wlp0s20f3 up' --description 'alias ipup=sudo ip link set wlp0s20f3 up'
  sudo ip link set wlp0s20f3 up $argv; 
end
