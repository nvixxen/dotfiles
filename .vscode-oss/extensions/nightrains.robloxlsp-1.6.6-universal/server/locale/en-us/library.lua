
Enum = ''
UserSettings = 'Returns the UserSettings object, which is used to read information from the current user’s game menu settings.'
_G = ''
_VERSION = ''
assert = 'Throws an error if the provided `value` is **false** or **nil**. If the assertion passes, it returns all values passed to it.'
bit32 = ''
bit32.arshift = 'Returns the number `x` shifted `disp` bits to the right. Negative displacements shift to the left.\n\nThis shift operation is what is called arithmetic shift. Vacant bits on the left are filled with copies of the higher bit of `x`; vacant bits on the right are filled with zeros.\n'
bit32.band = 'Returns the bitwise *and* of its operands.'
bit32.bnot = 'Returns the bitwise negation of `x`.\n\n```lua\nassert(bit32.bnot(x) == (-1 - x) % 2^32)\n```\n'
bit32.bor = 'Returns the bitwise *or* of its operands.'
bit32.btest = 'Returns a boolean signaling whether the bitwise *and* of its operands is different from zero.'
bit32.bxor = 'Returns the bitwise *exclusive or* of its operands.'
bit32.extract = 'Returns the unsigned number formed by the bits `field` to `field + width - 1` from `n`.'
bit32.lrotate = 'Returns the number `x` rotated `disp` bits to the left. Negative displacements rotate to the right.'
bit32.lshift = 'Returns the number `x` shifted `disp` bits to the left. The number `disp` may be any representable integer. Negative displacements shift to the right. In any direction, vacant bits are filled with zeros. In particular, displacements with absolute values higher than 31 result in zero (all bits are shifted out).'
bit32.replace = 'Returns a copy of `n` with the bits `field` to `field + width - 1` replaced by the value `v` .'
bit32.rrotate = 'Returns the number `x` rotated `disp` bits to the right. The number `disp` may be any representable integer.'
bit32.rshift = 'Returns the number `x` shifted `disp` bits to the right. Negative displacements shift to the left. In any direction, vacant bits are filled with zeros.\n\n```lua\nassert(bit32.rshift(b, disp) == math.floor(b % 2^32 / 2^disp))\n```\n'
coroutine = ''
coroutine.create = 'Creates a new coroutine.'
coroutine.isyieldable = 'Returns true when the running coroutine can yield.'
coroutine.resume = 'Starts or continues the execution of coroutine `co`.'
coroutine.running = 'Returns the running coroutine.'
coroutine.status = 'Returns the status of coroutine `co`.'
coroutine.wrap = 'Creates a new coroutine, with body `f`. Returns a function that resumes the coroutine each time it is called. Any arguments passed to the function behave as the extra arguments to resume. Returns the same values returned by resume, except the first boolean. In case of error, propagates the error.'
coroutine.yield = 'Suspends the execution of the calling coroutine. Any arguments to yield are passed as extra results to resume.'
debug = ''
debug.info = 'Allows programmatic inspection of the call stack.'
debug.profilebegin = 'Opens a microprofiler label.'
debug.profileend = 'Closes the top microprofiler label.'
debug.resetmemorycategory = 'Resets the memory category tag of the current thread to the default auto-assigned tag that was based on script name.' 
debug.setmemorycategory = 'Sets the memory category tag of the current thread. Future allocations performed by this thread will use this tag.'
debug.traceback = 'Returns a string with a traceback of the call stack. The optional message string is appended at the beginning of the traceback.'
delay = 'Schedules a function to be executed after ``delayTime`` seconds have passed, without yielding the current thread.'
elapsedTime = 'Returns how much time has elapsed since the current instance of Roblox was started.'
error = 'Terminates the last protected function called and returns message as the error object.'
game = ''
getfenv = 'Returns the current environment in use by the function. `target` can be a Lua function or a number that specifies the function at that stack level.'
getmetatable = 'Returns the metatable of the given object.'
ipairs = 'Returns three values: an iterator function, the table `t` and the number 0. Each time the iterator function is called, it returns the next numerical index-value pair in the table.'
loadstring = 'Loads Lua code from a string, and returns it as a function.'
math = ''
math.abs = 'Returns the absolute value of `x`.'
math.acos = 'Returns the arc cosine of `x` (in radians).'
math.asin = 'Returns the arc sine of `x` (in radians).'
math.atan = 'Returns the arc tangent of `x` (in radians).'
math.atan2 = 'Returns the arc tangent of `y/x` (in radians).'
math.ceil = 'Returns the smallest integral value larger than or equal to `x`.'
math.clamp = 'Returns a number between ``min`` and ``max``, inclusive.'
math.cos = 'Returns the cosine of `x` (assumed to be in radians).'
math.cosh = 'Returns the hyperbolic cosine of `x` (assumed to be in radians).'
math.deg = 'Converts the angle `x` from radians to degrees.'
math.exp = 'Returns the value `e^x` (where `e` is the base of natural logarithms).'
math.floor = 'Returns the largest integral value smaller than or equal to `x`.'
math.fmod = 'Returns the remainder of the division of `x` by `y` that rounds the quotient towards zero.'
math.frexp = 'Decompose `x` into tails and exponents. Returns `m` and `e` such that `x = m * (2 ^ e)`, `e` is an integer and the absolute value of `m` is in the range [0.5, 1) (or zero when `x` is zero).'
math.huge = 'A value larger than any other numeric value.'
math.ldexp = 'Returns `m * (2 ^ e)` .'
math.log = 'Returns the logarithm of `x` in the given base.'
math.log10 = 'Returns the base-10 logarithm of x.'
math.max = 'Returns the argument with the maximum value, according to the Lua operator `<`.'
math.min = 'Returns the argument with the minimum value, according to the Lua operator `<`.'
math.modf = 'Returns the integral part of `x` and the fractional part of `x`.'
math.noise = 'Returns a value between -0.5 and 0.5 generated from its arguments.'
math.pi = 'The value of *π*.'
math.pow = 'Returns `x ^ y` .'
math.rad = 'Converts the angle `x` from degrees to radians.'
math.random = '* `math.random()`: Returns a float in the range [0,1).\n* `math.random(n)`: Returns a integer in the range [1, n].\n* `math.random(m, n)`: Returns a integer in the range [m, n].\n'
math.randomseed = 'Sets `x` as the "seed" for the pseudo-random generator.'
math.round = 'Rounds ``x`` to the nearest integer; rounds away from zero if we\'re midway between two integers.'
math.sign = 'Returns -1 if ``x < 0``, 0 if ``x == 0``, or 1 if ``x > 0``.'
math.sin = 'Returns the sine of `x` (assumed to be in radians).'
math.sinh = 'Returns the hyperbolic sine of `x` (assumed to be in radians).'
math.sqrt = 'Returns the square root of `x`.'
math.tan = 'Returns the tangent of `x` (assumed to be in radians).'
math.tanh = 'Returns the hyperbolic tangent of `x` (assumed to be in radians).'
newproxy = 'Creates a blank userdata, with the option for it to have a metatable.'
next = 'Returns the first key/value pair in the array. If a `lastKey` argument was specified then returns the next element in the array based on the key that provided. The order in which the indices are enumerated is not specified, even for numeric indices.'
os = ''
os.clock = 'Returns an approximation of the amount in seconds of CPU time used by the program.'
os.date = 'Formats the given ``format`` with date/time information based on the given time, or if not provided, the value returned by ``os.time``.\n\nIf the provided `format` is exactly `"*t"` (local time) or `"!*t"` (UTC time), this function instead returns a dictionary.'
os.difftime = 'Returns the difference, in seconds, from time `t1` to time `t2`.'
os.time = 'Returns how many seconds have passed since the Unix epoch (1 January 1970, 00:00:00), under current UTC time. If provided a table formatted similarly to that returned by `os.date`, it will return the number of seconds since that time instead.'
pairs = 'Returns an iterator function, the passed table `t` and `nil`, so that the construction will iterate over all key/value pairs of that table when used in a generic for-loop.'
pcall = 'Calls function with the given arguments in protected mode.'
plugin = ''
print = 'Receives any number of arguments, and prints their values to the output.'
rawequal = 'Checks whether `v1` is equal to `v2`, without invoking the `__eq` metamethod.'
rawget = 'Gets the real value of `table[index]`, without invoking the `__index` metamethod.'
rawset = 'Sets the real value of `table[index]` to `value`, without invoking the `__newindex` metamethod.'
require = ''
script = ''
select = 'Returns all arguments after argument number `index`. If negative, it will return from the end of the argument list.'
setfenv = 'Sets the environment to be used by the given function. `target` can be a function or a number that specifies the function at that stack level.'
setmetatable = 'Sets the metatable for the given table.'
settings = 'Returns the GlobalSettings object, which can be used to access the settings objects that are used in Roblox Studio’s settings menu.'
shared = ''
spawn = 'Runs the specified callback function in a separate thread, without yielding the current thread.'
string = ''
string.byte = 'Returns the internal numeric codes of the characters `s[i], s[i+1], ..., s[j]`.'
string.char = 'Returns a string with length equal to the number of arguments, in which each character has the internal numeric code equal to its corresponding argument.'
string.find = 'Looks for the first match of pattern in the string `s`. If it finds a match, then returns the indices of `s` where this occurrence starts and ends; otherwise, it returns nil.'
string.format = 'Returns a formatted version of its variable number of arguments following the description given in its first argument.'
string.gmatch = 'Returns an iterator function that, each time it is called, returns the next captures from pattern over the string `s`.'
string.gsub = 'Returns a copy of s in which all (or the first `n`, if given) occurrences of the `pattern` have been replaced by a replacement string specified by `repl`.'
string.len = 'Returns the length of `s`.'
string.lower = 'Returns a copy of this string with all uppercase letters changed to lowercase.'
string.match = 'Looks for the first match of `pattern` in the string.'
string.pack = 'Returns a binary string containing the arguments packed (that is, serialized in binary form) according to the format string `fmt`.'
string.packsize = 'Returns the size of a string resulting from `string.pack` with the given format.'
string.rep = 'Returns a string that is the concatenation of `n` copies of the string `s`.'
string.reverse = 'Returns a string that is the string `s` reversed.'
string.split = 'Splits a string into parts based on the defined separator character(s), returning a table of ordered results. The default separator is comma `,`.'
string.sub = 'Returns the substring of `s` that starts at `i` and continues until `j`; `i` and `j` can be negative. If `j` is absent, then it is assumed to be equal to -1 (which is the same as the string length).'
string.unpack = 'Returns the values packed in string according to the format string `fmt`. An optional pos marks where to start reading in `s` (default is 1). After the read values, this function also returns the index of the first unread byte in `s`.'
string.upper = 'Returns a copy of this string with all lowercase letters changed to uppercase.'
table = ''
table.clear = 'Clears all keys from the table, but leaves their capacity allocated so that future keys added to the table can re-use that storage, avoiding additional allocations.'
table.concat = 'Given an array where all elements are strings or numbers, returns the string `t[i] … sep … t[i+1] … sep … t[j]`. If `i` is greater than `j`, returns the empty string.'
table.create = 'Creates an array-like table with count values, initialized to `value`. When value is `nil` or omitted, the resulting table has length 0, but has preallocated storage for count elements.'
table.find = 'Returns the numeric index of the first occurence of value, starting from `init`, or nil if value isn\'t present in the table. The default for `init` is 1.'
table.foreach = 'Iterates over the provided table, passing the key and value of each iteration over to the provided function.'
table.foreachi = 'This is similar to ``table.foreach()`` except that index-value pairs are passed, not key-value pairs.'
table.getn = 'Returns the number of elements in the table passed.'
table.insert = 'Inserts element `value` at position `pos` in `t`.'
table.move = 'Moves elements from table `a1` to table `a2`.\n```lua\na2[t],··· = a1[f],···,a1[e]\nreturn a2\n```\n'
table.pack = 'Returns a new table with all arguments stored into keys `1`, `2`, etc. and with a field `"n"` with the total number of arguments.'
table.remove = 'Removes from `t` the element at position `pos`, returning the value of the removed element.'
table.sort = 'Sorts list elements in a given order, *in-place*, from `list[1]` to `list[#list]`.'
table.unpack = 'Returns the elements from the given list. his function is equivalent to:\n\n```lua\nreturn list[i], list[i+1], ···, list[j]\n```\n'
table.maxn = 'Returns the largest positive numerical index of the given table, or zero if the table has no positive numerical indices.'
table.freeze = 'Given a non-frozen table, freezes it such that all subsequent attempts to modify the table or assign its metatable raise an error. If the input table is already frozen or has a protected metatable, the function raises an error; otherwise it returns the input table.'
table.isfrozen = 'Returns `true` if the table is frozen, `false` otherwise.'
task.defer = 'Takes a thread or function and defers it until the next resumption cycle at which point it is resumed with the engine’s scheduler. Additional arguments are passed to the thread or function being resumed.'
task.spawn = 'Takes a thread or function and resumes it immediately through the engine’s scheduler. Additional arguments are passed to the thread or function being resumed.'
task.delay = 'Takes a thread or function and schedules it for resumption after the given amount of time has elapsed on the next Heartbeat step. The thread is resumed with built-in error handling and support for other engine features. Any additional arguments are passed to the thread or function being resumed.'
task.wait = 'Yields the current thread until the given duration (in seconds) has elapsed and then resumes the thread on the next Heartbeat step.'
tick = 'Returns how much time has elapsed, in seconds, since the UNIX epoch, on the current local session’s computer.'
time = 'Returns the amount of time, in seconds, that has elapsed since the current game instance started running. If the current game instance is not running, this will be 0'
tonumber = 'Tries to convert its argument to a number.'
tostring = 'Receives a value of any type and converts it to a string in a human-readable format.'
type = 'Returns the type of its only argument, coded as a string.'
typeof = 'Returns the type of the object specified, as a string. This function is more accurate than Lua’s native ``type`` function, as it does not denote Roblox-specific types as userdata.'
unpack = '-------\n```lua\nreturn list[i], list[i+1], ···, list[j]\n```\n'
utf8 = ''
utf8.char = 'Receives zero or more integers, converts each one to its corresponding UTF-8 byte sequence and returns a string with the concatenation of all these sequences.'
utf8.charpattern = 'The pattern which matches exactly one UTF-8 byte sequence, assuming that the subject is a valid UTF-8 string.'
utf8.codepoint = 'Returns the codepoints (as integers) from all characters in `s` that start between byte position `i` and `j` (both included).'
utf8.codes = '--------\n```lua\nfor p, c in utf8.codes(s) do\n    body\nend\n```\n'
utf8.graphemes = 'Returns an iterator function so that\n```lua\nfor first, last in utf8.graphemes(str) do \n	local grapheme = s:sub(first, last) \n	-- body\nend\n```\nwill iterate the grapheme clusters of the string.\n'
utf8.len = 'Returns the number of UTF-8 characters in string `s` that start between positions `i` and `j` (both inclusive).'
utf8.nfcnormalize = 'Converts the input string to Normal Form C, which tries to convert decomposed characters into composed characters.'
utf8.nfdnormalize = 'Converts the input string to Normal Form D, which tries to break up composed characters into decomposed characters.'
utf8.offset = 'Returns the position (in bytes) where the encoding of the `n`-th character of `s` (counting from position `i`) starts.'
wait = 'Yields the current thread until the specified amount of ``seconds`` have elapsed.'
warn = 'Emits a warning with a message composed by the concatenation of all its arguments (which should be strings).'
workspace = ''
xpcall = 'Calls function `f` in protected mode with a new message handler.'