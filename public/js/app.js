console.log("Client side javascript file is loaded!")

const weatherForm = $("button")
const search = $("input")
const messageOne = $("#message-1")
const messageTwo = $("#message-2")
const messageThree = $("#message-3")
const messageFour = $("#message-4")


messageOne.text("From JavaScript")

weatherForm.click((e) =>
{
  messageTwo.text("Loading...")
  messageOne.text("")
  e.preventDefault()
  const location = search.val()
  fetch("/weather?address="+location).then((response) =>
  {
    response.json().then((data) =>
    {
      if(data.error)
      { messageTwo.text(data.error) }
      else
      {
        messageOne.text(data.location)
        const description=data.forecast.description

        const temperature="Temperature: "+data.forecast.temperature
        const feelslike="Feels like: "+data.forecast.feelslike

        messageTwo.text(description)
        messageThree.text(temperature)
        messageFour.text(feelslike)
      }
    })
  })
})
// weatherForm.addEventListener("submit", () =>
// {
//   console.log("testing")
// })
