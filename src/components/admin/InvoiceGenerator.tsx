import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Printer, Download, QrCode, FileText } from "lucide-react";
import { toast } from "sonner";

interface InvoiceGeneratorProps {
  repair: any;
  businessSettings: any;
}

export function InvoiceGenerator({ repair, businessSettings }: InvoiceGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateInvoiceNumber = () => {
    return `INV-${new Date().getFullYear()}-${String(repair.id).padStart(4, '0')}`;
  };

  const generateQRCode = () => {
    // In a real implementation, you'd use a QR code library like qrcode.react
    // For now, we'll return a placeholder
    return `https://fixora.com/track/${repair.tracking_id}`;
  };

  const handlePrintInvoice = () => {
    const printWindow = window.open('', '_blank');
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
      // In a real implementation, you'd use jsPDF or react-pdf
      // For now, we'll use the browser's print to PDF capability
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        const invoiceContent = generateInvoiceHTML();
        printWindow.document.write(invoiceContent);
        printWindow.document.close();
        
        // Wait for the content to load then trigger print
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
      tax: 0,
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
            <div class="logo">${businessSettings.businessName || 'Fixora Repair Shop'}</div>
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
                <div class="info-value">${new Date().toLocaleDateString()}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Repair ID</div>
                <div class="info-value">${repair.tracking_id}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Status</div>
                <div class="info-value">
                  <span class="status-badge ${remainingBalance === 0 ? 'status-paid' : remainingBalance < totalCost ? 'status-partial' : 'status-pending'}">
                    ${remainingBalance === 0 ? 'PAID' : remainingBalance < totalCost ? 'PARTIAL' : 'PENDING'}
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
                <div class="info-value">${repair.device_brand || 'N/A'}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Issue</div>
                <div class="info-value">${repair.issue_description || 'N/A'}</div>
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
                <div class="info-value">${businessSettings.bankAccount || 'Contact for details'}</div>
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
            <p>${businessSettings.businessName || 'Fixora Repair Shop'}</p>
            <p>${businessSettings.address || '123 High Street, Nuneaton, CV11 6AA'}</p>
            <p>${businessSettings.phone || '+44 123 456 7890'} | ${businessSettings.email || 'info@fixora.com'}</p>
            <p style="margin-top: 10px;">Thank you for your business!</p>
          </div>
        </div>
      </body>
      </html>
    `;
  };

  return (
    <Card className="p-6">
      <h3 className="mb-4 text-lg font-semibold text-white">Invoice Actions</h3>
      <div className="flex gap-3">
        <Button 
          variant="outline" 
          onClick={handlePrintInvoice}
          className="flex-1"
        >
          <Printer className="mr-2 h-4 w-4" />
          Print Invoice
        </Button>
        <Button 
          variant="outline" 
          onClick={handleDownloadPDF}
          disabled={isGenerating}
          className="flex-1"
        >
          {isGenerating ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-violet-600" />
              Generating...
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </>
          )}
        </Button>
      </div>
      <div className="mt-4 flex items-center justify-center gap-2 text-sm text-slate-600">
        <QrCode className="h-4 w-4" />
        <span>Includes QR code for repair tracking</span>
      </div>
    </Card>
  );
}
