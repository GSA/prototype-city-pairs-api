using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using Newtonsoft.Json;
using WebApplication.Models;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApplication.Controllers
{
    public class CityPairsController : Controller
    {
        // GET: /<controller>/
        public IActionResult Index()
        {
            ViewData["City"] = "EARS City";

            return View();
        }

        // action for list of Airfares
		[HttpGet("[action]")]
		public async Task<IActionResult> Airfares()

		{
			using (var client = new HttpClient())
			{
				try
				{

                    /* https://api.gsa.gov/travel/citypairs/v0/airfares?award_year=2017&origin_airport_abbrev=ABQ&destination_airport_abbrev=BWI&api_key=DEMO_KEY */

					client.BaseAddress = new Uri("https://api.gsa.gov");
                    var response = await client.GetAsync($"/travel/citypairs/v0/airfares?award_year=2017&origin_airport_abbrev=ABQ&destination_airport_abbrev=BWI&api_key=DEMO_KEY");

                    response.EnsureSuccessStatusCode();

					var stringResult = await response.Content.ReadAsStringAsync();
					var varAirfaresResponse = JsonConvert.DeserializeObject<CityPairsAPIResponse>(stringResult);


                    /*return Ok(new
					{
						Temp = rawWeather.Main.Temp,
						Summary = string.Join(",", rawWeather.Weather.Select(x => x.Main)),
						City = rawWeather.Name
					});*/

					/*ViewData["id"] = rawAccessRequestList.AccessRequests.ElementAt(0).Id;
                    ViewData["sample_Field_1"] = rawAccessRequestList.AccessRequests.ElementAt(0).Sample_Field_1;
					ViewData["sample_Field_2"] = rawAccessRequestList.AccessRequests.ElementAt(0).Sample_Field_2;
                    */
					return View("Airfares", varAirfaresResponse.Result);
				}
				catch (HttpRequestException httpRequestException)
				{
					return BadRequest($"Error getting weather from City Pairs API: {httpRequestException.Message}");
				}
			}
		}

        // Action for individual City Pair record
		[HttpGet("[action]/{id}")]
		public async Task<IActionResult> Airfares(string id)

		{
			using (var client = new HttpClient())
			{
				try
				{

					

                    /*https://api.gsa.gov/travel/citypairs/v0/airfares/999?api_key=DEMO_KEY*/

					client.BaseAddress = new Uri("https://api.gsa.gov");
                    var response = await client.GetAsync($"/travel/citypairs/v0/airfares/{id}?api_key=DEMO_KEY");

					response.EnsureSuccessStatusCode();

					var stringResult = await response.Content.ReadAsStringAsync();
                    var varAirfaresResponse = JsonConvert.DeserializeObject<CityPairsAPIResponse>(stringResult);


					return View("AirfareDetail", varAirfaresResponse.Result[0]);
				}
				catch (HttpRequestException httpRequestException)
				{
					return BadRequest($"Error returned from City Pairs API: {httpRequestException.Message}");
				}
			}
		}    



    }

	public class CityPairsAPIResponse
	{
		public string Message { get; set; }
		public List<Airfare> Result { get; set; }

	}

	

}
