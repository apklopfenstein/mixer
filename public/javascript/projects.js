$(() => {
    $('.modal').modal();
});

$(".delete-project").on("click", function () {
    var fullId = $(this).attr("id").split("-")
    var projectID = fullId[1]

    deleteProjectDb(projectID);
    window.location.reload()

})

async function deleteProjectDb(projectID) {

    const response = await fetch(`/api/projects/${projectID}`, {
        method: 'DELETE',

        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (response.ok) {
        console.log("cool");
    } else {
        console.log(response);
        alert(response.statusText);
    }
}

$(document).ready(function(){
    $('.sidenav').sidenav();
  });