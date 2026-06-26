import re
f = open('src/routes/admin.tsx').read()
imports_match = re.search(r'import\s+\{([^}]+)\}\s+from\s+[\'"]lucide-react[\'"]', f)
imports = set([x.strip() for x in imports_match.group(1).split(',') if x.strip()])
icons = set(re.findall(r'icon:\s*([A-Z][a-zA-Z0-9_]+)', f) + re.findall(r'<([A-Z][a-zA-Z0-9_]+)[^>]*className=', f) + re.findall(r'<([A-Z][a-zA-Z0-9_]+)\s*/>', f))
allowed = {'LineChart', 'Line', 'BarChart', 'Bar', 'PieChart', 'Pie', 'Cell', 'XAxis', 'YAxis', 'CartesianGrid', 'Tooltip', 'Legend', 'ResponsiveContainer', 'Card', 'Button', 'Input', 'AdminDashboard', 'AdminPage', 'motion', 'AnimatePresence'}
missing = icons - imports - allowed
print('Missing:', missing)
