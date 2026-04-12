# API Documentation

## Overview

The JSA System exposes two main API endpoints for job analysis and document export.

## Base URL

- **Development**: `http://localhost:3000`
- **Production**: `https://your-app.vercel.app`

---

## Endpoints

### 1. Analyze Job

**POST** `/api/analyze`

Analyzes a job description and generates a complete JSA breakdown.

#### Request

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "jobDescription": "Crane lifting operation to transfer 2-ton container from supply vessel to barge deck",
  "vesselType": "Accommodation Work Barge",
  "workLocation": "Gulf of Thailand"
}
```

**Parameters:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| jobDescription | string | Yes | Detailed description of work to be performed |
| vesselType | string | No | Type of vessel (default: "Accommodation Work Barge") |
| workLocation | string | No | Location of work (default: "Offshore") |

#### Response

**Success (200 OK):**
```json
{
  "jobSteps": [
    {
      "stepNumber": 1,
      "description": "Establish communication and verify crane capacity",
      "hazards": [
        {
          "category": "Mechanical",
          "hazard": "Crane overload",
          "description": "Lifting beyond rated capacity could cause structural failure"
        },
        {
          "category": "Sound",
          "hazard": "Communication interference",
          "description": "Engine noise preventing clear radio communication"
        }
      ],
      "initialSeverity": 5,
      "initialLikelihood": "C",
      "controlMeasures": [
        "Verify load weight does not exceed 40% of crane capacity",
        "Use hand signals as backup to radio communication",
        "Conduct pre-lift meeting with all personnel"
      ],
      "residualSeverity": 3,
      "residualLikelihood": "B",
      "responsibility": "Crane Operator & Banksman"
    }
  ]
}
```

**Error (400 Bad Request):**
```json
{
  "error": "Job description is required"
}
```

**Error (500 Internal Server Error):**
```json
{
  "error": "Failed to analyze job"
}
```

#### Example Usage

**JavaScript/TypeScript:**
```typescript
const response = await fetch('/api/analyze', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    jobDescription: 'Your job description here',
    vesselType: 'Accommodation Work Barge',
    workLocation: 'Gulf of Thailand',
  }),
});

const data = await response.json();
console.log(data.jobSteps);
```

**cURL:**
```bash
curl -X POST https://your-app.vercel.app/api/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "jobDescription": "Crane lifting operation",
    "vesselType": "Accommodation Work Barge",
    "workLocation": "Gulf of Thailand"
  }'
```

---

### 2. Export to Word

**POST** `/api/export`

Generates a Word document (.docx) from JSA data.

#### Request

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "vesselCode": "AWB-001",
  "vesselName": "Pacific Endeavor",
  "client": "Chevron Thailand",
  "vesselLocation": "Gulf of Thailand",
  "jobDescription": "Crane lifting operation",
  "preparedBy": "John Smith",
  "reviewedBy": "Jane Doe",
  "approvedBy": "Captain Brown",
  "date": "2026-04-07",
  "windSpeed": "15 knots from NE",
  "currentDirection": "0.5 knots SE",
  "visibility": "5 NM",
  "jsaNumber": "JSA-2026-001",
  "frequency": "As required",
  "ppe": "Hard hat, safety shoes, gloves, life jacket",
  "onboardLocation": "Main deck",
  "generalNotes": "Weather conditions monitored continuously",
  "jobSteps": [
    {
      "no": 1,
      "description": "Step description",
      "potentialHazards": ["Hazard 1", "Hazard 2"],
      "initialRisk": {
        "severity": 4,
        "likelihood": "C",
        "riskLevel": "HIGH"
      },
      "controlMeasures": ["Control 1", "Control 2"],
      "responsibility": "Crane Operator",
      "residualRisk": {
        "severity": 2,
        "likelihood": "B",
        "riskLevel": "LOW"
      }
    }
  ],
  "assessors": "Safety Officer Name",
  "dateAssessed": "2026-04-07",
  "reviewedByPerson": "Supervisor Name",
  "dateReviewed": "2026-04-07"
}
```

#### Response

**Success (200 OK):**
```
Content-Type: application/vnd.openxmlformats-officedocument.wordprocessingml.document
Content-Disposition: attachment; filename="JSA_JSA-2026-001_1234567890.docx"

[Binary DOCX file data]
```

**Error (500 Internal Server Error):**
```json
{
  "error": "Failed to export document"
}
```

#### Example Usage

**JavaScript/TypeScript:**
```typescript
const response = await fetch('/api/export', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(jsaData),
});

const blob = await response.blob();
const url = window.URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'JSA_export.docx';
document.body.appendChild(a);
a.click();
window.URL.revokeObjectURL(url);
document.body.removeChild(a);
```

**cURL:**
```bash
curl -X POST https://your-app.vercel.app/api/export \
  -H "Content-Type: application/json" \
  -d @jsa-data.json \
  -o JSA_export.docx
```

---

## Data Types

### JobStep
```typescript
interface JobStep {
  no: number;                    // Step number (1, 2, 3, ...)
  description: string;            // What to do
  potentialHazards: string[];     // List of hazards
  initialRisk: RiskAssessment;    // Before controls
  controlMeasures: string[];      // How to mitigate
  responsibility: string;         // Who is responsible
  residualRisk: RiskAssessment;   // After controls
}
```

### RiskAssessment
```typescript
interface RiskAssessment {
  severity: 1 | 2 | 3 | 4 | 5;           // Severity level
  likelihood: 'A' | 'B' | 'C' | 'D' | 'E'; // Likelihood level
  riskLevel: 'LOW' | 'MED' | 'HIGH';      // Calculated risk
}
```

### EnergyCategory
```typescript
type EnergyCategory = 
  | 'Mechanical'
  | 'Electrical'
  | 'Thermal'
  | 'Chemical'
  | 'Radiation'
  | 'Biological'
  | 'Gravitational'
  | 'Pressure'
  | 'Motion'
  | 'Sound';
```

---

## Rate Limits

### Anthropic API Limits
- Tier 1 (Free): 50 requests/minute
- Tier 2: 1,000 requests/minute
- Tier 3: 2,000 requests/minute
- Tier 4: 4,000 requests/minute

### Vercel Limits (Free Tier)
- 100GB bandwidth/month
- 100 hours serverless function execution/month
- 1,000 deployments/month

---

## Error Codes

| Code | Meaning | Solution |
|------|---------|----------|
| 400 | Bad Request | Check request body format |
| 401 | Unauthorized | Verify API key in environment variables |
| 429 | Too Many Requests | Wait and retry, or upgrade API tier |
| 500 | Internal Server Error | Check server logs, verify API key has credits |
| 503 | Service Unavailable | Anthropic API may be down, retry later |

---

## Best Practices

### For Analysis Endpoint

1. **Be Specific**
   - Provide detailed job descriptions
   - Include equipment types and specifications
   - Mention environmental conditions

2. **Error Handling**
   ```typescript
   try {
     const response = await fetch('/api/analyze', { ... });
     if (!response.ok) {
       const error = await response.json();
       console.error('Analysis failed:', error.error);
     }
   } catch (error) {
     console.error('Network error:', error);
   }
   ```

3. **Timeout Handling**
   - AI analysis can take 5-10 seconds
   - Set appropriate timeout (15 seconds recommended)
   - Show loading indicator to user

### For Export Endpoint

1. **Complete Data**
   - Ensure all required fields are populated
   - Validate data before sending

2. **File Handling**
   ```typescript
   // Check if download succeeded
   if (blob.size < 1000) {
     console.error('Export may have failed (file too small)');
   }
   ```

3. **Browser Compatibility**
   - Test download in target browsers
   - Handle blob/download differently for Safari

---

## Security

### API Key Protection

**DO:**
- ✅ Store API key in environment variables
- ✅ Use server-side API routes only
- ✅ Never expose API key in client code
- ✅ Rotate keys regularly

**DON'T:**
- ❌ Commit API keys to git
- ❌ Include in client-side code
- ❌ Share keys publicly
- ❌ Use in URLs or logs

### Data Privacy

- No JSA data is stored on servers
- No analytics or tracking
- No user data collection
- Client-side only processing after AI analysis

---

## Monitoring

### Check API Usage

**Anthropic Console:**
1. Go to https://console.anthropic.com/
2. Navigate to "Usage"
3. View requests, tokens, costs

### Check Application Health

**Vercel Dashboard:**
1. Go to https://vercel.com/dashboard
2. Select your project
3. View "Analytics" and "Functions"

---

## Testing

### Test Analysis Endpoint

```bash
# Test with sample job
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "jobDescription": "Test crane operation",
    "vesselType": "Barge",
    "workLocation": "Offshore"
  }'
```

### Test Export Endpoint

```bash
# Test with minimal data
curl -X POST http://localhost:3000/api/export \
  -H "Content-Type: application/json" \
  -d '{
    "jobDescription": "Test",
    "jobSteps": []
  }' \
  -o test.docx
```

---

## Changelog

### v1.0.0
- Initial API release
- `/api/analyze` endpoint
- `/api/export` endpoint
- Edge runtime for analysis
- Node.js runtime for export

---

## Support

For API issues:
1. Check request/response format
2. Verify API key is set
3. Check Anthropic API status
4. Review server logs in Vercel
5. Test with cURL first

---

**API Version:** 1.0.0  
**Last Updated:** 2026-04-07
