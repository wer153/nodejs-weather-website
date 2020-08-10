console.log("Client side javascript file is loaded!")

//before user clicks button
$("#mainText").text("From JavaScript")
$(".hide").hide()
//when user clicks button
$("button").click((e) =>
{
  $("#mainText").text("Loading...")
  e.preventDefault()
  //call geocode api and weather cast api
  const location = $("input").val()
  fetch("/weather?address="+location).then((response) =>
  {
    response.json().then((data) =>
    {
      //in canse of error
      $(".hide").hide()
      if(data.error)
      { $("#mainText").text(data.error) }
      else
      {
        $("#mainText").text(data.location)
        const description=data.forecast.description
        const temperature = data.forecast.temperature
        const feelslike = data.forecast.feelslike

        // Show weather icon following the weather
        if(description.toUpperCase().includes("RAIN"))
        { $("p img").attr('src','img/umbrella.svg').show() }
        else if(description.toUpperCase().includes("SUNNY"))
        { $("p img").attr('src','img/sun.svg').show()}
        else if(description.toUpperCase().includes("CLOUDY"))
        { $("p img").attr('src','img/cloud.svg').show()}
        else if(description.toUpperCase().includes("CLEAR"))
        { $("p img").attr('src','img/sun.svg').show()}
        else if(description.toUpperCase().includes("THUNDER"))
        { $("p img").attr('src','img/cloud-lightnBLIZZARDing.svg').show()}
        else if(description.toUpperCase().includes("BLIZZARD"))
        { $("p img").attr('src','img/cloud-snow.svg').show()}
        else
        { $("p img").hide() }

        //Visualize temperature,feels like
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
        if(feelslike<0)
        { $("#progressbarFeelslike").addClass("bg-primary").css("width","15%") }
        else if(feelslike<15)
        { $("#progressbarFeelslike").addClass("bg-info").css("width","40%") }
        else if(feelslike<30)
        { $("#progressbarFeelslike").addClass("bg-warning").css("width","60%") }
        else
        { $("#progressbarFeelslike").addClass("bg-danger").css("width","85%") }
      }
    })
  })
})
