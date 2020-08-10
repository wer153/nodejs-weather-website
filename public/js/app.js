console.log("Client side javascript file is loaded!")


$("#mainText").text("From JavaScript")
$(".hide").hide()

$("button").click((e) =>
{
  $("#mainText").text("Loading...")

  e.preventDefault()
  const location = $("input").val()
  fetch("/weather?address="+location).then((response) =>
  {
    response.json().then((data) =>
    {
      $(".hide").hide()
      if(data.error)
      { $("#mainText").text(data.error) }
      else
      {
        $("#mainText").text(data.location)
        const description=data.forecast.description
        const temperature = data.forecast.temperature
        const feelslike = data.forecast.feelslike

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

        // Show weather icon following the weather
        $(".hide").show()

        $("#mainText").text(data.location)
        $("#description").text(description)
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
