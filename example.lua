iframe:on("setup", function(data, cb)
	Wait(2000)
	cb("setup")
	Wait(2000)
	iframe.js.base.message("i am : lua")
	for i=1, 5 do
		iframe.js.base.version(i..".1")
		Wait(100)
	end
	iframe.js.base.unListener("base")
end)