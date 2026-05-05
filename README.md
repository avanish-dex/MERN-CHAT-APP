# 💬 Real-Time Sentiment-Aware Chat App (MCA Final Project)

A full-stack messaging platform featuring a microservice architecture that integrates a **MERN stack** with a **Python Flask NLP service** to provide real-time sentiment analysis of conversations.

---

## 🛠 Tech Stack

- **Frontend:** React.js, Tailwind CSS (Glassmorphism UI), Zustand (State Management)
- **Backend:** Node.js, Express.js, Socket.io (Real-time bi-directional communication)
- **Database:** MongoDB (Dockerized)
- **AI Microservice:** Python, Flask, TextBlob (Natural Language Processing)
- **OS Environment:** Developed and tested on Arch Linux

---

## 🚀 Key Features

- **Real-Time Messaging:** Instant delivery using WebSockets.
- **AI Sentiment Analysis:** Every message is analyzed by a Python microservice to determine if the tone is **Positive**, **Negative**, or **Neutral**.
- **Dynamic UI:** Chat bubbles change color (Green for Positive, Red for Negative) based on AI feedback in real-time.
- **Secure Auth:** JWT-based authentication with protected routes.
- **Modern Design:** Custom background images with frosted-glass effects.

---

## 📐 System Architecture

This project utilizes a distributed architecture where the Node.js backend acts as a gateway, communicating with a Python AI engine via RESTful APIs.



---

## 📸 Screenshots

![App Preview](public/your-background.jpg)
*Caption: User Interface featuring the custom background and sentiment-tagged message bubbles.*

---

## 📋 Project Documentation

### 1. Project Definition
An AI-enhanced communication tool designed to demonstrate the integration of disparate programming environments (JavaScript and Python) into a unified Full-Stack application.

### 2. Objectives
* Implement low-latency communication using Socket.io.
* Establish a cross-language microservice bridge (Node.js <-> Flask).
* Process unstructured text data using TextBlob for sentiment polarity.

### 3. Scope
* **NLP Logic:** Flask server processes a string and returns a polarity score between -1.0 and 1.0.
* **Frontend Logic:** React hooks listen for socket events and update the local state without page refreshes.
* **Data Persistence:** All chats and sentiment scores are stored in a MongoDB collection for audit/history.

---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone [https://github.com/avanish-dex/MERN-CHAT-APP.git](https://github.com/avanish-dex/MERN-CHAT-APP.git)
cd MERN-CHAT-APP
