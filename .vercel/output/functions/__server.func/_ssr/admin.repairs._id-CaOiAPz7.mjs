import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as Route$1, B as Button, C as Card, c as cn } from "./router-Dwa750EE.mjs";
import { T as Textarea } from "./textarea-D2lrPbio.mjs";
import { g as getStoredToken, b as buildUrl, a as getAuthHeaders, B as Badge } from "./api-BGwTvpdW.mjs";
import { R as Root } from "../_libs/radix-ui__react-separator.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { I as Input } from "./input-WcTK30Lj.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CJXNBrao.mjs";
import { C as Clock, u as CircleAlert, aB as ArrowLeft, aE as Printer, aF as Receipt, U as User, P as Phone, v as Package, Q as Calendar, a9 as History, ag as MessageSquare, au as Camera, a6 as DollarSign, $ as CreditCard, an as Shield, aG as TriangleAlert, aH as Info, aj as Download, aI as QrCode } from "../_libs/lucide-react.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/radix-ui__react-dropdown-menu.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-menu.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
function InvoiceGenerator({ repair, businessSettings }) {
  const [isGenerating, setIsGenerating] = reactExports.useState(false);
  const generateInvoiceNumber = () => {
    return `INV-${(/* @__PURE__ */ new Date()).getFullYear()}-${String(repair.id).padStart(4, "0")}`;
  };
  const generateQRCode = () => {
    return `https://fixora.com/track/${repair.tracking_id}`;
  };
  const handlePrintInvoice = () => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      const invoiceContent = generateInvoiceHTML();
      printWindow.document.write(invoiceContent);
      printWindow.document.close();
      printWindow.print();
    }
  };
  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    try {
      const printWindow = window.open("", "_blank");
      if (printWindow) {
        const invoiceContent = generateInvoiceHTML();
        printWindow.document.write(invoiceContent);
        printWindow.document.close();
        setTimeout(() => {
          printWindow.print();
          setIsGenerating(false);
        }, 500);
      }
    } catch (error) {
      toast.error("Failed to generate PDF");
      setIsGenerating(false);
    }
  };
  const generateInvoiceHTML = () => {
    const invoiceNumber = generateInvoiceNumber();
    const costBreakdown = repair.cost_breakdown || {
      labor: 0,
      parts: 0,
      diagnostic: 0,
      tax: 0
    };
    const totalCost = costBreakdown.labor + costBreakdown.parts + costBreakdown.diagnostic + costBreakdown.tax;
    const depositPaid = repair.deposit_paid || 0;
    const remainingBalance = totalCost - depositPaid;
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Invoice ${invoiceNumber}</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 40px;
            background: #f5f5f5;
          }
          .invoice-container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 40px;
            border-bottom: 2px solid #8b5cf6;
            padding-bottom: 20px;
          }
          .logo {
            font-size: 24px;
            font-weight: bold;
            color: #8b5cf6;
          }
          .invoice-number {
            font-size: 18px;
            color: #64748b;
          }
          .invoice-number strong {
            color: #0f172a;
          }
          .section {
            margin-bottom: 30px;
          }
          .section-title {
            font-size: 14px;
            font-weight: 600;
            color: #64748b;
            text-transform: uppercase;
            margin-bottom: 15px;
          }
          .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
          }
          .info-item {
            margin-bottom: 10px;
          }
          .info-label {
            font-size: 12px;
            color: #64748b;
            margin-bottom: 4px;
          }
          .info-value {
            font-size: 14px;
            color: #0f172a;
            font-weight: 500;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }
          th {
            background: #f8fafc;
            padding: 12px;
            text-align: left;
            font-size: 12px;
            font-weight: 600;
            color: #64748b;
            text-transform: uppercase;
            border-bottom: 2px solid #e2e8f0;
          }
          td {
            padding: 12px;
            border-bottom: 1px solid #e2e8f0;
            font-size: 14px;
          }
          .amount {
            text-align: right;
            font-weight: 600;
          }
          .total-section {
            display: flex;
            justify-content: flex-end;
            margin-top: 20px;
          }
          .total-table {
            width: 300px;
          }
          .total-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #e2e8f0;
          }
          .total-row.final {
            border-bottom: none;
            border-top: 2px solid #8b5cf6;
            margin-top: 10px;
            padding-top: 15px;
            font-size: 18px;
            font-weight: bold;
          }
          .status-badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 600;
          }
          .status-paid {
            background: #dcfce7;
            color: #166534;
          }
          .status-partial {
            background: #fef9c3;
            color: #854d0e;
          }
          .status-pending {
            background: #fee2e2;
            color: #991b1b;
          }
          .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e2e8f0;
            text-align: center;
            font-size: 12px;
            color: #64748b;
          }
          .qr-section {
            text-align: center;
            margin-top: 20px;
          }
          @media print {
            body {
              background: white;
              padding: 0;
            }
            .invoice-container {
              box-shadow: none;
              padding: 20px;
            }
          }
        </style>
      </head>
      <body>
        <div class="invoice-container">
          <div class="header">
            <div class="logo">${businessSettings.businessName || "Fixora Repair Shop"}</div>
            <div class="invoice-number">
              Invoice #<strong>${invoiceNumber}</strong>
            </div>
          </div>

          <div class="info-grid">
            <div>
              <div class="section-title">Bill To</div>
              <div class="info-item">
                <div class="info-value">${repair.customer_name}</div>
              </div>
              <div class="info-item">
                <div class="info-value">${repair.customer_phone}</div>
              </div>
            </div>
            <div>
              <div class="section-title">Invoice Details</div>
              <div class="info-item">
                <div class="info-label">Date</div>
                <div class="info-value">${(/* @__PURE__ */ new Date()).toLocaleDateString()}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Repair ID</div>
                <div class="info-value">${repair.tracking_id}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Status</div>
                <div class="info-value">
                  <span class="status-badge ${remainingBalance === 0 ? "status-paid" : remainingBalance < totalCost ? "status-partial" : "status-pending"}">
                    ${remainingBalance === 0 ? "PAID" : remainingBalance < totalCost ? "PARTIAL" : "PENDING"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">Device Information</div>
            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">Device</div>
                <div class="info-value">${repair.device_model}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Brand</div>
                <div class="info-value">${repair.device_brand || "N/A"}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Issue</div>
                <div class="info-value">${repair.issue_description || "N/A"}</div>
              </div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">Cost Breakdown</div>
            <table>
              <thead>
                <tr>
                  <th>Description</th>
                  <th class="amount">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Labor Charges</td>
                  <td class="amount">£${costBreakdown.labor.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Parts & Components</td>
                  <td class="amount">£${costBreakdown.parts.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Diagnostic Fee</td>
                  <td class="amount">£${costBreakdown.diagnostic.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Tax (20%)</td>
                  <td class="amount">£${costBreakdown.tax.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>

            <div class="total-section">
              <div class="total-table">
                <div class="total-row">
                  <span>Subtotal</span>
                  <span>£${(totalCost - costBreakdown.tax).toFixed(2)}</span>
                </div>
                <div class="total-row">
                  <span>Tax</span>
                  <span>£${costBreakdown.tax.toFixed(2)}</span>
                </div>
                <div class="total-row">
                  <span>Deposit Paid</span>
                  <span>-£${depositPaid.toFixed(2)}</span>
                </div>
                <div class="total-row final">
                  <span>Total Due</span>
                  <span>£${remainingBalance.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">Payment Information</div>
            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">Payment Method</div>
                <div class="info-value">Cash / Card / Bank Transfer</div>
              </div>
              <div class="info-item">
                <div class="info-label">Bank Account</div>
                <div class="info-value">${businessSettings.bankAccount || "Contact for details"}</div>
              </div>
            </div>
          </div>

          <div class="qr-section">
            <div class="section-title">Track Your Repair</div>
            <div style="font-family: monospace; font-size: 10px; background: #f8fafc; padding: 10px; display: inline-block; border-radius: 4px;">
              ${generateQRCode()}
            </div>
          </div>

          <div class="footer">
            <p>${businessSettings.businessName || "Fixora Repair Shop"}</p>
            <p>${businessSettings.address || "123 High Street, Nuneaton, CV11 6AA"}</p>
            <p>${businessSettings.phone || "+44 123 456 7890"} | ${businessSettings.email || "info@fixora.com"}</p>
            <p style="margin-top: 10px;">Thank you for your business!</p>
          </div>
        </div>
      </body>
      </html>
    `;
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-4 text-lg font-semibold text-white", children: "Invoice Actions" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          onClick: handlePrintInvoice,
          className: "flex-1",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "mr-2 h-4 w-4" }),
            "Print Invoice"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          onClick: handleDownloadPDF,
          disabled: isGenerating,
          className: "flex-1",
          children: isGenerating ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mr-2 h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-violet-600" }),
            "Generating..."
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "mr-2 h-4 w-4" }),
            "Download PDF"
          ] })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center justify-center gap-2 text-sm text-slate-600", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(QrCode, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Includes QR code for repair tracking" })
    ] })
  ] });
}
function WarrantyManager({ repairId, token }) {
  const [warranty, setWarranty] = reactExports.useState(null);
  const [warrantyHistory, setWarrantyHistory] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [editing, setEditing] = reactExports.useState(false);
  const [formData, setFormData] = reactExports.useState({
    duration: 90,
    startDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    notes: ""
  });
  reactExports.useEffect(() => {
    fetchWarranty();
    fetchWarrantyHistory();
  }, [repairId]);
  const fetchWarranty = async () => {
    try {
      const res = await fetch(buildUrl(`/repairs/${repairId}/warranty`), {
        headers: getAuthHeaders()
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setWarranty(data.warranty);
        if (data.warranty) {
          setFormData({
            duration: data.warranty.duration || 90,
            startDate: data.warranty.start_date || (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
            notes: data.warranty.notes || ""
          });
        }
      }
    } catch (error) {
      console.error("Failed to fetch warranty:", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchWarrantyHistory = async () => {
    try {
      const res = await fetch(buildUrl(`/repairs/${repairId}/warranty/history`), {
        headers: getAuthHeaders()
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setWarrantyHistory(data.history || []);
      }
    } catch (error) {
      console.error("Failed to fetch warranty history:", error);
    }
  };
  const calculateExpirationDate = (startDate, duration) => {
    const start = new Date(startDate);
    const expiration = new Date(start);
    expiration.setDate(expiration.getDate() + duration);
    return expiration;
  };
  const getWarrantyStatus = (expirationDate2) => {
    const now = /* @__PURE__ */ new Date();
    const daysUntilExpiration2 = Math.ceil((expirationDate2.getTime() - now.getTime()) / (1e3 * 60 * 60 * 24));
    if (daysUntilExpiration2 < 0) {
      return { status: "expired", color: "rose", text: "Expired" };
    } else if (daysUntilExpiration2 <= 30) {
      return { status: "expiring", color: "amber", text: "Expiring Soon" };
    } else {
      return { status: "active", color: "emerald", text: "Active" };
    }
  };
  const handleSaveWarranty = async () => {
    try {
      const expirationDate2 = calculateExpirationDate(formData.startDate, formData.duration);
      const res = await fetch(buildUrl(`/repairs/${repairId}/warranty`), {
        method: "POST",
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          duration: formData.duration,
          start_date: formData.startDate,
          expiration_date: expirationDate2.toISOString(),
          notes: formData.notes
        })
      });
      if (res.ok) {
        toast.success("Warranty updated successfully");
        setEditing(false);
        fetchWarranty();
        fetchWarrantyHistory();
      } else {
        toast.error("Failed to update warranty");
      }
    } catch (error) {
      toast.error("Failed to update warranty");
    }
  };
  const handleExtendWarranty = async (additionalDays) => {
    if (!warranty) return;
    try {
      const currentExpiration = new Date(warranty.expiration_date);
      const newExpiration = new Date(currentExpiration);
      newExpiration.setDate(newExpiration.getDate() + additionalDays);
      const res = await fetch(buildUrl(`/repairs/${repairId}/warranty/extend`), {
        method: "POST",
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          additional_days: additionalDays,
          new_expiration_date: newExpiration.toISOString()
        })
      });
      if (res.ok) {
        toast.success(`Warranty extended by ${additionalDays} days`);
        fetchWarranty();
        fetchWarrantyHistory();
      } else {
        toast.error("Failed to extend warranty");
      }
    } catch (error) {
      toast.error("Failed to extend warranty");
    }
  };
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-6 w-6 animate-spin text-violet-500" }) }) });
  }
  const expirationDate = warranty ? new Date(warranty.expiration_date) : calculateExpirationDate(formData.startDate, formData.duration);
  const warrantyStatus = getWarrantyStatus(expirationDate);
  const daysUntilExpiration = Math.ceil((expirationDate.getTime() - (/* @__PURE__ */ new Date()).getTime()) / (1e3 * 60 * 60 * 24));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `rounded-full p-2 bg-${warrantyStatus.color}-100`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: `h-5 w-5 text-${warrantyStatus.color}-600` }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-white", children: "Warranty Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: `bg-${warrantyStatus.color}-100 text-${warrantyStatus.color}-700`, children: warrantyStatus.text })
        ] })
      ] }),
      !editing && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", onClick: () => setEditing(true), children: "Edit Warranty" })
    ] }),
    warrantyStatus.status === "expired" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -8 },
        animate: { opacity: 1, y: 0 },
        className: "mb-6 flex items-center gap-3 rounded-lg border border-rose-200 bg-rose-50 p-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-5 w-5 text-rose-600" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-rose-900", children: "Warranty Expired" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-rose-700", children: [
              "This warranty expired on ",
              expirationDate.toLocaleDateString()
            ] })
          ] })
        ]
      }
    ),
    warrantyStatus.status === "expiring" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -8 },
        animate: { opacity: 1, y: 0 },
        className: "mb-6 flex items-center gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-5 w-5 text-amber-600" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-amber-900", children: "Warranty Expiring Soon" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-amber-700", children: [
              "This warranty will expire in ",
              daysUntilExpiration,
              " days"
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: editing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, height: 0 },
        animate: { opacity: 1, height: "auto" },
        className: "space-y-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-2 block text-sm font-medium text-slate-300", children: "Warranty Duration (days)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: formData.duration.toString(),
                  onValueChange: (value) => setFormData({ ...formData, duration: parseInt(value) }),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "30", children: "30 Days" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "60", children: "60 Days" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "90", children: "90 Days" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "180", children: "180 Days" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "365", children: "1 Year" })
                    ] })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-2 block text-sm font-medium text-slate-300", children: "Start Date" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "date",
                  value: formData.startDate,
                  onChange: (e) => setFormData({ ...formData, startDate: e.target.value })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-2 block text-sm font-medium text-slate-300", children: "Notes" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "textarea",
              {
                className: "w-full rounded-lg border border-[#1F2235] bg-[#1A1D27] p-3 text-sm",
                rows: 3,
                value: formData.notes,
                onChange: (e) => setFormData({ ...formData, notes: e.target.value }),
                placeholder: "Add warranty notes or conditions..."
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleSaveWarranty, children: "Save Warranty" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setEditing(false), children: "Cancel" })
          ] })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-slate-600", children: "Duration" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-white", children: [
          warranty?.duration || formData.duration,
          " days"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-slate-600", children: "Start Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-white", children: warranty?.start_date ? new Date(warranty.start_date).toLocaleDateString() : new Date(formData.startDate).toLocaleDateString() })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-slate-600", children: "Expiration Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `font-medium ${warrantyStatus.status === "expired" ? "text-rose-600" : warrantyStatus.status === "expiring" ? "text-amber-600" : "text-white"}`, children: expirationDate.toLocaleDateString() })
      ] }),
      warranty?.notes && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-[#1A1D27] p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "h-4 w-4 text-slate-500" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-slate-300", children: "Notes" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-400", children: warranty.notes })
      ] }),
      warranty && warrantyStatus.status !== "expired" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4 border-t border-[#1F2235]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3 text-sm font-medium text-slate-300", children: "Extend Warranty" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", onClick: () => handleExtendWarranty(30), children: "+30 Days" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", onClick: () => handleExtendWarranty(90), children: "+90 Days" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", onClick: () => handleExtendWarranty(180), children: "+180 Days" })
        ] })
      ] })
    ] }) }),
    warrantyHistory.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 pt-6 border-t border-[#1F2235]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "mb-4 text-sm font-semibold text-white", children: "Warranty History" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: warrantyHistory.map((history, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: -12 },
          animate: { opacity: 1, x: 0 },
          transition: { delay: idx * 0.05 },
          className: "flex items-center justify-between rounded-lg bg-[#1A1D27] p-3",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4 text-slate-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-white", children: history.action }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-slate-500", children: [
                  new Date(history.created_at).toLocaleDateString(),
                  " ",
                  new Date(history.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-slate-500", children: [
              "by ",
              history.user || "System"
            ] })
          ]
        },
        history.id
      )) })
    ] })
  ] });
}
const Separator = reactExports.forwardRef(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Root,
  {
    ref,
    decorative,
    orientation,
    className: cn(
      "shrink-0 bg-border",
      orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
      className
    ),
    ...props
  }
));
Separator.displayName = Root.displayName;
function getStatusStyle(status) {
  switch (status) {
    case "received":
      return "bg-slate-100 text-slate-700 border border-slate-300";
    case "diagnosed":
      return "bg-blue-100 text-blue-700 border border-blue-300";
    case "repairing":
      return "bg-violet-100 text-violet-700 border border-violet-300";
    case "testing":
      return "bg-amber-100 text-amber-700 border border-amber-300";
    case "collection":
      return "bg-emerald-100 text-emerald-700 border border-emerald-300";
    default:
      return "bg-slate-100 text-slate-700 border border-slate-300";
  }
}
function RepairDetailsPage() {
  const {
    id
  } = Route$1.useParams();
  useNavigate();
  getStoredToken();
  const [repair, setRepair] = reactExports.useState(null);
  const [timeline, setTimeline] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [technicianNote, setTechnicianNote] = reactExports.useState("");
  const [internalComment, setInternalComment] = reactExports.useState("");
  const [showAddNote, setShowAddNote] = reactExports.useState(false);
  const [showAddComment, setShowAddComment] = reactExports.useState(false);
  reactExports.useEffect(() => {
    fetchRepairDetails();
    fetchTimeline();
  }, [id]);
  const fetchRepairDetails = async () => {
    try {
      const res = await fetch(buildUrl(`/repairs/${id}`), {
        headers: getAuthHeaders()
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setRepair(data.repair);
      }
    } catch (error) {
      console.error("Failed to fetch repair details:", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchTimeline = async () => {
    try {
      const res = await fetch(buildUrl(`/repairs/${id}/timeline`), {
        headers: getAuthHeaders()
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setTimeline(data.timeline || []);
      }
    } catch (error) {
      console.error("Failed to fetch timeline:", error);
    }
  };
  const handleAddTechnicianNote = async () => {
    if (!technicianNote.trim()) return;
    try {
      const res = await fetch(buildUrl(`/repairs/${id}/notes`), {
        method: "POST",
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          note: technicianNote,
          type: "technician"
        })
      });
      if (res.ok) {
        toast.success("Technician note added");
        setTechnicianNote("");
        setShowAddNote(false);
        fetchTimeline();
      }
    } catch (error) {
      toast.error("Failed to add note");
    }
  };
  const handleAddInternalComment = async () => {
    if (!internalComment.trim()) return;
    try {
      const res = await fetch(buildUrl(`/repairs/${id}/comments`), {
        method: "POST",
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          comment: internalComment
        })
      });
      if (res.ok) {
        toast.success("Internal comment added");
        setInternalComment("");
        setShowAddComment(false);
        fetchTimeline();
      }
    } catch (error) {
      toast.error("Failed to add comment");
    }
  };
  const handlePrintInvoice = () => {
    window.print();
  };
  const handlePrintReceipt = () => {
    window.print();
  };
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "mx-auto h-8 w-8 animate-spin text-violet-500" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-slate-600", children: "Loading repair details..." })
    ] }) });
  }
  if (!repair) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "mx-auto h-8 w-8 text-rose-500" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-slate-600", children: "Repair not found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "mt-4", children: "Back to Admin" }) })
    ] }) });
  }
  const costBreakdown = repair.cost_breakdown || {
    labor: 0,
    parts: 0,
    diagnostic: 0,
    tax: 0
  };
  const totalCost = costBreakdown.labor + costBreakdown.parts + costBreakdown.diagnostic + costBreakdown.tax;
  const depositPaid = repair.deposit_paid || 0;
  const remainingBalance = totalCost - depositPaid;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-slate-50 dark:bg-slate-950", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky top-0 z-10 border-b border-slate-200 border-[#1F2235] bg-[#11131E]/80 backdrop-blur-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-16 items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "mr-2 h-4 w-4" }),
          "Back"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-lg font-bold text-white", children: [
            "Repair #",
            repair.tracking_id
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500", children: repair.device_model })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: getStatusStyle(repair.status), children: repair.status === "collection" ? "Ready" : repair.status.charAt(0).toUpperCase() + repair.status.slice(1) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: handlePrintInvoice, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "mr-2 h-4 w-4" }),
          "Invoice"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: handlePrintReceipt, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Receipt, { className: "mr-2 h-4 w-4" }),
          "Receipt"
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 text-lg font-semibold text-white", children: "Repair Information" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 md:grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500", children: "Customer" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4 text-slate-400" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-white", children: repair.customer_name })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-center gap-2 text-sm text-slate-600", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-4 w-4" }),
                repair.customer_phone
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500", children: "Device" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-4 w-4 text-slate-400" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-white", children: repair.device_model })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-sm text-slate-600", children: repair.device_brand || "Unknown Brand" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500", children: "Issue Description" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-300", children: repair.issue_description || "No description provided" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500", children: "Created" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-slate-600", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4" }),
                new Date(repair.created_at).toLocaleDateString()
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-white", children: "Status Timeline" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "h-5 w-5 text-slate-400" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: timeline.length > 0 ? timeline.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
            opacity: 0,
            x: -20
          }, animate: {
            opacity: 1,
            x: 0
          }, transition: {
            delay: idx * 0.1
          }, className: "flex gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-3 w-3 rounded-full ${item.type === "status" ? "bg-violet-500" : item.type === "note" ? "bg-blue-500" : item.type === "comment" ? "bg-amber-500" : "bg-slate-500"}` }),
              idx < timeline.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-0.5 flex-1 bg-slate-200 dark:bg-slate-700" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 pb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-white", children: item.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-slate-500", children: [
                  new Date(item.created_at).toLocaleDateString(),
                  " ",
                  new Date(item.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                  })
                ] })
              ] }),
              item.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-slate-400", children: item.description }),
              item.user && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-xs text-slate-500", children: [
                "by ",
                item.user
              ] })
            ] })
          ] }, item.id)) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-sm text-slate-500", children: "No timeline events yet" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-white", children: "Technician Notes" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: () => setShowAddNote(!showAddNote), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "mr-2 h-4 w-4" }),
              "Add Note"
            ] })
          ] }),
          showAddNote && /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
            opacity: 0,
            height: 0
          }, animate: {
            opacity: 1,
            height: "auto"
          }, className: "mb-4 space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { placeholder: "Add a technician note...", value: technicianNote, onChange: (e) => setTechnicianNote(e.target.value), className: "min-h-[100px]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", onClick: () => setShowAddNote(false), children: "Cancel" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", onClick: handleAddTechnicianNote, children: "Save Note" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: repair.technician_notes && repair.technician_notes.length > 0 ? repair.technician_notes.map((note, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-slate-50 bg-[#1A1D27] p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-white", children: note.technician || "Unknown" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-slate-500", children: new Date(note.created_at).toLocaleDateString() })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-300", children: note.note })
          ] }, idx)) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-sm text-slate-500", children: "No technician notes yet" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-white", children: "Device Photos" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "h-5 w-5 text-slate-400" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-2 block text-sm font-medium text-slate-300", children: "Before Repair" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-video rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center bg-slate-50 bg-[#1A1D27]", children: repair.photo_before ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: repair.photo_before, alt: "Before", className: "h-full w-full object-cover rounded-lg" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "mx-auto h-8 w-8 text-slate-400" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-slate-500", children: "No photo uploaded" })
              ] }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-2 block text-sm font-medium text-slate-300", children: "After Repair" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-video rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center bg-slate-50 bg-[#1A1D27]", children: repair.photo_after ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: repair.photo_after, alt: "After", className: "h-full w-full object-cover rounded-lg" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "mx-auto h-8 w-8 text-slate-400" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-slate-500", children: "No photo uploaded" })
              ] }) })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mb-4 flex items-center gap-2 text-lg font-semibold text-white", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "h-5 w-5" }),
            "Cost Breakdown"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-600", children: "Labor" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
                "£",
                costBreakdown.labor.toFixed(2)
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-600", children: "Parts" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
                "£",
                costBreakdown.parts.toFixed(2)
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-600", children: "Diagnostic" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
                "£",
                costBreakdown.diagnostic.toFixed(2)
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-600", children: "Tax (20%)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
                "£",
                costBreakdown.tax.toFixed(2)
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-lg font-bold", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "£",
                totalCost.toFixed(2)
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mb-4 flex items-center gap-2 text-lg font-semibold text-white", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "h-5 w-5" }),
            "Payment Status"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-600", children: "Deposit Paid" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-emerald-600", children: [
                "£",
                depositPaid.toFixed(2)
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-600", children: "Remaining Balance" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `font-medium ${remainingBalance > 0 ? "text-amber-600" : "text-emerald-600"}`, children: [
                "£",
                remainingBalance.toFixed(2)
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-600", children: "Payment Status" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: remainingBalance === 0 ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700", children: remainingBalance === 0 ? "Paid" : "Partial" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(WarrantyManager, { repairId: repair.id, token: getStoredToken() || "" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(InvoiceGenerator, { repairId: repair.id, repair, token: getStoredToken() || "" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-white", children: "Internal Comments" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: () => setShowAddComment(!showAddComment), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "mr-2 h-4 w-4" }),
              "Add"
            ] })
          ] }),
          showAddComment && /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
            opacity: 0,
            height: 0
          }, animate: {
            opacity: 1,
            height: "auto"
          }, className: "mb-4 space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { placeholder: "Add an internal comment...", value: internalComment, onChange: (e) => setInternalComment(e.target.value), className: "min-h-[80px]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", onClick: () => setShowAddComment(false), children: "Cancel" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", onClick: handleAddInternalComment, children: "Add Comment" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: repair.internal_comments && repair.internal_comments.length > 0 ? repair.internal_comments.map((comment, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-amber-50 dark:bg-amber-950/20 p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-white text-sm", children: comment.user || "Unknown" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-slate-500", children: new Date(comment.created_at).toLocaleDateString() })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-300", children: comment.comment })
          ] }, idx)) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-sm text-slate-500", children: "No internal comments" }) })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  RepairDetailsPage as component
};
