import Image from "next/image";
import { Instagram, Github, Linkedin, Mail, Youtube} from "lucide-react";
import Link from "next/link";

const SocialLink = ({ href, icon: Icon, label }) => (
  <Link
    href={href}
    className="flex items-center gap-2 transition-colors duration-200 group py-2 hover:text-green-400" 
    rel="noopener noreferrer"
  >
    <Icon className="w-6 h-6 text-current" />
    <span className="text-sm text-current">{label}</span>
  </Link>
);

const TechItem = ({ icon: Icon, label, customIcon }) => (
  <div className="flex flex-col items-center p-4 bg-zinc-900/50 rounded-lg border border-green-500/20 hover:border-green-500/40 transition-colors">
    
      <div className="w-12 h-12 mb-4">
        <Image
          src={customIcon}
          width={48}
          height={48}
          alt={label}
          className="object-contain"
        />
      </div>
    
      <span className="text-sm text-green-400">{label}</span> 
        </div>
);

export default function HomePage() {
  const technologies = [
    {
      category: "Languages ",
      items: [
        { label: "Go", customIcon: "/go.svg" },
        { label: "JavaScript", customIcon: "/js.svg" },
        { label: "Java (learning)", customIcon: "/java.svg" },

      ]
    },
    {
      category: "Infrastructure & Tools",
      items: [
        { label: "Docker", customIcon: "/docker.svg" },
        { label: "PostgreSQL", customIcon: "/postgresql.svg" },
        { label: "Nginx", customIcon: "/nginx.svg" },
        { label: "Arch Linux", customIcon: "/archlin.svg" },
        { label: "Hyprland", customIcon: "/hyprland.svg" },
      ]
    }
  ];

  return (
    <main className="flex min-h-screen sm:py-16 flex-col text-[#F4F4F5] bg-[#18181b]">
      <div className="container flex flex-col px-4 md:flex-row md:gap-12">
        <div className="flex flex-col w-full md:w-auto">
          <div className="relative group">
            <div className="relative">
              <Image
                src="https://res.cloudinary.com/dpyfweypg/image/upload/v1729982836/iqn7rvdnuuh9ostpvkvs.jpg"
                width={500}
                height={500}
                alt="HeroImage"
                className="rounded-2xl grayscale contrast-125 lg:-rotate-[5deg] transition-transform duration-300 group-hover:scale-[1.02]"
                style={{
                  mixBlendMode: 'luminosity',
                  filter: 'brightness(0.9) contrast(1.1)',
                }}
                priority
              />
              <div className="absolute inset-0 bg-[#18181b]/10 rounded-2xl"></div>
            </div>
          </div>

          <div className="hidden md:flex md:flex-col md:gap-2 md:py-10">
          <SocialLink
              href="mailto:asakshat453@gmail.com"
              icon={Mail}
              label="asakshat453@gmail.com"
            />
            <SocialLink
              href="https://github.com/asakshat"
              icon={Github}
              label="Follow on GitHub"
            />
            <SocialLink
              href="https://www.linkedin.com/in/sakshat-adhikari-8a6a10222/"
              icon={Linkedin}
              label="Follow on LinkedIn"
            />
            <SocialLink
              href="https://www.youtube.com/@zapharian6114"
              icon={Youtube}
              label="Follow on YouTube"
            />
            
          </div>
        </div>

        <div className="flex flex-col gap-8 justify-start w-full mt-8 sm:mt-0">
          <div>
            <h1 className="scroll-m-20 text-sm font-extrabold tracking-tight sm:text-3xl animate-pulse" 
                style={{ textShadow: '0 0 5px #00ffff, 0 0 10px #ff00ff' }}>
              Hey there! I&apos;m Sakshat Adhikari. A Full Stack Developer and a Musician based in Brussels, Belgium.
            </h1>

            <p className="lg:text-[17px] text-sm text-gray-400 mt-4">
              Hello! I am a 25-year-old software developer, currently living in Belgium. My love for technology began at a very young age through the fun of just playing with electronics and building my PCs from scratch. Always fascinated by trying new things and technologies, I thrive to be a better developer.<br /><br />
              </p>
            {technologies.map((category) => (
              <div key={category.category} className="mb-4">
                <h2 className="text-xl font-bold text-green-400 ">{category.category}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {category.items.map((tech) => (
                    <TechItem
                      key={tech.label}
                      label={tech.label}
                      customIcon={tech.customIcon}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="lg:text-[17px] text-sm text-gray-400">

              Being an avid user of Linux, it&apos;s super great to have the OS tweaked just right for my working style. That&apos;s why ArchL inux is my everyday go-to with Hyprland Window Manager. it is cool and efficient to get the things that I want done. Be it automating things by writing scripts, setting up development environments, or trying the latest distributions, I&apos;m continuously learning something more or changing what is. 
              I run all my projects on a Virtual Private Server for complete environmental control. With Nginx as my reverse proxy, I ensure smooth traffic handling and enhanced application security. My containerized applications using Docker guarantee consistent deployment across different environments, while facilitating easy scaling and optimal performance.<br /><br />

              Apart from my tech stuff, I also play electric guitar in a band. I feel that the creativity in music really vibes with my tech skills and helps to see things in a new way—especially problems.
            </p>
          </div>

      
        </div>

        <div className="flex flex-col gap-4 mt-8 md:hidden">
        <SocialLink
            href="mailto:asakshat453@gmail.com"
            icon={Mail}
            label="asakshat453@gmail.com"
          />
          <SocialLink
            href="https://github.com/asakshat"
            icon={Github}
            label="Follow on GitHub"
          />
    
          <SocialLink
            href="https://www.linkedin.com/in/sakshat-adhikari-8a6a10222/"
            icon={Linkedin}
            label="Follow on LinkedIn"
          />
          <SocialLink
            href="https://www.youtube.com/@zapharian6114"
            icon={Youtube}
            label="Follow on YouTube"
          />
          
        </div>
    </main>
  );
}