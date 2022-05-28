mongodb connection authentication > user: harshbokan 24DOKxZKxUhdsgk5

mongodb+srv://harshbokan:<password>@cluster0.fanru7t.mongodb.net/?retryWrites=true&w=majority


pusher is used for realtime rather than socket.io
firebase - realtime database 
         - on adding or deleting the application gets triggered , on the same time change is gonna be made on the application
mongodb - we have to refresh by ourself/ or make code to refresh every 5 sec, but that makes the file super slow
pusher - make mongodb realtime
        - mongodb change 3 triggers pusher, pusher triggers frontend that new data is added to the database