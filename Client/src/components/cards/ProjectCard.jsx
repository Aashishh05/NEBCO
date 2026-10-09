import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
  const { title, slug, image, category, location, year, summary } = project;

  const label = [category, location].filter(Boolean).join(" / ");

  const content = (
    <>
      <div className="aspect-[4/3] overflow-hidden bg-muted">
        {image?.url ? (
          <img
            src={image.url}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-[400ms] group-hover:scale-[1.025]"
          />
        ) : null}
      </div>

      <div className="pt-4">
        {label && (
          <span className="text-[13px] font-bold uppercase tracking-[0.14em] text-red">
            {label}
          </span>
        )}
        <h3 className="mt-1 text-xl font-bold text-ink transition-colors group-hover:text-red">
          {title}
        </h3>
        {summary && <p className="mt-2 text-sm text-muted-fg">{summary}</p>}
        {year && <p className="mt-1 text-sm text-muted-fg">{year}</p>}
      </div>
    </>
  );

  if (slug) {
    return (
      <Link to={`/projects/${slug}`} className="group block">
        {content}
      </Link>
    );
  }

  return <article className="group block">{content}</article>;
};

export default ProjectCard;

