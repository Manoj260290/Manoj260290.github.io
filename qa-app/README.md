# Q&A Management System

A modern, responsive React application for managing questions and answers. Built with React 18, Vite, and modern CSS.

## Features

### Core Functionality
- ✅ **Add Questions**: Create questions with categorization
- ✅ **Add Answers**: Provide multiple answers to any question
- ✅ **Search & Filter**: Search across questions, answers, and categories
- ✅ **Delete Management**: Remove questions and answers with confirmation
- ✅ **Real-time Updates**: Instant UI updates without page refresh

### User Experience
- 🎨 **Modern UI**: Clean, gradient-based design
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile
- ⚡ **Fast Performance**: Built with Vite for optimal speed
- 🔍 **Smart Search**: Search through all content instantly
- 💫 **Smooth Animations**: Fade and slide animations

### Categories
Pre-defined categories include:
- General
- Technology
- Science
- Business
- Education
- Health
- Entertainment
- Sports
- Other

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. **Clone or download the project**
   ```bash
   cd qa-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the URL shown in terminal)

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## How to Use

### Adding a Question
1. Use the "Add New Question" form on the left sidebar
2. Select a category from the dropdown
3. Type your question in the text area
4. Click "Add Question"

### Adding Answers
1. Find the question you want to answer
2. Click the "Add Answer" button below the question
3. Type your answer in the text area
4. Click "Add Answer" to save, or "Cancel" to discard

### Searching
1. Use the search bar in the left sidebar
2. Type any keyword to search through:
   - Question text
   - Answer text
   - Categories
3. Results update instantly as you type
4. Click "Clear" to reset the search

### Deleting Content
- **Delete Question**: Click the 🗑️ icon next to any question
- **Delete Answer**: Click the 🗑️ icon next to any answer
- Confirmation dialogs prevent accidental deletions

## Technical Details

### Built With
- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **CSS3** - Modern CSS with gradients and animations
- **JavaScript ES6+** - Modern JavaScript features

### Project Structure
```
src/
├── components/           # React components
│   ├── QuestionForm.jsx     # Form to add questions
│   ├── QuestionList.jsx     # List of all questions
│   ├── QuestionItem.jsx     # Individual question display
│   ├── AnswerForm.jsx       # Form to add answers
│   ├── AnswerList.jsx       # List of answers
│   └── SearchBar.jsx        # Search functionality
├── App.jsx              # Main application component
├── App.css              # Global application styles
├── index.css            # Global CSS and animations
└── main.jsx             # Application entry point
```

### State Management
- Uses React's built-in `useState` hooks
- State is managed at the App level and passed down
- No external state management library needed

### Responsive Design
- Mobile-first approach
- Breakpoints:
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px

## Customization

### Adding New Categories
Edit the `categories` array in `src/components/QuestionForm.jsx`:

```javascript
const categories = [
  'General',
  'Technology',
  'Your New Category',
  // ... other categories
]
```

### Changing Colors
Main color variables are defined in the CSS files. Key colors:
- Primary: `#667eea` to `#764ba2` (purple gradient)
- Success: `#28a745` to `#20c997` (green gradient)
- Danger: `#dc3545` to `#c82333` (red gradient)
- Info: `#17a2b8` to `#138496` (blue gradient)

### Modifying Animations
Animation keyframes are defined in `src/index.css`:
- `fadeIn` - For question items
- `slideIn` - For form components

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

If you encounter any issues or have questions:
1. Check the browser console for errors
2. Ensure you're using a supported browser
3. Try refreshing the page
4. Clear browser cache if needed

---

**Enjoy managing your Q&A content!** 🚀
