import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { collections } from "@/content/collections";

export default function NotFound() {
  return (
    <section className="on-dark flex min-h-[80svh] items-center bg-espresso pt-32 text-ivory">
      <Container>
        <div className="max-w-2xl">
          <p className="eyebrow eyebrow-on-dark">404</p>
          <h1 className="display-1 mt-6">
            This page has been taken off the stand.
          </h1>
          <hr className="hairline my-8 w-20" />
          <p className="lead lead-on-dark">
            The page you were looking for is not here. The collections and the
            consultation form are only a click away.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button href="/" variant="light">
              Return home
            </Button>
            <Button href="/book-consultation" variant="light">
              Book a consultation
            </Button>
          </div>

          <nav aria-label="Collections" className="mt-12">
            <p className="eyebrow eyebrow-on-dark">Collections</p>
            <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
              {collections.map((collection) => (
                <li key={collection.slug}>
                  <Link
                    href={`/${collection.slug}`}
                    className="link-editorial text-[0.9375rem] text-ivory/80 transition-colors duration-500 ease-editorial hover:text-gold"
                  >
                    {collection.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </section>
  );
}
