console.log("here");
//go back to projects page
$("#back-btn").on("click", () => {
  $(location).attr("href", "/projects")
})


// //on new song button click, collect info and redirect to projects page
// $("#newSong-btn").on("click", (event)=>{
//     var title = $("#title").val().trim()
//     var description = $("#description").val().trim()
//     //attach mp3
//     var song = $("#song").val()
//     event.preventDefault();
//     console.log(title, description, song);
//     console.log("clicked");

// //call function to add song to db with info as parameters
// addSongDb(title, description, song)


//     //redirect
//     // $(location).attr("href", "/project-select")

// })

async function addSongDb(title, description) {

  console.log(title);


  if (title && description) {
    const response = await fetch('/api/songs', {
      method: 'POST',
      body: JSON.stringify({
        title,
        description,
        project_id

      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {

      console.log("cool");

    } else {
      console.log(response);

      alert(response.statusText);
    }
  }
}
