# Task Management Application

A modern, full-featured task management application built with Next.js 15, React 19, and Tailwind CSS. This application provides a comprehensive solution for managing tasks with features like user authentication, task CRUD operations, and an interactive spin wheel for task selection.

## 📸 Screenshots

### Dashboard Overview
![image](https://github.com/user-attachments/assets/dfe94f22-e188-4d7a-92f8-8019e0eea8fb)


### Task Management
![image](https://github.com/user-attachments/assets/663c4432-07cd-4417-bc3b-a0db2cbded12)

![image](https://github.com/user-attachments/assets/9fb0b5fc-8be5-4362-a754-5aad24b85dd3)

![image](https://github.com/user-attachments/assets/ca042a02-912a-4c96-9274-1761179936de)


### Spin Wheel Feature
![image](https://github.com/user-attachments/assets/af9046e1-efb9-497e-9444-cfa4b5323a66)

![image](https://github.com/user-attachments/assets/316ada97-db76-472f-825b-c59936345c97)


### Authentication
![image](https://github.com/user-attachments/assets/eefc4275-b5f1-4864-9aa5-92370cdc1e93)


![image](https://github.com/user-attachments/assets/56b47c06-20df-4d74-bc05-2cc6fcd08a19)

### Not Found Page
![image](https://github.com/user-attachments/assets/4c59b082-560a-4419-99d3-54b0d0606a45)


## 🚀 Features

### Core Functionality
- **User Authentication**: Complete auth system with login, signup, and password reset
- **Task Management**: Create, read, update, and delete tasks
- **Task Status Tracking**: Multiple status options (Pending, Ongoing, Collaborative Task, Done)
- **Interactive Spin Wheel**: Gamified task selection with category filtering
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### User Experience
- **Real-time Notifications**: Toast notifications for user feedback
- **Modern UI Components**: Built with Radix UI primitives
- **Dark/Light Mode Support**: Theme switching capabilities
- **Intuitive Navigation**: Clean and organized dashboard layout

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15.3.4 (App Router)
- **React**: 19.0.0
- **Styling**: Tailwind CSS 4.0
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

### Backend Integration
- **HTTP Client**: Axios
- **Authentication**: JWT with js-cookie
- **Date Handling**: date-fns

### Development Tools
- **Linting**: ESLint with Next.js config
- **Animations**: tw-animate-css
- **Utilities**: clsx, tailwind-merge, class-variance-authority

## 📁 Project Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   ├── signup/
│   │   └── reset-password/
│   ├── (dashboard)/
│   │   └── dashboard/
│   │       ├── add-task/
│   │       ├── edit-task/
│   │       ├── spin-wheel/
│   │       ├── task-details/
│   │       └── task-update/
│   ├── globals.css
│   ├── layout.jsx
│   └── not-found.jsx
├── components/
│   ├── ui/           # Reusable UI components
│   └── ...
├── hooks/            # Custom React hooks
├── lib/              # Utility functions
├── modules/          # Feature modules
│   ├── Auth/
│   ├── Dashboard/
│   └── Reusable/
└── utils/            # Helper utilities
```

## 🚦 Getting Started

### Prerequisites
- **Node.js**: Version 18.0 or higher
- **npm**: Version 8.0 or higher (or yarn/pnpm)
- **Git**: For cloning the repository
- **Backend API**: Ensure your backend server is running on `http://localhost:5000`

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/DarkAsfu/task-management-softvence.git
   cd task-management-softvence
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   

3. **Start the development server**
   ```bash
   npm run dev
   ```
   
   Or with yarn:
   ```bash
   yarn dev
   ```

4. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application running.

### Backend Setup

Make sure your backend API is running on `http://localhost:5000`. The application expects the following API endpoints:

- `POST /api/auth/login` - User authentication
- `POST /api/auth/signup` - User registration
- `GET /api/tasks` - Fetch tasks
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🔐 Authentication

The application uses JWT-based authentication with the following features:
- User registration and login
- Password reset functionality
- Automatic token refresh
- Protected routes with middleware
- Session management with cookies

## 📱 Key Pages

### Authentication Pages
- **Login** (`/login`) - User authentication
- **Signup** (`/signup`) - New user registration
- **Reset Password** (`/reset-password`) - Password recovery

### Dashboard Pages
- **Dashboard** (`/dashboard`) - Main dashboard overview
- **Add Task** (`/dashboard/add-task`) - Create new tasks
- **Edit Task** (`/dashboard/edit-task`) - Modify existing tasks
- **Task Details** (`/dashboard/task-details/[id]`) - View task information
- **Spin Wheel** (`/dashboard/spin-wheel`) - Interactive task selection

## 🎨 UI Components

Built with Radix UI primitives for accessibility and customization:
- Avatar, Button, Card, Checkbox
- Dialog, Dropdown Menu, Label, Select
- Form components with validation
- Responsive design patterns

## 🔧 API Integration

The application integrates with a REST API for:
- User authentication (`/api/auth/*`)
- Task management (`/api/tasks/*`)
- User profile management (`/api/users/*`)

## 🎯 Spin Wheel Feature

Interactive task selection with:
- Category-based filtering
- Visual wheel animation
- Audio feedback
- Responsive design
- Category management

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm run start
```

### Deploy to Vercel
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy automatically on push

```bash
npx vercel
```

### Deploy to Netlify
```bash
npm run build
# Upload the .next folder to Netlify
```

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Kill process on port 3000
   npx kill-port 3000
   ```

2. **Module not found errors**
   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **API connection issues**
   - Ensure backend server is running on port 5000
   - Check CORS configuration on backend
   - Verify API endpoints are accessible

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the [GitHub repository](https://github.com/DarkAsfu/task-management-softvence/issues)
- Check the documentation
- Review existing issues and discussions

## 🔄 Version History

- **v0.1.0** - Initial release with core task management features
  - Authentication system implementation
  - Spin wheel interactive feature
  - Responsive dashboard design

## 👥 Authors

- **DarkAsfu** - *Initial work* - [GitHub Profile](https://github.com/DarkAsfu)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Radix UI for accessible components
- Tailwind CSS for utility-first styling
- All contributors and testers

---

Built with ❤️ using Next.js and React

**Repository**: [https://github.com/DarkAsfu/task-management-softvence](https://github.com/DarkAsfu/task-management-softvence)
```

This updated README includes:

1. **Proper GitHub installation process** with your specific repository URL
2. **Screenshots section** with placeholders for project images
3. **Detailed installation steps** with prerequisites and troubleshooting
4. **Environment variables setup** with examples
5. **Deployment instructions** for multiple platforms
6. **Contributing guidelines** and support information
7. **Professional formatting** with proper sections and navigation

You can now add your actual screenshots to a `screenshots/` directory in your project and update the image paths in the README accordingly.
