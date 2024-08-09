# FSD Architecture Test - Store

This project is a demonstration of the Feature-Sliced Design (FSD) architecture using React, TypeScript, and various modern web development tools.

## Getting Started

1. Clone the repository
2. Install dependencies: `pnpm install`
3. Start the development server: `pnpm run dev`

## Project Structure

This project follows the FSD architecture:

- `app/`: Application-wide settings, styles, and providers
- `pages/`: Page components that compose features and widgets
- `widgets/`: Composite components used across different pages
- `features/`: Business logic and UI for specific features
- `entities/`: Business entities used in the application
- `shared/`: Reusable functionality, UI components, and utils

## Technologies Used

- React
- TypeScript
- Vite
- Zustand for state management
- React Query for data fetching
- MSW for API mocking
- Tailwind CSS for styling

## Features

- [ ] Product listing
- [ ] Product details
- [ ] Shopping cart
- [ ] Search functionality
