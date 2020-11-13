console.log("here");
//go back to projects page
$("#back-btn").on("click", () => {
  $(location).attr("href", "/projects")
})

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
