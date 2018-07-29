$.getJSON("data.json", function (people) {
                
    //-----all people
                
    var allPeople = [];
                
    $.each(people, function (i, item) {
        allPeople.push("<div class='col-md-3 mb-3'><img class='rounded-circle' style='width: 45px;' src='https://robohash.org/" + 
        item.firstName + ".png'><a class='thumbnail' href='#' id='" + item.id + "'>" + item.firstName + " " + item.surname + "</a></div>");
    });
                
    //-----populate People Group in HTML
                
    $("#people").append(allPeople);
                
    //-----choose person by ID
                
    $("a").click(function (event) {
                    
        //-----get chosen user info
                    
        var personID = event.target.id;
        var personName = people[personID - 1].firstName;
        var personFriends = people[personID - 1].friends;
                    
        //-----populate name in HTML 
                    
        $("#name").text(personName);
                    
        //-----populate direct friends
                    
        var directFriends = [];
        var directFriendsIDs = [];
                    
        $.each(personFriends, function (index, value) {                        
                        
            directFriends.push(people[personFriends[index] - 1].firstName);
            directFriendsIDs.push(people[personFriends[index] - 1].id);
            
            $("#friends").text(directFriends);
                        
        });
                    
        //-----populate friends of friends(IDs)
                        
        var friendsOfFriendsIDs = [];
                        
        $.each(people, function (index, value) {
                        
            $.each(directFriends, function (i, v) {
                            
                if (value.firstName === v) {
                    
                    friendsOfFriendsIDs.push(value.friends);
                    
                } 
                            
            });
                        
        });
                    
        //-----convert friends of friends id's to names 
                    
        var friendsOfFriends = [];
                    
        $.each(people, function (index, value) {
                        
            $.each(friendsOfFriendsIDs, function (k, v) {
                            
                var index1 = index + 1;
                            
                if ($.inArray(index1, v) !== -1) {
                    
                    friendsOfFriends.push(value.firstName);
                    
                } 
                            
            });

        }); 
                    
        //-----remove duplicates and chosen person name from friends of friends
                    
        var uniqueFriendsOfFriends = [];
                    
        $.each(friendsOfFriends, function (i, el) {
                        
            if ($.inArray(el, uniqueFriendsOfFriends) === -1 && personName !== el) uniqueFriendsOfFriends.push(el);
                        
        });
                    
        //-----remove direct friends from friends of friends
                    
        var friendsOfFriendsFinal = [];
                    
        $.each(uniqueFriendsOfFriends, function (i, el) {
                        
            if ($.inArray(el, directFriends) === -1) friendsOfFriendsFinal.push(el);
                        
        });
                    
        $("#friends-of-friends").text(friendsOfFriendsFinal);
        
        //-----suggested friends
        
        var suggestedFriends = [];
        var realPersonID = personID - 1;
        
        $.each(people, function (index, element) {
            
            $.each(element.friends, function (i, el) {
                
                if ($.inArray(directFriendsIDs[i], element.friends) !== -1 && realPersonID !== el) {
                    
                    //remove users with number of direct friends under 2
                    
                    if (element.friends.length >= 2) {
                    
                        //eliminate suggested friends who doesn't know 2 or more direct driends
                        //code here--------------------------------------------------

                        suggestedFriends.push(element.firstName);
                        
                    }
                } 
            });
        });
        
        //-----remove duplicates and chosen person name from suggested friends
                    
        var uniqueSuggestedFriends = [];
                    
        $.each(suggestedFriends, function (i, el) {
                        
            if ($.inArray(el, uniqueSuggestedFriends) === -1 && personName !== el) uniqueSuggestedFriends.push(el);
                        
        });
        
        //-----remove direct friends from suggested friends
                    
        var suggestedFriendsFinal = [];
                    
        $.each(uniqueSuggestedFriends, function (i, el) {
                        
            if ($.inArray(el, directFriends) == -1) suggestedFriendsFinal.push(el);
                        
        });
        
        $("#suggested-friends").text(suggestedFriendsFinal);
                    
    });    
    });