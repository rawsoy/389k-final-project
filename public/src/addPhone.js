function addPhone() {
    $("#submitPhone").on('click', function() {
        var name = $("#name").val();
        var year = $("#year").val();
        var comp = $("#manufacturer").val();
        var img = $("#img").val();
        var size = $("#size").val()

        // Missing data
        if (!name) {
            alert("Please insert a name") 
            return false
        }
        
        if (!year) {
            alert("Please insert a year")
            return false
        }

        if (!comp) {
            alert("Please insert a company")
            return false
        }

        if (!img) {
            alert("Please insert a link to an image") 
            return false
        }

        if (!size) {
            alert("Please insert the screen size")
            return false
        }


        // Post it 
        var data = {
            name: name,
            year: year,
            company: comp,
            image: img,
            screenSize: size
        }

        $.post("/api/addPhone", data, function(data, status) {
            window.location.href = $("#home").attr('href')
        })
    })
}

$(document).ready( function() {
    addPhone();
})