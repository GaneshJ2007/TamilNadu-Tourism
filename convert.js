import fs from 'fs';
import { marked } from 'marked';

const mdP = 'C:\\Users\\GANESH J\\.gemini\\antigravity\\brain\\44fabc76-731f-49a2-98ed-391da92149c0\\artifacts\\updated_report.md';
const mdContent = fs.readFileSync(mdP, 'utf-8');
const parsed = marked.parse(mdContent);

const html = `
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
<meta charset="utf-8">
<style>
body { font-family: Calibri, sans-serif; font-size: 11pt; }
table { border-collapse: collapse; width: 100%; margin-bottom: 20px; }
th, td { border: 1px solid black; padding: 8px; text-align: left; }
</style>
</head>
<body>
${parsed}
</body>
</html>
`;

fs.writeFileSync('d:\\TN\\SMART_DIGITAL_PLATFORM_REPORT.doc', html);
console.log('Document created at d:\\TN\\SMART_DIGITAL_PLATFORM_REPORT.doc');
