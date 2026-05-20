export interface MockPost {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  overview: string;
  authorName: string;
  authorImage?: string;
  mainImage?: {
    _type: string;
    asset: {
      _ref: string;
      _type: string;
    };
  };
  body: Array<{
    _type: string;
    style?: string;
    listItem?: string;
    children: Array<{
      _type: string;
      text: string;
      marks?: string[];
    }>;
  }>;
}

export const MOCK_POSTS: MockPost[] = [
  {
    _id: "mock-1",
    title: "Architecting the Future of GovTech: Enterprise-Scale AI & Real-Time Computer Vision",
    slug: "architecting-govtech-ai-computer-vision",
    publishedAt: "2024-11-15T10:00:00.000Z",
    overview: "A technical blueprint of our real-time municipal surveillance grid, integrating high-throughput RTSP telemetry streams with optimized YOLOv8 vision layers at Brihaspathi Technologies.",
    authorName: "Balaji S",
    body: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Municipal computer vision pipelines operate under constraints that would break ordinary web applications. When analyzing hundreds of high-definition RTSP surveillance feeds, standard processing loops quickly deteriorate into frame drops and severe memory fragmentation."
          }
        ]
      },
      {
        _type: "block",
        style: "h2",
        children: [
          {
            _type: "span",
            text: "1. High-Throughput Video Ingestion Pipeline"
          }
        ]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "At Brihaspathi Technologies, we designed a municipal monitoring grid scaling to hundreds of high-definition camera feeds. The primary bottleneck was decoding concurrent RTSP streams without running out of CPU threads. We solved this by implementing an asynchronous GPU-accelerated video decoding pipe using customized GStreamer plugins that write frame buffers directly into shared GPU memory."
          }
        ]
      },
      {
        _type: "block",
        style: "h2",
        children: [
          {
            _type: "span",
            text: "2. Quantizing YOLOv8 models for Real-Time Inference"
          }
        ]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Standard floating-point (FP32) deep learning models require excessive computation. To achieve sub-12ms inference speeds, we compiled our YOLOv8 architecture to TensorRT INT8 formats using post-training quantization. This optimization reduced the memory footprint by 75% and enabled us to run four times as many streams per GPU node while keeping accuracy levels at a staggering 99.1%."
          }
        ]
      },
      {
        _type: "block",
        style: "blockquote",
        children: [
          {
            _type: "span",
            text: "Scaling AI in civic infrastructure isn't just about selecting the right model; it's about minimizing the physical latency from the camera lens to the dashboard."
          }
        ]
      },
      {
        _type: "block",
        style: "h2",
        children: [
          {
            _type: "span",
            text: "3. Resilient Telemetry and Anomaly Alerting"
          }
        ]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Detected anomalies—such as unauthorized access or safety hazards—must be dispatched to the monitoring center instantly. We integrated a low-overhead WebSockets bridge backed by Redis pub-sub channels to deliver real-time overlay overlays and alert events under 45ms."
          }
        ]
      }
    ]
  },
  {
    _id: "mock-2",
    title: "Building tms.brihaspathi.com: Engineering an AI-Augmented Task Orchestration Engine",
    slug: "building-tms-brihaspathi-task-orchestration",
    publishedAt: "2024-08-22T10:00:00.000Z",
    overview: "How we integrated advanced effort forecasting algorithms, dynamic resource leveling models, and immersive real-time dashboards to revolutionize corporate productivity.",
    authorName: "Balaji S",
    body: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Enterprise task management systems are notoriously static. They act as mere digital logs of human planning. At Brihaspathi Technologies, we set out to build an intelligent, predictive platform that actively assists engineering leaders in resource allocation and timeline projection."
          }
        ]
      },
      {
        _type: "block",
        style: "h2",
        children: [
          {
            _type: "span",
            text: "1. Machine Learning Powered Estimation"
          }
        ]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Task estimation is notoriously prone to optimistic bias. To counter this, our engine collects past project velocity metrics, task complexity profiles, and developer focus statistics, feeding them into a gradient-boosted regression model. The system predicts completion times with a 92% accuracy rate, saving valuable project planning overhead."
          }
        ]
      },
      {
        _type: "block",
        style: "h2",
        children: [
          {
            _type: "span",
            text: "2. Real-Time Dashboard Sync via WebSockets"
          }
        ]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "For project managers overseeing multiple teams, a delay in state updates can lead to resource clashes. We implemented an event-driven sync model. State mutations in the database trigger PostgreSQL NOTIFY actions, which are intercepted by our Node.js broker and propagated instantly to active browser sessions using highly optimized WebSocket streams."
          }
        ]
      },
      {
        _type: "block",
        style: "h2",
        children: [
          {
            _type: "span",
            text: "3. UI/UX and High-Performance Virtualization"
          }
        ]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "To display thousands of active tasks in a single immersive Gantt-style interface, we leveraged windowed list virtualization. By only rendering components currently in the user's viewport, we kept frame rates locked at 60 FPS, even on legacy systems."
          }
        ]
      }
    ]
  },
  {
    _id: "mock-3",
    title: "The Brihaspathi Query Bot: Delivering Context-Aware Generative AI to Thousands of Users",
    slug: "brihaspathi-query-bot-genai",
    publishedAt: "2024-05-10T10:00:00.000Z",
    overview: "An in-depth engineering walk-through on vector search indexing, context window pruning, and optimizing low-latency LLM responses for enterprise customer inquiries.",
    authorName: "Balaji S",
    body: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Deploying a conversational AI system is easy; making it context-aware, secure, and blazingly fast is where the real engineering challenges emerge. Our team launched the Brihaspathi Query Bot to automate intricate client support queries with deep product knowledge."
          }
        ]
      },
      {
        _type: "block",
        style: "h2",
        children: [
          {
            _type: "span",
            text: "1. Vector Embedding and pgvector Search Abstractions"
          }
        ]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "To search through hundreds of specialized manuals, we broke documents down into semantic chunks and embedded them using OpenAI text-embedding-3-small models. We stored these vectors directly inside our PostgreSQL databases using pgvector, optimizing indices with HNSW (Hierarchical Navigable Small World) algorithms for microsecond-scale similarity retrieval."
          }
        ]
      },
      {
        _type: "block",
        style: "h2",
        children: [
          {
            _type: "span",
            text: "2. Smart RAG and Prompt Context Pruning"
          }
        ]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Dumping raw text pages into LLM context prompts is expensive and introduces noise. We built a RAG (Retrieval-Augmented Generation) pipeline that evaluates context density, pruning redundant phrases and retaining only highly informative snippets. This reduced token consumption by 65% while actually increasing factual retrieval accuracy."
          }
        ]
      },
      {
        _type: "block",
        style: "h2",
        children: [
          {
            _type: "span",
            text: "3. Distributed Redis Session Caching"
          }
        ]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "To maintain conversation history across multiple distributed API nodes without constantly querying the central database, we implemented a high-performance session cache inside Redis. This allowed the bot to retrieve state information instantly, delivering fluid, human-like conversations under 800ms."
          }
        ]
      }
    ]
  }
];
