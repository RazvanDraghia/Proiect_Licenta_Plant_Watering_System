#include <FirebaseESP32.h>
#include "addons/TokenHelper.h"
#include "addons/RTDBHelper.h"
#include <WiFi.h>
#include <WebServer.h> 

// Firebase configuration
FirebaseConfig config;
FirebaseAuth auth;

// Firebase database URL and API key
#define DATABASE_URL "***"
#define API_KEY "***"

// Wi-Fi credentials
#define WIFI_SSID "TP-Link_2B94"
#define WIFI_PASSWORD "05167470"

// Initialize Firebase Data object
FirebaseData firebaseData;

// Sensor and relay pins
const int soilMoisturePin = 33; // Analog pin for soil moisture sensor
const int relayPin = 4;         // Digital pin for relay module

WebServer server(80); // Create WebServer on port 80

// Variables for non-blocking pump control
bool pumpActive = false;
unsigned long pumpStartTime = 0;
const unsigned long pumpDuration = 10000; // 10 seconds

void handleEnablePump() {
  Serial.println("Pump activation request received...");

  
  digitalWrite(relayPin, HIGH); // Turn on the pump
  pumpActive = true;           // Mark the pump as active
  pumpStartTime = millis();    // Record the start time

  server.send(200, "application/json", "{\"message\": \"Pump activated for 10 seconds\"}");
}

void setup() {
  // Start Serial Monitor
  Serial.begin(9600);
  Serial.println("Starting ESP32...");

  // Initialize relay pin
  pinMode(relayPin, OUTPUT);
  digitalWrite(relayPin, LOW); // Ensure the pump is off initially

  // Connect to Wi-Fi
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print("*");
  }
  Serial.println("\nWi-Fi connected");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());

  auth.user.email = "razvandraghia17@yahoo.com";
  auth.user.password = "titimiti";

  // Configure Firebase
  config.api_key = API_KEY;
  config.database_url = DATABASE_URL;
  config.token_status_callback = tokenStatusCallback; // Optional: Token status

  // Initialize Firebase
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);

  Serial.println("Firebase initialized");

  // Configure HTTP Server
  server.on("/enable-pump", HTTP_POST, handleEnablePump); // Route to handle pump activation
  server.begin();
  Serial.println("HTTP server started");
}

void loop() {
  server.handleClient(); // Handle incoming HTTP requests

  // Check if the pump should be turned off
  if (pumpActive && (millis() - pumpStartTime >= pumpDuration)) {
    digitalWrite(relayPin, LOW); // Turn off the pump
    pumpActive = false;           // Reset the pump active flag
    Serial.println("Pump deactivated after 10 seconds");
  }

  // Read soil moisture value
  int soilMoistureValue = analogRead(soilMoisturePin);
  float percentage = map(soilMoistureValue, 0, 4095, 100, 0); // Adjust for your sensor's range

  // Print soil moisture to Serial Monitor
  Serial.print("Soil moisture percentage of humidity: ");
  Serial.print(100-percentage);
  Serial.println("%");

  // Send soil moisture to Firebase
  if (Firebase.setFloat(firebaseData, "/SoilMoisture", 100-percentage)) {
    Serial.println("Data sent to Firebase successfully");
  } else {
    Serial.print("Error sending data: ");
    Serial.println(firebaseData.errorReason());
  }

  // Wait 5 seconds before the next soil moisture reading
  delay(5000);
}
