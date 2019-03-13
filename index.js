'use strict';

const line = require('@line/bot-sdk');
const express = require('express');
const bodyParser = require("body-parser");
const axios = require('axios');

// create LINE SDK config from env variables
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/device-online', (req, res) => {
  var esp = req.body.data.esp
  axios({
    method: 'post',
    url: 'https://bhcd-api.herokuapp.com/user-line-device-info/check/esp',
    headers: {
      'Content-Type' : 'application/json'
    },
    data: {
        "data" : {
          "esp" : esp
        }
    }
  }).then((response) => {
    var lineID = response.data.data.id
    const echo = {
      "type": "text",
      "text": response.data.data.esp + " online"
    }
    client.pushMessage(lineID, echo)
    res.end()
  }).catch((error) => {
    console.log(error.message)
  })
})

app.post('/falling', (req, res) => {
  var esp = req.body.data.esp
  axios({
    method: 'post',
    url: 'https://bhcd-api.herokuapp.com/user-line-device-info/check/esp',
    headers: {
      'Content-Type' : 'application/json'
    },
    data: {
        "data" : {
          "esp" : esp
        }
    }
  }).then((response) => {
    var lineID = response.data.data.id
    const echo = {
      "type": "template",
      "altText": "คุณ " + response.data.data.name,
      "template": {
          "type": "buttons",
          "thumbnailImageUrl": "https://i.imgur.com/h3ujqrZ.jpg",
          "imageAspectRatio": "square",
          "imageSize": "cover",
          "imageBackgroundColor": "#FFFFFF",
          "title": "หมายเลขอุปกรณ์ : " + esp,
          "text": "คุณ " + response.data.data.name,
          "defaultAction": {
              "type": "message",
              "label": "ตอบรับ",
              "text": "Acknowledge:" + esp
          },
          "actions": [
              {
                "type": "message",
                "label": "ตอบรับ",
                "text": "Acknowledge:" + esp
              },
              {
                "type": "uri",
                "label": "โทร",
                "uri": "tel:" + response.data.data.phone
              }
          ]
      }
    }
    client.pushMessage(lineID, echo)
    res.end()
  }).catch((error) => {
    console.log(error.message)
  })
})

app.post('/help', (req, res) => {
  var esp = req.body.data.esp
  axios({
    method: 'post',
    url: 'https://bhcd-api.herokuapp.com/user-line-device-info/check/esp',
    headers: {
      'Content-Type' : 'application/json'
    },
    data: {
        "data" : {
          "esp" : esp
        }
    }
  }).then((response) => {
    var lineID = response.data.data.id
    const echo = {
      "type": "template",
      "altText": "คุณ " + response.data.data.name,
      "template": {
          "type": "buttons",
          "thumbnailImageUrl": "https://i.imgur.com/oWiGMzD.jpg",
          "imageAspectRatio": "square",
          "imageSize": "cover",
          "imageBackgroundColor": "#FFFFFF",
          "title": "หมายเลขอุปกรณ์ : " + esp,
          "text": "คุณ " + response.data.data.name,
          "defaultAction": {
              "type": "message",
              "label": "ตอบรับ",
              "text": "Acknowledge:" + esp
          },
          "actions": [
              {
                "type": "message",
                "label": "ตอบรับ",
                "text": "Acknowledge:" + esp
              },
              {
                "type": "uri",
                "label": "โทร",
                "uri": "tel:" + response.data.data.phone
              }
          ]
      }
    }
    client.pushMessage(lineID, echo)
    res.end()
  }).catch((error) => {
    console.log(error.message)
  })
})

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
