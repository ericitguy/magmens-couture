import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { getGalleryItem } from "@/content/gallery";
import { testimonials, testimonialsPlaceholder } from "@/content/journey";
import { contact, whatsappLink } from "@/content/site";

const FEATURED_SLUG = "bridal-ivory-ballgown-portrait";

/**
 * Client experience. When the studio has supplied approved testimonials they
 * are presented as editorial pull quotes; until then the section says so
 * plainly instead of inventing reviews.
 */
export function Testimonials() {
  const hasTestimonials = testimonials.length > 0;
  const featured = getGalleryItem(FEATURED_SLUG);

  return (
    <Section tone="porcelain" labelledBy="testimonials-heading">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow">{testimonialsPlaceholder.eyebrow}</p>
            <h2 id="testimonials-heading" className="display-1 mt-5">
              {testimonialsPlaceholder.headline}
            </h2>
            <hr className="hairline my-8 w-20" />
          </Reveal>

          <Reveal delay={120} className="lg:col-span-8">
            {hasTestimonials ? (
              <ul className="grid gap-10 sm:grid-cols-2">
                {testimonials.map((testimonial) => (
                  <li key={testimonial.quote}>
                    <blockquote className="font-display text-[1.35rem] leading-snug text-espresso">
                      “{testimonial.quote}”
                    </blockquote>
                    <p className="mt-4 text-[0.75rem] uppercase tracking-[0.2em] text-taupe">
                      {testimonial.attribution} · {testimonial.context}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="grid gap-10 md:grid-cols-2">
                <div>
                  <p className="body-copy measure">
                    {testimonialsPlaceholder.body}
                  </p>
                  <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                    <Button href="/contact" variant="outline">
                      {testimonialsPlaceholder.ctaLabel}
                    </Button>
                    <a
                      href={whatsappLink(
                        "Hello Magmens Couture, I would like to hear more about your bridal and couture work.",
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-editorial text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-espresso"
                    >
                      Or ask us on WhatsApp
                    </a>
                  </div>
                </div>

                <figure className="border-l border-gold/30 pl-8">
                  <figcaption className="eyebrow">In the meantime</figcaption>
                  {featured ? (
                    <blockquote className="mt-4 font-display text-[1.25rem] leading-snug text-espresso">
                      “{featured.caption}”
                    </blockquote>
                  ) : null}
                  <p className="mt-4 text-[0.875rem] leading-relaxed text-espresso/75">
                    Every gown is photographed and discussed with the client
                    directly. Talk to the studio about recent work, current
                    availability and the make of a piece before you commit.
                  </p>
                  <p className="mt-4 text-[0.875rem] text-espresso/75">
                    Call or message{" "}
                    <a
                      href={`tel:${contact.phoneE164}`}
                      className="link-editorial"
                    >
                      {contact.phoneDisplay}
                    </a>
                  </p>
                </figure>
              </div>
            )}
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
