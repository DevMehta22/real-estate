from django.shortcuts import render

# Create your views here.
import joblib
import numpy as np
from django.http import JsonResponse
# from rest_framework.response import Response
from rest_framework.decorators import api_view
# from .serializers import PropertySerializer
# from .models import Property

# Load the trained model
model = joblib.load("real_estate_model.pkl")

@api_view(['POST'])
def predict_price(request):
    try:
        data = request.data
        print("Expected Features:", model.feature_names_in_)
        # Extract features from request
        feature_values = [
            data.get("area"),
            data.get("bedrooms"),
            data.get("bathrooms"),
            data.get("stories"),
            1 if data.get("mainroad") == "yes" else 0,
            1 if data.get("guestroom") == "yes" else 0,
            1 if data.get("basement") == "yes" else 0,
            1 if data.get("hotwaterheating") == "yes" else 0,
            1 if data.get("airconditioning") == "yes" else 0,
            data.get("parking"),
            1 if data.get("prefarea") == "yes" else 0,
            # ✅ One-Hot Encoding for `furnishingstatus`
            1 if data.get("furnishingstatus") == "semi-furnished" else 0,  # furnishingstatus_semi-furnished
            1 if data.get("furnishingstatus") == "unfurnished" else 0,  # furnishingstatus_unfurnished
            1 if data.get("furnishingstatus") == "furnished" else 0 
        ]

        # Convert to NumPy array & reshape
        input_data = np.array([feature_values]).astype(float)

        # Make prediction
        predicted_price = model.predict(input_data)[0]

        return JsonResponse({"predicted_price": round(predicted_price, 2)})

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)