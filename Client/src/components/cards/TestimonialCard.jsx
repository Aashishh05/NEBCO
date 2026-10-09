import { Star } from "lucide-react";

const TestimonialCard = ({ testimonial }) => {
  const { client, role, quote, rating = 5, avatar } = testimonial;

  return (
    <figure className="flex h-full flex-col gap-4 border border-border bg-white p-7">
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            className={`size-4 ${
              index < rating ? "fill-gold text-gold" : "text-border"
            }`}
          />
        ))}
      </div>

      <blockquote className="flex-1 text-[17px] leading-relaxed text-ink">
        “{quote}”
      </blockquote>

      <figcaption className="flex items-center gap-3">
        {avatar?.url ? (
          <img src={avatar.url} alt={client} className="size-12 object-cover" />
        ) : (
          <span className="flex size-12 items-center justify-center bg-muted font-bold text-ink">
            {client?.charAt(0)}
          </span>
        )}
        <div>
          <div className="font-semibold text-ink">{client}</div>
          {role && <div className="text-sm text-muted-fg">{role}</div>}
        </div>
      </figcaption>
    </figure>
  );
};

export default TestimonialCard;
