console.log("Client side javascript file is loaded!")


$("#message-1").text("From JavaScript")

$("button").click((e) =>
{
  $("#message-2").text("Loading...")
  $("#message-1").text("")
  e.preventDefault()
  const location = $("input").val()
  fetch("/weather?address="+location).then((response) =>
  {
    response.json().then((data) =>
    {
      if(data.error)
      {
        $("#message-2").text(data.error)
        $("#message-3").hide()
        $("#message-4").hide()
        $("p img").hide()
      }
      else
      {
        $("#message-1").text(data.location)
        const description=data.forecast.description

        const temperature = data.forecast.temperature
        const temperatureText = "Temperature: "+ temperature+"℃"
        const feelslike = data.forecast.feelslike
        const feelslikeText = "Feels like: "+ feelslike+"℃"

// Show weather icon following the weather
        $("#message-2").text(description).show()
        $("#message-3").text(temperatureText).show()
        $("#message-4").text(feelslikeText).show()
        if(description.toUpperCase().includes("RAIN"))
        { $("p img").attr('src','img/umbrella.svg').show() }
        else if(description.toUpperCase().includes("SUNNY"))
        { $("p img").attr('src','img/sun.svg').show()}
        else if(description.toUpperCase().includes("CLOUDY"))
        { $("p img").attr('src','img/cloud.svg').show()}
        else if(description.toUpperCase().includes("CLEAR"))
        { $("p img").attr('src','img/sun.svg').show()}
        else if(description.toUpperCase().includes("LIGHTENING"))
        { $("p img").attr('src','img/cloud-lightning.svg').show()}
        else
        { $("p img").hide() }

        $("#city").text(data.location)
        $("#progressbarTemperature").text(data.forecast.temperature).removeClass().addClass("progress-bar")
        if(temperature<0)
        { $("#progressbarTemperature").addClass("bg-primary").css("width","15%") }
        else if(temperature<15)
        { $("#progressbarTemperature").addClass("bg-info").css("width","40%") }
        else if(temperature<30)
        { $("#progressbarTemperature").addClass("bg-warning").css("width","60%") }
        else
        { $("#progressbarTemperature").addClass("bg-danger").css("width","85%") }

        $("#progressbarFeelslike").text(data.forecast.feelslike).removeClass().addClass("progress-bar")
        if(temperature<0)
        { $("#progressbarFeelslike").addClass("bg-primary").css("width","15%") }
        else if(temperature<15)
        { $("#progressbarFeelslike").addClass("bg-info").css("width","40%") }
        else if(temperature<30)
        { $("#progressbarFeelslike").addClass("bg-warning").css("width","60%") }
        else
        { $("#progressbarFeelslike").addClass("bg-danger").css("width","85%") }
      }
    })
  })
})
// weatherForm.addEventListener("submit", () =>
// {
//   console.log("testing")
// })
