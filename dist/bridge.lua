local a,b=Citizen.InvokeNative,Citizen.ReturnResultAnyway()local function c(d)if d==0 or not d then return nil end;return tostring(d)end;local function e(f)return Citizen.GetFunctionReference(f)end;iframe={}iframe.__index=iframe;iframe.js=setmetatable({},{__index=function(g,h)return setmetatable({},{__index=function(g,i)return function(...)a(0x78608acb,c(json.encode({h,i,...})),b)end end})end})function iframe.on(j,k)a(0xc59b980c,c(j),e(k))end