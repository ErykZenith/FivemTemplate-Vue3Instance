iframe.createCommand({
	connect = function(...)
		iframe.invoke.message("lua : Where is this place?")
		iframe.invoke.destroyCommand("message")
		return "lua : connect"
	end,
	print = function(...)
		print(...)
		return "lua : hi"
	end,
})