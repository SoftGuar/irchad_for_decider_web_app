# IRCHAD Frontend - Decision Maker Dashboard

A comprehensive React/Next.js dashboard application for decision makers to monitor and analyze navigation data, user activity, sales metrics, and system performance.

## 🚀 Features

### Dashboard Analytics
- **Zones & Navigation Dashboard**: Monitor navigation patterns, obstacle analysis, and routing efficiency
- **Users Dashboard**: Track user activity with daily, weekly, and monthly analytics
- **Sales Dashboard**: Analyze quotation performance, conversion rates, and customer metrics
- **Real-time Notifications**: WebSocket-powered notification system with in-app alerts

### Key Components
- **Interactive Charts**: Time-spent analysis, POI visits, obstacle mapping, and success rates
- **Data Visualization**: Bar charts, line graphs, and statistical displays using Chart.js
- **PDF Report Generation**: Comprehensive analytics reports with charts and insights
- **User Management**: Profile management with role-based access control

### Technical Features
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Real-time Updates**: WebSocket integration for live notifications
- **Type Safety**: Full TypeScript implementation
- **API Integration**: RESTful API consumption with proper error handling

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Chart.js / React-Chartjs-2
- **PDF Generation**: jsPDF with autoTable
- **State Management**: React Context API
- **HTTP Client**: Fetch API with custom service layer
- **Real-time**: WebSocket for notifications
- **Icons**: Heroicons, Lucide React

## 📦 Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd irchad_front_decideur
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. **Environment Setup**
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_URL=your_api_base_url
NEXT_PUBLIC_WS_URL=your_websocket_url
```

4. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000) to see the result.

## 📁 Project Structure

```
src/
├── app/
│   ├── (logged_in)/                 # Protected routes
│   │   ├── profile/                 # User profile management
│   │   ├── users_dashboard/         # User analytics dashboard
│   │   ├── sales_dashboard/         # Sales metrics dashboard
│   │   └── zones_dashboard/         # Navigation analytics
│   ├── components/
│   │   ├── cards/                   # Reusable card components
│   │   ├── shared/                  # Shared UI components
│   │   │   ├── navbar/              # Navigation bar
│   │   │   ├── sidebar/             # Side navigation
│   │   │   └── footer/              # Footer component
│   │   └── ui/                      # Base UI components
│   ├── login/                       # Authentication pages
│   └── layout.tsx                   # Root layout
├── services/                        # API service layer
│   ├── apiService.ts               # Base API configuration
│   ├── userApi.ts                  # User-related endpoints
│   ├── zonesApi.ts                 # Navigation analytics APIs
│   ├── deviceApi.ts                # Device management APIs
│   └── notificationsApi.ts         # Notification services
├── type/                           # TypeScript type definitions
│   ├── user.ts                     # User interfaces
│   ├── device.ts                   # Device interfaces
│   ├── notifications.ts            # Notification types
│   └── environment.ts              # Environment/Zone types
├── utils/                          # Utility functions and contexts
│   ├── userContext.tsx             # User state management
│   └── notificationsContext.tsx    # Notification state management
└── globals.css                     # Global styles and Tailwind config
```

## 🎯 Key Features Detail

### Navigation Analytics
- **Zone Monitoring**: Track time spent in different zones with visual charts
- **Obstacle Analysis**: Identify areas with highest obstacle counts
- **POI Tracking**: Monitor most visited points of interest
- **Success Rates**: Analyze navigation completion rates with decimal precision
- **Routing Logs**: Detailed navigation history with timestamps and durations

### User Activity Dashboard
- **Multi-timeframe Analysis**: Daily, weekly, and monthly user activity trends
- **User Comments**: Feedback collection and analysis
- **Activity Patterns**: Identify usage peaks and engagement trends
- **Export Capabilities**: Generate comprehensive PDF reports

### Sales Intelligence
- **Quotation Analytics**: Track conversion rates and performance metrics
- **Customer Insights**: Analyze new vs. existing customer patterns
- **Product Performance**: Monitor most quoted products and conversion rates
- **Revenue Tracking**: Comprehensive sales analytics with trend analysis

### Real-time Notifications
- **WebSocket Integration**: Live notification delivery
- **Multi-channel Support**: In-app, email, and push notification support
- **Interactive Management**: Mark as read/unread, delete, bulk operations
- **Priority Handling**: Support for different notification priorities

## 🔧 API Integration

The application integrates with multiple backend services:

- **Analytics APIs**: `/analytics/zones/*`, `/analytics/users/*`, `/analytics/navigation/*`
- **User Management**: `/users/*`, `/admin/users/*`
- **Device Management**: `/admin/dispositives/*`
- **Notifications**: WebSocket + REST API for notification management

## 📊 Chart Components

### Time Spent Analysis
- Line charts showing zone visit duration
- Converts seconds to minutes for better readability
- Zone name mapping for user-friendly display

### POI Visualization
- Bar charts for point of interest popularity
- Visit count tracking and trending

### Obstacle Mapping
- Visual representation of areas with navigation challenges
- Helps prioritize improvement efforts

### Success Rate Metrics
- Percentage displays with 2 decimal precision
- Color-coded indicators for performance levels

## 🎨 Styling & Theme

- **Dark Theme**: Professional dark color scheme with orange accents
- **Responsive Grid**: CSS Grid and Flexbox for layout management
- **Custom Components**: Consistent design system with reusable components
- **Loading States**: Elegant loading animations and skeleton screens

## 📱 Responsive Design

- **Mobile-First**: Optimized for mobile devices
- **Breakpoint System**: Tailwind's responsive utility classes
- **Adaptive Layouts**: Grid systems that adjust to screen size
- **Touch-Friendly**: Appropriate sizing for mobile interactions

## 🔒 Authentication & Security

- **Protected Routes**: Route-based access control
- **User Context**: Centralized user state management
- **Role-Based Access**: Different access levels based on user roles
- **Secure API Calls**: Token-based authentication

## 📈 Performance Optimization

- **Code Splitting**: Route-based code splitting with Next.js
- **Image Optimization**: Next.js Image component for optimized loading
- **Lazy Loading**: Components loaded on demand
- **Memoization**: React.memo and useMemo for performance optimization

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm start
```

### Deploy on Vercel
The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

### Environment Variables
Ensure all environment variables are properly set in your production environment.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📚 Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [React Documentation](https://reactjs.org/docs) - learn about React
- [Tailwind CSS](https://tailwindcss.com/docs) - utility-first CSS framework
- [Chart.js Documentation](https://www.chartjs.org/docs/) - data visualization library
- [TypeScript Documentation](https://www.typescriptlang.org/docs/) - typed JavaScript

## 📝 License

This project is proprietary software developed for IRCHAD navigation systems.

## 📞 Support

For technical support or questions about the dashboard, please contact the development team.

---

**Built with ❤️ for IRCHAD Decision Makers**
