import{c as I,r as d,j as e,C as v,B as c,v as N,t as q,q as _,a1 as K,n as Z,a2 as X,K as ee,L as O,U as te,s as se}from"./index-RnBp9G69.js";import{T as B}from"./textarea-C10J7Rko.js";import{b as S,g as C,B as L,a as E,M as W}from"./api-Hca_5gzB.js";import{D as ae,H as ie,a as ne}from"./history-DpyIHvLz.js";import{I as re}from"./input-1Bsa8TjB.js";import{S as le,a as oe,b as ce,c as de,d as P}from"./select-Bbg8WgBs.js";import{S as me}from"./shield-Dt1VGDdX.js";import{C as V}from"./calendar-CWfvP-3b.js";import"./label-Dr6R_1Ck.js";import{C as xe}from"./circle-alert-D4hv1heN.js";import{A as he}from"./arrow-left-NNZOjOOZ.js";import{P as pe}from"./package-D4q1EWON.js";import{C as M}from"./camera-r52u8Lje.js";import{C as fe}from"./credit-card-1HmhiHaa.js";import"./chevron-down-_lxgoz_Q.js";const ue=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]],ve=I("info",ue);const je=[["path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",key:"143wyd"}],["path",{d:"M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6",key:"1itne7"}],["rect",{x:"6",y:"14",width:"12",height:"8",rx:"1",key:"1ue0tg"}]],G=I("printer",je);const be=[["rect",{width:"5",height:"5",x:"3",y:"3",rx:"1",key:"1tu5fj"}],["rect",{width:"5",height:"5",x:"16",y:"3",rx:"1",key:"1v8r4q"}],["rect",{width:"5",height:"5",x:"3",y:"16",rx:"1",key:"1x03jg"}],["path",{d:"M21 16h-3a2 2 0 0 0-2 2v3",key:"177gqh"}],["path",{d:"M21 21v.01",key:"ents32"}],["path",{d:"M12 7v3a2 2 0 0 1-2 2H7",key:"8crl2c"}],["path",{d:"M3 12h.01",key:"nlz23k"}],["path",{d:"M12 3h.01",key:"n36tog"}],["path",{d:"M12 16v.01",key:"133mhm"}],["path",{d:"M16 12h1",key:"1slzba"}],["path",{d:"M21 12v.01",key:"1lwtk9"}],["path",{d:"M12 21v-1",key:"1880an"}]],ge=I("qr-code",be);const Ne=[["path",{d:"M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z",key:"q3az6g"}],["path",{d:"M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8",key:"1h4pet"}],["path",{d:"M12 17.5v-11",key:"1jc1ny"}]],ye=I("receipt",Ne);const we=[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]],H=I("triangle-alert",we);function ke({repair:n,businessSettings:t}){const[l,m]=d.useState(!1),x=()=>`INV-${new Date().getFullYear()}-${String(n.id).padStart(4,"0")}`,j=()=>`https://fixora.com/track/${n.tracking_id}`,D=()=>{const o=window.open("","_blank");if(o){const i=y();o.document.write(i),o.document.close(),o.print()}},b=async()=>{m(!0);try{const o=window.open("","_blank");if(o){const i=y();o.document.write(i),o.document.close(),setTimeout(()=>{o.print(),m(!1)},500)}}catch{N.error("Failed to generate PDF"),m(!1)}},y=()=>{const o=x(),i=n.cost_breakdown||{labor:0,parts:0,diagnostic:0,tax:0},h=i.labor+i.parts+i.diagnostic+i.tax,w=n.deposit_paid||0,p=h-w;return`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Invoice ${o}</title>
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
            <div class="logo">${t.businessName||"Fixora Repair Shop"}</div>
            <div class="invoice-number">
              Invoice #<strong>${o}</strong>
            </div>
          </div>

          <div class="info-grid">
            <div>
              <div class="section-title">Bill To</div>
              <div class="info-item">
                <div class="info-value">${n.customer_name}</div>
              </div>
              <div class="info-item">
                <div class="info-value">${n.customer_phone}</div>
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
                <div class="info-value">${n.tracking_id}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Status</div>
                <div class="info-value">
                  <span class="status-badge ${p===0?"status-paid":p<h?"status-partial":"status-pending"}">
                    ${p===0?"PAID":p<h?"PARTIAL":"PENDING"}
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
                <div class="info-value">${n.device_model}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Brand</div>
                <div class="info-value">${n.device_brand||"N/A"}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Issue</div>
                <div class="info-value">${n.issue_description||"N/A"}</div>
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
                  <td class="amount">£${i.labor.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Parts & Components</td>
                  <td class="amount">£${i.parts.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Diagnostic Fee</td>
                  <td class="amount">£${i.diagnostic.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Tax (20%)</td>
                  <td class="amount">£${i.tax.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>

            <div class="total-section">
              <div class="total-table">
                <div class="total-row">
                  <span>Subtotal</span>
                  <span>£${(h-i.tax).toFixed(2)}</span>
                </div>
                <div class="total-row">
                  <span>Tax</span>
                  <span>£${i.tax.toFixed(2)}</span>
                </div>
                <div class="total-row">
                  <span>Deposit Paid</span>
                  <span>-£${w.toFixed(2)}</span>
                </div>
                <div class="total-row final">
                  <span>Total Due</span>
                  <span>£${p.toFixed(2)}</span>
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
                <div class="info-value">${t.bankAccount||"Contact for details"}</div>
              </div>
            </div>
          </div>

          <div class="qr-section">
            <div class="section-title">Track Your Repair</div>
            <div style="font-family: monospace; font-size: 10px; background: #f8fafc; padding: 10px; display: inline-block; border-radius: 4px;">
              ${j()}
            </div>
          </div>

          <div class="footer">
            <p>${t.businessName||"Fixora Repair Shop"}</p>
            <p>${t.address||"123 High Street, Nuneaton, CV11 6AA"}</p>
            <p>${t.phone||"+44 123 456 7890"} | ${t.email||"info@fixora.com"}</p>
            <p style="margin-top: 10px;">Thank you for your business!</p>
          </div>
        </div>
      </body>
      </html>
    `};return e.jsxs(v,{className:"p-6",children:[e.jsx("h3",{className:"mb-4 text-lg font-semibold text-white",children:"Invoice Actions"}),e.jsxs("div",{className:"flex gap-3",children:[e.jsxs(c,{variant:"outline",onClick:D,className:"flex-1",children:[e.jsx(G,{className:"mr-2 h-4 w-4"}),"Print Invoice"]}),e.jsx(c,{variant:"outline",onClick:b,disabled:l,className:"flex-1",children:l?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"mr-2 h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-violet-600"}),"Generating..."]}):e.jsxs(e.Fragment,{children:[e.jsx(ae,{className:"mr-2 h-4 w-4"}),"Download PDF"]})})]}),e.jsxs("div",{className:"mt-4 flex items-center justify-center gap-2 text-sm text-slate-600",children:[e.jsx(ge,{className:"h-4 w-4"}),e.jsx("span",{children:"Includes QR code for repair tracking"})]})]})}function De({repairId:n,token:t}){const[l,m]=d.useState(null),[x,j]=d.useState([]),[D,b]=d.useState(!0),[y,o]=d.useState(!1),[i,h]=d.useState({duration:90,startDate:new Date().toISOString().split("T")[0],notes:""});d.useEffect(()=>{w(),p()},[n]);const w=async()=>{try{const s=await fetch(S(`/repairs/${n}/warranty`),{headers:C()}),r=await s.json();s.ok&&r.success&&(m(r.warranty),r.warranty&&h({duration:r.warranty.duration||90,startDate:r.warranty.start_date||new Date().toISOString().split("T")[0],notes:r.warranty.notes||""}))}catch(s){console.error("Failed to fetch warranty:",s)}finally{b(!1)}},p=async()=>{try{const s=await fetch(S(`/repairs/${n}/warranty/history`),{headers:C()}),r=await s.json();s.ok&&r.success&&j(r.history||[])}catch(s){console.error("Failed to fetch warranty history:",s)}},$=(s,r)=>{const g=new Date(s),k=new Date(g);return k.setDate(k.getDate()+r),k},z=s=>{const r=new Date,g=Math.ceil((s.getTime()-r.getTime())/(1e3*60*60*24));return g<0?{status:"expired",color:"rose",text:"Expired"}:g<=30?{status:"expiring",color:"amber",text:"Expiring Soon"}:{status:"active",color:"emerald",text:"Active"}},A=async()=>{try{const s=$(i.startDate,i.duration);(await fetch(S(`/repairs/${n}/warranty`),{method:"POST",headers:{...C(),"Content-Type":"application/json"},body:JSON.stringify({duration:i.duration,start_date:i.startDate,expiration_date:s.toISOString(),notes:i.notes})})).ok?(N.success("Warranty updated successfully"),o(!1),w(),p()):N.error("Failed to update warranty")}catch{N.error("Failed to update warranty")}},F=async s=>{if(l)try{const r=new Date(l.expiration_date),g=new Date(r);g.setDate(g.getDate()+s),(await fetch(S(`/repairs/${n}/warranty/extend`),{method:"POST",headers:{...C(),"Content-Type":"application/json"},body:JSON.stringify({additional_days:s,new_expiration_date:g.toISOString()})})).ok?(N.success(`Warranty extended by ${s} days`),w(),p()):N.error("Failed to extend warranty")}catch{N.error("Failed to extend warranty")}};if(D)return e.jsx(v,{className:"p-6",children:e.jsx("div",{className:"flex items-center justify-center py-8",children:e.jsx(q,{className:"h-6 w-6 animate-spin text-violet-500"})})});const T=l?new Date(l.expiration_date):$(i.startDate,i.duration),f=z(T),R=Math.ceil((T.getTime()-new Date().getTime())/(1e3*60*60*24));return e.jsxs(v,{className:"p-6",children:[e.jsxs("div",{className:"mb-6 flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("div",{className:`rounded-full p-2 bg-${f.color}-100`,children:e.jsx(me,{className:`h-5 w-5 text-${f.color}-600`})}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-semibold text-white",children:"Warranty Status"}),e.jsx(L,{className:`bg-${f.color}-100 text-${f.color}-700`,children:f.text})]})]}),!y&&e.jsx(c,{variant:"outline",size:"sm",onClick:()=>o(!0),children:"Edit Warranty"})]}),f.status==="expired"&&e.jsxs(_.div,{initial:{opacity:0,y:-8},animate:{opacity:1,y:0},className:"mb-6 flex items-center gap-3 rounded-lg border border-rose-200 bg-rose-50 p-4",children:[e.jsx(H,{className:"h-5 w-5 text-rose-600"}),e.jsxs("div",{children:[e.jsx("p",{className:"font-medium text-rose-900",children:"Warranty Expired"}),e.jsxs("p",{className:"text-sm text-rose-700",children:["This warranty expired on ",T.toLocaleDateString()]})]})]}),f.status==="expiring"&&e.jsxs(_.div,{initial:{opacity:0,y:-8},animate:{opacity:1,y:0},className:"mb-6 flex items-center gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4",children:[e.jsx(H,{className:"h-5 w-5 text-amber-600"}),e.jsxs("div",{children:[e.jsx("p",{className:"font-medium text-amber-900",children:"Warranty Expiring Soon"}),e.jsxs("p",{className:"text-sm text-amber-700",children:["This warranty will expire in ",R," days"]})]})]}),e.jsx("div",{className:"space-y-4",children:y?e.jsxs(_.div,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},className:"space-y-4",children:[e.jsxs("div",{className:"grid gap-4 md:grid-cols-2",children:[e.jsxs("div",{children:[e.jsx("label",{className:"mb-2 block text-sm font-medium text-slate-300",children:"Warranty Duration (days)"}),e.jsxs(le,{value:i.duration.toString(),onValueChange:s=>h({...i,duration:parseInt(s)}),children:[e.jsx(oe,{children:e.jsx(ce,{})}),e.jsxs(de,{children:[e.jsx(P,{value:"30",children:"30 Days"}),e.jsx(P,{value:"60",children:"60 Days"}),e.jsx(P,{value:"90",children:"90 Days"}),e.jsx(P,{value:"180",children:"180 Days"}),e.jsx(P,{value:"365",children:"1 Year"})]})]})]}),e.jsxs("div",{children:[e.jsx("label",{className:"mb-2 block text-sm font-medium text-slate-300",children:"Start Date"}),e.jsx(re,{type:"date",value:i.startDate,onChange:s=>h({...i,startDate:s.target.value})})]})]}),e.jsxs("div",{children:[e.jsx("label",{className:"mb-2 block text-sm font-medium text-slate-300",children:"Notes"}),e.jsx("textarea",{className:"w-full rounded-lg border border-[#1F2235] bg-[#1A1D27] p-3 text-sm",rows:3,value:i.notes,onChange:s=>h({...i,notes:s.target.value}),placeholder:"Add warranty notes or conditions..."})]}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx(c,{onClick:A,children:"Save Warranty"}),e.jsx(c,{variant:"outline",onClick:()=>o(!1),children:"Cancel"})]})]}):e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("span",{className:"text-sm text-slate-600",children:"Duration"}),e.jsxs("span",{className:"font-medium text-white",children:[l?.duration||i.duration," days"]})]}),e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("span",{className:"text-sm text-slate-600",children:"Start Date"}),e.jsx("span",{className:"font-medium text-white",children:l?.start_date?new Date(l.start_date).toLocaleDateString():new Date(i.startDate).toLocaleDateString()})]}),e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("span",{className:"text-sm text-slate-600",children:"Expiration Date"}),e.jsx("span",{className:`font-medium ${f.status==="expired"?"text-rose-600":f.status==="expiring"?"text-amber-600":"text-white"}`,children:T.toLocaleDateString()})]}),l?.notes&&e.jsxs("div",{className:"rounded-lg bg-[#1A1D27] p-3",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-2",children:[e.jsx(ve,{className:"h-4 w-4 text-slate-500"}),e.jsx("span",{className:"text-sm font-medium text-slate-300",children:"Notes"})]}),e.jsx("p",{className:"text-sm text-slate-400",children:l.notes})]}),l&&f.status!=="expired"&&e.jsxs("div",{className:"pt-4 border-t border-[#1F2235]",children:[e.jsx("p",{className:"mb-3 text-sm font-medium text-slate-300",children:"Extend Warranty"}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx(c,{variant:"outline",size:"sm",onClick:()=>F(30),children:"+30 Days"}),e.jsx(c,{variant:"outline",size:"sm",onClick:()=>F(90),children:"+90 Days"}),e.jsx(c,{variant:"outline",size:"sm",onClick:()=>F(180),children:"+180 Days"})]})]})]})}),x.length>0&&e.jsxs("div",{className:"mt-6 pt-6 border-t border-[#1F2235]",children:[e.jsx("h4",{className:"mb-4 text-sm font-semibold text-white",children:"Warranty History"}),e.jsx("div",{className:"space-y-2",children:x.map((s,r)=>e.jsxs(_.div,{initial:{opacity:0,x:-12},animate:{opacity:1,x:0},transition:{delay:r*.05},className:"flex items-center justify-between rounded-lg bg-[#1A1D27] p-3",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx(V,{className:"h-4 w-4 text-slate-400"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm font-medium text-white",children:s.action}),e.jsxs("p",{className:"text-xs text-slate-500",children:[new Date(s.created_at).toLocaleDateString()," ",new Date(s.created_at).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})]})]})]}),e.jsxs("span",{className:"text-xs text-slate-500",children:["by ",s.user||"System"]})]},s.id))})]})]})}var Se=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","select","span","svg","ul"],Ce=Se.reduce((n,t)=>{const l=K(`Primitive.${t}`),m=d.forwardRef((x,j)=>{const{asChild:D,...b}=x,y=D?l:t;return typeof window<"u"&&(window[Symbol.for("radix-ui")]=!0),e.jsx(y,{...b,ref:j})});return m.displayName=`Primitive.${t}`,{...n,[t]:m}},{}),_e="Separator",U="horizontal",$e=["horizontal","vertical"],J=d.forwardRef((n,t)=>{const{decorative:l,orientation:m=U,...x}=n,j=Te(m)?m:U,b=l?{role:"none"}:{"aria-orientation":j==="vertical"?j:void 0,role:"separator"};return e.jsx(Ce.div,{"data-orientation":j,...b,...x,ref:t})});J.displayName=_e;function Te(n){return $e.includes(n)}var Y=J;const Q=d.forwardRef(({className:n,orientation:t="horizontal",decorative:l=!0,...m},x)=>e.jsx(Y,{ref:x,decorative:l,orientation:t,className:Z("shrink-0 bg-border",t==="horizontal"?"h-[1px] w-full":"h-full w-[1px]",n),...m}));Q.displayName=Y.displayName;function Ae(n){switch(n){case"received":return"bg-slate-100 text-slate-700 border border-slate-300";case"diagnosed":return"bg-blue-100 text-blue-700 border border-blue-300";case"repairing":return"bg-violet-100 text-violet-700 border border-violet-300";case"testing":return"bg-amber-100 text-amber-700 border border-amber-300";case"collection":return"bg-emerald-100 text-emerald-700 border border-emerald-300";default:return"bg-slate-100 text-slate-700 border border-slate-300"}}function Ge(){const{id:n}=X.useParams();ee(),E();const[t,l]=d.useState(null),[m,x]=d.useState([]),[j,D]=d.useState(!0),[b,y]=d.useState(""),[o,i]=d.useState(""),[h,w]=d.useState(!1),[p,$]=d.useState(!1);d.useEffect(()=>{z(),A()},[n]);const z=async()=>{try{const a=await fetch(S(`/repairs/${n}`),{headers:C()}),u=await a.json();a.ok&&u.success&&l(u.repair)}catch(a){console.error("Failed to fetch repair details:",a)}finally{D(!1)}},A=async()=>{try{const a=await fetch(S(`/repairs/${n}/timeline`),{headers:C()}),u=await a.json();a.ok&&u.success&&x(u.timeline||[])}catch(a){console.error("Failed to fetch timeline:",a)}},F=async()=>{if(b.trim())try{(await fetch(S(`/repairs/${n}/notes`),{method:"POST",headers:{...C(),"Content-Type":"application/json"},body:JSON.stringify({note:b,type:"technician"})})).ok&&(N.success("Technician note added"),y(""),w(!1),A())}catch{N.error("Failed to add note")}},T=async()=>{if(o.trim())try{(await fetch(S(`/repairs/${n}/comments`),{method:"POST",headers:{...C(),"Content-Type":"application/json"},body:JSON.stringify({comment:o})})).ok&&(N.success("Internal comment added"),i(""),$(!1),A())}catch{N.error("Failed to add comment")}},f=()=>{window.print()},R=()=>{window.print()};if(j)return e.jsx("div",{className:"flex min-h-screen items-center justify-center",children:e.jsxs("div",{className:"text-center",children:[e.jsx(q,{className:"mx-auto h-8 w-8 animate-spin text-violet-500"}),e.jsx("p",{className:"mt-2 text-slate-600",children:"Loading repair details..."})]})});if(!t)return e.jsx("div",{className:"flex min-h-screen items-center justify-center",children:e.jsxs("div",{className:"text-center",children:[e.jsx(xe,{className:"mx-auto h-8 w-8 text-rose-500"}),e.jsx("p",{className:"mt-2 text-slate-600",children:"Repair not found"}),e.jsx(O,{to:"/admin",children:e.jsx(c,{className:"mt-4",children:"Back to Admin"})})]})});const s=t.cost_breakdown||{labor:0,parts:0,diagnostic:0,tax:0},r=s.labor+s.parts+s.diagnostic+s.tax,g=t.deposit_paid||0,k=r-g;return e.jsxs("div",{className:"min-h-screen bg-slate-50 dark:bg-slate-950",children:[e.jsx("div",{className:"sticky top-0 z-10 border-b border-slate-200 border-[#1F2235] bg-[#11131E]/80 backdrop-blur-xl",children:e.jsx("div",{className:"mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",children:e.jsxs("div",{className:"flex h-16 items-center justify-between",children:[e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(O,{to:"/admin",children:e.jsxs(c,{variant:"ghost",size:"sm",children:[e.jsx(he,{className:"mr-2 h-4 w-4"}),"Back"]})}),e.jsxs("div",{children:[e.jsxs("h1",{className:"text-lg font-bold text-white",children:["Repair #",t.tracking_id]}),e.jsx("p",{className:"text-xs text-slate-500",children:t.device_model})]})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(L,{className:Ae(t.status),children:t.status==="collection"?"Ready":t.status.charAt(0).toUpperCase()+t.status.slice(1)}),e.jsxs(c,{variant:"outline",size:"sm",onClick:f,children:[e.jsx(G,{className:"mr-2 h-4 w-4"}),"Invoice"]}),e.jsxs(c,{variant:"outline",size:"sm",onClick:R,children:[e.jsx(ye,{className:"mr-2 h-4 w-4"}),"Receipt"]})]})]})})}),e.jsx("div",{className:"mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8",children:e.jsxs("div",{className:"grid gap-6 lg:grid-cols-3",children:[e.jsxs("div",{className:"lg:col-span-2 space-y-6",children:[e.jsxs(v,{className:"p-6",children:[e.jsx("h2",{className:"mb-4 text-lg font-semibold text-white",children:"Repair Information"}),e.jsxs("div",{className:"grid gap-6 md:grid-cols-2",children:[e.jsxs("div",{children:[e.jsx("label",{className:"mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500",children:"Customer"}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(te,{className:"h-4 w-4 text-slate-400"}),e.jsx("span",{className:"font-medium text-white",children:t.customer_name})]}),e.jsxs("div",{className:"mt-1 flex items-center gap-2 text-sm text-slate-600",children:[e.jsx(se,{className:"h-4 w-4"}),t.customer_phone]})]}),e.jsxs("div",{children:[e.jsx("label",{className:"mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500",children:"Device"}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(pe,{className:"h-4 w-4 text-slate-400"}),e.jsx("span",{className:"font-medium text-white",children:t.device_model})]}),e.jsx("div",{className:"mt-1 text-sm text-slate-600",children:t.device_brand||"Unknown Brand"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500",children:"Issue Description"}),e.jsx("p",{className:"text-sm text-slate-300",children:t.issue_description||"No description provided"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500",children:"Created"}),e.jsxs("div",{className:"flex items-center gap-2 text-sm text-slate-600",children:[e.jsx(V,{className:"h-4 w-4"}),new Date(t.created_at).toLocaleDateString()]})]})]})]}),e.jsxs(v,{className:"p-6",children:[e.jsxs("div",{className:"mb-4 flex items-center justify-between",children:[e.jsx("h2",{className:"text-lg font-semibold text-white",children:"Status Timeline"}),e.jsx(ie,{className:"h-5 w-5 text-slate-400"})]}),e.jsx("div",{className:"space-y-4",children:m.length>0?m.map((a,u)=>e.jsxs(_.div,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:u*.1},className:"flex gap-4",children:[e.jsxs("div",{className:"flex flex-col items-center",children:[e.jsx("div",{className:`h-3 w-3 rounded-full ${a.type==="status"?"bg-violet-500":a.type==="note"?"bg-blue-500":a.type==="comment"?"bg-amber-500":"bg-slate-500"}`}),u<m.length-1&&e.jsx("div",{className:"w-0.5 flex-1 bg-slate-200 dark:bg-slate-700"})]}),e.jsxs("div",{className:"flex-1 pb-4",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("span",{className:"font-medium text-white",children:a.title}),e.jsxs("span",{className:"text-xs text-slate-500",children:[new Date(a.created_at).toLocaleDateString()," ",new Date(a.created_at).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})]})]}),a.description&&e.jsx("p",{className:"mt-1 text-sm text-slate-400",children:a.description}),a.user&&e.jsxs("p",{className:"mt-1 text-xs text-slate-500",children:["by ",a.user]})]})]},a.id)):e.jsx("p",{className:"text-center text-sm text-slate-500",children:"No timeline events yet"})})]}),e.jsxs(v,{className:"p-6",children:[e.jsxs("div",{className:"mb-4 flex items-center justify-between",children:[e.jsx("h2",{className:"text-lg font-semibold text-white",children:"Technician Notes"}),e.jsxs(c,{variant:"outline",size:"sm",onClick:()=>w(!h),children:[e.jsx(W,{className:"mr-2 h-4 w-4"}),"Add Note"]})]}),h&&e.jsxs(_.div,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},className:"mb-4 space-y-3",children:[e.jsx(B,{placeholder:"Add a technician note...",value:b,onChange:a=>y(a.target.value),className:"min-h-[100px]"}),e.jsxs("div",{className:"flex justify-end gap-2",children:[e.jsx(c,{variant:"outline",size:"sm",onClick:()=>w(!1),children:"Cancel"}),e.jsx(c,{size:"sm",onClick:F,children:"Save Note"})]})]}),e.jsx("div",{className:"space-y-3",children:t.technician_notes&&t.technician_notes.length>0?t.technician_notes.map((a,u)=>e.jsxs("div",{className:"rounded-lg bg-slate-50 bg-[#1A1D27] p-4",children:[e.jsxs("div",{className:"flex items-center justify-between mb-2",children:[e.jsx("span",{className:"font-medium text-white",children:a.technician||"Unknown"}),e.jsx("span",{className:"text-xs text-slate-500",children:new Date(a.created_at).toLocaleDateString()})]}),e.jsx("p",{className:"text-sm text-slate-300",children:a.note})]},u)):e.jsx("p",{className:"text-center text-sm text-slate-500",children:"No technician notes yet"})})]}),e.jsxs(v,{className:"p-6",children:[e.jsxs("div",{className:"mb-4 flex items-center justify-between",children:[e.jsx("h2",{className:"text-lg font-semibold text-white",children:"Device Photos"}),e.jsx(M,{className:"h-5 w-5 text-slate-400"})]}),e.jsxs("div",{className:"grid gap-4 md:grid-cols-2",children:[e.jsxs("div",{children:[e.jsx("label",{className:"mb-2 block text-sm font-medium text-slate-300",children:"Before Repair"}),e.jsx("div",{className:"aspect-video rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center bg-slate-50 bg-[#1A1D27]",children:t.photo_before?e.jsx("img",{src:t.photo_before,alt:"Before",className:"h-full w-full object-cover rounded-lg"}):e.jsxs("div",{className:"text-center",children:[e.jsx(M,{className:"mx-auto h-8 w-8 text-slate-400"}),e.jsx("p",{className:"mt-2 text-sm text-slate-500",children:"No photo uploaded"})]})})]}),e.jsxs("div",{children:[e.jsx("label",{className:"mb-2 block text-sm font-medium text-slate-300",children:"After Repair"}),e.jsx("div",{className:"aspect-video rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center bg-slate-50 bg-[#1A1D27]",children:t.photo_after?e.jsx("img",{src:t.photo_after,alt:"After",className:"h-full w-full object-cover rounded-lg"}):e.jsxs("div",{className:"text-center",children:[e.jsx(M,{className:"mx-auto h-8 w-8 text-slate-400"}),e.jsx("p",{className:"mt-2 text-sm text-slate-500",children:"No photo uploaded"})]})})]})]})]})]}),e.jsxs("div",{className:"space-y-6",children:[e.jsxs(v,{className:"p-6",children:[e.jsxs("h2",{className:"mb-4 flex items-center gap-2 text-lg font-semibold text-white",children:[e.jsx(ne,{className:"h-5 w-5"}),"Cost Breakdown"]}),e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"text-slate-600",children:"Labor"}),e.jsxs("span",{className:"font-medium",children:["£",s.labor.toFixed(2)]})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"text-slate-600",children:"Parts"}),e.jsxs("span",{className:"font-medium",children:["£",s.parts.toFixed(2)]})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"text-slate-600",children:"Diagnostic"}),e.jsxs("span",{className:"font-medium",children:["£",s.diagnostic.toFixed(2)]})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"text-slate-600",children:"Tax (20%)"}),e.jsxs("span",{className:"font-medium",children:["£",s.tax.toFixed(2)]})]}),e.jsx(Q,{}),e.jsxs("div",{className:"flex justify-between text-lg font-bold",children:[e.jsx("span",{children:"Total"}),e.jsxs("span",{children:["£",r.toFixed(2)]})]})]})]}),e.jsxs(v,{className:"p-6",children:[e.jsxs("h2",{className:"mb-4 flex items-center gap-2 text-lg font-semibold text-white",children:[e.jsx(fe,{className:"h-5 w-5"}),"Payment Status"]}),e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"text-slate-600",children:"Deposit Paid"}),e.jsxs("span",{className:"font-medium text-emerald-600",children:["£",g.toFixed(2)]})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"text-slate-600",children:"Remaining Balance"}),e.jsxs("span",{className:`font-medium ${k>0?"text-amber-600":"text-emerald-600"}`,children:["£",k.toFixed(2)]})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"text-slate-600",children:"Payment Status"}),e.jsx(L,{className:k===0?"bg-emerald-100 text-emerald-700":"bg-amber-100 text-amber-700",children:k===0?"Paid":"Partial"})]})]})]}),e.jsx(v,{className:"p-6",children:e.jsx(De,{repairId:t.id,token:E()||""})}),e.jsx(v,{className:"p-6",children:e.jsx(ke,{repairId:t.id,repair:t,token:E()||""})}),e.jsxs(v,{className:"p-6",children:[e.jsxs("div",{className:"mb-4 flex items-center justify-between",children:[e.jsx("h2",{className:"text-lg font-semibold text-white",children:"Internal Comments"}),e.jsxs(c,{variant:"outline",size:"sm",onClick:()=>$(!p),children:[e.jsx(W,{className:"mr-2 h-4 w-4"}),"Add"]})]}),p&&e.jsxs(_.div,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},className:"mb-4 space-y-3",children:[e.jsx(B,{placeholder:"Add an internal comment...",value:o,onChange:a=>i(a.target.value),className:"min-h-[80px]"}),e.jsxs("div",{className:"flex justify-end gap-2",children:[e.jsx(c,{variant:"outline",size:"sm",onClick:()=>$(!1),children:"Cancel"}),e.jsx(c,{size:"sm",onClick:T,children:"Add Comment"})]})]}),e.jsx("div",{className:"space-y-3",children:t.internal_comments&&t.internal_comments.length>0?t.internal_comments.map((a,u)=>e.jsxs("div",{className:"rounded-lg bg-amber-50 dark:bg-amber-950/20 p-3",children:[e.jsxs("div",{className:"flex items-center justify-between mb-1",children:[e.jsx("span",{className:"font-medium text-white text-sm",children:a.user||"Unknown"}),e.jsx("span",{className:"text-xs text-slate-500",children:new Date(a.created_at).toLocaleDateString()})]}),e.jsx("p",{className:"text-sm text-slate-300",children:a.comment})]},u)):e.jsx("p",{className:"text-center text-sm text-slate-500",children:"No internal comments"})})]})]})]})})]})}export{Ge as component};
