 PDF To Markdown Converter
Debug View
Result View
(anonymous)
cf0.ai
Codebase Technical Documentation
Generated: October 28, 2025

AI-Powered Stock Analysis Platform

Table of Contents
System Overview
Architecture Overview
Frontend Architecture (React + TypeScript)
Backend Architecture (FastAPI + Python)
Multi-Agent Analysis System (LangGraph)
RAG System (Pinecone + OpenAI)
ChatBot System (Fast Mode & Build Mode)
Database Layer (Firebase Firestore)
Data Sources & APIs
Report Generation & Templates
Version History & Undo System
Deployment & Configuration
1. System Overview
cf0.ai is an AI-powered stock analysis platform that combines real-time market data with advanced AI analysis
to assist investors in making informed decisions. The platform features a modern React-based web application
and utilizes a sophisticated multi-agent AI system orchestrated by LangGraph.

Key Capabilities:
Multi-agent AI analysis system with specialized agents for different analysis types
Real-time financial data integration from multiple sources (FMP, Finnhub, Benzinga, SEC)
Agentic RAG system with Pinecone vector database for intelligent report querying
Interactive ChatBot with dual modes: Fast Mode (Q&A;) and Build Mode (report editing)
Subsection-aware report editing with preview/approval workflow
Version history system with undo capability (up to 10 versions)
Dynamic chart generation using Vega/Altair with 10+ chart types
PDF report generation with comprehensive formatting
Template system for reusable analysis structures
Investor-type specific checkpoint validation (Value, Growth, Dividend, Momentum)
2. Architecture Overview
The platform follows a modern three-tier architecture with complete separation of concerns:

2.1 Technology Stack
Layer Technology Purpose
Frontend React 18 + TypeScript User interface
Vite Build tool & dev server
React Router Client-side routing
Zustand State management
Axios HTTP client
Vega-Embed Chart rendering
Backend FastAPI REST API server
Python 3.11 Core language
Uvicorn ASGI server
Pydantic Data validation
AI/ML LangGraph Agent orchestration
OpenAI GPT-5-mini Primary LLM
Anthropic Claude 3.5 Secondary LLM
Pinecone Vector database
OpenAI Embeddings Text embeddings
Database Firebase Firestore Document database
Firebase Auth Authentication
Data Financial Modeling Prep 29 financial endpoints
Finnhub Insider trading data
Benzinga News & sentiment
SEC EDGAR SEC filings
3. Frontend Architecture (React + TypeScript)
The frontend is a modern single-page application built with React 18 and TypeScript, providing a responsive
and interactive user experience.

3.1 Directory Structure
frontend/ # Dual-mode chatbot nnn src/ nn nnnn nnn components/ # Reusable UI components ... n nnn pages/ # Route-level pages n n (^) nnnn n nnn ChatBot.tsx
Dashboard.tsx # Main dashboard nnn Templates.tsx # Template management n n nnn ReportDetailPage.tsx # Report viewer n n nnn ... n nnn services/ # API clientsn n
nmain.tsx # Entry point n nnn api.ts # Axios-based API layer n nnn App.tsx # Root component n nnn

3.2 Key Components
ChatBot.tsx
Dual-mode chatbot with Fast Mode (RAG Q&A;) and Build Mode (report editing). Features subsection-aware
editing, preview/approval workflow, undo button, and inline chart rendering.

ReportDetailPage.tsx
Displays analysis reports with dynamic tab-based navigation, Vega chart rendering, and real-time updates via
custom 'reportUpdated' events.

Dashboard.tsx
Main landing page showing user's analysis reports with filtering and search capabilities.

Templates.tsx
Template management interface for saving, viewing, editing, and applying reusable analysis structures.

3.3 State Management
The application uses Zustand for lightweight state management, primarily for authentication state. Most data
flows through React Query patterns with Axios for API communication.

4. Backend Architecture (FastAPI + Python)
The backend is built with FastAPI, providing a high-performance REST API with automatic OpenAPI
documentation and async request handling.

4.1 Directory Structure
backend/ Report CRUD + edit operations nnn main.py # FastAPI app initialization n nnn chat.py # ChatBot endpoint nnn routers/ nn nnnnnn analysis.py # reports.py #
Analysis execution Business logic nnn middleware/ # Auth & CORSn nnn templates.py # Template management nnn services/ #
4.2 Key API Endpoints
Endpoint Method Purpose
/api/reports GET List user reports
/api/reports/{id} GET Get report details
/api/reports/{id}/apply-edit POST Apply report edit
/api/reports/{id}/undo POST Undo last edit
/api/chat POST ChatBot query (Fast/Build)
/api/analysis/execute POST Run new analysis
/api/templates GET/POST Template CRUD
4.3 Report Edit System
The report editing system supports subsection-aware updates using regex pattern matching. When an edit
specifies a subsection (e.g., "Executive Summary"), the system:

Saves current version to version history (up to 10 versions)
Parses markdown to find exact subsection using regex pattern
Replaces only that subsection content (not append)
Preserves report metadata and nesting structure
Saves to Firebase Firestore
Re-ingests entire report to Pinecone for RAG freshness
5. Multi-Agent Analysis System (LangGraph)
The core of cf0.ai is a sophisticated multi-agent system orchestrated by LangGraph. Each agent specializes in
a specific type of analysis and has access to domain-specific tools.

5.1 Agent Types
Historical Analysis Agent
Analyzes past stock performance, price trends, technical indicators, and fundamental metrics using FMP
historical data.

Expected Earnings Agent
Evaluates earnings expectations, analyst estimates, consensus forecasts, and earnings trends.

Macro/Industry Agent
Examines macroeconomic factors, industry trends, sector performance, and competitive positioning.

News Analysis Agent
Processes news sentiment using Benzinga API, identifies key events, and assesses market impact.

Filing Agent
Analyzes SEC filings (10-K, 10-Q, 8-K) from EDGAR API for material changes and risk factors.

Validator Agent
Performs quality control on all agent outputs, validates structure, and triggers retry loops if needed.

5.2 LangGraph Orchestration
LangGraph manages the agent workflow with a TypedDict-based AgentState that flows through all agents. The
orchestration follows this pattern:

Initialize AgentState with user inputs (ticker, investor_type, risk_tolerance)
Execute agents in parallel where possible (Historical, Earnings, Macro, News)
Filing Agent runs after initial agents complete
Validator Agent performs quality checks on all outputs
Retry Coordinator triggers re-runs if validation fails
Final compilation into structured report with metadata
5.3 Intelligent Tool Calling
Agents use LLM-driven tool calling to dynamically fetch data. The LLM client (llm_client.py) handles parallel tool
execution using AsyncOpenAI and AsyncAnthropic for non-blocking API calls.

5.4 API Caching System
A comprehensive caching system (MD5-hashed keys) stores API responses in AgentState, preventing
redundant API calls across agents. This dramatically reduces costs and improves performance.

6. RAG System (Pinecone + OpenAI)
The Agentic RAG system enables intelligent querying of completed analysis reports using Pinecone's
serverless vector database and OpenAI's text-embedding-3-small model.

6.1 Architecture Components
Report Ingestion Pipeline (rag/report_ingestion.py)
Chunks completed reports by section, generates embeddings, and upserts to Pinecone with metadata (user_id,
ticker, section).

Agentic Retriever (rag/agentic_retriever.py)
Uses ReAct pattern for intelligent decision-making, query routing, and information synthesis.

RAG Tool Suite (rag/rag_tools.py)
Provides semantic search, section-specific retrieval, and fresh data detection capabilities.

Intent Classifier (rag/intent_classifier.py)
Analyzes user queries to determine output type (chart, table, metric_card, edit_report, etc.).

Content Generator (rag/content_generator.py)
Routes requests to specialized handlers based on intent type and mode (Fast/Build).

6.2 Pinecone Index Structure
Vectors are stored with rich metadata for precise filtering: • user_id: Ensures data isolation between users •
ticker: Stock symbol for multi-stock portfolios • section: Analysis section (historical, expected, macro, news,
filings) • chunk_index: Position within section for ordering • report_id: Links back to Firebase document

6.3 File Upload System
The ChatBot includes Pinecone Assistant integration for file uploads (PDF, TXT, DOCX, CSV). Files are scoped
with metadata filtering to prevent cross-user data leakage. Users can query uploaded documents and generate
charts from file data.

7. ChatBot System (Fast Mode & Build Mode)
The ChatBot is the primary interface for interacting with completed reports, offering two distinct modes
optimized for different use cases.

7.1 Fast Mode (RAG-Powered Q&A;)
Instant answers from RAG system using Pinecone vector search
Supports metric queries ("What's the P/E ratio?")
Chart generation requests ("Show revenue trends")
News queries ("Latest news sentiment")
File-based queries (uploaded documents)
Response time: ~2-3 seconds
7.2 Build Mode (Report Editing)
Subsection-aware editing with precise targeting
Preview/approval workflow for all edits
Supports section_update, add_insight, add_chart, delete_chart
Automatic Firebase save and Pinecone re-ingestion
Undo capability with version history
Edit types: section updates, subsection updates, chart management
7.3 Report Structure Parser
The Report Structure Parser (utils/report_structure_parser.py) extracts the exact section and subsection
hierarchy from markdown content. This parsed structure is sent to the LLM with every Build Mode query,
enabling precise subsection targeting.

Structure Format:
{ "expected": { "subsections": ["Executive Summary", "Consensus Estimates","Earnings Trends", "Key Metrics"] }, "historical": { "subsections": ["Price
Performance", "Technical Analysis"] } }
7.4 Chart Management
The ChartManager (rag/chart_tools.py) maintains a registry of all charts with unique IDs. Users can add, edit, or
delete charts through natural language commands. All chart operations flow through the preview/approval

workflow.

8. Database Layer (Firebase Firestore)
Firebase Firestore serves as the primary database for storing user data, analysis reports, and templates. The
database layer (database/firestore_db.py) provides a clean abstraction over Firebase operations.

8.1 Collections
users: User profiles and preferences
reports: Completed analysis reports with full data
templates: Saved report templates with extracted rules
analysis_sessions: In-progress analysis state tracking

8.2 Report Document Structure
{ "report_id": "unique_id", "user_id": "firebase_user_id", "ticker": "AAPL","created_at": "ISO timestamp", "investor_type": "growth", "risk_tolerance": 7,
"position_size": 10000, "report_data": { "expected": { "analysis": {...}, "charts":[...] }, "historical": { "analysis": {...}, "charts": [...] }, "macro": {
"analysis": {...}, "charts": [...] }, "news": { "analysis": {...} }, "filings": {"analysis": {...} } }, "overall_report": { "content": "...", "recommendation": "..."
}, "checkpoint_results": { "value": {...}, "growth": {...} } }
8.3 Firebase Auth Integration
Firebase Authentication handles user sign-in with email/password. The backend middleware verifies ID tokens
on protected routes. Development environment uses a mock user for testing.

9. Data Sources & APIs
9.1 Financial Modeling Prep (FMP)
Primary data source with 29 integrated endpoints covering:

Company profile and quote data
Historical price data (daily, intraday)
Financial statements (income, balance sheet, cash flow)
Key metrics and ratios
Institutional holders and ownership
Analyst estimates and price targets
Earnings calendar and surprises
Dividend history and yield
Stock splits and corporate actions
9.2 Other Data Sources
Finnhub API: Insider trading transactions and ownership data
Benzinga API: Real-time news feed and sentiment analysis
SEC EDGAR API: Official SEC filings (10-K, 10-Q, 8-K, DEF-14A)

9.3 API Client Architecture
All API clients are located in services/ directory with consistent patterns: • Async/await for non-blocking
requests • Automatic retry logic with exponential backoff • Response caching in AgentState • Error handling with
graceful degradation

10. Report Generation & Templates
10.1 Dynamic Report Generation
Reports are generated dynamically by LLM agents using a "markdown-first" architecture. Each agent returns
minimal envelope with markdown content and confidence score. The frontend renders markdown with inline
chart support using Vega-Embed.

10.2 Chart Generation System
The Chart Builder (visualizations/chart_builder.py) generates Altair/Vega charts directly from LLM-provided
JSON data (no pandas dependency). Supports 10 chart types:

Line charts (time series)
Bar charts (horizontal/vertical)
Area charts (stacked/unstacked)
Scatter plots
Pie/donut charts
Candlestick charts (OHLC)
Histograms
Waterfall charts
Heatmaps
Box plots
10.3 Template System
Users can save completed reports as reusable templates. The Template Extractor
(templates/template_extractor.py) uses an LLM to analyze report structure and generate template rules
covering:

Enabled sections and subsection structures
Chart types and counts per section
Analysis depth levels (basic, standard, detailed, comprehensive)
Data sources utilized
Custom analysis patterns
Template Application:
When creating a new analysis, users select a template. The Template Guidance System
(templates/template_guidance.py) generates prompt additions for agents, instructing them to follow the
template's structure and maintain consistent analysis depth.

11. Version History & Undo System
The Version History Manager (database/version_history.py) provides comprehensive undo functionality for
report edits. The system maintains up to 10 previous versions per report in memory.

11.1 Version Lifecycle
User requests edit in Build Mode ChatBot
System saves current report state to version history
Edit is applied and saved to Firebase
Report is re-ingested to Pinecone RAG
Undo button appears in ChatBot UI
User can click undo to restore previous version
Restoration triggers Firebase save and RAG re-ingestion
11.2 Firestore Serialization
Firebase returns DatetimeWithNanoseconds objects that cannot be JSON serialized. The version history
system includes a conversion utility (_convert_firestore_to_serializable) that recursively converts
Firestore-specific types to ISO strings before storage.

12. Deployment & Configuration
12.1 Environment Configuration
The application requires the following environment variables:

OPENAI_API_KEY - OpenAI API access
ANTHROPIC_API_KEY - Anthropic API access
FMP_API_KEY - Financial Modeling Prep API
FINNHUB_API_KEY - Finnhub API
BENZINGA_API_KEY - Benzinga API
PINECONE_API_KEY - Pinecone vector database
FIREBASE_API_KEY - Firebase authentication
FIREBASE_PROJECT_ID - Firebase project identifier
12.2 Workflow Configuration
The platform runs three concurrent workflows:

Workflow Command Port
Backend API uvicorn backend.main:app --host 0.0.0.0 --port 8000 8000
React Frontend cd frontend && npm run dev 5000
Extension API python api_server.py 8080
12.3 Development vs Production
Development Mode: • Firebase Auth middleware disabled • Mock user (user_mock_123) for testing • Hot reload
enabled for frontend and backend • CORS configured for localhost Production Mode: • Firebase Auth fully
enabled with token verification • HTTPS enforced • Optimized builds with minification • Rate limiting and request
validation

Appendix: Key File Reference
frontend/src/components/ChatBot.tsx
Dual-mode chatbot interface

frontend/src/pages/ReportDetailPage.tsx
Report viewer with charts

backend/main.py
FastAPI application entry

backend/routers/reports.py
Report CRUD and edit operations

backend/routers/chat.py
ChatBot API endpoint

agents/orchestrator.py
LangGraph multi-agent orchestration

agents/nodes/*_agent.py
Individual agent implementations

rag/agentic_retriever.py
RAG query processing

rag/intent_classifier.py
Query intent classification

rag/content_generator.py
Response generation routing

database/firestore_db.py
Firebase database operations

database/version_history.py
Undo system implementation

utils/report_structure_parser.py
Markdown structure extraction

visualizations/chart_builder.py
Altair chart generation

templates/template_extractor.py
Template creation from reports

This is a offline tool, your data stays locally and is not send to any server!
Feedback & Bug Reports