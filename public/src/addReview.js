function addReview() {
    $("#submitReview").on('click', function() {
        // Missing data
        if(!$("#author").val()) {
            alert("Please insert an author name")
            return false;
        }

        if (!$("#rating").val() || $("#rating").val() > 5.0 || $("#rating").val() < 1.0) {
            alert("Please insert a rating between 1.0 and 5.0")
            return false;
        }
        
        if(!$("#comment").val()) {
            alert("Please include a comment")
            return false;
        }
        
        // Post it
        var data = {
            name: $("#name").text(),
            author: $("#author").val(),
            rating: $("#rating").val(),
            comment: $("#comment").val()
        }

        $.post("/api/addReview", data, function(data, status) {
            window.location.href = "/phones/" + $("#name").text()
        })
    })
}

$(document).ready(function () {
    addReview();
})