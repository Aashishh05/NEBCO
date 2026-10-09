import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
  const { title, slug, image, category, location, year } = project;

  return (
    <Link to={`/projects/${slug}`} className="group block">
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
        {category && (
          <span className="text-[13px] font-bold uppercase tracking-[0.16em] text-red">
            {category}
          </span>
        )}
        <h3 className="mt-1 text-xl font-bold text-ink transition-colors group-hover:text-red">
          {title}
        </h3>
        <p className="mt-1 text-sm text-muted-fg">
          {[location, year].filter(Boolean).join(" · ")}
        </p>
      </div>
    </Link>
  );
};

export default ProjectCard;
