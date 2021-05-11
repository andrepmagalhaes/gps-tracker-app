//lat 0.00012830987 lng 0.00167369836

#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <SoftwareSerial.h>
#include "/home/andre/Arduino/libraries/espsoftwareserial-master/src/SoftwareSerial.h"
#include <Ticker.h>

#define SERVER_IP "http://tf-mc.herokuapp.com/postData"

#ifndef STASSID
#define STASSID "AndroidAP_9047"
#define STAPSK  "s3mh4123"
#endif

#ifndef INT_TIMER_TIME
#define INT_TIMER_TIME 10
#endif

#ifndef MC_ID
#define MC_ID 0
#endif

#ifndef MC_KEY
#define MC_KEY "$2b$08$fPg5/wKtXajmahFccDFEdu"
#endif

//#define ID 0
//#define KEY "hehehe"
//#define KEY "$2b$08$fPg5/wKtXajmahFccDFEdu"


String str;
SoftwareSerial bluetooth;
Ticker intTimer;
WiFiClientSecure client;
bool shouldPost = false;

void intTimer_func()
{
  shouldPost = true;
}


void setup() {

  Serial.begin(9600);
  bluetooth.begin(9600, SWSERIAL_8N1, 13, 15);
  WiFi.mode(WIFI_STA);
  WiFi.disconnect();
  delay(100);
  
  WiFi.begin(STASSID, STAPSK);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("Connected to wifi");
  intTimer.attach(INT_TIMER_TIME, intTimer_func);
}

void loop() {

  if (bluetooth.available() > 0) {
    str = "";
    str = bluetooth.readString();
    Serial.println(str);
  }
  
  if((WiFi.status() == WL_CONNECTED) && shouldPost == true)
  {
    intTimer.detach();
    char lat[12] = "";
    char longi[12] = "";
    int strBeginning = 0;
    int strEnd = 0;
    int pos = 0;
    int posStr = 1;

    strBeginning = str.lastIndexOf("~");
    strEnd = str.lastIndexOf("*");
    for(int i = strBeginning + 1; i < strEnd ; i++)
    {
      lat[pos] = str[i];
      pos++;      
    }
  
    pos = 0;
    strBeginning = strEnd;
    strEnd = str.lastIndexOf("%");
  
    for(int i = strBeginning + 1; i < strEnd ; i++)
    {
      longi[pos] = str[i];
      pos++;      
    }

    
    Serial.println("lat");
    Serial.println(lat);
    Serial.println("longi");
    Serial.println(longi);
    
    WiFiClient client;
    HTTPClient http;
    String postData = "\ID=" + String(MC_ID) + "&key=" + String(MC_KEY) + "&latitute=" + String(lat) + "&longitude=" + String(longi);

    Serial.print("[HTTP] begin...\n");
    // configure traged server and url
    http.begin(client, SERVER_IP); //HTTP
    http.addHeader("Content-Type", "application/x-www-form-urlencoded");

    Serial.print("[HTTP] POST...\n");
    // start connection and send HTTP header and body
    int httpCode = http.POST(postData);

    // httpCode will be negative on error
    if (httpCode > 0) {
      // HTTP header has been send and Server response header has been handled
      Serial.printf("[HTTP] POST... code: %d\n", httpCode);

      // file found at server
      if (httpCode == HTTP_CODE_OK) {
        const String& payload = http.getString();
        Serial.println("received payload:\n<<");
        Serial.println(payload);
        Serial.println(">>");
      }
    } else {
      Serial.printf("[HTTP] POST... failed, error: %s\n", http.errorToString(httpCode).c_str());
    }

    http.end();
    shouldPost = false;
    intTimer.attach(INT_TIMER_TIME, intTimer_func);
  }
  
}
