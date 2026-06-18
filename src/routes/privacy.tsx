import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy - Express Phone & Laptop Repair" },
      {
        name: "description",
        content: "Privacy Policy for Express Phone & Laptop Repair. Learn how we collect, use, and protect your information.",
      },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <main className="relative min-h-screen bg-[#F5F1ED] dark:bg-slate-950 section-frost dark:section-frost">
      <div className="relative z-10 mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-3xl font-bold mb-2 text-foreground">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: June 2026</p>

        <section className="space-y-6 text-foreground">
          <div>
            <h2 className="text-xl font-semibold mb-3 text-foreground">1. Introduction</h2>
            <p>
              Express Phone & Laptop Repair ("we," "our," or "us") is committed to protecting your privacy.
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you
              visit our website and use our services.
            </p>
          </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">2. Information We Collect</h2>
          <p className="mb-2">We may collect information about you in a variety of ways. The information we may collect on the site includes:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li><strong>Personal Data:</strong> Name, email address, phone number, address</li>
            <li><strong>Service Data:</strong> Device model, repair description, tracking ID</li>
            <li><strong>Payment Data:</strong> Processed securely via Stripe (we do not store card details)</li>
            <li><strong>Usage Data:</strong> IP address, browser type, pages visited, time on site</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">3. How We Use Your Information</h2>
          <p className="mb-2">We use the information we collect to:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Provide and maintain our repair services</li>
            <li>Send repair status updates and booking confirmations</li>
            <li>Process payments securely</li>
            <li>Respond to your inquiries and support requests</li>
            <li>Improve our website and services</li>
            <li>Comply with legal obligations</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">4. Third-Party Disclosure</h2>
          <p className="mb-2">We may share your information with trusted third-party service providers including:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li><strong>Stripe:</strong> Payment processing</li>
            <li><strong>Telnyx:</strong> SMS notifications</li>
            <li><strong>Gmail/SMTP:</strong> Email delivery</li>
            <li><strong>Supabase:</strong> Database hosting</li>
          </ul>
          <p className="mt-2">We do not sell or rent your personal data to third parties for marketing purposes.</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">5. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal information.
            However, no method of transmission over the Internet is 100% secure. If you have security concerns,
            please contact us immediately.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">6. Your Rights</h2>
          <p className="mb-2">You have the right to:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Access your personal data</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data (where applicable)</li>
            <li>Opt-out of marketing communications</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">7. Cookies</h2>
          <p>
            Our website may use cookies to enhance your experience. You can control cookies through your browser settings.
            Some features may not work if cookies are disabled.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">8. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy or our privacy practices, please contact us at:
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
            <strong>Note:</strong> This Privacy Policy is effective as of June 2026 and may be updated periodically.
            We will notify you of any material changes via email or through the website.
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
