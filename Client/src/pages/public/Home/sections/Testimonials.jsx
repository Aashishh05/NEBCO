import { useEffect, useState } from "react";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import TestimonialCard from "@/components/cards/TestimonialCard";
import { getTestimonials } from "@/api/testimonials.api.js";

const Testimonials = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getTestimonials()
      .then((payload) => {
        const list = payload.data?.testimonials || payload.data?.items || [];
        setItems(list.filter((item) => item.isPublished !== false));
      })
      .catch(() => setItems([]));
  }, []);

  if (!items.length) return null;

  return (
    <section className="border-b border-border bg-white">
      <Container className="py-20 max-[700px]:py-14">
        <SectionHeading
          eyebrow="Testimonials"
          title="What our clients say."
          align="center"
          className="mx-auto"
        />

        <div className="mt-12 grid grid-cols-3 gap-8 max-[960px]:grid-cols-1">
          {items.slice(0, 3).map((testimonial) => (
            <TestimonialCard key={testimonial._id} testimonial={testimonial} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;
