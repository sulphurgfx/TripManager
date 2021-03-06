function ValidateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }
    //alert("You have entered an invalid email address!")
    return (false)
}


function login_click(){
    //alert("logl");
    if(!document.getElementById("login_email").value|| !document.getElementById("login_password").value){
        // js validation for checking blank fields
        alert("Please fill all the fields!");
        return;
    }else if(!ValidateEmail(document.getElementById("login_email").value)){
        // js validation for checking valid email iD
        alert("Please enter a valid email ID!");
    }else{
        // checking return value from ajax 
        if(login(document.getElementById("login_email").value, document.getElementById("login_password").value) == 'success'){
            window.location = 'index.php';
            return
        }else{
            // if return value is anything else than success, then return function, and dont let sign in.
            alert("Invalid email or password, sign up first.");
            return
        }
    }
}

function remove_click(){
    var trek_id = $('#treklist').val();
    if(confirm("Are you sure?")){
        if(remove_trek(trek_id) == 'success'){
            alert("Succesfully removed trip!");
            window.location = '';
        }else{
            alert("There was an error removing the trip, please try again later");
        }
    }
}

function remove_trek(id){
    var retval;
    retval = $.ajax({
        type: "POST",
        url: "util/remove_trek.php",
        async: false,
        data: {
            id: id,
        },
        success: function (data) {
            
        }
    }).responseText;
    //alert(retval);
    return retval;
}

function login(email, password){
    var retval;
    retval = $.ajax({
        type: "POST",
        url: "util/login.php",
        async: false,
        data: {
            email: email,
            password: password
        },
        success: function (data) {
            
        }
    }).responseText;
    //alert(retval);
    return retval;
    
}

function feedback_click(id){
    
    var feedback = $("#feedback_text").val();
    if(!feedback){
        alert("Please enter a feedback");
        return;
    }else{
        retval = $.ajax({
            type: "POST",
            url: "util/feedback_submit.php",
            async: false,
            data: {
                feedback: feedback,
                id: id
            },
            success: function (data) {
                
            }
        }).responseText
        if(retval=='success'){
            alert("Feedback submitted successfully!");
            window.location = '';
        }else{
            alert("There was a problem in submitting the feedback, try again later");
        }
    }
}

function signup_click(){

    var gender = $("input[type='radio'][name='gender']:checked").val();
    var username = $('#signup_name').val();
    var email = $('#signup_email').val();
    var password = $('#signup_password').val();
    var contact_number = $('#signup_contact_number').val();
   // alert(contact_number);
    //alert(gender);
    if(!gender || !username || !email|| !password  || !contact_number){
        alert("Please fill out all the fields!");
        return
    }else if(!ValidateEmail(email)){
        alert("Please enter a valid email id");
    }else if(password.length < 6){
        alert("Please enter a password more than 6 characters");
    }else{
        // checking value return value if it is success, then alert successfuly logedd in 
        if(register(username,email,password,contact_number,gender) == 'success'){
            alert("Successfully Registered! Please login");
            window.location = '';
        }else{
            //else alert there was an error
            alert("There was a error with registration, please try again later");
        }
        
    }
}

function add_click(){
    var name = $('#name').val();
    var img = $('#img').val();
    var price = $('#price').val();
    var region = $('#region').val();
    var difficulty = $('#difficulty').val();
    var length = $('#length').val();
    var altitude = $('#altitude').val();
    var duration = $('#duration').val();
   // alert(contact_number);
    //alert(gender);
    if(!name || !img || !price || !region || !difficulty || !length || !altitude || !duration ){
        alert("Please fill out all the fields!");
        return
    }else{
        if(add_trip(name,img,price,region,difficulty, length, altitude, duration) == 'success'){
            alert("Successfully Added Trip!");
            window.location = '';
        }else{
            alert("There was a error with adding trip, please try again later");
        }
        
    }
}

function add_trip(name,img,price,region,difficulty, length, altitude, duration){
    var retval;
    //alert(owner);
    retval = $.ajax({
        type: "POST",
        url: "util/add_trip.php",
        async: false,
        data: {
            name: name,
            img: img,
            price: price,
            region: region,
            difficulty: difficulty,
            length: length,
            altitude: altitude,
            duration: duration
        },
        success: function (data) {
            
        }
    }).responseText;
    return retval;
}

function book_click(owner){
    var select = document.getElementById("treklist").value;
    var date = document.getElementById("trekdate").value;
    if(select == -1){
        alert("Please select your trek");
        return
    }else if(!trekdate){
        alert("Please select a date");
    }else{//checking return value if it is success
        if(book(owner, select, date)=='success'){
            // passing data from form to book function
            alert("Successfully booked your trip");
            window.location = 'booked.php';
        }else{
            //if return value was anything else than success, return with alert;
            alert("There was an error in booking your trip, please try again later!");
        }
    }
}

function cancel_click(owner){
    var select = document.getElementById("treklist2").value;
    var date = document.getElementById("trekdate2").value;
    if(select == -1){
        alert("Please select your trek");
        return
    }else if(!trekdate){
        alert("Please select a date");
    }else{//checking return value if it is success
        if(cancel(owner, select, date)=='success'){
            // passing data from form to book function
            alert("Successfully cancelled your trip");
            window.location = 'booked.php';
        }else{
            //if return value was anything else than success, return with alert;
            alert("There was an error in cancelling your trip, please try again later!");
        }
    }
}

function book(owner, id, date){
    var retval;
    // retrieveing data here
    //alert(owner);
    retval = $.ajax({
        // passing function to ajax page book.php
        type: "POST",
        url: "util/book.php",
        async: false,
        data: {
            id: id,
            date: date,
            owner: owner
        },
        success: function (data) {
            
        }
    }).responseText;
    return retval;
}

function cancel(owner, id, date){
    var retval;
    // retrieveing data here
    //alert(owner);
    retval = $.ajax({
        // passing function to ajax page book.php
        type: "POST",
        url: "util/cancel.php",
        async: false,
        data: {
            id: id,
            date: date,
            owner: owner
        },
        success: function (data) {
            
        }
    }).responseText;
    return retval;
}

function register(username, email, password, contact_number, gender){
    var retval;
    retval = $.ajax({
        // retrieving data passed from signup_click function
        // passing variables to ajax php page
        type: "POST",
        url: "util/register.php",
        async: false,
        data: {
            username: username,
            email: email,
            password: password,
            contact_number: contact_number,
            gender: gender
        },
        success: function (data) {
            
        }
    }).responseText;
    //alert(retval);
    //returning value from ajax call 
    return retval;
}

