# Terminal Portfolio

A unique, interactive terminal-themed portfolio website built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion. This portfolio simulates a command-line interface while showcasing your skills, projects, experience, and education in an engaging way.

![Terminal Portfolio Screenshot](/public/images/screenshot.png)

## Features

- 🖥️ **Interactive Terminal Interface** - Simulates a real command-line experience
- ⌨️ **Custom Commands** - Navigate your portfolio using familiar terminal commands
- 📱 **Responsive Design** - Optimized for all device sizes from mobile to desktop
- 🔄 **Data-Driven Content** - All content stored in JSON files for easy updates
- ✨ **Animated Transitions** - Smooth animations using Framer Motion
- 🎨 **Modern Design** - Clean, terminal-inspired UI with a dark theme
- 🧩 **ShadCN UI Integration** - Uses modern component library for consistent styling
- 📊 **Project Showcase** - Display your work in an organized, visually appealing way
- 🔍 **Command History** - Navigate through previously used commands
- 🌦️ **Weather Integration** - Shows current weather with the `weather` command
- 🎵 **Spotify Integration** - Displays your music taste with the `music` command
- 📊 **GitHub Activity** - Showcases your recent GitHub contributions
- 💻 **Interactive Code Snippets** - Demonstrates your code with the `demo` command
- 📊 **Visitor Analytics** - Shows site statistics with the `stats` command
- 💬 **Real-time Chat** - Allows visitors to contact you directly
- 📄 **PDF Generation** - Creates customized resume PDFs on demand
- 📝 **Blog Integration** - Displays your latest blog posts
- ⏳ **Interactive Timeline** - Shows your career journey
- 🎮 **Mini Terminal Games** - Includes games like hangman and tic-tac-toe
- 📱 **QR Code Generator** - Creates QR codes for your contact information
- 🔍 **Skills Tree** - Visual representation of your technical skills

## Getting Started

### Prerequisites

- Node.js 18.17.0 or later
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/terminal-portfolio.git
cd terminal-portfolio
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Customization

### JSON Data Files

All portfolio content is stored in JSON files in the `data` directory. Update these files to customize your portfolio:

- `profile.json` - Your name, title, bio, and profile image
- `skills.json` - Your technical skills categorized by type
- `projects.json` - Your portfolio projects with descriptions and links
- `experience.json` - Your work experience history
- `education.json` - Your educational background
- `contact.json` - Your contact information and social media links
- `commands.json` - Available terminal commands

### Images and Files

- Place your profile image at `/public/images/profile.jpg`
- Add project images to `/public/images/projects/`
- Add your resume at `/public/files/resume.pdf`

### Themes and Styling

The terminal appearance can be customized by modifying the CSS variables in `app/globals.css`.

## Available Commands

- `help` - Shows available commands
- `about` - Displays information about you
- `skills` - Lists your technical skills
- `projects` - Shows your portfolio projects
- `experience` - Displays your work experience
- `education` - Shows your educational background
- `contact` - Displays your contact information
- `resume` - Opens your resume in a new tab
- `clear` - Clears the terminal
- `weather` - Shows current weather
- `music` - Displays your music taste
- `github` - Shows your GitHub activity
- `demo` - Demonstrates code examples
- `stats` - Shows visitor statistics
- `chat` - Opens a real-time chat
- `generate-resume` - Creates a custom PDF resume
- `blog` - Shows your latest blog posts
- `timeline` - Displays your career journey
- `play` - Access mini terminal games
- `qrcode` - Generates QR codes
- `skilltree` - Shows your skills visualization

## Deployment

This portfolio can be easily deployed to [Vercel](https://vercel.com/), [Netlify](https://www.netlify.com/), or any other hosting service that supports Next.js applications.

### Deploy to Vercel

The easiest way to deploy your portfolio is to use Vercel:

```bash
npm install -g vercel
vercel
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- This project uses [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Framer Motion](https://www.framer.com/motion/) for animations
- [ShadCN UI](https://ui.shadcn.com/) for UI components
- [Lucide Icons](https://lucide.dev/) for icons
