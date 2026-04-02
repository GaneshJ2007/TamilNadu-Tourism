# =====================================================================
# Sentiment Analysis using Familiar Machine Learning Algorithm
# Algorithm: TF-IDF Vectorization with Multinomial Naive Bayes
# Dataset: Live Feedback Data from MongoDB (Tamilnadu_Tourism)
# =====================================================================

import pymongo
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import accuracy_score, classification_report
import warnings
warnings.filterwarnings("ignore")

def load_feedback_data():
    """
    Connects to the local MongoDB database and securely fetches 
    all the feedback records collected from tourists.
    """
    print("🔄 Connecting to MongoDB 'Tamilnadu_Tourism'...")
    try:
        # Connect to local MongoDB instance
        client = pymongo.MongoClient("mongodb://localhost:27017/")
        db = client["Tamilnadu_Tourism"]
        collection = db["feedbacks"]

        # Fetch all feedback entries
        feedbacks = list(collection.find({}, {"_id": 0, "feedback": 1, "sentiment": 1, "rating": 1}))
        
        if not feedbacks:
            print("⚠️ No feedback data found in the database. Please submit feedback first.")
            return None

        # Convert to Pandas DataFrame for easier processing
        df = pd.DataFrame(feedbacks)
        print(f"✅ Successfully loaded {len(df)} feedback records from the dataset!")
        return df
        
    except Exception as e:
        print(f"❌ Error connecting to database: {e}")
        return None

def train_sentiment_model(df):
    """
    Implements a familiar Machine Learning Pipeline: TF-IDF + Naive Bayes
    """
    print("\n⚙️ Pre-Processing Dataset...")
    
    # 1. Clean data: drop any rows without feedback text
    df = df.dropna(subset=['feedback'])
    
    # If the LLM hasn't labeled sentiments yet, we can use 'rating' as a familiar truth label
    # E.g., Rating >= 4 is Positive, == 3 is Neutral, <= 2 is Negative
    if 'sentiment' not in df.columns or df['sentiment'].isnull().all():
        print("ℹ️ Utilizing star ratings to generate training labels...")
        def assign_sentiment(rating):
            if rating >= 4: return 'Positive'
            elif rating == 3: return 'Neutral'
            else: return 'Negative'
        df['sentiment'] = df['rating'].apply(assign_sentiment)

    X = df['feedback']
    y = df['sentiment']

    # Splitting data into training and testing sets (80% Train, 20% Test)
    # Note: Requires a decent chunk of feedback submitted to split safely
    try:
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    except ValueError:
        print("⚠️ Too little data to split. The algorithm will train on the entire dataset.")
        X_train, X_test, y_train, y_test = X, X, y, y

    # 2. Familiar Algorithm Setup: TF-IDF Vectorization
    print("📊 Applying TF-IDF Vectorization...")
    vectorizer = TfidfVectorizer(stop_words='english', max_features=1000)
    
    # Transform text to numerical features
    X_train_vec = vectorizer.fit_transform(X_train)
    X_test_vec = vectorizer.transform(X_test)

    # 3. Familiar Algorithm Execution: Multinomial Naive Bayes
    print("🧠 Training Multinomial Naive Bayes Model...")
    model = MultinomialNB()
    model.fit(X_train_vec, y_train)

    # 4. Evaluation 
    predictions = model.predict(X_test_vec)
    print("\n✅ Training Complete! Algorithm Performance Results:")
    print("--------------------------------------------------")
    print(f"Accuracy Score:  {accuracy_score(y_test, predictions) * 100:.2f}%")
    
    # Wrap in try-except in case there's only one class (like all Positive reviews)
    try:
        print("\nDetailed Classification Report:")
        print(classification_report(y_test, predictions))
    except:
        pass

    return model, vectorizer

def test_custom_feedback(model, vectorizer, text):
    """
    Tests the trained Naive Bayes algorithm on a brand new text input.
    """
    text_vec = vectorizer.transform([text])
    prediction = model.predict(text_vec)[0]
    print(f"\n🔮 Testing Sentimental Prediction on New Text:")
    print(f"Input: \"{text}\"")
    print(f"Algorithm Prediction -> {prediction.upper()}")

if __name__ == "__main__":
    print("-" * 50)
    print("FAMILIAR ML ALGORITHM (NAIVE BAYES) SIMULATION")
    print("-" * 50)
    
    dataset = load_feedback_data()
    
    if dataset is not None and len(dataset) > 0:
        model, vectorizer = train_sentiment_model(dataset)
        
        # Test the algorithm dynamically
        test_custom_feedback(model, vectorizer, "The temple architecture was absolutely breathtaking!")
        test_custom_feedback(model, vectorizer, "The hotel room was very dirty and the food was terrible.")
    else:
        print("Please insert dynamic data into MongoDB via the Web Application Feedback Form first.")
