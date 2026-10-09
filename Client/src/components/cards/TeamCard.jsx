import {
  FacebookIcon,
  LinkedinIcon,
  InstagramIcon,
  XIcon,
} from "@/components/footer/SocialIcons";

const socialIcons = {
  facebook: FacebookIcon,
  linkedin: LinkedinIcon,
  instagram: InstagramIcon,
  x: XIcon,
};

const TeamCard = ({ member }) => {
  const { name, position, bio, photo, socials = {} } = member;

  return (
    <article className="group">
      <div className="aspect-[3/4] overflow-hidden bg-muted">
        {photo?.url ? (
          <img
            src={photo.url}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-[400ms] group-hover:scale-[1.025]"
          />
        ) : null}
      </div>

      <div className="pt-4">
        <h3 className="text-xl font-bold text-ink">{name}</h3>
        {position && (
          <p className="text-[13px] font-bold uppercase tracking-[0.16em] text-red">
            {position}
          </p>
        )}
        {bio && <p className="mt-2 text-sm leading-relaxed text-muted-fg">{bio}</p>}

        <div className="mt-3 flex gap-3">
          {Object.entries(socialIcons).map(([key, Icon]) => {
            const url = socials[key];
            if (!url) return null;
            return (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noreferrer"
                aria-label={`${name} on ${key}`}
                className="text-muted-fg transition-colors hover:text-red"
              >
                <Icon className="size-4" />
              </a>
            );
          })}
        </div>
      </div>
    </article>
  );
};

export default TeamCard;
