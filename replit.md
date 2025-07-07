# Life Counseling Chat Application

## Overview

This is a full-stack life counseling chat application built with React, Express, and TypeScript. The application provides an AI-powered counseling service using OpenAI's GPT-4o model, featuring a warm and supportive user interface with voice input capabilities. The app is designed to offer emotional support and life guidance in Japanese, creating a comfortable environment for users to share their concerns.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Framework**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Voice Recognition**: Web Speech API integration for Japanese voice input

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Integration**: OpenAI GPT-4o for AI responses
- **Development**: Hot reload with Vite middleware in development

### Data Storage Solutions
- **ORM**: Drizzle ORM with Zod schema validation
- **Database**: PostgreSQL (configured for Neon Database)
- **In-Memory Storage**: Fallback implementation for development
- **Schema**: Users, chat sessions, and messages with proper relationships

## Key Components

### Core Features
1. **Chat Interface**: Real-time messaging with AI counselor
2. **Voice Input**: Japanese speech recognition for accessibility
3. **Session Management**: Persistent conversation history
4. **Settings Management**: API key configuration and history clearing
5. **Responsive Design**: Mobile-first approach with adaptive layouts

### UI Components
- **Chat Area**: Message display with user/assistant differentiation
- **Message Input**: Text and voice input with real-time feedback
- **Settings Modal**: Configuration interface for API keys
- **Error Handling**: Toast notifications and error boundaries

### Backend Services
- **OpenAI Service**: GPT-4o integration with counseling-specific prompts
- **Storage Service**: Abstract storage interface with memory implementation
- **Route Handlers**: RESTful API endpoints for chat operations

## Data Flow

1. **User Input**: Messages entered via text or voice recognition
2. **Session Creation**: New chat sessions created automatically on first message
3. **Message Storage**: All messages stored with role (user/assistant) and timestamps
4. **AI Processing**: Messages sent to OpenAI with counseling context
5. **Response Handling**: AI responses stored and displayed in real-time
6. **State Management**: React Query manages caching and synchronization

## External Dependencies

### Core Dependencies
- **@tanstack/react-query**: Server state management and caching
- **@neondatabase/serverless**: PostgreSQL database connectivity
- **drizzle-orm**: Type-safe database ORM
- **openai**: Official OpenAI API client
- **@radix-ui/***: Accessible UI component primitives

### Development Tools
- **@replit/vite-plugin-***: Replit-specific development plugins
- **tailwindcss**: Utility-first CSS framework
- **typescript**: Type safety and development experience
- **vite**: Fast build tool and development server

### UI and Styling
- **shadcn/ui**: Pre-built accessible components
- **class-variance-authority**: Component variant management
- **tailwind-merge**: CSS class merging utility
- **lucide-react**: Icon library

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server with Express middleware
- **Hot Reload**: Automatic code reloading for both client and server
- **Environment Variables**: API keys and database URLs via .env
- **TypeScript Compilation**: Real-time type checking and compilation

### Production Build
- **Client Build**: Vite production build with optimization
- **Server Build**: esbuild bundling for Node.js deployment
- **Static Assets**: Served from Express in production
- **Database Migration**: Drizzle Kit for schema deployment

### Configuration
- **API Keys**: OpenAI API key required for AI functionality
- **Database**: PostgreSQL URL for persistent storage
- **Fallback Storage**: In-memory storage when database unavailable

## Changelog

- July 04, 2025. Enhanced UI design with colorful animated background, improved contrast and readability
- July 02, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.