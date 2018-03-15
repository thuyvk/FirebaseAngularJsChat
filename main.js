// Initialize Firebase
var config = {
    apiKey: "AIzaSyDxwxDq9FEgpo5B6WFSkH_bNUpORZEra48",
    authDomain: "thuyvkblog.firebaseapp.com",
    databaseURL: "https://thuyvkblog.firebaseio.com",
    projectId: "thuyvkblog",
    storageBucket: "thuyvkblog.appspot.com",
    messagingSenderId: "763203502389"
};
firebase.initializeApp(config);

var app = angular.module('app', ['firebase']);

app.factory("Auth", ["$firebaseAuth",
    function ($firebaseAuth) {
        return $firebaseAuth();
    }
]);

app.controller("chatCtrl", function ($scope, $firebaseArray, Auth) {
    $scope.auth = Auth;

    $scope.auth.$onAuthStateChanged(function (firebaseUser) {
        $scope.firebaseUser = firebaseUser;
        if (!$scope.firebaseUser) {
            $scope.showChat = false;
            return;
        }
        else {
            $scope.showChat = true;
        }
    });

    $scope.newMessage = "";
    var ref = firebase.database().ref().child("messages");
    // download the data into a local object
    $scope.messages = $firebaseArray(ref);
    // putting a console.log here won't work, see below
    $scope.addMessage = function () {
        var d = new Date();
        var n = d.toString();

        $scope.messages.$add({
            name: $scope.firebaseUser.displayName,
            text: $scope.newMessage,
            time: n
        });
    };

    $scope.ShowMessage = function (value) {
        $log.info(value);
        console.log(value);
    };

});