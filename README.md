# NestJS GPT WhatsApp Integration

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18-brightgreen.svg)](https://nodejs.org/)
[![NestJS](https://img.shields.io/badge/framework-NestJS-red.svg)](https://nestjs.com/)

A powerful conversational assistant that integrates OpenAI's GPT language model with WhatsApp to create intelligent, automated chat responses. Built with NestJS for robust, scalable backend architecture.

## 🚀 Features

- **Smart Conversations**: Powered by OpenAI's GPT for natural language understanding and generation
- **WhatsApp Integration**: Seamless integration with WhatsApp Business API
- **Real-time Processing**: Instant message processing and responses
- **Scalable Architecture**: Built on NestJS framework for enterprise-grade applications
- **Environment Configuration**: Flexible configuration management
- **Error Handling**: Comprehensive error handling and logging
- **Rate Limiting**: Built-in protection against API abuse

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** package manager
- **WhatsApp Business Account** - [Setup guide](https://business.whatsapp.com/)
- **OpenAI API Key** - [Get your key](https://platform.openai.com/api-keys)
- **Meta Developer Account** (for WhatsApp Business API) - [Register here](https://developers.facebook.com/)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/maisacmoraes/nestjs-gpt-whatsapp.git
   cd nestjs-gpt-whatsapp
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables** (see [Configuration](#configuration) section)

5. **Run the application**
   ```bash
   # Development
   npm run start:dev

   # Production
   npm run build
   npm run start:prod
   ```

## 🔧 Configuration

Create a `.env` file in the root directory with the following variables:

```env
# Application
PORT=3000
NODE_ENV=development

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-3.5-turbo
OPENAI_MAX_TOKENS=150
OPENAI_TEMPERATURE=0.7

# WhatsApp Business API Configuration
WHATSAPP_TOKEN=your_whatsapp_business_token
WHATSAPP_VERIFY_TOKEN=your_webhook_verify_token
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
WHATSAPP_BUSINESS_ACCOUNT_ID=your_business_account_id

# Webhook Configuration
WEBHOOK_URL=https://your-domain.com/webhook

# Database (if applicable)
DATABASE_URL=your_database_connection_string

# Logging
LOG_LEVEL=info
```

### WhatsApp Setup

1. **Create a Meta Developer App**
   - Go to [Meta for Developers](https://developers.facebook.com/)
   - Create a new app and add WhatsApp product

2. **Configure Webhook**
   - Set webhook URL to: `https://your-domain.com/webhook`
   - Subscribe to message events
   - Use the verify token from your `.env` file

3. **Get Required Tokens**
   - Phone Number ID from WhatsApp API setup
   - Permanent access token
   - Business Account ID

### OpenAI Setup

1. **Get API Key**
   - Visit [OpenAI Platform](https://platform.openai.com/)
   - Create an account and generate an API key
   - Add billing information if required

2. **Choose Model**
   - `gpt-3.5-turbo`: Cost-effective, good performance
   - `gpt-4`: Higher quality responses, higher cost

## 🚀 Usage

### Starting the Application

```bash
# Development mode with hot reload
npm run start:dev

# Production mode
npm run start:prod

# Debug mode
npm run start:debug
```

### API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/webhook` | GET | WhatsApp webhook verification |
| `/webhook` | POST | Receive WhatsApp messages |
| `/health` | GET | Application health check |

### Example Message Flow

1. **User sends message** via WhatsApp
2. **Webhook receives** the message
3. **GPT processes** the message and generates response
4. **Response sent back** via WhatsApp API

### Testing

```bash
# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e

# Run test coverage
npm run test:cov
```

## 📁 Project Structure

```
nestjs-gpt-whatsapp/
├── src/
│   ├── app.module.ts          # Main application module
│   ├── main.ts                # Application entry point
│   ├── common/                # Shared utilities and guards
│   ├── config/                # Configuration modules
│   ├── gpt/                   # OpenAI GPT integration
│   ├── whatsapp/              # WhatsApp Business API integration
│   └── webhook/               # Webhook handling
├── test/                      # Test files
├── dist/                      # Compiled output
├── node_modules/              # Dependencies
├── .env                       # Environment variables
├── .env.example               # Environment template
├── nest-cli.json              # NestJS CLI configuration
├── package.json               # Project dependencies and scripts
├── tsconfig.json              # TypeScript configuration
└── README.md                  # Project documentation
```

### Key Components

- **GPT Module**: Handles OpenAI API communication and prompt management
- **WhatsApp Module**: Manages WhatsApp Business API integration
- **Webhook Module**: Processes incoming webhook events
- **Config Module**: Manages environment configuration and validation

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Add tests** for new functionality
5. **Run tests** to ensure everything works
   ```bash
   npm run test
   npm run test:e2e
   ```
6. **Commit your changes**
   ```bash
   git commit -m "feat: add your feature description"
   ```
7. **Push to your branch**
   ```bash
   git push origin feature/your-feature-name
   ```
8. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style and conventions
- Write meaningful commit messages
- Add unit tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

### Code Style

- Use TypeScript for type safety
- Follow NestJS best practices and patterns
- Use meaningful variable and function names
- Add JSDoc comments for public APIs
- Maintain consistent indentation (2 spaces)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 Maisa Moraes

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 🆘 Support

If you encounter any issues or have questions:

- Create an [Issue](https://github.com/maisacmoraes/nestjs-gpt-whatsapp/issues)
- Check existing [Discussions](https://github.com/maisacmoraes/nestjs-gpt-whatsapp/discussions)
- Review the [Wiki](https://github.com/maisacmoraes/nestjs-gpt-whatsapp/wiki) (when available)

## 🗺️ Roadmap

- [ ] Add support for multiple OpenAI models
- [ ] Implement conversation memory/context
- [ ] Add support for media messages (images, audio)
- [ ] Create admin dashboard
- [ ] Add analytics and metrics
- [ ] Implement user authentication
- [ ] Add support for group chats
- [ ] Multi-language support

---

**Made with ❤️ by [Maisa Moraes](https://github.com/maisacmoraes)**
