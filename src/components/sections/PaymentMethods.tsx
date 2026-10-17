import {
  paymentMethods,
  paymentRules,
  paymentSafety,
} from "@/content/payments";
import { contact } from "@/content/site";

/**
 * The studio's published payment details, shown alongside the payment policy.
 * Deliberately plain and scannable: this is the part of the policies a client
 * returns to with a phone in one hand.
 */
export function PaymentMethods() {
  return (
    <div className="mt-8">
      <h3 className="eyebrow">Payment details</h3>

      <div className="mt-5 grid gap-4">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className="border border-gold/30 bg-porcelain p-5 md:p-6"
          >
            <p className="font-display text-[1.1rem]">{method.label}</p>
            <dl className="mt-3 grid gap-y-2 text-[0.9375rem] sm:grid-cols-[10rem_1fr]">
              {method.fields.map((field) => (
                <div key={field.label} className="contents">
                  <dt className="text-taupe">{field.label}</dt>
                  <dd className="font-medium text-espresso">
                    {field.href ? (
                      <a href={field.href} className="link-editorial">
                        {field.value}
                      </a>
                    ) : (
                      field.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
            {method.note ? (
              <p className="mt-3 text-[0.8125rem] leading-relaxed text-taupe">
                {method.note}
              </p>
            ) : null}
          </div>
        ))}
      </div>

      <ul className="mt-6 space-y-2">
        {paymentRules.map((rule) => (
          <li
            key={rule}
            className="flex gap-4 text-[0.875rem] leading-relaxed text-espresso/85"
          >
            <span aria-hidden="true" className="mt-2.5 h-px w-4 shrink-0 bg-gold" />
            <span>{rule}</span>
          </li>
        ))}
      </ul>

      <div className="mt-5 border-l-2 border-gold/60 bg-porcelain p-4">
        <p className="text-[0.8125rem] leading-relaxed text-espresso/85">
          {paymentSafety}{" "}
          <a
            href={`tel:${contact.phoneE164}`}
            className="link-editorial font-medium text-espresso"
          >
            {contact.phoneDisplay}
          </a>{" "}
          to confirm before paying anything.
        </p>
      </div>
    </div>
  );
}
