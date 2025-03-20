// components/Terminal.tsx
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import commandsData from "@/data/commands.json";
import profileData from "@/data/profile.json";

type TerminalHistoryItem = {
  command: string;
  output: React.ReactNode;
};

const Terminal = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<TerminalHistoryItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Initialize terminal with welcome message
  useEffect(() => {
    if (!isInitialized) {
      const welcomeOutput = (
        <div className="text-green-400">
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
            Type <span className="text-yellow-400">help</span> to see available
            commands.
          </p>
        </div>
      );

      setHistory([{ command: "", output: welcomeOutput }]);
      setIsInitialized(true);
    }
  }, [isInitialized]);

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

    // Process different commands
    switch (command) {
      case "help":
        output = (
          <div>
            <p className="font-bold text-green-400 mb-2">Available Commands:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
              {commandsData.commands.map((cmd, index) => (
                <div key={index} className="flex">
                  <span className="text-yellow-400 w-24">{cmd.name}</span>
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
              <span className="text-green-400 font-bold">{aboutData.name}</span>
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
            <p className="font-bold text-green-400 mb-2">Technical Skills:</p>

            <div className="mb-2">
              <p className="text-yellow-400 mb-1">Languages:</p>
              <div className="flex flex-wrap gap-2">
                {skillsData.languages.map((skill: any, index: number) => (
                  <span
                    key={index}
                    className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-sm"
                  >
                    {skill.name} <span className="text-green-400">•</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-2">
              <p className="text-yellow-400 mb-1">Frameworks:</p>
              <div className="flex flex-wrap gap-2">
                {skillsData.frameworks.map((skill: any, index: number) => (
                  <span
                    key={index}
                    className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-sm"
                  >
                    {skill.name} <span className="text-green-400">•</span>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-yellow-400 mb-1">Tools:</p>
              <div className="flex flex-wrap gap-2">
                {skillsData.tools.map((skill: any, index: number) => (
                  <span
                    key={index}
                    className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-sm"
                  >
                    {skill.name} <span className="text-green-400">•</span>
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
            <p className="font-bold text-green-400 mb-2">Projects:</p>
            <div className="space-y-4">
              {projectsData.projects.map((project: any, index: number) => (
                <div
                  key={index}
                  className="border border-gray-700 p-3 rounded bg-gray-900"
                >
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-yellow-400 font-bold">
                      {project.title}
                    </h3>
                    {project.featured && (
                      <span className="bg-green-900 text-green-400 text-xs px-2 py-0.5 rounded">
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
            <p className="font-bold text-green-400 mb-2">Work Experience:</p>
            <div className="space-y-4">
              {experienceData.experiences.map((job: any, index: number) => (
                <div key={index} className="border-l-2 border-gray-700 pl-4">
                  <div className="flex justify-between mb-1">
                    <h3 className="text-yellow-400 font-bold">{job.title}</h3>
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
            <p className="font-bold text-green-400 mb-2">Education:</p>
            <div className="space-y-4">
              {educationData.education.map((edu: any, index: number) => (
                <div key={index} className="border-l-2 border-gray-700 pl-4">
                  <div className="flex justify-between mb-1">
                    <h3 className="text-yellow-400 font-bold">{edu.degree}</h3>
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
            <p className="font-bold text-green-400 mb-2">
              Contact Information:
            </p>
            <p className="mb-1">
              <span className="text-yellow-400">Email:</span>
              <a
                href={`mailto:${contactData.email}`}
                className="text-blue-400 ml-2 hover:underline"
              >
                {contactData.email}
              </a>
            </p>
            <p className="mb-2">
              <span className="text-yellow-400">Phone:</span>
              <span className="text-gray-300 ml-2">{contactData.phone}</span>
            </p>

            <p className="text-yellow-400 mb-1">Social Media:</p>
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
          <p className="text-green-400">Opening resume in a new tab...</p>
        );
        break;

      case "clear":
        setHistory([]);
        return;

      default:
        output = (
          <p className="text-red-400">
            Command not found: {command}. Type{" "}
            <span className="text-yellow-400">help</span> to see available
            commands.
          </p>
        );
    }

    setHistory([...history, { command, output }]);
    setInput("");
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
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
        className="flex-1 bg-gray-950 p-4 overflow-y-auto font-mono text-sm text-gray-200 rounded-b-md"
      >
        {history.map((item, index) => (
          <div key={index} className="mb-4">
            {item.command && (
              <div className="flex items-center mb-1">
                <span className="text-green-400 mr-2">$</span>
                <span className="text-white">{item.command}</span>
              </div>
            )}
            <div className="ml-4">{item.output}</div>
          </div>
        ))}

        <form onSubmit={handleSubmit} className="flex items-center">
          <span className="text-green-400 mr-2">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            className="flex-1 bg-transparent outline-none"
            autoFocus
          />
        </form>
      </div>
    </div>
  );
};

export default Terminal;
