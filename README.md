# Finova - Next Gen Financial Intelligence

![Finova Banner](public/geometric-bg.png)

Finova is a comprehensive financial intelligence platform I built to revolutionise how we track, analyze, and manage personal wealth. At its core, it serves as a central hub that automates the transition from raw, unstructured financial documents into actionable, beautifully visualized portfolio data.

## 🧠 The Finova Intelligence Model

The beating heart of this application is the **Finova Intelligence Model**, an automated parsing pipeline I engineered to eliminate manual financial data entry. 

Rather than expecting users to manually input every trade, balance, or dividend statement, I designed the model to consume raw, multi-page brokerage PDFs. Here is how the model operates under the hood:

1. **Document Ingestion**: The vault securely accepts complex financial artifacts (statements, 10-Ks, expense reports).
2. **Structural Extraction**: The parsing engine scans the document architecture to isolate asset names, ticker symbols, historical investment bases, and current valuations.
3. **Data Synthesis**: It structures this raw text into a standard mathematical model, calculating precise returns and alpha generation.
4. **Insight Generation**: Beyond numerical extraction, the model flags actionable insights—such as over-concentration in specific equities, high expense categories, or portfolio performance relative to market benchmarks.

This model allows the user to just drag-and-drop their monthly statements into the vault and instantly watch their real-time dashboard update with new intelligence.

## 🚀 Features

- **Document Intelligence Vault**: The ingestion point for the Intelligence Model, allowing secure drag-and-drop of financial PDFs.
- **Interactive Asset Dashboard**: A beautifully crafted, real-time dashboard tracking asset allocation and portfolio health derived directly from the model's parsed data.
- **Classic Dark Mode**: A meticulously designed Material-style dark theme to reduce eye strain and provide a premium, Bloomberg-terminal-esque viewing experience.
- **Live Document Previews**: Integrated inline PDF rendering allowing seamless toggling between the raw uploaded document and the model's newly extracted AI insights.

## 💡 Why I Built This

I created Finova because I was frustrated with the clunky, outdated interfaces of traditional banking and portfolio tracking apps. I wanted a tool that not only looked beautiful, but also completely automated the painful process of tracking investments across different, disconnected brokerages.

By building the Finova Intelligence Model, I solved my own problem. I no longer spend weekends manually keying in data from monthly PDF statements. I built a system that does the heavy lifting for me, wrapped in an interface that I actually enjoy looking at.

## 💻 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/finova.git
   ```

2. Navigate into the project directory:
   ```bash
   cd finova
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🤝 Contributing
As this is a personal project I built to manage my own finances and showcase my engineering capabilities, I am currently not accepting external contributions. However, feel free to fork the repository and adapt the intelligence model to your own needs!

## 📄 License
This project is licensed under the MIT License.
