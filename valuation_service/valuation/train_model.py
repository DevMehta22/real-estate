import pandas as pd
import joblib
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder


# Load dataset
df = pd.read_csv("valuation/dataset/Housing_Price_Data.csv")  # Update with the correct path

binary_columns = ["mainroad", "guestroom", "basement", "hotwaterheating", "airconditioning", "prefarea"]
df[binary_columns] = df[binary_columns].apply(lambda x: x.map({"yes": 1, "no": 0}))

# One-hot encode "furnishingstatus"
df = pd.get_dummies(df, columns=["furnishingstatus"], drop_first=False)

# Split dataset into features (X) and target (y)
X = df.drop("price", axis=1)  # Features
Y = df["price"]  # Target (Property Price)

# Train-test split (80% train, 20% test)
X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.2, random_state=42)

# Save processed data
X_train.to_csv("processed_X_train.csv", index=False)
X_test.to_csv("processed_X_test.csv", index=False)
Y_train.to_csv("processed_y_train.csv", index=False)
Y_test.to_csv("processed_y_test.csv", index=False)

print("✅ Data Preprocessing Completed!")

# Train the Random Forest Model
rf_model = RandomForestRegressor(n_estimators=100, random_state=42)
rf_model.fit(X_train, Y_train)

Y_pred = rf_model.predict(X_test)

# Evaluate model performance
mae = mean_absolute_error(Y_test, Y_pred)
mse = mean_squared_error(Y_test, Y_pred)
r2 = r2_score(Y_test, Y_pred)



print(f"📊 Model Performance:\n MAE: {mae}\n MSE: {mse}\n R² Score: {r2}")

# Save the trained model
joblib.dump(rf_model, "real_estate_model.pkl")

print("✅ Model Trained & Saved as 'real_estate_model.pkl'!")