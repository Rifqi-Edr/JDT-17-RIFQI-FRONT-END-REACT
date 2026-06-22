import Box from "../../components/box";
import { useNavigate } from "react-router";
import Button from "../../components/button";

const Homepage = () => {
  const navigate = useNavigate();

  const experience = [
    {
      title: "PT Indivara Group",
      desc: "Frontend Developer — built 3 Wealth Management System applications",
    },
    {
      title: "PT Suka Group",
      desc: "Backend Developer — built 3 Distribution Management System applications",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-8 py-20">
      <section className="mb-20">
        <span className="text-base text-black uppercase tracking-[0.2em] font-medium">
          Portfolio
        </span>
        <h1 className="text-5xl font-bold text-black mt-3 mb-4 tracking-wide">
          Work Experience
        </h1>
        <p className="text-lg text-black max-w-lg leading-relaxed">
          A collection of projects and roles that have shaped my journey as a
          developer.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        {experience.map((el) => (
          <Box key={el.title} title={el.title} desc={el.desc} />
        ))}
      </div>

      <section>
        <h2 className="text-2xl font-semibold text-black mb-6 tracking-wide">
          Explore pages
        </h2>
        <div className="flex flex-wrap gap-4">
          <Button onClick={() => navigate("/cv-page")} content="View CV" />
          <Button
            onClick={() => navigate("/movie-page")}
            content="Browse Movies"
          />
        </div>
      </section>
    </div>
  );
};

export default Homepage;
