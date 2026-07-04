import{c as R,r as c,j as e,C as p,B as l,v as d,t as se,q as S,a1 as fe,n as ve,a2 as je,K as be,L as Z,U as ge,s as Ne}from"./index-C02HbGOt.js";import{I as E}from"./input-C2Gz7trb.js";import{T as U}from"./textarea-mXO2u5gN.js";import{b as v,g as j,B as O,a as H,M as V}from"./api-9eyDLpdc.js";import{D as ye,H as we,a as ke}from"./history-pm7GGZyk.js";import{S as De,a as Se,b as Ce,c as _e,d as z}from"./select-Cvkt-4e5.js";import{S as Pe}from"./shield-BxtwedtW.js";import{C as ae}from"./calendar-B3Ln3-Om.js";import"./label-CnItg9nI.js";import{C as $e}from"./circle-alert-BBK1kDTu.js";import{A as Fe}from"./arrow-left-BhyO-vWS.js";import{P as X}from"./package-CiADoQvS.js";import{C as G}from"./camera-CYEH7jOD.js";import{C as Te}from"./credit-card-Bk4o4c-j.js";import"./chevron-down-DJ2LscB9.js";const Ae=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]],Ie=R("info",Ae);const ze=[["path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",key:"143wyd"}],["path",{d:"M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6",key:"1itne7"}],["rect",{x:"6",y:"14",width:"12",height:"8",rx:"1",key:"1ue0tg"}]],ie=R("printer",ze);const Ee=[["rect",{width:"5",height:"5",x:"3",y:"3",rx:"1",key:"1tu5fj"}],["rect",{width:"5",height:"5",x:"16",y:"3",rx:"1",key:"1v8r4q"}],["rect",{width:"5",height:"5",x:"3",y:"16",rx:"1",key:"1x03jg"}],["path",{d:"M21 16h-3a2 2 0 0 0-2 2v3",key:"177gqh"}],["path",{d:"M21 21v.01",key:"ents32"}],["path",{d:"M12 7v3a2 2 0 0 1-2 2H7",key:"8crl2c"}],["path",{d:"M3 12h.01",key:"nlz23k"}],["path",{d:"M12 3h.01",key:"n36tog"}],["path",{d:"M12 16v.01",key:"133mhm"}],["path",{d:"M16 12h1",key:"1slzba"}],["path",{d:"M21 12v.01",key:"1lwtk9"}],["path",{d:"M12 21v-1",key:"1880an"}]],Re=R("qr-code",Ee);const Le=[["path",{d:"M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z",key:"q3az6g"}],["path",{d:"M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8",key:"1h4pet"}],["path",{d:"M12 17.5v-11",key:"1jc1ny"}]],Me=R("receipt",Le);const Oe=[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]],ee=R("triangle-alert",Oe);function Be({repair:i,businessSettings:s}){const[m,h]=c.useState(!1),b=()=>`INV-${new Date().getFullYear()}-${String(i.id).padStart(4,"0")}`,g=()=>`https://fixora.com/track/${i.tracking_id}`,C=()=>{const x=window.open("","_blank");if(x){const n=k();x.document.write(n),x.document.close(),x.print()}},w=async()=>{h(!0);try{const x=window.open("","_blank");if(x){const n=k();x.document.write(n),x.document.close(),setTimeout(()=>{x.print(),h(!1)},500)}}catch{d.error("Failed to generate PDF"),h(!1)}},k=()=>{const x=b(),n=i.cost_breakdown||{labor:0,parts:0,diagnostic:0,tax:0},u=n.labor+n.parts+n.diagnostic+n.tax,D=i.deposit_paid||0,N=u-D;return`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Invoice ${x}</title>
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
            <div class="logo">${s.businessName||"Fixora Repair Shop"}</div>
            <div class="invoice-number">
              Invoice #<strong>${x}</strong>
            </div>
          </div>

          <div class="info-grid">
            <div>
              <div class="section-title">Bill To</div>
              <div class="info-item">
                <div class="info-value">${i.customer_name}</div>
              </div>
              <div class="info-item">
                <div class="info-value">${i.customer_phone}</div>
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
                <div class="info-value">${i.tracking_id}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Status</div>
                <div class="info-value">
                  <span class="status-badge ${N===0?"status-paid":N<u?"status-partial":"status-pending"}">
                    ${N===0?"PAID":N<u?"PARTIAL":"PENDING"}
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
                <div class="info-value">${i.device_model}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Brand</div>
                <div class="info-value">${i.device_brand||"N/A"}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Issue</div>
                <div class="info-value">${i.issue_description||"N/A"}</div>
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
                  <td class="amount">£${n.labor.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Parts & Components</td>
                  <td class="amount">£${n.parts.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Diagnostic Fee</td>
                  <td class="amount">£${n.diagnostic.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Tax (20%)</td>
                  <td class="amount">£${n.tax.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>

            <div class="total-section">
              <div class="total-table">
                <div class="total-row">
                  <span>Subtotal</span>
                  <span>£${(u-n.tax).toFixed(2)}</span>
                </div>
                <div class="total-row">
                  <span>Tax</span>
                  <span>£${n.tax.toFixed(2)}</span>
                </div>
                <div class="total-row">
                  <span>Deposit Paid</span>
                  <span>-£${D.toFixed(2)}</span>
                </div>
                <div class="total-row final">
                  <span>Total Due</span>
                  <span>£${N.toFixed(2)}</span>
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
                <div class="info-value">${s.bankAccount||"Contact for details"}</div>
              </div>
            </div>
          </div>

          <div class="qr-section">
            <div class="section-title">Track Your Repair</div>
            <div style="font-family: monospace; font-size: 10px; background: #f8fafc; padding: 10px; display: inline-block; border-radius: 4px;">
              ${g()}
            </div>
          </div>

          <div class="footer">
            <p>${s.businessName||"Fixora Repair Shop"}</p>
            <p>${s.address||"123 High Street, Nuneaton, CV11 6AA"}</p>
            <p>${s.phone||"+44 123 456 7890"} | ${s.email||"info@fixora.com"}</p>
            <p style="margin-top: 10px;">Thank you for your business!</p>
          </div>
        </div>
      </body>
      </html>
    `};return e.jsxs(p,{className:"p-6",children:[e.jsx("h3",{className:"mb-4 text-lg font-semibold text-white",children:"Invoice Actions"}),e.jsxs("div",{className:"flex gap-3",children:[e.jsxs(l,{variant:"outline",onClick:C,className:"flex-1",children:[e.jsx(ie,{className:"mr-2 h-4 w-4"}),"Print Invoice"]}),e.jsx(l,{variant:"outline",onClick:w,disabled:m,className:"flex-1",children:m?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"mr-2 h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-violet-600"}),"Generating..."]}):e.jsxs(e.Fragment,{children:[e.jsx(ye,{className:"mr-2 h-4 w-4"}),"Download PDF"]})})]}),e.jsxs("div",{className:"mt-4 flex items-center justify-center gap-2 text-sm text-slate-600",children:[e.jsx(Re,{className:"h-4 w-4"}),e.jsx("span",{children:"Includes QR code for repair tracking"})]})]})}function We({repairId:i,token:s}){const[m,h]=c.useState(null),[b,g]=c.useState([]),[C,w]=c.useState(!0),[k,x]=c.useState(!1),[n,u]=c.useState({duration:90,startDate:new Date().toISOString().split("T")[0],notes:""});c.useEffect(()=>{D(),N()},[i]);const D=async()=>{try{const a=await fetch(v(`/warranty/repairs/${i}`),{headers:j()}),r=await a.json();a.ok&&r.success&&(h(r.warranty),r.warranty&&u({duration:r.warranty.duration||90,startDate:r.warranty.start_date||new Date().toISOString().split("T")[0],notes:r.warranty.notes||""}))}catch(a){console.error("Failed to fetch warranty:",a)}finally{w(!1)}},N=async()=>{try{const a=await fetch(v(`/warranty/repairs/${i}/history`),{headers:j()}),r=await a.json();a.ok&&r.success&&g(r.history||[])}catch(a){console.error("Failed to fetch warranty history:",a)}},F=(a,r)=>{const y=new Date(a),$=new Date(y);return $.setDate($.getDate()+r),$},L=a=>{const r=new Date,y=Math.ceil((a.getTime()-r.getTime())/(1e3*60*60*24));return y<0?{status:"expired",color:"rose",text:"Expired"}:y<=30?{status:"expiring",color:"amber",text:"Expiring Soon"}:{status:"active",color:"emerald",text:"Active"}},A=async()=>{try{const a=F(n.startDate,n.duration);(await fetch(v(`/warranty/repairs/${i}`),{method:"POST",headers:{...j(),"Content-Type":"application/json"},body:JSON.stringify({duration:n.duration,start_date:n.startDate,expiration_date:a.toISOString().split("T")[0],notes:n.notes})})).ok?(d.success("Warranty updated successfully"),x(!1),D(),N()):d.error("Failed to update warranty")}catch{d.error("Failed to update warranty")}},T=async a=>{if(m)try{const r=new Date(m.expiration_date),y=new Date(r);y.setDate(y.getDate()+a),(await fetch(v(`/warranty/repairs/${i}/extend`),{method:"POST",headers:{...j(),"Content-Type":"application/json"},body:JSON.stringify({additional_days:a,new_expiration_date:y.toISOString().split("T")[0]})})).ok?(d.success(`Warranty extended by ${a} days`),D(),N()):d.error("Failed to extend warranty")}catch{d.error("Failed to extend warranty")}};if(C)return e.jsx(p,{className:"p-6",children:e.jsx("div",{className:"flex items-center justify-center py-8",children:e.jsx(se,{className:"h-6 w-6 animate-spin text-violet-500"})})});const _=m?new Date(m.expiration_date):F(n.startDate,n.duration),f=L(_),I=Math.ceil((_.getTime()-new Date().getTime())/(1e3*60*60*24));return e.jsxs(p,{className:"p-6",children:[e.jsxs("div",{className:"mb-6 flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("div",{className:`rounded-full p-2 bg-${f.color}-100`,children:e.jsx(Pe,{className:`h-5 w-5 text-${f.color}-600`})}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-semibold text-white",children:"Warranty Status"}),e.jsx(O,{className:`bg-${f.color}-100 text-${f.color}-700`,children:f.text})]})]}),!k&&e.jsx(l,{variant:"outline",size:"sm",onClick:()=>x(!0),children:"Edit Warranty"})]}),f.status==="expired"&&e.jsxs(S.div,{initial:{opacity:0,y:-8},animate:{opacity:1,y:0},className:"mb-6 flex items-center gap-3 rounded-lg border border-rose-200 bg-rose-50 p-4",children:[e.jsx(ee,{className:"h-5 w-5 text-rose-600"}),e.jsxs("div",{children:[e.jsx("p",{className:"font-medium text-rose-900",children:"Warranty Expired"}),e.jsxs("p",{className:"text-sm text-rose-700",children:["This warranty expired on ",_.toLocaleDateString()]})]})]}),f.status==="expiring"&&e.jsxs(S.div,{initial:{opacity:0,y:-8},animate:{opacity:1,y:0},className:"mb-6 flex items-center gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4",children:[e.jsx(ee,{className:"h-5 w-5 text-amber-600"}),e.jsxs("div",{children:[e.jsx("p",{className:"font-medium text-amber-900",children:"Warranty Expiring Soon"}),e.jsxs("p",{className:"text-sm text-amber-700",children:["This warranty will expire in ",I," days"]})]})]}),e.jsx("div",{className:"space-y-4",children:k?e.jsxs(S.div,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},className:"space-y-4",children:[e.jsxs("div",{className:"grid gap-4 md:grid-cols-2",children:[e.jsxs("div",{children:[e.jsx("label",{className:"mb-2 block text-sm font-medium text-slate-300",children:"Warranty Duration (days)"}),e.jsxs(De,{value:n.duration.toString(),onValueChange:a=>u({...n,duration:parseInt(a)}),children:[e.jsx(Se,{children:e.jsx(Ce,{})}),e.jsxs(_e,{children:[e.jsx(z,{value:"30",children:"30 Days"}),e.jsx(z,{value:"60",children:"60 Days"}),e.jsx(z,{value:"90",children:"90 Days"}),e.jsx(z,{value:"180",children:"180 Days"}),e.jsx(z,{value:"365",children:"1 Year"})]})]})]}),e.jsxs("div",{children:[e.jsx("label",{className:"mb-2 block text-sm font-medium text-slate-300",children:"Start Date"}),e.jsx(E,{type:"date",value:n.startDate,onChange:a=>u({...n,startDate:a.target.value})})]})]}),e.jsxs("div",{children:[e.jsx("label",{className:"mb-2 block text-sm font-medium text-slate-300",children:"Notes"}),e.jsx("textarea",{className:"w-full rounded-lg border border-[#1F2235] bg-[#1A1D27] p-3 text-sm",rows:3,value:n.notes,onChange:a=>u({...n,notes:a.target.value}),placeholder:"Add warranty notes or conditions..."})]}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx(l,{onClick:A,children:"Save Warranty"}),e.jsx(l,{variant:"outline",onClick:()=>x(!1),children:"Cancel"})]})]}):e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("span",{className:"text-sm text-slate-600",children:"Duration"}),e.jsxs("span",{className:"font-medium text-white",children:[m?.duration||n.duration," days"]})]}),e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("span",{className:"text-sm text-slate-600",children:"Start Date"}),e.jsx("span",{className:"font-medium text-white",children:m?.start_date?new Date(m.start_date).toLocaleDateString():new Date(n.startDate).toLocaleDateString()})]}),e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("span",{className:"text-sm text-slate-600",children:"Expiration Date"}),e.jsx("span",{className:`font-medium ${f.status==="expired"?"text-rose-600":f.status==="expiring"?"text-amber-600":"text-white"}`,children:_.toLocaleDateString()})]}),m?.notes&&e.jsxs("div",{className:"rounded-lg bg-[#1A1D27] p-3",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-2",children:[e.jsx(Ie,{className:"h-4 w-4 text-slate-500"}),e.jsx("span",{className:"text-sm font-medium text-slate-300",children:"Notes"})]}),e.jsx("p",{className:"text-sm text-slate-400",children:m.notes})]}),m&&f.status!=="expired"&&e.jsxs("div",{className:"pt-4 border-t border-[#1F2235]",children:[e.jsx("p",{className:"mb-3 text-sm font-medium text-slate-300",children:"Extend Warranty"}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx(l,{variant:"outline",size:"sm",onClick:()=>T(30),children:"+30 Days"}),e.jsx(l,{variant:"outline",size:"sm",onClick:()=>T(90),children:"+90 Days"}),e.jsx(l,{variant:"outline",size:"sm",onClick:()=>T(180),children:"+180 Days"})]})]})]})}),b.length>0&&e.jsxs("div",{className:"mt-6 pt-6 border-t border-[#1F2235]",children:[e.jsx("h4",{className:"mb-4 text-sm font-semibold text-white",children:"Warranty History"}),e.jsx("div",{className:"space-y-2",children:b.map((a,r)=>e.jsxs(S.div,{initial:{opacity:0,x:-12},animate:{opacity:1,x:0},transition:{delay:r*.05},className:"flex items-center justify-between rounded-lg bg-[#1A1D27] p-3",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx(ae,{className:"h-4 w-4 text-slate-400"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm font-medium text-white",children:a.action}),e.jsxs("p",{className:"text-xs text-slate-500",children:[new Date(a.created_at).toLocaleDateString()," ",new Date(a.created_at).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})]})]})]}),e.jsxs("span",{className:"text-xs text-slate-500",children:["by ",a.user||"System"]})]},a.id))})]})]})}var qe=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","select","span","svg","ul"],Ue=qe.reduce((i,s)=>{const m=fe(`Primitive.${s}`),h=c.forwardRef((b,g)=>{const{asChild:C,...w}=b,k=C?m:s;return typeof window<"u"&&(window[Symbol.for("radix-ui")]=!0),e.jsx(k,{...w,ref:g})});return h.displayName=`Primitive.${s}`,{...i,[s]:h}},{}),He="Separator",te="horizontal",Ve=["horizontal","vertical"],ne=c.forwardRef((i,s)=>{const{decorative:m,orientation:h=te,...b}=i,g=Ge(h)?h:te,w=m?{role:"none"}:{"aria-orientation":g==="vertical"?g:void 0,role:"separator"};return e.jsx(Ue.div,{"data-orientation":g,...w,...b,ref:s})});ne.displayName=He;function Ge(i){return Ve.includes(i)}var re=ne;const le=c.forwardRef(({className:i,orientation:s="horizontal",decorative:m=!0,...h},b)=>e.jsx(re,{ref:b,decorative:m,orientation:s,className:ve("shrink-0 bg-border",s==="horizontal"?"h-[1px] w-full":"h-full w-[1px]",i),...h}));le.displayName=re.displayName;function Je(i){switch(i){case"received":return"bg-slate-100 text-slate-700 border border-slate-300";case"diagnosed":return"bg-blue-100 text-blue-700 border border-blue-300";case"repairing":return"bg-violet-100 text-violet-700 border border-violet-300";case"testing":return"bg-amber-100 text-amber-700 border border-amber-300";case"collection":return"bg-emerald-100 text-emerald-700 border border-emerald-300";default:return"bg-slate-100 text-slate-700 border border-slate-300"}}function dt(){const{id:i}=je.useParams();be(),H();const[s,m]=c.useState(null),[h,b]=c.useState([]),[g,C]=c.useState([]),[w,k]=c.useState(!0),[x,n]=c.useState(""),[u,D]=c.useState(""),[N,F]=c.useState(!1),[L,A]=c.useState(!1),[T,_]=c.useState(!1),[f,I]=c.useState(!1),[a,r]=c.useState({part_name:"",quantity:1,unit_cost:"",notes:""}),[y,$]=c.useState(""),[J,oe]=c.useState([]);c.useEffect(()=>{B(),W(),q(),Q()},[i]);const B=async()=>{try{const t=await fetch(v(`/repairs/${i}`),{headers:j()}),o=await t.json();t.ok&&o.success&&m(o.repair)}catch(t){console.error("Failed to fetch repair details:",t)}finally{k(!1)}},W=async()=>{try{const t=await fetch(v(`/repairs/${i}/timeline`),{headers:j()}),o=await t.json();t.ok&&o.success&&b(o.timeline||[])}catch(t){console.error("Failed to fetch timeline:",t)}},q=async()=>{try{const t=await fetch(v(`/repairs/${i}/parts`),{headers:j()}),o=await t.json();t.ok&&o.success&&C(o.parts||[])}catch(t){console.error("Failed to fetch repair parts:",t)}},Q=async()=>{if(s?.customer_phone)try{const t=await fetch(v(`/customers/phone/${s.customer_phone}/notes`),{headers:j()}),o=await t.json();t.ok&&o.success&&oe(o.notes||[])}catch(t){console.error("Failed to fetch customer notes:",t)}},ce=async()=>{if(!y.trim()||!s?.customer_phone){d.error("Please enter a note");return}try{(await fetch(v(`/customers/${s.customer_phone}/notes`),{method:"POST",headers:{...j(),"Content-Type":"application/json"},body:JSON.stringify({note:y})})).ok?(d.success("Customer note added"),$(""),I(!1),Q()):d.error("Failed to add customer note")}catch{d.error("Failed to add customer note")}},de=async()=>{if(x.trim())try{(await fetch(v(`/repairs/${i}/notes`),{method:"POST",headers:{...j(),"Content-Type":"application/json"},body:JSON.stringify({note:x,type:"technician"})})).ok&&(d.success("Technician note added"),n(""),F(!1),W())}catch{d.error("Failed to add note")}},me=async()=>{if(u.trim())try{(await fetch(v(`/repairs/${i}/comments`),{method:"POST",headers:{...j(),"Content-Type":"application/json"},body:JSON.stringify({comment:u})})).ok&&(d.success("Internal comment added"),D(""),A(!1),W())}catch{d.error("Failed to add comment")}},xe=async()=>{if(!a.part_name.trim()){d.error("Please enter a part name");return}try{const t=await fetch(v(`/repairs/${i}/parts`),{method:"POST",headers:{...j(),"Content-Type":"application/json"},body:JSON.stringify({part_name:a.part_name,quantity:a.quantity,unit_cost:a.unit_cost?parseFloat(a.unit_cost):null,notes:a.notes})});if(t.ok)d.success("Part added successfully"),r({part_name:"",quantity:1,unit_cost:"",notes:""}),_(!1),q(),B();else{const o=await t.json();d.error(o.detail||"Failed to add part")}}catch{d.error("Failed to add part")}},he=async t=>{try{(await fetch(v(`/repairs/${i}/parts/${t}`),{method:"DELETE",headers:j()})).ok?(d.success("Part removed successfully"),q(),B()):d.error("Failed to remove part")}catch{d.error("Failed to remove part")}},pe=()=>{window.print()},ue=()=>{window.print()};if(w)return e.jsx("div",{className:"flex min-h-screen items-center justify-center",children:e.jsxs("div",{className:"text-center",children:[e.jsx(se,{className:"mx-auto h-8 w-8 animate-spin text-violet-500"}),e.jsx("p",{className:"mt-2 text-slate-600",children:"Loading repair details..."})]})});if(!s)return e.jsx("div",{className:"flex min-h-screen items-center justify-center",children:e.jsxs("div",{className:"text-center",children:[e.jsx($e,{className:"mx-auto h-8 w-8 text-rose-500"}),e.jsx("p",{className:"mt-2 text-slate-600",children:"Repair not found"}),e.jsx(Z,{to:"/admin",children:e.jsx(l,{className:"mt-4",children:"Back to Admin"})})]})});const P=s.cost_breakdown||{labor:0,parts:0,diagnostic:0,tax:0},Y=P.labor+P.parts+P.diagnostic+P.tax,K=s.deposit_paid||0,M=Y-K;return e.jsxs("div",{className:"min-h-screen bg-slate-50 dark:bg-slate-950",children:[e.jsx("div",{className:"sticky top-0 z-10 border-b border-slate-200 border-[#1F2235] bg-[#11131E]/80 backdrop-blur-xl",children:e.jsx("div",{className:"mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",children:e.jsxs("div",{className:"flex h-16 items-center justify-between",children:[e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(Z,{to:"/admin",children:e.jsxs(l,{variant:"ghost",size:"sm",children:[e.jsx(Fe,{className:"mr-2 h-4 w-4"}),"Back"]})}),e.jsxs("div",{children:[e.jsxs("h1",{className:"text-lg font-bold text-white",children:["Repair #",s.tracking_id]}),e.jsx("p",{className:"text-xs text-slate-500",children:s.device_model})]})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(O,{className:Je(s.status),children:s.status==="collection"?"Ready":s.status.charAt(0).toUpperCase()+s.status.slice(1)}),e.jsxs(l,{variant:"outline",size:"sm",onClick:pe,children:[e.jsx(ie,{className:"mr-2 h-4 w-4"}),"Invoice"]}),e.jsxs(l,{variant:"outline",size:"sm",onClick:ue,children:[e.jsx(Me,{className:"mr-2 h-4 w-4"}),"Receipt"]})]})]})})}),e.jsx("div",{className:"mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8",children:e.jsxs("div",{className:"grid gap-6 lg:grid-cols-3",children:[e.jsxs("div",{className:"lg:col-span-2 space-y-6",children:[e.jsxs(p,{className:"p-6",children:[e.jsx("h2",{className:"mb-4 text-lg font-semibold text-white",children:"Repair Information"}),e.jsxs("div",{className:"grid gap-6 md:grid-cols-2",children:[e.jsxs("div",{children:[e.jsx("label",{className:"mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500",children:"Customer"}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(ge,{className:"h-4 w-4 text-slate-400"}),e.jsx("span",{className:"font-medium text-white",children:s.customer_name})]}),e.jsxs("div",{className:"mt-1 flex items-center gap-2 text-sm text-slate-600",children:[e.jsx(Ne,{className:"h-4 w-4"}),s.customer_phone]})]}),e.jsxs("div",{children:[e.jsx("label",{className:"mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500",children:"Device"}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(X,{className:"h-4 w-4 text-slate-400"}),e.jsx("span",{className:"font-medium text-white",children:s.device_model})]}),e.jsx("div",{className:"mt-1 text-sm text-slate-600",children:s.device_brand||"Unknown Brand"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500",children:"Issue Description"}),e.jsx("p",{className:"text-sm text-slate-300",children:s.issue_description||"No description provided"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500",children:"Created"}),e.jsxs("div",{className:"flex items-center gap-2 text-sm text-slate-600",children:[e.jsx(ae,{className:"h-4 w-4"}),new Date(s.created_at).toLocaleDateString()]})]})]})]}),e.jsxs(p,{className:"p-6",children:[e.jsxs("div",{className:"mb-4 flex items-center justify-between",children:[e.jsx("h2",{className:"text-lg font-semibold text-white",children:"Customer Notes"}),e.jsxs(l,{variant:"outline",size:"sm",onClick:()=>I(!f),children:[e.jsx(V,{className:"mr-2 h-4 w-4"}),"Add Note"]})]}),f&&e.jsxs(S.div,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},className:"mb-4 space-y-3",children:[e.jsx(U,{placeholder:"Add a customer note (visible to all staff for this customer)...",value:y,onChange:t=>$(t.target.value),className:"min-h-[80px]"}),e.jsxs("div",{className:"flex justify-end gap-2",children:[e.jsx(l,{variant:"outline",size:"sm",onClick:()=>I(!1),children:"Cancel"}),e.jsx(l,{size:"sm",onClick:ce,children:"Save Note"})]})]}),e.jsx("div",{className:"space-y-3",children:J.length>0?J.map((t,o)=>e.jsxs("div",{className:"rounded-lg bg-blue-50 dark:bg-blue-950/20 p-3",children:[e.jsxs("div",{className:"flex items-center justify-between mb-1",children:[e.jsx("span",{className:"font-medium text-white text-sm",children:t.user||"Unknown"}),e.jsx("span",{className:"text-xs text-slate-500",children:new Date(t.created_at).toLocaleDateString()})]}),e.jsx("p",{className:"text-sm text-slate-300",children:t.note})]},o)):e.jsx("p",{className:"text-center text-sm text-slate-500",children:"No customer notes yet"})})]}),e.jsxs(p,{className:"p-6",children:[e.jsxs("div",{className:"mb-4 flex items-center justify-between",children:[e.jsx("h2",{className:"text-lg font-semibold text-white",children:"Status Timeline"}),e.jsx(we,{className:"h-5 w-5 text-slate-400"})]}),e.jsx("div",{className:"space-y-4",children:h.length>0?h.map((t,o)=>e.jsxs(S.div,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:o*.1},className:"flex gap-4",children:[e.jsxs("div",{className:"flex flex-col items-center",children:[e.jsx("div",{className:`h-3 w-3 rounded-full ${t.type==="status"?"bg-violet-500":t.type==="note"?"bg-blue-500":t.type==="comment"?"bg-amber-500":"bg-slate-500"}`}),o<h.length-1&&e.jsx("div",{className:"w-0.5 flex-1 bg-slate-200 dark:bg-slate-700"})]}),e.jsxs("div",{className:"flex-1 pb-4",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("span",{className:"font-medium text-white",children:t.title}),e.jsxs("span",{className:"text-xs text-slate-500",children:[new Date(t.created_at).toLocaleDateString()," ",new Date(t.created_at).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})]})]}),t.description&&e.jsx("p",{className:"mt-1 text-sm text-slate-400",children:t.description}),t.user&&e.jsxs("p",{className:"mt-1 text-xs text-slate-500",children:["by ",t.user]})]})]},t.id)):e.jsx("p",{className:"text-center text-sm text-slate-500",children:"No timeline events yet"})})]}),e.jsxs(p,{className:"p-6",children:[e.jsxs("div",{className:"mb-4 flex items-center justify-between",children:[e.jsx("h2",{className:"text-lg font-semibold text-white",children:"Technician Notes"}),e.jsxs(l,{variant:"outline",size:"sm",onClick:()=>F(!N),children:[e.jsx(V,{className:"mr-2 h-4 w-4"}),"Add Note"]})]}),N&&e.jsxs(S.div,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},className:"mb-4 space-y-3",children:[e.jsx(U,{placeholder:"Add a technician note...",value:x,onChange:t=>n(t.target.value),className:"min-h-[100px]"}),e.jsxs("div",{className:"flex justify-end gap-2",children:[e.jsx(l,{variant:"outline",size:"sm",onClick:()=>F(!1),children:"Cancel"}),e.jsx(l,{size:"sm",onClick:de,children:"Save Note"})]})]}),e.jsx("div",{className:"space-y-3",children:s.technician_notes&&s.technician_notes.length>0?s.technician_notes.map((t,o)=>e.jsxs("div",{className:"rounded-lg bg-slate-50 bg-[#1A1D27] p-4",children:[e.jsxs("div",{className:"flex items-center justify-between mb-2",children:[e.jsx("span",{className:"font-medium text-white",children:t.technician||"Unknown"}),e.jsx("span",{className:"text-xs text-slate-500",children:new Date(t.created_at).toLocaleDateString()})]}),e.jsx("p",{className:"text-sm text-slate-300",children:t.note})]},o)):e.jsx("p",{className:"text-center text-sm text-slate-500",children:"No technician notes yet"})})]}),e.jsxs(p,{className:"p-6",children:[e.jsxs("div",{className:"mb-4 flex items-center justify-between",children:[e.jsx("h2",{className:"text-lg font-semibold text-white",children:"Parts Used"}),e.jsxs(l,{variant:"outline",size:"sm",onClick:()=>_(!T),children:[e.jsx(X,{className:"mr-2 h-4 w-4"}),"Add Part"]})]}),T&&e.jsxs(S.div,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},className:"mb-4 space-y-3 rounded-lg bg-[#1A1D27] p-4",children:[e.jsxs("div",{className:"grid gap-3 md:grid-cols-2",children:[e.jsxs("div",{children:[e.jsx("label",{className:"mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500",children:"Part Name"}),e.jsx(E,{placeholder:"e.g., iPhone 14 Screen",value:a.part_name,onChange:t=>r({...a,part_name:t.target.value}),className:"border-[#1F2235] bg-[#11131E]"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500",children:"Quantity"}),e.jsx(E,{type:"number",min:"1",value:a.quantity,onChange:t=>r({...a,quantity:parseInt(t.target.value)||1}),className:"border-[#1F2235] bg-[#11131E]"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500",children:"Unit Cost (£)"}),e.jsx(E,{type:"number",step:"0.01",placeholder:"0.00",value:a.unit_cost,onChange:t=>r({...a,unit_cost:t.target.value}),className:"border-[#1F2235] bg-[#11131E]"})]})]}),e.jsxs("div",{children:[e.jsx("label",{className:"mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500",children:"Notes"}),e.jsx(E,{placeholder:"Optional notes...",value:a.notes,onChange:t=>r({...a,notes:t.target.value}),className:"border-[#1F2235] bg-[#11131E]"})]}),e.jsxs("div",{className:"flex justify-end gap-2",children:[e.jsx(l,{variant:"outline",size:"sm",onClick:()=>_(!1),children:"Cancel"}),e.jsx(l,{size:"sm",onClick:xe,children:"Add Part"})]})]}),e.jsx("div",{className:"space-y-3",children:g.length>0?g.map(t=>e.jsxs("div",{className:"flex items-center justify-between rounded-lg border border-[#1F2235] p-4",children:[e.jsxs("div",{className:"flex-1",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("span",{className:"font-medium text-white",children:t.part_name}),e.jsxs(O,{variant:"outline",className:"text-xs",children:["Qty: ",t.quantity]})]}),e.jsxs("div",{className:"mt-1 text-sm text-slate-600",children:["£",t.unit_cost?.toFixed(2)||"0.00"," each × ",t.quantity," = ",e.jsxs("span",{className:"font-semibold text-white",children:["£",t.total_cost?.toFixed(2)||"0.00"]})]}),t.notes&&e.jsx("p",{className:"mt-1 text-xs text-slate-500",children:t.notes})]}),e.jsx(l,{variant:"ghost",size:"sm",onClick:()=>he(t.id),children:e.jsx(Trash2,{className:"h-4 w-4 text-rose-600"})})]},t.id)):e.jsx("p",{className:"text-center text-sm text-slate-500",children:"No parts added yet"})})]}),e.jsxs(p,{className:"p-6",children:[e.jsxs("div",{className:"mb-4 flex items-center justify-between",children:[e.jsx("h2",{className:"text-lg font-semibold text-white",children:"Device Photos"}),e.jsx(G,{className:"h-5 w-5 text-slate-400"})]}),e.jsxs("div",{className:"grid gap-4 md:grid-cols-2",children:[e.jsxs("div",{children:[e.jsx("label",{className:"mb-2 block text-sm font-medium text-slate-300",children:"Before Repair"}),e.jsx("div",{className:"aspect-video rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center bg-slate-50 bg-[#1A1D27]",children:s.photo_before?e.jsx("img",{src:s.photo_before,alt:"Before",className:"h-full w-full object-cover rounded-lg"}):e.jsxs("div",{className:"text-center",children:[e.jsx(G,{className:"mx-auto h-8 w-8 text-slate-400"}),e.jsx("p",{className:"mt-2 text-sm text-slate-500",children:"No photo uploaded"})]})})]}),e.jsxs("div",{children:[e.jsx("label",{className:"mb-2 block text-sm font-medium text-slate-300",children:"After Repair"}),e.jsx("div",{className:"aspect-video rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center bg-slate-50 bg-[#1A1D27]",children:s.photo_after?e.jsx("img",{src:s.photo_after,alt:"After",className:"h-full w-full object-cover rounded-lg"}):e.jsxs("div",{className:"text-center",children:[e.jsx(G,{className:"mx-auto h-8 w-8 text-slate-400"}),e.jsx("p",{className:"mt-2 text-sm text-slate-500",children:"No photo uploaded"})]})})]})]})]})]}),e.jsxs("div",{className:"space-y-6",children:[e.jsxs(p,{className:"p-6",children:[e.jsxs("h2",{className:"mb-4 flex items-center gap-2 text-lg font-semibold text-white",children:[e.jsx(ke,{className:"h-5 w-5"}),"Cost Breakdown"]}),e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"text-slate-600",children:"Labor"}),e.jsxs("span",{className:"font-medium",children:["£",P.labor.toFixed(2)]})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"text-slate-600",children:"Parts"}),e.jsxs("span",{className:"font-medium",children:["£",P.parts.toFixed(2)]})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"text-slate-600",children:"Diagnostic"}),e.jsxs("span",{className:"font-medium",children:["£",P.diagnostic.toFixed(2)]})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"text-slate-600",children:"Tax (20%)"}),e.jsxs("span",{className:"font-medium",children:["£",P.tax.toFixed(2)]})]}),e.jsx(le,{}),e.jsxs("div",{className:"flex justify-between text-lg font-bold",children:[e.jsx("span",{children:"Total"}),e.jsxs("span",{children:["£",Y.toFixed(2)]})]})]})]}),e.jsxs(p,{className:"p-6",children:[e.jsxs("h2",{className:"mb-4 flex items-center gap-2 text-lg font-semibold text-white",children:[e.jsx(Te,{className:"h-5 w-5"}),"Payment Status"]}),e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"text-slate-600",children:"Deposit Paid"}),e.jsxs("span",{className:"font-medium text-emerald-600",children:["£",K.toFixed(2)]})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"text-slate-600",children:"Remaining Balance"}),e.jsxs("span",{className:`font-medium ${M>0?"text-amber-600":"text-emerald-600"}`,children:["£",M.toFixed(2)]})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"text-slate-600",children:"Payment Status"}),e.jsx(O,{className:M===0?"bg-emerald-100 text-emerald-700":"bg-amber-100 text-amber-700",children:M===0?"Paid":"Partial"})]})]})]}),e.jsx(p,{className:"p-6",children:e.jsx(We,{repairId:s.id,token:H()||""})}),e.jsx(p,{className:"p-6",children:e.jsx(Be,{repairId:s.id,repair:s,token:H()||""})}),e.jsxs(p,{className:"p-6",children:[e.jsxs("div",{className:"mb-4 flex items-center justify-between",children:[e.jsx("h2",{className:"text-lg font-semibold text-white",children:"Internal Comments"}),e.jsxs(l,{variant:"outline",size:"sm",onClick:()=>A(!L),children:[e.jsx(V,{className:"mr-2 h-4 w-4"}),"Add"]})]}),L&&e.jsxs(S.div,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},className:"mb-4 space-y-3",children:[e.jsx(U,{placeholder:"Add an internal comment...",value:u,onChange:t=>D(t.target.value),className:"min-h-[80px]"}),e.jsxs("div",{className:"flex justify-end gap-2",children:[e.jsx(l,{variant:"outline",size:"sm",onClick:()=>A(!1),children:"Cancel"}),e.jsx(l,{size:"sm",onClick:me,children:"Add Comment"})]})]}),e.jsx("div",{className:"space-y-3",children:s.internal_comments&&s.internal_comments.length>0?s.internal_comments.map((t,o)=>e.jsxs("div",{className:"rounded-lg bg-amber-50 dark:bg-amber-950/20 p-3",children:[e.jsxs("div",{className:"flex items-center justify-between mb-1",children:[e.jsx("span",{className:"font-medium text-white text-sm",children:t.user||"Unknown"}),e.jsx("span",{className:"text-xs text-slate-500",children:new Date(t.created_at).toLocaleDateString()})]}),e.jsx("p",{className:"text-sm text-slate-300",children:t.comment})]},o)):e.jsx("p",{className:"text-center text-sm text-slate-500",children:"No internal comments"})})]})]})]})})]})}export{dt as component};
