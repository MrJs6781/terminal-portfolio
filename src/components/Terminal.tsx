// components/Terminal.tsx
import React, { useState, useEffect, useRef, KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import commandsData from "@/data/commands.json";
import profileData from "@/data/profile.json";
import themesData from "@/data/themes.json";

type TerminalHistoryItem = {
  command: string;
  output: React.ReactNode;
};

type Theme = {
  id: string;
  name: string;
  backgroundColor: string;
  textColor: string;
  promptColor: string;
  highlightColor: string;
  errorColor: string;
  successColor: string;
};

const Terminal = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<TerminalHistoryItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [themes, setThemes] = useState<Theme[]>(themesData.themes);
  const [currentTheme, setCurrentTheme] = useState<Theme>(themesData.themes[5]);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Initialize terminal with welcome message
  useEffect(() => {
    console.log("Current Theme:", currentTheme);
    if (!isInitialized) {
      const welcomeOutput = (
        <div className={`text-${currentTheme.successColor}`}>
          <pre className="text-xs md:text-sm font-mono mb-2">
            {`
 _______  _______  ______    __   __  ___   __    _  _______  ___     
|       ||       ||    _ |  |  |_|  ||   | |  |  | ||   _   ||   |    
|_     _||    ___||   | ||  |       ||   | |   |_| ||  |_|  ||   |    
  |   |  |   |___ |   |_||_ |       ||   | |       ||       ||   |    
  |   |  |    ___||    __  ||       ||   | |  _    ||       ||   |___ 
  |   |  |   |___ |   |  | || ||_|| ||   | | | |   ||   _   ||       |
  |___|  |_______||___|  |_||_|   |_||___| |_|  |__||__| |__||_______|
                                                                       
`}
          </pre>
          <p className="mb-2">{profileData.welcomeMessage}</p>
          <p>
            Type{" "}
            <span className={`text-${currentTheme.highlightColor}`}>help</span>{" "}
            to see available commands.
          </p>
        </div>
      );

      setHistory([{ command: "", output: welcomeOutput }]);
      setIsInitialized(true);
    }
  }, [isInitialized, currentTheme]);

  // Scroll to bottom when history updates
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Focus input when clicking on terminal
  useEffect(() => {
    const handleClickAnywhere = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };

    document.addEventListener("click", handleClickAnywhere);
    return () => {
      document.removeEventListener("click", handleClickAnywhere);
    };
  }, []);

  // Process command input
  const processCommand = async (cmd: string) => {
    const command = cmd.trim().toLowerCase();
    let output: React.ReactNode;

    if (command === "") {
      return;
    }

    // Add to command history
    if (command !== commandHistory[0]) {
      setCommandHistory([command, ...commandHistory]);
    }
    setHistoryIndex(-1);

    // Process different commands
    switch (command) {
      case "help":
        output = (
          <div>
            <p className={`font-bold text-${currentTheme.successColor} mb-2`}>
              Available Commands:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
              {commandsData.commands.map((cmd, index) => (
                <div key={index} className="flex">
                  <span className={`text-${currentTheme.highlightColor} w-24`}>
                    {cmd.name}
                  </span>
                  <span className="text-gray-400">{cmd.description}</span>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case "about":
        const aboutData = profileData;
        output = (
          <div>
            <div className="mb-2">
              <span className={`text-${currentTheme.successColor} font-bold`}>
                {aboutData.name}
              </span>
              <span className="text-gray-400"> - {aboutData.title}</span>
            </div>
            <p className="text-gray-300 mb-2">{aboutData.bio}</p>
            <p className="text-gray-300">
              <span className="text-gray-400">Location:</span>{" "}
              {aboutData.location}
            </p>
          </div>
        );
        break;

      case "skills":
        const skillsData = require("@/data/skills.json");
        output = (
          <div>
            <p className={`font-bold text-${currentTheme.successColor} mb-2`}>
              Technical Skills:
            </p>

            <div className="mb-2">
              <p className={`text-${currentTheme.highlightColor} mb-1`}>
                Languages:
              </p>
              <div className="flex flex-wrap gap-2">
                {skillsData.languages.map((skill: any, index: number) => (
                  <span
                    key={index}
                    className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-sm"
                  >
                    {skill.name}{" "}
                    <span className={`text-${currentTheme.successColor}`}>
                      •
                    </span>
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-2">
              <p className={`text-${currentTheme.highlightColor} mb-1`}>
                Frameworks:
              </p>
              <div className="flex flex-wrap gap-2">
                {skillsData.frameworks.map((skill: any, index: number) => (
                  <span
                    key={index}
                    className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-sm"
                  >
                    {skill.name}{" "}
                    <span className={`text-${currentTheme.successColor}`}>
                      •
                    </span>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className={`text-${currentTheme.highlightColor} mb-1`}>
                Tools:
              </p>
              <div className="flex flex-wrap gap-2">
                {skillsData.tools.map((skill: any, index: number) => (
                  <span
                    key={index}
                    className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-sm"
                  >
                    {skill.name}{" "}
                    <span className={`text-${currentTheme.successColor}`}>
                      •
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
        break;

      case "projects":
        const projectsData = require("@/data/projects.json");
        output = (
          <div>
            <p className={`font-bold text-${currentTheme.successColor} mb-2`}>
              Projects:
            </p>
            <div className="space-y-4">
              {projectsData.projects.map((project: any, index: number) => (
                <div
                  key={index}
                  className="border border-gray-700 p-3 rounded bg-gray-900"
                >
                  <div className="flex justify-between items-start mb-1">
                    <h3
                      className={`text-${currentTheme.highlightColor} font-bold`}
                    >
                      {project.title}
                    </h3>
                    {project.featured && (
                      <span
                        className={`bg-${currentTheme.successColor}/20 text-${currentTheme.successColor} text-xs px-2 py-0.5 rounded`}
                      >
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-gray-300 mb-2 text-sm">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {project.technologies.map(
                      (tech: string, techIndex: number) => (
                        <span
                          key={techIndex}
                          className="bg-gray-800 text-xs text-gray-300 px-1.5 py-0.5 rounded"
                        >
                          {tech}
                        </span>
                      )
                    )}
                  </div>
                  <div className="flex gap-3 text-sm">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline"
                    >
                      GitHub
                    </a>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline"
                    >
                      Live Demo
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case "experience":
        const experienceData = require("@/data/experience.json");
        output = (
          <div>
            <p className={`font-bold text-${currentTheme.successColor} mb-2`}>
              Work Experience:
            </p>
            <div className="space-y-4">
              {experienceData.experiences.map((job: any, index: number) => (
                <div key={index} className="border-l-2 border-gray-700 pl-4">
                  <div className="flex justify-between mb-1">
                    <h3
                      className={`text-${currentTheme.highlightColor} font-bold`}
                    >
                      {job.title}
                    </h3>
                    <span className="text-gray-400 text-sm">
                      {job.startDate} - {job.endDate}
                    </span>
                  </div>
                  <p className="text-gray-300 mb-1 text-sm">
                    {job.company} | {job.location}
                  </p>
                  <p className="text-gray-400 mb-2 text-sm">
                    {job.description}
                  </p>
                  {job.achievements && job.achievements.length > 0 && (
                    <ul className="list-disc list-inside text-sm ml-2 text-gray-300">
                      {job.achievements.map(
                        (achievement: string, achIndex: number) => (
                          <li key={achIndex}>{achievement}</li>
                        )
                      )}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case "education":
        const educationData = require("@/data/education.json");
        output = (
          <div>
            <p className={`font-bold text-${currentTheme.successColor} mb-2`}>
              Education:
            </p>
            <div className="space-y-4">
              {educationData.education.map((edu: any, index: number) => (
                <div key={index} className="border-l-2 border-gray-700 pl-4">
                  <div className="flex justify-between mb-1">
                    <h3
                      className={`text-${currentTheme.highlightColor} font-bold`}
                    >
                      {edu.degree}
                    </h3>
                    <span className="text-gray-400 text-sm">
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </div>
                  <p className="text-gray-300 mb-1 text-sm">
                    {edu.institution} | {edu.location}
                  </p>
                  <p className="text-gray-400 text-sm">{edu.description}</p>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case "contact":
        const contactData = require("@/data/contact.json");
        output = (
          <div>
            <p className={`font-bold text-${currentTheme.successColor} mb-2`}>
              Contact Information:
            </p>
            <p className="mb-1">
              <span className={`text-${currentTheme.highlightColor}`}>
                Email:
              </span>
              <a
                href={`mailto:${contactData.email}`}
                className="text-blue-400 ml-2 hover:underline"
              >
                {contactData.email}
              </a>
            </p>
            <p className="mb-2">
              <span className={`text-${currentTheme.highlightColor}`}>
                Phone:
              </span>
              <span className="text-gray-300 ml-2">{contactData.phone}</span>
            </p>

            <p className={`text-${currentTheme.highlightColor} mb-1`}>
              Social Media:
            </p>
            <div className="flex flex-wrap gap-3">
              {contactData.socials.map((social: any, index: number) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  {social.platform}: {social.username}
                </a>
              ))}
            </div>
          </div>
        );
        break;

      case "resume":
        window.open(profileData.resumeUrl, "_blank");
        output = (
          <p className={`text-${currentTheme.successColor}`}>
            Opening resume in a new tab...
          </p>
        );
        break;

      case "clear":
        setHistory([]);
        return;

      case "theme":
      case "themes":
        output = (
          <div>
            <p className={`font-bold text-${currentTheme.successColor} mb-2`}>
              Available Themes:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {themes.map((theme, index) => (
                <div
                  key={index}
                  className={`px-3 py-2 rounded cursor-pointer border ${
                    theme.id === currentTheme.id
                      ? `border-${currentTheme.highlightColor} bg-${currentTheme.highlightColor}/10`
                      : "border-gray-700 hover:border-gray-500"
                  }`}
                  onClick={() => setCurrentTheme(theme)}
                >
                  <span
                    className={`font-medium ${
                      theme.id === currentTheme.id
                        ? `text-${currentTheme.highlightColor}`
                        : "text-gray-300"
                    }`}
                  >
                    {theme.name}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-gray-400">
              Type{" "}
              <span className={`text-${currentTheme.highlightColor}`}>
                theme [name]
              </span>{" "}
              to switch themes
            </p>
          </div>
        );
        break;

      default:
        // Check if command is 'theme [name]'
        if (command.startsWith("theme ")) {
          const themeName = command.split(" ")[1];
          const foundTheme = themes.find(
            (t) => t.id.toLowerCase() === themeName.toLowerCase()
          );

          if (foundTheme) {
            setCurrentTheme(foundTheme);
            output = (
              <p className={`text-${currentTheme.successColor}`}>
                Theme changed to {foundTheme.name}
              </p>
            );
          } else {
            output = (
              <p className={`text-${currentTheme.errorColor}`}>
                Theme "{themeName}" not found. Type{" "}
                <span className={`text-${currentTheme.highlightColor}`}>
                  themes
                </span>{" "}
                to see available themes.
              </p>
            );
          }
        } else {
          output = (
            <p className={`text-${currentTheme.errorColor}`}>
              Command not found: {command}. Type{" "}
              <span className={`text-${currentTheme.highlightColor}`}>
                help
              </span>{" "}
              to see available commands.
            </p>
          );
        }
    }

    setHistory([...history, { command, output }]);
    setInput("");
  };

  // Tab completion
  const handleTabCompletion = () => {
    if (!input) return;

    const allCommands = commandsData.commands.map((cmd) => cmd.name);
    const matchingCommands = allCommands.filter((cmd) => cmd.startsWith(input));

    if (matchingCommands.length === 1) {
      setInput(matchingCommands[0]);
    } else if (matchingCommands.length > 1) {
      // Show available completions
      const completionsOutput = (
        <div>
          <p className="text-gray-400 mb-1">Available completions:</p>
          <div className="flex flex-wrap gap-2">
            {matchingCommands.map((cmd, index) => (
              <span
                key={index}
                className={`text-${currentTheme.highlightColor} cursor-pointer hover:underline`}
                onClick={() => setInput(cmd)}
              >
                {cmd}
              </span>
            ))}
          </div>
        </div>
      );
      setHistory([...history, { command: "", output: completionsOutput }]);
    }
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // Command history navigation
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      handleTabCompletion();
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    processCommand(input);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="bg-gray-800 text-white p-2 flex items-center rounded-t-md">
        <div className="flex gap-1.5 mr-4">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <span className="text-sm font-mono">{profileData.terminalTitle}</span>
      </div>

      <div
        ref={terminalRef}
        className="flex-1 p-4 overflow-y-auto font-mono text-sm rounded-b-md"
        style={{
          backgroundColor: currentTheme.backgroundColor,
          color: currentTheme.textColor,
        }}
        // className={`flex-1 bg-${currentTheme.backgroundColor} p-4 overflow-y-auto font-mono text-sm text-${currentTheme.textColor} rounded-b-md`}
        // style={{
        //   backgroundColor: currentTheme.backgroundColor.startsWith("#")
        //     ? currentTheme.backgroundColor
        //     : undefined,
        // }}
      >
        {history.map((item, index) => (
          <div key={index} className="mb-4">
            {item.command && (
              <div className="flex items-center mb-1">
                <span className={`text-${currentTheme.promptColor} mr-2`}>
                  $
                </span>
                <span className={`text-${currentTheme.textColor}`}>
                  {item.command}
                </span>
              </div>
            )}
            <div className="ml-4">{item.output}</div>
          </div>
        ))}

        <form onSubmit={handleSubmit} className="flex items-center">
          <span className={`text-${currentTheme.promptColor} mr-2`}>$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className={`flex-1 bg-transparent outline-none text-${currentTheme.textColor}`}
            autoFocus
          />
        </form>
      </div>
    </div>
  );
};

export default Terminal;
