'use strict';

var myTestControllers = angular.module('myTestControllers', []);

myTestControllers.controller('appCtrl', ['$scope', '$http',
  function($scope, $http) {
      $scope.help = "";
      $scope.connectionEstablished = false;
      $scope.pendingGET = true;
      $scope.selected = false;
      $scope.msgInterval = 50;
      $scope.secToAnalyze = 2;
      $scope.lastMsg = 0;
      $scope.result = "0";

      $http.get('clientId').success(function(data) {
          $scope.help = "Host or connect to host";
          $scope.myId = data;
          $scope.pendingGET = false;
      });

      $scope.host = function(){
          $scope.help = "Waiting for connection...";
          $scope.selected = true;
          $scope.peer = new Peer($scope.myId, {host: '/', port: 9000});
          $scope.peer.on('connection', function(conn) {
              $scope.help = "Connection established";
              $scope.conn = conn;
              conn.on('data', function(data){
                  $scope.connectionEstablished = true;
                  if(data == 'lets_start'){
                      $scope.startMsgFrenzy();
                  } else {
                      $scope.processMsg(data);
                  }
              });
          });
      }

      $scope.connect = function(){
          $scope.help = "Connecting...";
          $scope.selected = true;
          $scope.peer = new Peer($scope.myId, {host: '/', port: 9000});
          var conn = $scope.peer.connect($scope.connectToId);
          $scope.conn = conn;
          conn.on('open', function(id) {
              $scope.help = "Connection established";
              $scope.connectionEstablished = true;
              conn.send('lets_start');
              $scope.startMsgFrenzy();
          });

          conn.on('data', function(data){
              $scope.processMsg(data);
          });
      }

      $scope.startMsgFrenzy = function(){
          var timer = setInterval(this.sendGenericMessage, this.msgInterval);
      }

      $scope.sendGenericMessage = function(){
          $scope.conn.send("WhatEver");
      }

      $scope.processMsg = function(rxData){
          $scope.lastMsg++;
          $scope.calculateRes();
          var timeOut = setTimeout(function(){
              $scope.lastMsg--;
              $scope.calculateRes();
          }, $scope.secToAnalyze * 1000);
      }

      $scope.calculateRes = function(){
          var res = $scope.lastMsg / ($scope.secToAnalyze * 1000 / $scope.msgInterval) * 100;
          $scope.result = res.toString();
          $scope.$apply();
      }
  }]);