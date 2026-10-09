import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "@/components/common/Container";
import { getFeaturedProjects } from "@/api/projects.api.js";
import { IMAGES } from "@/utils/constants";

const sectors = ["Residential", "Commercial", "Hospitality"];

const fallbackProjects = [
  {
    _id: "fallback-1",
    title: "Sukedhara Private House",
    category: "Residential",
    location: "Sukedhara",
    summary: "From NEBCO's project portfolio",
    image: { url: IMAGES.hero },
  },
  {
    _id: "fallback-2",
    title: "Khanal Commercial Building",
    category: "Commercial",
    location: "Nepalgunj",
    summary: "Project concept visualization",
    image: { url: IMAGES.planning },
  },
  {
    _id: "fallback-3",
    title: "Hotel Yatri",
    category: "Hospitality",
    location: "Thamel",
    summary: "Planning & design involvement",
    image: { url: IMAGES.investments },
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
    <section id="experience" className="py-24 max-[700px]:py-14">
      <Container>
        <div className="flex items-center gap-4">
          <span className="h-[2px] w-[30px] bg-[#c51f2b]" />
          <p className="text-[14px] font-medium uppercase tracking-[0.12em] text-[#5d5d56]">
            Selected experience
          </p>
        </div>

        <div className="mt-6 flex items-center justify-between gap-10 max-[900px]:flex-col max-[900px]:items-start max-[900px]:gap-5">
          <h2 className="text-[56px] font-normal leading-[1.1] tracking-[-0.06em] text-[#252623] max-[700px]:text-[40px]">
            Experience you can see.
          </h2>

          <p className="max-w-[370px] text-[20px] leading-[1.8] text-[#6d6e67] max-[700px]:text-[18px]">
            Residential, commercial and hospitality projects from our portfolio.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-b border-[#ded7c9] pb-10 max-[700px]:mt-8 max-[700px]:gap-4 max-[700px]:pb-6">
          <div className="flex flex-wrap items-center gap-6 max-[700px]:gap-x-5 max-[700px]:gap-y-2">
            <span className="mr-2 text-[17px] text-[#8a8d82]">
              Sectors we serve
            </span>
            {sectors.map((sector) => (
              <a
                key={sector}
                href={`#project-${sector.toLowerCase()}`}
                className="text-[17px] text-ink transition-colors hover:text-red"
              >
                {sector}
              </a>
            ))}
          </div>

          <Link
            to="/#experience"
            className="text-[17px] font-medium text-[#c51f2b] underline-offset-4 hover:underline"
          >
            View our projects
          </Link>
        </div>

        <div className="mt-9 grid grid-cols-3 gap-[30px] max-[960px]:gap-5 max-[700px]:grid-cols-1 max-[700px]:gap-10">
          {loading
            ? Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="aspect-[16/10] bg-[#e1dfd7]" />
                  <div className="mt-7 h-4 w-1/3 bg-muted" />
                  <div className="mt-4 h-6 w-2/3 bg-muted" />
                </div>
              ))
            : projects.map((project, index) => (
                <article
                  key={project._id || index}
                  id={`project-${(project.category || "").toLowerCase()}`}
                  className="group"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-[#e1dfd7]">
                    {project.image?.url && (
                      <img
                        src={project.image.url}
                        alt={project.title}
                        className="h-full w-full object-cover transition-transform duration-[400ms] group-hover:scale-[1.025]"
                      />
                    )}
                  </div>

                  <div className="pt-7">
                    <p className="text-[15px] uppercase tracking-[0.06em] text-[#6d6e67]">
                      {[project.category, project.location]
                        .filter(Boolean)
                        .join(" / ")}
                    </p>

                    <h3 className="mt-4 text-[30px] font-normal leading-[1.25] tracking-[-0.04em] text-[#20211f] transition-colors group-hover:text-red max-[700px]:text-[26px]">
                      {project.title}
                    </h3>

                    {project.summary && (
                      <span className="mt-3 block text-[17px] text-[#6d6e67]">
                        {project.summary}
                      </span>
                    )}
                  </div>
                </article>
              ))}
        </div>
      </Container>
    </section>
  );
};

export default Experience;
