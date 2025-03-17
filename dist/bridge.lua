local _in, _r = Citizen.InvokeNative, Citizen.ReturnResultAnyway()
local function _ts(num) if num == 0 or not num then return nil end return tostring(num) end
local function _mfr(fn) return Citizen.GetFunctionReference(fn)end
iframe = {}
function iframe:emit(expectedEvent, eventHandlers, ...)
	_in(0x78608acb, _ts(json.encode({expectedEvent, eventHandlers, ...})), _r)
end
function iframe:on(callbackType, callback)
	_in(0xc59b980c, _ts(callbackType), _mfr(callback))
end