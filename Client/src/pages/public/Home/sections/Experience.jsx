import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { getFeaturedProjects } from "@/api/projects.api.js";
import { PROJECT_IMAGES } from "@/utils/constants";

const sectors = ["Residential", "Commercial", "Hospitality"];

const fallbackProjects = [
  {
    _id: "fallback-1",
    title: "Sukedhara Private House",
    category: "Residential",
    location: "Sukedhara",
    summary: "From NEBCO's project portfolio",
    image: { url: PROJECT_IMAGES.sukedhara },
  },
  {
    _id: "fallback-2",
    title: "Khanal Commercial Building",
    category: "Commercial",
    location: "Nepalgunj",
    summary: "Project concept visualization",
    image: { url: PROJECT_IMAGES.khanal },
  },
  {
    _id: "fallback-3",
    title: "Hotel Yatri",
    category: "Hospitality",
    location: "Thamel",
    summary: "Planning & design involvement",
    image: { url: PROJECT_IMAGES.hotelYatri },
  },
];

const Experience = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFeaturedProjects({ limit: 3 })
      .then((payload) => {
        const items = payload.data?.projects || [];
        setProjects(items.length ? items : fallbackProjects);
      })
      .catch(() => setProjects(fallbackProjects))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section
      id="experience"
      className="experience-section section container"
      aria-labelledby="experience-heading"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">
            <span />
            Selected experience
          </p>
          <h2 id="experience-heading">Experience you can see.</h2>
        </div>
        <p>Residential, commercial and hospitality projects from our portfolio.</p>
      </div>

      <div className="experience-context">
        <div className="sector-list">
          <span>Sectors we serve</span>
          {sectors.map((sector) => (
            <a key={sector} href={`#project-${sector.toLowerCase()}`}>
              {sector}
            </a>
          ))}
        </div>
        <a
          className="text-link"
          href="https://nebco.com.np/project/"
          target="_blank"
          rel="noreferrer"
        >
          View our projects
          <ArrowRight />
        </a>
      </div>

      <div className="experience-grid">
        {loading
          ? Array.from({ length: 3 }).map((_, index) => (
              <div key={index} style={{ opacity: 0.5 }}>
                <div className="experience-photo" />
              </div>
            ))
          : projects.map((project, index) => (
              <a
                key={project._id || index}
                id={`project-${(project.category || "").toLowerCase()}`}
                className="experience-card"
                href={project.link || "https://nebco.com.np/project/"}
                target="_blank"
                rel="noreferrer"
              >
                <div className="experience-photo">
                  {project.image?.url && (
                    <img
                      src={project.image.url}
                      alt={project.title}
                      width="1200"
                      height="900"
                      loading="lazy"
                    />
                  )}
                </div>
                <div className="experience-copy">
                  <p>
                    {[project.category, project.location].filter(Boolean).join(" / ")}
                  </p>
                  <h3>{project.title}</h3>
                  {project.summary && <span>{project.summary}</span>}
                </div>
              </a>
            ))}
      </div>
    </section>
  );
};

export default Experience;
