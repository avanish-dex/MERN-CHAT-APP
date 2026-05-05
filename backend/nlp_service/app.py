from flask import Flask, request, jsonify
from flask_cors import CORS
from textblob import TextBlob

app = Flask(__name__)
CORS(app)

@app.route('/analyze', methods=['POST'])
def analyze_sentiment():
    data = request.json
    
    # FIX 1: Catch 'text' instead of 'message' to match the Node.js backend
    message = data.get('text', '') 
    
    # Logic: TextBlob returns polarity from -1.0 to 1.0
    analysis = TextBlob(message)
    score = analysis.sentiment.polarity
    
    if score > 0:
        sentiment = "Positive"
    elif score < 0:
        sentiment = "Negative"
    else:
        sentiment = "Neutral"
        
    return jsonify({
        "text": message,
        "score": score,
        "sentiment": sentiment
    })

if __name__ == '__main__':
    # FIX 2: Added the closing parenthesis
    app.run(port=5001)