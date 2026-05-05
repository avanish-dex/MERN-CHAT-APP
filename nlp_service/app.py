from flask import Flask, request, jsonify
from flask_cors import CORS
from textblob import TextBlob

app = Flask(__name__)
CORS(app)

@app.route('/analyze', methods=['POST'])
def analyze_sentiment():
    data = request.json
    message = data.get('message', '')
    
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
        "message": message,
        "score": score,
        "sentiment": sentiment
    })

if __name__ == '__main__':
    app.run(port=5001)