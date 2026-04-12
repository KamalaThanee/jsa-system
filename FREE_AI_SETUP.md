# 🆓 Free AI Providers Setup Guide

## Overview

ระบบ JSA รองรับ 3 AI Providers พร้อมระบบ **Auto-Failover**:

1. **Google Gemini** (ฟรี) - ใช้เป็นหลัก
2. **OpenRouter** (ฟรี) - ใช้เมื่อ Gemini หมด quota
3. **Anthropic Claude** (เสียเงิน) - ใช้เป็น fallback สุดท้าย

### 💡 ระบบทำงานอย่างไร

```
User กดวิเคราะห์งาน
    ↓
ลอง Gemini API (ฟรี)
    ↓
✅ สำเร็จ → ส่งผลลัพธ์
❌ Rate Limit/Error → ลอง OpenRouter
    ↓
✅ สำเร็จ → ส่งผลลัพธ์
❌ Rate Limit/Error → ลอง Anthropic
    ↓
✅ สำเร็จ → ส่งผลลัพธ์
❌ ล้มเหลว → แจ้ง Error
```

**ข้อดี:**
- ✅ ไม่มีค่าใช้จ่าย (ถ้าใช้ Gemini + OpenRouter)
- ✅ สลับอัตโนมัติเมื่อถึง limit
- ✅ Uptime สูง (มี 3 providers)
- ✅ ตั้งค่าง่าย

---

## 🔑 ขั้นตอนที่ 1: รับ Gemini API Key (ฟรี)

### 1.1 ไปที่ Google AI Studio

1. เปิด: **https://aistudio.google.com/app/apikey**
2. Login ด้วย Google Account
3. ยอมรับ Terms of Service

### 1.2 สร้าง API Key

1. กดปุ่ม **"Create API Key"**
2. เลือก **"Create API key in new project"**
3. คัดลอก API Key (ขึ้นต้นด้วย `AIza...`)
4. บันทึกไว้ในที่ปลอดภัย

### 1.3 Quota ฟรีของ Gemini

**Gemini 1.5 Flash (Free tier):**
- ✅ **15 requests per minute (RPM)**
- ✅ **1 million tokens per day**
- ✅ **1,500 requests per day**

**คำนวณการใช้งาน:**
- 1 JSA ≈ 1 request
- สามารถทำ **1,500 JSAs/วัน** ฟรี! 🎉
- หรือ **15 JSAs/นาที**

**หมายเหตุ:** ถ้าใช้เกิน limit → ระบบจะสลับไป OpenRouter อัตโนมัติ

---

## 🔑 ขั้นตอนที่ 2: รับ OpenRouter API Key (ฟรี)

### 2.1 สร้างบัญชี OpenRouter

1. ไปที่: **https://openrouter.ai/**
2. กดปุ่ม **"Sign In"** → **"Sign up"**
3. Login ด้วย Google หรือ Email

### 2.2 รับ API Key

1. ไปที่: **https://openrouter.ai/keys**
2. กดปุ่ม **"Create Key"**
3. ตั้งชื่อ: `JSA-System`
4. คัดลอก API Key (ขึ้นต้นด้วย `sk-or-...`)
5. บันทึกไว้

### 2.3 เติมเครดิตฟรี (Optional)

OpenRouter ให้เครดิตฟรี **$1** สำหรับทดสอบ:
- ไปที่ **"Credits"**
- กด **"Get Free Credits"**

**หรือ** ใช้ Free Models โดยไม่ต้องเติมเครดิต:
- Gemini 2.0 Flash (ฟรี)
- Llama 3.2 (ฟรี)
- Mistral (ฟรี)

### 2.4 Quota ของ OpenRouter

**Free Models (ไม่มีค่าใช้จ่าย):**
- ✅ Gemini 2.0 Flash Experimental (ฟรี 100%)
- ✅ ไม่จำกัดจำนวน requests
- ✅ อาจมี rate limit ต่ำกว่า Gemini API โดยตรง

**Paid Models (ต้องเติมเครดิต):**
- Claude, GPT-4, etc.

---

## 🔑 ขั้นตอนที่ 3: Anthropic (Optional - สำรอง)

ถ้าต้องการ fallback เพิ่ม:

1. ไปที่: **https://console.anthropic.com/**
2. สมัครและรับ API Key
3. เติมเครดิต (ไม่มี free tier)
4. ใช้เป็น backup สุดท้าย

**ค่าใช้จ่าย:** ~$0.003/JSA

---

## ⚙️ ขั้นตอนที่ 4: ตั้งค่าใน Vercel

### 4.1 เพิ่ม Environment Variables

1. ไปที่: **https://vercel.com/dashboard**
2. เลือกโปรเจค `jsa-system`
3. ไปที่ **Settings** → **Environment Variables**

### 4.2 เพิ่ม API Keys

**สำหรับ Gemini (แนะนำ):**
- Name: `GEMINI_API_KEY`
- Value: วาง Gemini API Key
- Environment: ติ๊กทั้ง 3 (Production, Preview, Development)
- กด **Add**

**สำหรับ OpenRouter (แนะนำ):**
- Name: `OPENROUTER_API_KEY`
- Value: วาง OpenRouter API Key
- Environment: ติ๊กทั้ง 3
- กด **Add**

**สำหรับ Anthropic (Optional):**
- Name: `ANTHROPIC_API_KEY`
- Value: วาง Anthropic API Key (ถ้ามี)
- Environment: ติ๊กทั้ง 3
- กด **Add**

### 4.3 Redeploy

1. ไปที่ **Deployments**
2. คลิก **...** ที่ deployment ล่าสุด
3. เลือก **"Redeploy"**
4. รอ 2-3 นาที

---

## ✅ ขั้นตอนที่ 5: ทดสอบระบบ

### 5.1 เปิดเว็บ

1. ไปที่ URL ของคุณ
2. กรอกข้อมูลทดสอบ:

```
Vessel Code: TEST-001
Job Description: 
Test crane operation to verify AI provider failover system
```

### 5.2 วิเคราะห์

1. กด **"Analyze Job with AI"**
2. ดูที่ Console (F12) จะเห็น:
   ```
   ✅ AI Analysis successful via gemini
   ```

### 5.3 ทดสอบ Failover

ถ้าต้องการทดสอบการสลับอัตโนมัติ:

1. ลบ `GEMINI_API_KEY` ชั่วคราว
2. Redeploy
3. วิเคราะห์งาน → จะใช้ OpenRouter
4. Console จะแสดง:
   ```
   ⚙️ gemini not configured, trying next provider...
   ✅ AI Analysis successful via openrouter
   ```

---

## 💰 เปรียบเทียบค่าใช้จ่าย

| Provider | Cost per JSA | Free Tier | Daily Limit |
|----------|--------------|-----------|-------------|
| **Gemini** | ฟรี | ✅ 1,500 requests/day | 1,500 JSAs/day |
| **OpenRouter** | ฟรี | ✅ Free models | ไม่จำกัด (อาจมี rate limit) |
| **Anthropic** | ~$0.003 | ❌ ไม่มี | ตามเครดิต |

### การใช้งานจริง

**สถานการณ์ที่ 1: ใช้แค่ Gemini**
- ต้นทุน: **ฟรี 100%**
- จำกัด: 1,500 JSAs/วัน
- เหมาะกับ: ทีมเล็ก-กลาง

**สถานการณ์ที่ 2: Gemini + OpenRouter**
- ต้นทุน: **ฟรี 100%**
- จำกัด: เกือบไม่จำกัด
- เหมาะกับ: ทุกขนาดทีม

**สถานการณ์ที่ 3: ทั้ง 3 providers**
- ต้นทุน: ฟรี + ~$0.003/JSA (เฉพาะส่วนที่เกิน)
- จำกัด: ไม่จำกัด
- เหมาะกับ: Production ขนาดใหญ่

---

## 🔍 Monitoring & Troubleshooting

### ดู Provider ไหนกำลังใช้งาน

1. เปิด Browser Console (F12)
2. กด Analyze งาน
3. ดู log:
   ```
   ✅ AI Analysis successful via gemini
   ⏱️ Rate limit hit on gemini, trying next provider...
   ✅ AI Analysis successful via openrouter
   ```

### ตรวจสอบ Quota

**Gemini:**
1. ไปที่: https://aistudio.google.com/app/apikey
2. ดู Quota usage

**OpenRouter:**
1. ไปที่: https://openrouter.ai/activity
2. ดูประวัติการใช้งาน

### แก้ปัญหาที่พบบ่อย

**❌ "All AI providers failed"**
- ตรวจสอบว่าตั้ง API Key อย่างน้อย 1 ตัว
- ตรวจสอบ API Key ถูกต้อง
- ตรวจสอบยังมี quota เหลือ

**❌ "Rate limit hit"**
- ปกติ! ระบบจะสลับไป provider ถัดไป
- ถ้า provider ทั้งหมดหมด → รอ 1 นาทีแล้วลองใหม่

**❌ "Invalid JSON response"**
- AI บางตัวอาจส่งผลไม่ตรงตาม format
- ลองใช้ provider อื่น
- ตรวจสอบ job description ไม่ซับซ้อนเกินไป

---

## 🎯 Best Practices

### การตั้งค่าแนะนำ

**สำหรับการใช้งานทั่วไป:**
```
✅ GEMINI_API_KEY (หลัก - ฟรี)
✅ OPENROUTER_API_KEY (สำรอง - ฟรี)
❌ ANTHROPIC_API_KEY (ไม่จำเป็น)
```

**สำหรับ Production ขนาดใหญ่:**
```
✅ GEMINI_API_KEY (หลัก - ฟรี)
✅ OPENROUTER_API_KEY (สำรอง - ฟรี)
✅ ANTHROPIC_API_KEY (fallback - เสียเงิน แต่มั่นใจ)
```

### การจัดการ Quota

1. **เช้า (8:00-12:00):** ใช้ Gemini (ยังมี quota เต็ม)
2. **บ่าย (12:00-17:00):** อาจเริ่มใช้ OpenRouter
3. **เย็น (17:00+):** Quota reset → กลับมาใช้ Gemini

### Alert เมื่อถึง Limit

ตั้งค่า monitoring:
```javascript
// เพิ่มใน lib/aiProvider.ts
if (response.provider === 'openrouter') {
  console.warn('⚠️ Using backup provider - Gemini may be at limit');
}
```

---

## 📊 Performance Comparison

| Metric | Gemini | OpenRouter | Anthropic |
|--------|--------|------------|-----------|
| **Speed** | ⚡⚡⚡ Fast | ⚡⚡ Medium | ⚡⚡⚡ Fast |
| **Quality** | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Cost** | 💰 Free | 💰 Free | 💰💰💰 Paid |
| **Reliability** | 🟢 High | 🟢 High | 🟢 Very High |
| **Rate Limit** | 15/min | Varies | 50/min |

**Recommendation:** ใช้ Gemini + OpenRouter ฟรี 100%!

---

## 🎓 Migration Guide

### จาก Anthropic → Gemini + OpenRouter

**ขั้นตอน:**

1. รับ Gemini API Key
2. รับ OpenRouter API Key
3. เพิ่มทั้ง 2 keys ใน Vercel
4. Redeploy
5. ✅ เสร็จ! ไม่มีค่าใช้จ่าย

**ไม่ต้องเปลี่ยนโค้ด** - ระบบจัดการให้อัตโนมัติ

### ค่าใช้จ่ายเปรียบเทียบ

**Before (Anthropic only):**
- 100 JSAs/เดือน = $0.30
- 1,000 JSAs/เดือน = $3.00
- 10,000 JSAs/เดือน = $30.00

**After (Gemini + OpenRouter):**
- 100 JSAs/เดือน = **$0.00** ✅
- 1,000 JSAs/เดือน = **$0.00** ✅
- 10,000 JSAs/เดือน = **$0.00** ✅

**ประหยัด: 100%** 🎉

---

## 🔐 Security Notes

### API Key Safety

1. ✅ เก็บใน Environment Variables เท่านั้น
2. ✅ ห้าม commit ลง Git
3. ✅ แยก key สำหรับ Dev/Prod
4. ✅ Rotate keys ทุก 90 วัน

### Free Tier Limits

1. ⚠️ Gemini: ห้ามใช้เกิน 1,500 requests/day
2. ⚠️ OpenRouter: ปฏิบัติตาม Fair Use Policy
3. ⚠️ ห้ามใช้เพื่อ spam หรือ abuse

---

## ✅ Quick Setup Checklist

- [ ] ได้ Gemini API Key แล้ว
- [ ] ได้ OpenRouter API Key แล้ว
- [ ] เพิ่มทั้ง 2 keys ใน Vercel
- [ ] Redeploy โปรเจค
- [ ] ทดสอบการวิเคราะห์งาน
- [ ] ตรวจสอบ Console เห็น provider ที่ใช้
- [ ] ทดสอบ failover (ถอด key 1 ตัว)
- [ ] ระบบพร้อมใช้งาน! 🚀

---

## 🎯 Summary

**ตั้งค่าเพียงครั้งเดียว:**
1. รับ Gemini API Key (5 นาที)
2. รับ OpenRouter API Key (5 นาที)
3. เพิ่มใน Vercel (2 นาที)
4. **Total: 12 นาที**

**ผลลัพธ์:**
- ✅ ใช้งานฟรี 100%
- ✅ Auto-failover เมื่อถึง limit
- ✅ Uptime สูง (มี 2-3 providers)
- ✅ ทำ JSA ได้ไม่จำกัด (เกือบ)

**ค่าใช้จ่าย: $0/เดือน** 💰

---

**Ready to save 100% on AI costs?** 🎉
