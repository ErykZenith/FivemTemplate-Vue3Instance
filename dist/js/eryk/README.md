# post
## วิธีใช้งาน

### ใช้ส่งข้อมูลปกติ
```javascript
post('exampleEndpoint', { key: 'value' })
    .execute()
    .then(response => console.log(response))
    .catch(error => console.error(error));
```
### กำหนดข้อมูลจำลอง (ใช้ในโหมด Dev)
```javascript
post('exampleEndpoint', { key: 'value' })
    .fakeResp({ success: true, message: 'Mocked Response' })
    .execute()
    .then(response => console.log(response)); // Output: { success: true, message: 'Mocked Response' }
```
### กำหนด options เพิ่มเติม
```javascript
post('exampleEndpoint', { key: 'value' })
    .options({ headers: { Authorization: 'Bearer token' } })
    .execute()
    .then(response => console.log(response));
```
### ส่ง request ไปยัง URL ภายนอก
```javascript
post('https://api.example.com/data', { key: 'value' })
    .execute(true)
    .then(response => console.log(response));
```

# onListener
## วิธีใช้งาน

### ตัวอย่างการใช้ onListener
```javascript
onListener('example', {
    title: (str) => {
        console.log('title:', str);
    },
});
```

### การลบ onListener โดยใช้ unListener
```javascript
unListener(); //จะลบทั้งหมด
unListener('example'); //ลบเฉพาะ
```

### การส่งข้อความ emit
```javascript
emit.example.title(str)
```

### การส่งข้อความสำหรับการดีบัก emitDebug (เฉพาะในโหมด dev)
```javascript
emitDebug.example.title(str)
```
