# FivemTemplate-Vue3Instance

## วิธีใช้งาน

### 1 นำไพล์ dist ไปใส่ใน Folder Project ของเรา

### 2 เพิ่มพวกนี้ไว้บนสุดใน fxmanifest.lua
```lua
client_script"dist/bridge.lua"
ui_page"dist/index.html"
file"dist/**"
```

## วิธีใช้งาน Lua

### ไว้รับค่าจาก post
```lua
iframe.on(callbackType, callback)
```

### ไว้ส่งค่าไปที่ ui ไม่เข้าใจไปอ่านต่อที่ ./dist/js/eryk/README.md
```lua
iframe.js.example.title(str)
```
