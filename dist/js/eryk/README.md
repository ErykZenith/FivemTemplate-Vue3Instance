# post

## รายละเอียด
ฟังก์ชัน `post` ช่วยให้สามารถส่งข้อมูลไปยังเซิร์ฟเวอร์ผ่าน HTTP POST ได้อย่างง่ายดาย โดยรองรับ:
- การตั้งค่าข้อมูลจำลอง (`fakeResp`)
- การกำหนดตัวเลือกเพิ่มเติม (`options`)
- การส่งคำขอ (`execute`)

## วิธีใช้งาน

### ใช้ส่งข้อมูลปกติ
```javascript
post("exampleEndpoint", { key: "value" })
    .execute()
    .then(response => console.log(response))
    .catch(error => console.error(error));
```
### กำหนดข้อมูลจำลอง (ใช้ในโหมด Dev)
```javascript
post("exampleEndpoint", { key: "value" })
    .fakeResp({ success: true, message: "Mocked Response" })
    .execute()
    .then(response => console.log(response)); // Output: { success: true, message: "Mocked Response" }
```
### กำหนด options เพิ่มเติม
```javascript
post("exampleEndpoint", { key: "value" })
    .options({ headers: { Authorization: "Bearer token" } })
    .execute()
    .then(response => console.log(response));
```
### ส่ง request ไปยัง URL ภายนอก
```javascript
post("https://api.example.com/data", { key: "value" })
    .execute(true)
    .then(response => console.log(response));
```

# createEventHandler

## รายละเอียด
เป็นฟังก์ชันสำหรับสร้างตัวจัดการอีเวนต์ที่รับข้อมูลจาก `window.postMessage` และจัดการกับข้อมูลที่ได้รับตามอีเวนต์ที่คาดหวัง ซึ่งสามารถใช้ในกรณีต่างๆ เช่น การสื่อสารระหว่าง iframe หรือการส่งข้อความจากส่วนต่างๆ ของแอปพลิเคชัน

## วิธีใช้งาน

### ตัวอย่างการสร้าง event handler
```javascript
const eventHandler = createEventHandler("myEvent", {
    myMethod: (...args) => {
        console.log("Method called with arguments:", ...args);
    },
});
```

### การลบ event listener
```javascript
eventHandler.remove();
```

### การส่งข้อความ
```javascript
emit("myEvent", "myMethod", "hello", "world");
```

### การส่งข้อความสำหรับการดีบัก (เฉพาะในโหมด dev)
```javascript
emitDebug("myEvent", "myMethod", "debugMessage");
```