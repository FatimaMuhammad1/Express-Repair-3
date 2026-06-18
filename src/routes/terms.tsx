import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions - Express Phone & Laptop Repair" },
      {
        name: "description",
        content: "Terms & Conditions for Express Phone & Laptop Repair. Read our service terms and conditions.",
      },
    ],
  }),
  component: Terms,
});

function Terms() {
  return (
    <main className="relative min-h-screen bg-[#F5F1ED] dark:bg-slate-950 section-frost dark:section-frost">
      <div className="relative z-10 mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-3xl font-bold mb-2 text-foreground">Terms & Conditions</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: June 2026</p>

        <section className="space-y-6 text-foreground">
          <div>
            <h2 className="text-xl font-semibold mb-3 text-foreground">1. Agreement to Terms</h2>
            <p>
              By accessing and using the Express Phone & Laptop Repair website and services, you accept and agree to
              be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please
              do not use this service.
            </p>
          </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">2. Use License</h2>
          <p className="mb-2">Permission is granted to temporarily download one copy of the materials (information or software) on the Express Phone & Laptop Repair website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose or for any public display</li>
            <li>Attempt to decompile or reverse engineer any software contained on the site</li>
            <li>Remove any copyright or other proprietary notations from the materials</li>
            <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">3. Repair Services</h2>
          <p className="mb-2">Our repair services are subject to the following conditions:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>All devices must be diagnosed before repair quotes are provided</li>
            <li>Repairs are subject to parts availability</li>
            <li>We provide a 90-day warranty on repair work (parts only)</li>
            <li>Uncollected repairs may be disposed of after 30 days</li>
            <li>We are not responsible for data loss or recovery</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">4. Payment Terms</h2>
          <p className="mb-2">Payment for repair services must be made via our secure payment processor (Stripe). By making a payment, you represent that:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>You are authorized to use the payment method provided</li>
            <li>The information provided is accurate and complete</li>
            <li>You will promptly notify us of any unauthorized charges</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">5. User Accounts</h2>
          <p>
            If you create an account with us, you are responsible for maintaining the confidentiality of your
            login credentials and password. You agree to accept responsibility for all activities that occur under
            your account. You must notify us immediately of any unauthorized use.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">6. Limitation of Liability</h2>
          <p>
            In no event shall Express Phone & Laptop Repair or its suppliers be liable for any damages (including,
            without limitation, damages for loss of data or profit, or due to business interruption) arising out of
            the use or inability to use the materials on the website, even if we or our authorized representative
            has been notified orally or in writing of the possibility of such damage.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">7. Accuracy of Materials</h2>
          <p>
            The materials appearing on Express Phone & Laptop Repair website could include technical, typographical,
            or photographic errors. We do not warrant that any of the materials on the website are accurate, complete,
            or current. We may make changes to the materials contained on the website at any time without notice.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">8. Links</h2>
          <p>
            We have not reviewed all of the sites linked to our website and are not responsible for the contents of
            any such linked site. The inclusion of any link does not imply endorsement by us of the site. Use of any
            such linked website is at the user's own risk.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">9. Modifications</h2>
          <p>
            We may revise these terms of service for the website at any time without notice. By using this website,
            you are agreeing to be bound by the then current version of these terms of service.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">10. Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in accordance with the laws of the United Kingdom,
            and you irrevocably submit to the exclusive jurisdiction of the courts located in England.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">11. Contact Information</h2>
          <p>
            If you have any questions about these Terms & Conditions, please contact us at:
          </p>
          <p className="mt-2">
            <strong>Express Phone & Laptop Repair</strong><br />
            6 Harefield Road, Nuneaton, CV11 4HD<br />
            Email: <a href="mailto:noreply@fixora.com" className="text-blue-600 hover:underline">noreply@fixora.com</a><br />
            Phone: <a href="tel:07415278767" className="text-blue-600 hover:underline">07415 278767</a>
          </p>
        </div>

        <div className="bg-white/90 dark:bg-slate-900/80 border border-border rounded-xl p-6 text-sm text-muted-foreground">
          <p>
            <strong>Note:</strong> These Terms & Conditions are effective as of June 2026 and may be updated periodically.
            Please review them regularly for changes.
          </p>
        </div>
      </section>

      <div className="mt-12">
        <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 font-medium">
          ← Back to home
        </Link>
      </div>
    </div>
    </main>
  );
}
