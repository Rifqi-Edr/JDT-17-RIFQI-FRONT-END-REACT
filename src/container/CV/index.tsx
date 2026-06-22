import ProfileImg from "@/assets/Profile.jpeg";
import IndivaraLogo from "@/assets/Logo_Indivara.png";
import UnivLogo from "@/assets/Logo_Universitas_Sriwijaya.svg";
import { useGithubRepos } from "@/hooks/github/useGithubRepos";

const CV = () => {
  const { repos, loading } = useGithubRepos("Rifqi-Edr");

  return (
    <div className="min-h-full">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-16 font-indie">
        {/* Profile Section */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          {/* Photo */}
          <div className="relative shrink-0 mx-auto md:mx-0">
            <span className="absolute inset-0 rounded-3xl pointer-events-none bg-gradient-to-br from-white/30 via-white/5 to-transparent z-10" />
            <img
              src={ProfileImg}
              alt="Muhammad Rifqi Edrial"
              className="w-36 h-60 object-cover rounded-3xl shadow-lg shadow-black/5"
            />
          </div>

          {/* Name + Title */}
          <div className="flex flex-col justify-center text-center md:text-left">
            <h1 className="text-4xl font-bold text-black tracking-wide mb-3">
              Muhammad Rifqi Edrial
            </h1>
            <p className="text-lg text-black/60 font-medium tracking-wide">
              Java Development Trainee
            </p>
            <p className="text-base text-black/40 tracking-wide">
              at Indivara Group
            </p>

            {/* Logos */}
            <div className="flex items-center gap-6 mt-6 justify-center md:justify-start">
              <img
                src={UnivLogo}
                alt="Universitas Sriwijaya"
                className="h-32 w-32"
              />
              <div className="w-px h-8 bg-black/10" />
              <img
                src={IndivaraLogo}
                alt="Indivara Group"
                className="h-8 rounded-lg bg-black/60 p-1"
              />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-black/10 mb-12" />

        {/* GitHub Projects */}
        <section>
          <h2 className="text-2xl font-bold text-black tracking-wide mb-2">
            GitHub Projects
          </h2>
          <p className="text-sm text-black/40 mb-8">
            Recent repositories from GitHub
          </p>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-32 rounded-2xl bg-white/20 animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {repos.map((repo) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative overflow-hidden block p-5 rounded-2xl bg-white/40 backdrop-blur-sm border border-white/50 hover:bg-white/60 hover:shadow-md transition-all duration-300"
                >
                  <span className="absolute inset-0 rounded-2xl pointer-events-none bg-gradient-to-br from-white/30 via-white/5 to-transparent" />
                  <div className="relative">
                    <h3 className="text-base font-bold text-black truncate mb-1">
                      {repo.name}
                    </h3>
                    <p className="text-xs text-black/50 line-clamp-2 mb-3">
                      {repo.description || "No description"}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-black/40">
                      {repo.language && (
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-sky-400" />
                          {repo.language}
                        </span>
                      )}
                      <span>⭐ {repo.stargazers_count}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default CV;
