$("#getemail").click(() => {
	$("#output").empty();

	$.ajax({
		url: "https://api.github.com/users/" + $("#username").val() + "/events/public",
		statusCode: {
			200(response, code) {
				console.log(response);
				let emails = [];
				//let obj = JSON.parse(response);
				let obj = response;
				for (let i = 0; i < obj.length; i++) {
					if (obj[i].hasOwnProperty("payload"))
						if (obj[i]["payload"].hasOwnProperty("commits"))
							for (let j = 0; j < obj[i]["payload"]["commits"].length; j++) {
								if (!emails.includes(obj[i]["payload"]["commits"][j]["author"]["email"]) && obj[i]["payload"]["commits"][j]["author"]["email"].split("@")[1] != "users.noreply.github.com")
									emails.push(obj[i]["payload"]["commits"][j]["author"]["email"]);
							}
				}
				if (emails.length > 0)
					$("#output").html(emails.join("<br>"));
				else {
					$("#output").html("<red>No email found</red>");
				}
			},
			404() {
				$("#output").html("<red>User not found</red>");
			}
		},
		error() {
				$("#output").html("<red>Fetch failed</red>");
			},
	});
});

$("#username").keydown(e=>{
	if (e.which == 13)
		$("#getemail").click();
});