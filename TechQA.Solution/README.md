# TechQA - Technology Question & Answer Management System

A comprehensive microservices-based application for managing technology sections and their question-answer pairs, built with Domain-Driven Design (DDD) principles.

## Architecture Overview

This solution implements a microservices architecture with the following components:

- **API Gateway** - Ocelot-based gateway for routing requests
- **Section Service** - Manages technology sections
- **QA Service** - Manages question-answer pairs
- **Shared Kernel** - Common domain models and base classes
- **React Frontend** - Modern UI built with React and TypeScript

## Technology Stack

### Backend
- .NET 8.0
- Entity Framework Core with SQL Server
- Ocelot API Gateway
- Domain-Driven Design (DDD)
- CQRS pattern with Result types

### Frontend
- React 18
- TypeScript
- Axios for HTTP requests
- Modern CSS with responsive design

### Infrastructure
- Docker & Docker Compose
- SQL Server 2022
- Nginx (for frontend)

## Features

- ✅ **Technology Section Management**
  - Create, read, update, delete sections
  - Section-based organization

- ✅ **Question-Answer Management**
  - Add questions with detailed answers
  - Edit existing Q&A pairs
  - Mark questions as completed
  - Progress tracking per section

- ✅ **Progress Tracking**
  - Visual progress bars
  - Completion percentages
  - Section-wise statistics

- ✅ **Modern UI/UX**
  - Responsive design
  - Interactive components
  - Real-time updates

## Getting Started

### Prerequisites

- [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js 18+](https://nodejs.org/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- SQL Server (or use Docker container)

### Option 1: Running with Docker Compose (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd TechQA.Solution
   ```

2. **Generate HTTPS certificates for development**
   ```bash
   dotnet dev-certs https -ep ~/.aspnet/https/aspnetapp.pfx -p password
   dotnet dev-certs https --trust
   ```

3. **Start all services**
   ```bash
   docker-compose up --build
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - API Gateway: http://localhost:5000 (HTTPS: https://localhost:7000)
   - Section Service: http://localhost:5001 (HTTPS: https://localhost:7001)
   - QA Service: http://localhost:5002 (HTTPS: https://localhost:7002)

### Option 2: Running Locally

#### Backend Services

1. **Start SQL Server**
   ```bash
   docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=YourStrong@Passw0rd" \
   -p 1433:1433 --name techqa-sql \
   -d mcr.microsoft.com/mssql/server:2022-latest
   ```

2. **Run database migrations**
   ```bash
   # Section Service
   cd src/Services/SectionService/TechQA.SectionService
   dotnet ef database update

   # QA Service
   cd ../../../QAService/TechQA.QAService
   dotnet ef database update
   ```

3. **Start the services**
   ```bash
   # Terminal 1 - Section Service
   cd src/Services/SectionService/TechQA.SectionService
   dotnet run

   # Terminal 2 - QA Service
   cd src/Services/QAService/TechQA.QAService
   dotnet run

   # Terminal 3 - API Gateway
   cd src/ApiGateway/TechQA.ApiGateway
   dotnet run
   ```

#### Frontend

1. **Install dependencies**
   ```bash
   cd qa-app
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Access the application**
   - Frontend: http://localhost:5173

## Project Structure

```
TechQA.Solution/
├── src/
│   ├── SharedKernel/           # Common domain models and base classes
│   │   └── TechQA.SharedKernel/
│   ├── Services/
│   │   ├── SectionService/     # Technology sections microservice
│   │   │   └── TechQA.SectionService/
│   │   └── QAService/          # Question-answer microservice
│   │       └── TechQA.QAService/
│   └── ApiGateway/             # Ocelot API Gateway
│       └── TechQA.ApiGateway/
├── qa-app/                     # React frontend
└── docker-compose.yml          # Docker orchestration
```

## Domain-Driven Design Implementation

### Shared Kernel
- **Entity<T>** - Base entity with domain events
- **AggregateRoot<T>** - Base aggregate root
- **ValueObject** - Base value object
- **Result<T>** - Result pattern for error handling
- **IDomainEvent** - Domain event interface

### Section Service Domain
- **TechnologySection** (Aggregate Root)
- **SectionName** (Value Object)
- **Domain Events**: SectionCreated, SectionUpdated, SectionDeleted

### QA Service Domain
- **QuestionAnswer** (Aggregate Root)
- **Question, Answer** (Value Objects)
- **Domain Events**: QuestionAnswerCreated, QuestionAnswerUpdated, QuestionAnswerCompleted

## API Endpoints

### Sections API (via API Gateway)
- `GET /api/sections` - Get all sections
- `GET /api/sections/{id}` - Get section by ID
- `POST /api/sections` - Create new section
- `PUT /api/sections/{id}` - Update section
- `DELETE /api/sections/{id}` - Delete section

### Questions API (via API Gateway)
- `GET /api/questions` - Get all questions
- `GET /api/questions/{id}` - Get question by ID
- `GET /api/questions/section/{sectionId}` - Get questions by section
- `POST /api/questions` - Create new question
- `PUT /api/questions/{id}` - Update question
- `PATCH /api/questions/{id}/toggle-completion` - Toggle completion status
- `DELETE /api/questions/{id}` - Delete question
- `GET /api/questions/section/{sectionId}/progress` - Get section progress

## Development

### Adding New Features

1. **Domain Layer**: Add new entities, value objects, or domain events
2. **Application Layer**: Implement application services and interfaces
3. **Infrastructure Layer**: Add repositories and data configurations
4. **API Layer**: Create controllers and configure routing
5. **Frontend**: Add new components and integrate with APIs

### Running Tests

```bash
# Run all tests
dotnet test

# Run specific project tests
dotnet test src/Services/SectionService/TechQA.SectionService.Tests/
```

### Database Migrations

```bash
# Add new migration
dotnet ef migrations add MigrationName

# Update database
dotnet ef database update

# Remove last migration
dotnet ef migrations remove
```

## Deployment

### Production Deployment

1. **Configure production settings**
   - Update connection strings
   - Set environment variables
   - Configure SSL certificates

2. **Build and deploy with Docker**
   ```bash
   docker-compose -f docker-compose.prod.yml up --build -d
   ```

3. **Run database migrations**
   ```bash
   docker exec techqa-section-service dotnet ef database update
   docker exec techqa-qa-service dotnet ef database update
   ```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions, please open an issue in the GitHub repository.